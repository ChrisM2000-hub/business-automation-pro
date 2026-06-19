import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(150).optional().default(""),
  phone: z.string().trim().max(50).optional().default(""),
  projectType: z.string().trim().max(80).optional().default(""),
  budget: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(5).max(4000),
});

type Contact = z.infer<typeof ContactSchema>;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ error: "Invalid JSON" }, 400);
        }
        const parsed = ContactSchema.safeParse(body);
        if (!parsed.success) {
          return json({ error: "Invalid input", issues: parsed.error.flatten() }, 400);
        }
        const lead = parsed.data;

        const results = await Promise.allSettled([
          sendTelegram(lead),
          logToDrive(lead),
          sendNotifyEmail(lead),
          sendAutoReply(lead),
        ]);

        const failures = results
          .map((r, i) => ({ r, name: ["telegram", "drive", "notify-email", "auto-reply"][i] }))
          .filter((x) => x.r.status === "rejected")
          .map((x) => ({ step: x.name, reason: String((x.r as PromiseRejectedResult).reason) }));

        if (failures.length) console.error("[contact] partial failures:", failures);

        return json({ ok: true, delivered: results.length - failures.length, failed: failures.length });
      },
    },
  },
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", ...corsHeaders },
  });
}

// ---------- Telegram ----------
async function sendTelegram(lead: Contact) {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const lovableKey = process.env.LOVABLE_API_KEY;
  const tgKey = process.env.TELEGRAM_API_KEY;
  if (!chatId || !lovableKey || !tgKey) return;

  const text =
    `🚀 <b>New Lead — christophermendez.dev</b>\n\n` +
    `<b>Name:</b> ${esc(lead.name)}\n` +
    `<b>Email:</b> ${esc(lead.email)}\n` +
    (lead.company ? `<b>Company:</b> ${esc(lead.company)}\n` : "") +
    (lead.phone ? `<b>Phone:</b> ${esc(lead.phone)}\n` : "") +
    (lead.projectType ? `<b>Project:</b> ${esc(lead.projectType)}\n` : "") +
    (lead.budget ? `<b>Budget:</b> ${esc(lead.budget)}\n` : "") +
    `\n<b>Message:</b>\n${esc(lead.message)}`;

  const res = await fetch("https://connector-gateway.lovable.dev/telegram/sendMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": tgKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`);
}

// ---------- Google Drive (append to a CSV in a folder) ----------
async function logToDrive(lead: Contact) {
  const folderId = process.env.LEADS_DRIVE_FOLDER_ID;
  const lovableKey = process.env.LOVABLE_API_KEY;
  const driveKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!folderId || !lovableKey || !driveKey) return;

  const row =
    [
      new Date().toISOString(),
      lead.name,
      lead.email,
      lead.company,
      lead.phone,
      lead.projectType,
      lead.budget,
      lead.message.replace(/\s+/g, " "),
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",") + "\n";

  const fileName = `leads-${new Date().toISOString().slice(0, 7)}.csv`;
  const headers = {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": driveKey,
  };

  // Find existing monthly file
  const q = encodeURIComponent(`name='${fileName}' and '${folderId}' in parents and trashed=false`);
  const searchRes = await fetch(
    `https://connector-gateway.lovable.dev/google_drive/drive/v3/files?q=${q}&fields=files(id,name)`,
    { headers },
  );
  if (!searchRes.ok) throw new Error(`Drive search ${searchRes.status}: ${await searchRes.text()}`);
  const { files = [] } = (await searchRes.json()) as { files?: { id: string }[] };

  if (files[0]?.id) {
    // Append: download current, concat, re-upload (Drive has no native append)
    const getRes = await fetch(
      `https://connector-gateway.lovable.dev/google_drive/drive/v3/files/${files[0].id}?alt=media`,
      { headers },
    );
    const current = getRes.ok ? await getRes.text() : "";
    const updated = current + row;
    const upRes = await fetch(
      `https://connector-gateway.lovable.dev/google_drive/upload/drive/v3/files/${files[0].id}?uploadType=media`,
      { method: "PATCH", headers: { ...headers, "Content-Type": "text/csv" }, body: updated },
    );
    if (!upRes.ok) throw new Error(`Drive update ${upRes.status}: ${await upRes.text()}`);
    return;
  }

  // Create new file
  const boundary = "----lovable" + Math.random().toString(36).slice(2);
  const metadata = { name: fileName, parents: [folderId], mimeType: "text/csv" };
  const csvHeader =
    "timestamp,name,email,company,phone,project_type,budget,message\n";
  const multipart =
    `--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    JSON.stringify(metadata) +
    `\r\n--${boundary}\r\n` +
    `Content-Type: text/csv\r\n\r\n` +
    csvHeader +
    row +
    `\r\n--${boundary}--`;

  const createRes = await fetch(
    `https://connector-gateway.lovable.dev/google_drive/upload/drive/v3/files?uploadType=multipart`,
    {
      method: "POST",
      headers: { ...headers, "Content-Type": `multipart/related; boundary=${boundary}` },
      body: multipart,
    },
  );
  if (!createRes.ok) throw new Error(`Drive create ${createRes.status}: ${await createRes.text()}`);
}

// ---------- Gmail: notify Chris ----------
async function sendNotifyEmail(lead: Contact) {
  const to = process.env.CHRIS_NOTIFY_EMAIL;
  if (!to) return;
  await sendGmail({
    to,
    subject: `New lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    html: `
      <h2>New inquiry from christophermendez.dev</h2>
      <p><b>Name:</b> ${esc(lead.name)}<br/>
      <b>Email:</b> ${esc(lead.email)}<br/>
      ${lead.company ? `<b>Company:</b> ${esc(lead.company)}<br/>` : ""}
      ${lead.phone ? `<b>Phone:</b> ${esc(lead.phone)}<br/>` : ""}
      ${lead.projectType ? `<b>Project type:</b> ${esc(lead.projectType)}<br/>` : ""}
      ${lead.budget ? `<b>Budget:</b> ${esc(lead.budget)}<br/>` : ""}</p>
      <p><b>Message:</b><br/>${esc(lead.message).replace(/\n/g, "<br/>")}</p>
    `,
    replyTo: lead.email,
  });
}

// ---------- Gmail: auto-reply to lead ----------
async function sendAutoReply(lead: Contact) {
  await sendGmail({
    to: lead.email,
    subject: "Thanks — I got your message",
    html: `
      <p>Hi ${esc(lead.name.split(" ")[0] || lead.name)},</p>
      <p>Thanks for reaching out. I received your inquiry and I'll get back to you within one business day with next steps and a calendar link for a free Discovery Call.</p>
      <p>In the meantime, feel free to reply to this email with anything else you'd like me to know.</p>
      <p>— Christopher Mendez<br/>AI Automation Consultant</p>
    `,
  });
}

async function sendGmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gmailKey = process.env.GOOGLE_MAIL_API_KEY;
  if (!lovableKey || !gmailKey) return;

  const headers = [
    `To: ${to}`,
    `Subject: ${subject}`,
    replyTo ? `Reply-To: ${replyTo}` : "",
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset="UTF-8"`,
  ].filter(Boolean);
  const rfc2822 = headers.join("\r\n") + "\r\n\r\n" + html;
  const raw = base64url(rfc2822);

  const res = await fetch(
    "https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    },
  );
  if (!res.ok) throw new Error(`Gmail ${res.status}: ${await res.text()}`);
}

function base64url(s: string) {
  return Buffer.from(s, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
