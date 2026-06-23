import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow, CTAButtons, CALENDLY_URL } from "@/components/site/SiteShell";

export const Route = createFileRoute("/automation")({
  head: () => ({
    meta: [
      { title: "What Is Business Automation? Workflows vs AI Agents Guide" },
      {
        name: "description",
        content:
          "Business automation explained: what it is, why you need it, and when to use a workflow vs an AI agent. Real ROI examples, use cases, and how to start your first system.",
      },
      { name: "keywords", content: "what is business automation, workflow vs AI agent, automation for small business, AI agents explained, Make.com vs Zapier, business process automation, automation ROI, when to automate" },
      { property: "og:title", content: "What Is Business Automation? Workflows vs AI Agents" },
      { property: "og:url", content: "https://chris-automation-pro.lovable.app/automation" },
      {
        property: "og:description",
        content:
          "Stop drowning in repetitive tasks. Learn how automation and AI agents save hours, capture leads, and grow revenue 24/7.",
      },
    ],
    links: [{ rel: "canonical", href: "https://chris-automation-pro.lovable.app/automation" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is automation in simple terms?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Automation is when software does a repetitive task for you automatically. You set it up once and it runs on its own — like a machine on a production line.",
              },
            },
            {
              "@type": "Question",
              name: "What is the difference between a workflow and an AI agent?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A workflow follows fixed steps every time. An AI agent reads the situation, thinks, and decides the best next step on its own. Workflows are predictable; agents are adaptive.",
              },
            },
            {
              "@type": "Question",
              name: "When does a business need automation?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "When you're losing leads to slow replies, repeating the same admin work weekly, making manual errors, or unable to scale without hiring. Automation pays for itself in hours saved and revenue captured.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: AutomationPage,
});

function AutomationPage() {
  return (
    <>
      {/* HERO */}
      <Section className="!pt-20 !pb-12 lg:!pt-28">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Eyebrow>Automation & AI Agents</Eyebrow>
            <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-tight lg:text-7xl">
              Set it up <span className="text-gradient-brand">once</span>.<br />
              It works <span className="text-gradient-brand">forever</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Automation is software doing the repetitive work for you — replying to leads, updating
              records, sending reminders, qualifying prospects — 24 hours a day, with zero typos
              and zero forgotten follow-ups.
            </p>
            <div className="mt-8">
              <CTAButtons />
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {[
                ["24/7", "Always on"],
                ["0", "Missed leads"],
                ["10×", "Faster reply"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-xl border border-border bg-surface/50 p-4">
                  <p className="font-display text-3xl text-brand">{n}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-surface/60 p-6 shadow-2xl glass">
              <p className="font-mono text-[10px] uppercase tracking-wider text-brand">
                Live Workflow · Lead Capture
              </p>
              <div className="mt-4 space-y-2">
                {[
                  { t: "New lead from Facebook Ad", c: "trigger" },
                  { t: "Saved to CRM (Salesforce)", c: "ok" },
                  { t: "Personalized email sent in 4s", c: "ok" },
                  { t: "Sales rep notified on Slack", c: "ok" },
                  { t: "24h follow-up scheduled", c: "pending" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm"
                  >
                    <span
                      className={`size-2 rounded-full ${
                        s.c === "ok"
                          ? "bg-brand"
                          : s.c === "pending"
                            ? "bg-amber-500 animate-pulse"
                            : "bg-foreground/40"
                      }`}
                    />
                    <span className="flex-1">{s.t}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {s.c === "pending" ? "..." : "✓"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT IS IT */}
      <Section className="!py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Eyebrow>The Basics</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight">
              What is automation, really?
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              <strong className="text-foreground">Automation is a software system doing a task
              for you — automatically — without you touching it every single time.</strong> You set
              it up once. From that moment on, it runs on its own.
            </p>
            <p>
              Think of a machine on a production line. Once installed and configured, it does the
              same job over and over. No one stands there operating it by hand.
            </p>
            <div className="rounded-2xl border border-brand/20 bg-brand-soft p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-brand">
                Key insight
              </p>
              <p className="mt-2 text-foreground">
                Automation is <strong>not</strong> about replacing people. It frees people from
                repetitive, low-value tasks so they can focus on the work that actually matters.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* EXAMPLES STRIP */}
      <Section className="!py-16">
        <Eyebrow>Real Examples</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-medium leading-tight">
          What automation actually looks like
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["📩", "Instant Lead Reply", "Reply to every contact form submission within seconds — even at 3 a.m."],
            ["📂", "Inbox Triage", "Tag and organize incoming emails into folders automatically."],
            ["⏰", "Smart Reminders", "Send appointment & payment reminders before clients forget."],
            ["📊", "Data Sync", "New orders flow into your spreadsheet & CRM without manual entry."],
            ["🔄", "CRM Pipeline", "Contact form → CRM → assigned rep → follow-up sequence."],
            ["🤖", "AI Chat Support", "AI agent answers FAQs, qualifies leads, books calls."],
          ].map(([icon, title, desc]) => (
            <div
              key={title}
              className="group rounded-2xl border border-border bg-surface/50 p-6 transition-all hover:border-brand/40 hover:bg-surface"
            >
              <div className="text-3xl">{icon}</div>
              <h3 className="mt-4 font-display text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHY BUSINESSES NEED IT */}
      <Section className="!py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>The Problem</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight">
              Most businesses are drowning in repetitive tasks
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Hours wasted every week on work that could be done by software. That wasted time costs
              real money — every single day.
            </p>
          </div>
          <div className="space-y-3">
            {[
              ["Wasted admin time", "Copying data, replying to routine messages, updating records by hand."],
              ["Slow lead response", "Hours or days to reply. By then, the lead has already moved on."],
              ["Missed leads", "Inquiries arrive when no one's available. They fall through the cracks."],
              ["Inconsistent follow-ups", "You know you should, but it's easy to forget when things get busy."],
              ["Manual repetition", "Same email, same data entry, same questions answered every week."],
              ["Human errors", "Wrong data, wrong recipient, skipped steps — they all cost money."],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-4 rounded-xl border border-border bg-surface/40 p-4">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-red-500/10 text-red-500">
                  ✕
                </div>
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* COMPARISON: NORMAL VS AUTOMATION */}
      <Section className="!py-16">
        <Eyebrow>Why It's High Value</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-medium leading-tight">
          Normal services vs. automation services
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-surface/40 p-7">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Traditional Services
            </p>
            <h3 className="mt-3 font-display text-2xl">Done once, paid once</h3>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                "Trade time for money",
                "Client sees it as a one-time cost",
                "Value stops when the work stops",
                "Easy to replace or underprice",
                "High competition, low rates",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-red-500">−</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-brand/30 bg-brand-soft p-7 shadow-lg shadow-brand/10">
            <p className="font-mono text-[10px] uppercase tracking-wider text-brand">
              Automation Services
            </p>
            <h3 className="mt-3 font-display text-2xl">Done once, works forever</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Value keeps growing over time",
                "Client sees it as an investment",
                "Value multiplies with each use",
                "Harder to replace, harder to underprice",
                "Less saturation, higher margins",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-brand">+</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ROI */}
      <Section className="!py-16">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-surface to-surface-elevated p-8 lg:p-12">
          <Eyebrow>The ROI Math</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight max-w-3xl">
            Businesses don't pay for hours — they pay for outcomes
          </h2>
          <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">
            A business owner spending <strong className="text-foreground">10 hours/week</strong>{" "}
            manually following up on leads is burning thousands every month. Build them an automation
            that handles it in minutes, and they get those hours back — forever.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Time saved", "How many hours per week does this give back?"],
              ["Leads captured", "Will this stop you from losing potential customers?"],
              ["Revenue gained", "Will this directly help you close more sales?"],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-border bg-background/60 p-5">
                <p className="font-display text-xl font-medium">{t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Check one box and it's worth real money. Check all three and the price is irrelevant —
            the ROI sells itself.
          </p>
        </div>
      </Section>

      {/* WORKFLOW VS AGENT */}
      <Section className="!py-16">
        <Eyebrow>Workflow vs AI Agent</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-medium leading-tight max-w-3xl">
          Two tools. Two jobs. The best systems use both.
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-surface/50 p-7">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-xl">
                🧭
              </span>
              <h3 className="font-display text-2xl">Workflow</h3>
            </div>
            <p className="mt-4 text-sm text-muted-foreground italic">
              Like a recipe. Same steps. Same order. Every time.
            </p>
            <p className="mt-4 text-foreground">
              A fixed path of automated steps. The system doesn't think — it executes. Fast, cheap,
              reliable.
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-brand">
              Best for
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>• The task is the same every time</li>
              <li>• Clear trigger (form submitted, email received)</li>
              <li>• No judgment required</li>
              <li>• You want it fast, reliable, and cheap</li>
            </ul>
            <div className="mt-6 rounded-xl border border-border bg-background/60 p-4 text-xs font-mono">
              New Lead → Add to CRM → Send Email → Notify Owner → Follow up 24h
            </div>
          </div>

          <div className="rounded-3xl border border-brand/30 bg-gradient-to-br from-brand-soft to-surface p-7">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-brand text-xl text-brand-foreground">
                🧠
              </span>
              <h3 className="font-display text-2xl">AI Agent</h3>
            </div>
            <p className="mt-4 text-sm text-muted-foreground italic">
              Like a smart employee. Reads, thinks, decides — and acts.
            </p>
            <p className="mt-4 text-foreground">
              An AI model (GPT, Claude, Gemini) becomes the brain. It reads the situation, reasons
              about the best next step, and executes it. Adaptive, personalized, intelligent.
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-brand">
              Best for
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>• Reading & understanding messages before deciding</li>
              <li>• Personalized responses based on context</li>
              <li>• Situations that vary — no fixed path works</li>
              <li>• Multi-step reasoning (research, summarize, write)</li>
            </ul>
            <div className="mt-6 rounded-xl border border-brand/30 bg-background/60 p-4 text-xs font-mono">
              Customer Msg → AI Reads → AI Decides Reply → AI Sends → Logs
            </div>
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface/40">
          <div className="grid grid-cols-3 border-b border-border bg-surface px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <span>Dimension</span>
            <span>Workflow</span>
            <span className="text-brand">AI Agent</span>
          </div>
          {[
            ["How it works", "Fixed steps, in order", "AI thinks & decides each step"],
            ["Best use case", "Predictable, repetitive", "Judgment & varied responses"],
            ["Difficulty", "Beginner friendly", "Intermediate to advanced"],
            ["Client value", "Medium → High", "High → Very High"],
            ["Speed to deploy", "1–3 days", "Days to weeks"],
            ["Example", "Lead capture + CRM", "AI chat support / content"],
            ["Tools", "Make · Zapier · n8n", "GPT · Claude · Gemini + Make"],
          ].map(([d, w, a], i) => (
            <div
              key={d}
              className={`grid grid-cols-3 px-6 py-3.5 text-sm ${
                i % 2 ? "bg-surface/30" : ""
              }`}
            >
              <span className="font-medium">{d}</span>
              <span className="text-muted-foreground">{w}</span>
              <span className="text-foreground">{a}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CASE STORIES */}
      <Section className="!py-16">
        <Eyebrow>When It's Needed</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-medium leading-tight max-w-3xl">
          Three real businesses, three transformations
        </h2>

        <div className="mt-10 space-y-6">
          {[
            {
              who: "Real Estate Agent",
              problem:
                "Leads come from Facebook ads and the contact form, but the agent is always in showings. By the time they reply, the lead already called a competitor.",
              fix: "New lead → instant CRM entry → personalized email in 4s → agent notified → 24h follow-up if no reply.",
              win: "Zero missed leads. Every lead responded to in seconds.",
            },
            {
              who: "Online Coach",
              problem:
                "Manually sends reminders, prep checklists, and post-call follow-ups for every discovery call. Hours wasted, clients slip through cracks.",
              fix: "Booking → instant confirmation + prep checklist → 24h + 1h reminders → post-call sequence that pitches the paid offer.",
              win: "5–8 hours saved/week. Higher conversion to paid clients.",
            },
            {
              who: "Local Service Business",
              problem:
                "Owner answers Instagram DMs all day — pricing, availability, bookings, reminders. No-shows are constant.",
              fix: "AI agent answers pricing & availability → customer picks slot → auto-confirmation → 24h + 2h reminders → review request after.",
              win: "2–4 hours saved daily. No-shows drop sharply. More clients without hiring.",
            },
          ].map((c) => (
            <div
              key={c.who}
              className="rounded-3xl border border-border bg-surface/50 p-6 lg:p-8"
            >
              <div className="grid gap-6 lg:grid-cols-[180px_1fr]">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-brand">
                    Case
                  </p>
                  <h3 className="mt-2 font-display text-xl font-medium">{c.who}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Before
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{c.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Automation
                    </p>
                    <p className="mt-1.5 text-sm">{c.fix}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-brand">After</p>
                    <p className="mt-1.5 text-sm font-medium">{c.win}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="!py-20">
        <div className="rounded-3xl border border-brand/30 bg-gradient-to-br from-brand-soft via-surface to-surface-elevated p-10 lg:p-16 text-center">
          <Eyebrow>Ready When You Are</Eyebrow>
          <h2 className="mt-5 font-display text-5xl font-medium leading-tight lg:text-6xl">
            Let's build the system that <br className="hidden md:block" />
            runs your business while you sleep.
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
            A 30-minute Discovery Call. We map your repetitive work, identify the highest-ROI
            automation, and give you a clear plan — whether you build with me or not.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center rounded-lg bg-brand px-7 text-sm font-semibold text-brand-foreground ring-2 ring-brand ring-offset-2 ring-offset-background transition-transform hover:scale-[1.02]"
            >
              Book a Discovery Call →
            </a>
            <Link
              to="/ai-assistant"
              className="inline-flex h-12 items-center rounded-lg border border-border bg-surface px-7 text-sm font-semibold transition-colors hover:bg-surface-elevated"
            >
              Ask Chris AI first
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
