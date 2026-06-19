import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, Eyebrow, CALENDLY_URL } from "@/components/site/SiteShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Let's Build Something Smarter · Christopher Mendez" },
      {
        name: "description",
        content:
          "Book a Discovery Call or send an inquiry. Christopher Mendez — AI Automation Consultant based in Davao City, Philippines.",
      },
      { property: "og:title", content: "Contact — Christopher Mendez" },
      {
        property: "og:description",
        content: "Book a Discovery Call or send an inquiry.",
      },
    ],
  }),
  component: ContactPage,
});

const PROJECT_TYPES = [
  "AI Automation",
  "Workflow Design",
  "Lead Generation",
  "Technical Support",
  "Virtual Assistance",
  "Other",
];
const BUDGETS = ["Under $2k", "$2k – $5k", "$5k – $15k", "$15k+", "Not sure yet"];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      phone: String(fd.get("phone") || ""),
      projectType: String(fd.get("projectType") || ""),
      budget: String(fd.get("budget") || ""),
      message: String(fd.get("message") || ""),
    };
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Submission failed");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Section className="!py-20 lg:!py-28">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight lg:text-7xl">
          Let's build something smarter.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Tell me a little about your operation. I'll reply within one business day with a
          calendar link for a free Discovery Call.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-border bg-surface/50 p-8 lg:p-12">
            {sent ? (
              <div className="text-center py-16">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand text-brand-foreground">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <h2 className="mt-6 font-display text-2xl font-medium">Message received.</h2>
                <p className="mt-3 text-muted-foreground">
                  I'll be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Name *">
                    <input required name="name" type="text" className={inputCls} placeholder="Jane Doe" />
                  </Field>
                  <Field label="Company">
                    <input name="company" type="text" className={inputCls} placeholder="Acme Inc." />
                  </Field>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Email *">
                    <input required name="email" type="email" className={inputCls} placeholder="jane@acme.com" />
                  </Field>
                  <Field label="Phone">
                    <input name="phone" type="tel" className={inputCls} placeholder="+1 555 000 0000" />
                  </Field>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Project Type">
                    <select name="projectType" className={inputCls} defaultValue="">
                      <option value="" disabled>Pick one…</option>
                      {PROJECT_TYPES.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </Field>
                  <Field label="Budget Range">
                    <select name="budget" className={inputCls} defaultValue="">
                      <option value="" disabled>Pick one…</option>
                      {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="What are you trying to automate? *">
                  <textarea
                    required
                    name="message"
                    rows={5}
                    minLength={5}
                    className={inputCls + " resize-none"}
                    placeholder="Tell me about the process that's eating your time…"
                  />
                </Field>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground ring-2 ring-brand ring-offset-2 ring-offset-background transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
                >
                  {submitting ? "Sending…" : "Let's Build Something Smarter →"}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface/50 p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                Discovery Call
              </p>
              <h3 className="mt-3 font-display text-2xl font-medium">Book directly</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                30 minutes. No pitch. We map your highest-leverage automation together.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener"
                className="mt-5 inline-flex h-11 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-brand-foreground"
              >
                Open Calendly →
              </a>

            </div>
            <div className="rounded-2xl border border-border bg-surface/50 p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                Connect
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">LinkedIn</span>
                  <a href="https://linkedin.com" target="_blank" rel="noopener" className="text-foreground hover:text-brand">@christophermendez →</a>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Upwork</span>
                  <a href="https://upwork.com" target="_blank" rel="noopener" className="text-foreground hover:text-brand">View profile →</a>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">OnlineJobs</span>
                  <a href="https://onlinejobs.ph" target="_blank" rel="noopener" className="text-foreground hover:text-brand">PH profile →</a>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-brand-soft p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                Lead Magnet
              </p>
              <h3 className="mt-3 font-display text-xl font-medium">
                The 12-Point Automation Audit
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Free PDF. The exact framework I use to find the first automation worth
                building in your business.
              </p>
              <button className="mt-4 inline-flex h-10 items-center rounded-lg border border-border bg-background px-4 text-sm font-semibold">
                Download →
              </button>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="bg-surface/30 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight">
            Frequently asked
          </h2>
          <div className="mt-10 divide-y divide-border">
            {[
              ["How long does a typical project take?", "Most Starter engagements ship in 1–2 weeks. Professional engagements run 3–6 weeks. Enterprise audits are scoped per engagement."],
              ["Do you work with companies outside the Philippines?", "Yes — most of my work is with US, EU, and AU clients. I run async by default with synchronous calls in your business hours."],
              ["What if I don't know what to automate yet?", "That's literally the point of the Discovery Call. Bring the problem; I'll find the automation."],
              ["Do you offer ongoing support?", "Yes — every engagement includes a support window, and I offer monthly retainers for teams that want continuous optimization."],
            ].map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                  <span>{q}</span>
                  <span className="ml-4 text-brand transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/20 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
