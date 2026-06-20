import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow, CTAButtons } from "@/components/site/SiteShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Christopher Mendez — AI Automation Consultant" },
      {
        name: "description",
        content:
          "I build AI-powered workflows that save time, reduce manual work, and scale operations. Make.com, Zapier, OpenAI, Claude — based in Davao City, Philippines.",
      },
      { property: "og:title", content: "Christopher Mendez — AI Automation Consultant" },
      {
        property: "og:description",
        content: "AI-powered workflows that save time, reduce manual work, and scale operations.",
      },
    ],
  }),
  component: HomePage,
});

const CAPABILITIES = [
  { label: "AI Automation", value: "20+", note: "Production workflows" },
  { label: "Workflow Design", value: "120+", note: "Processes optimized" },
  { label: "Lead Generation", value: "10k+", note: "Leads enriched" },
  { label: "Technical Support", value: "8 yrs", note: "Systems experience" },
  { label: "Virtual Assistance", value: "24/7", note: "Operations coverage" },
  { label: "CRM Management", value: "12+", note: "Platforms integrated" },
];

const SERVICES = [
  {
    title: "AI Automation",
    desc: "Build intelligent automations using Make.com, Zapier, OpenAI, Claude, Gemini, APIs, and custom workflows.",
    tags: ["Lead Qualification", "Email Automation", "AI Chatbots", "Document Processing", "Data Extraction"],
  },
  {
    title: "Workflow Builder",
    desc: "Design efficient workflows that remove repetitive manual work and increase team productivity.",
    tags: ["Client Onboarding", "Sales Pipelines", "Project Management", "Task Routing", "Reporting"],
  },
  {
    title: "Lead Generation Systems",
    desc: "Build repeatable lead generation engines powered by automation and AI.",
    tags: ["Prospecting", "Data Enrichment", "CRM Updates", "Follow-Up Sequences", "Appointment Setting"],
  },
  {
    title: "Technical Support",
    desc: "Remote IT support and infrastructure management with deep systems-admin expertise.",
    tags: ["Active Directory", "Group Policies", "Hyper-V", "VMware", "Intune", "SCCM"],
  },
  {
    title: "Virtual Assistant Operations",
    desc: "Administrative and operational support — enhanced with AI for compounding leverage.",
    tags: ["Inbox Management", "Calendar", "Research", "Documentation", "Reporting"],
  },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section className="!py-20 lg:!py-32">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="rise">
            <Eyebrow>Available for Q3 Projects</Eyebrow>
            <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-tight text-balance lg:text-7xl">
              Stop Wasting Hours on{" "}
              <span className="text-gradient-brand">Repetitive Tasks.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg text-muted-foreground text-pretty leading-relaxed">
              I help businesses automate operations, streamline workflows, and eliminate
              bottlenecks using AI, automation tools, and smart systems designed for scale.
            </p>
            <div className="mt-10">
              <CTAButtons />
            </div>
            <div className="mt-10 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Make.com Expert</span>
              <span className="size-1 rounded-full bg-border" />
              <span>OpenAI · Claude · Gemini</span>
              <span className="hidden md:inline size-1 rounded-full bg-border" />
              <span className="hidden md:inline">Davao · Worldwide</span>
            </div>
          </div>

          <WorkflowVisualization />
        </div>
      </Section>

      {/* Capability stats */}
      <Section className="!py-12 border-t border-border bg-surface/30">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-3 lg:grid-cols-6">
          {CAPABILITIES.map((c) => (
            <div key={c.label} className="bg-background p-6">
              <p className="font-display text-3xl font-medium tracking-tight">{c.value}</p>
              <p className="mt-1 text-sm text-foreground">{c.label}</p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {c.note}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr] mb-14">
          <div>
            <Eyebrow>Capabilities</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight lg:text-5xl">
              Core Specialized Services
            </h2>
          </div>
          <p className="text-lg text-muted-foreground lg:max-w-xl lg:self-end">
            Modular systems built for reliability, security, and performance. Focused on
            business outcomes — not just technical implementation.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} accent={i === 0} />
          ))}
        </div>
      </Section>

      {/* Why work with me */}
      <Section className="bg-surface/30 border-y border-border">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <Eyebrow>Why work with me</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight lg:text-5xl">
              A rare blend: deep IT roots and modern AI.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Most automation specialists are software-first. I started in technical
              support and systems administration before becoming an AI builder — so I
              ship workflows that actually survive in production.
            </p>
            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                Read my story <span>→</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              ["IT Support", "Help desk → ops backbone"],
              ["Systems Admin", "AD · GPO · Hyper-V · VMware"],
              ["AI Workflow Dev", "Make · Zapier · GPT · Claude"],
              ["Operations", "Cross-team coordination"],
              ["Lead Generation", "Repeatable pipelines"],
              ["Community Mgmt", "Conversation → conversion"],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-background p-5 transition-colors hover:border-brand/30"
              >
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured Case Studies */}
      <Section>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Selected Work</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight lg:text-5xl">
              Outcomes, not deliverables.
            </h2>
          </div>
          <Link to="/case-studies" className="text-sm font-semibold text-brand hover:underline">
            View all case studies →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { tag: "Demonstration Project", title: "Automated Lead Generation Pipeline", metric: "80%", metricLabel: "Less manual work", color: "brand" },
            { tag: "Demonstration Project", title: "AI Email Response Assistant", metric: "12×", metricLabel: "Faster response time", color: "neutral" },
            { tag: "Demonstration Project", title: "Client Onboarding Workflow", metric: "5×", metricLabel: "Shorter onboarding", color: "neutral" },
          ].map((c) => (
            <Link
              key={c.title}
              to="/case-studies"
              className="group flex flex-col justify-between rounded-2xl border border-border bg-surface/50 p-8 transition-colors hover:bg-surface"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {c.tag}
                </p>
                <h3 className="mt-4 font-display text-xl font-medium leading-snug">
                  {c.title}
                </h3>
              </div>
              <div className="mt-10">
                <p className={`font-display text-5xl font-medium tracking-tight ${c.color === "brand" ? "text-brand" : "text-foreground"}`}>
                  {c.metric}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{c.metricLabel}</p>
                <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-foreground/70 group-hover:text-brand">
                  Read case study →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Testimonial */}
      <Section className="bg-brand-soft border-y border-border">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 grid size-12 place-items-center rounded-full bg-brand text-brand-foreground font-display font-bold ring-4 ring-background">
            MT
          </div>
          <p className="font-display text-2xl font-medium leading-snug text-balance lg:text-3xl">
            "Christopher didn't just automate our emails — he rebuilt the way we think about
            lead management. Response times dropped from hours to seconds overnight."
          </p>
          <div className="mt-8">
            <p className="text-sm font-semibold">Marcus Thorne</p>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Operations Director · Velocity Global
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 lg:p-16">
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <Eyebrow>Let's build</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight lg:text-5xl">
                Ready to remove a process from your day?
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Book a free 30-minute Discovery Call. I'll map the highest-leverage
                automation for your business — no slides, no pitch deck.
              </p>
            </div>
            <CTAButtons />
          </div>
        </div>
      </Section>
    </>
  );
}

function ServiceCard({
  title,
  desc,
  tags,
  accent,
}: {
  title: string;
  desc: string;
  tags: string[];
  accent?: boolean;
}) {
  return (
    <Link
      to="/services"
      className="group relative flex flex-col rounded-2xl border border-border bg-surface/50 p-7 transition-colors hover:bg-surface"
    >
      <div
        className={`mb-6 grid size-10 place-items-center rounded-lg ring-1 ${
          accent ? "bg-brand-soft ring-brand/30" : "bg-surface-elevated ring-border"
        }`}
      >
        <div className={`size-4 rounded-sm ${accent ? "bg-brand" : "bg-foreground/40"}`} />
      </div>
      <h3 className="font-display text-lg font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-full bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
          >
            {t}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="rounded-full bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            +{tags.length - 3} more
          </span>
        )}
      </div>
    </Link>
  );
}

function WorkflowVisualization() {
  const nodes = [
    { label: "Lead Generation", sub: "Forms · LinkedIn · API", active: true },
    { label: "CRM Sync", sub: "Salesforce · GHL" },
    { label: "AI Processing", sub: "Claude 3.5 · GPT-4o", brand: true },
    { label: "Email Automation", sub: "Personalized at scale" },
    { label: "Reporting Dashboard", sub: "Live KPI sync", terminal: true },
  ];
  return (
    <div className="relative rise">
      <div className="absolute -inset-6 bg-brand/10 blur-3xl rounded-full" aria-hidden />
      <div className="relative space-y-3 rounded-2xl border border-border bg-surface/60 p-5 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-brand pulse-dot" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Live workflow · Pipeline 01
            </p>
          </div>
          <div className="flex gap-1">
            <span className="size-2 rounded-full bg-muted-foreground/30" />
            <span className="size-2 rounded-full bg-muted-foreground/30" />
            <span className="size-2 rounded-full bg-brand" />
          </div>
        </div>
        {nodes.map((n, i) => (
          <div key={n.label}>
            <div
              className={`flex items-center justify-between rounded-lg p-3.5 ring-1 ${
                n.brand
                  ? "bg-brand-soft ring-brand/30"
                  : n.terminal
                    ? "bg-background ring-border"
                    : "bg-background ring-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`grid size-7 place-items-center rounded-md font-mono text-[10px] font-bold ${
                    n.brand
                      ? "bg-brand text-brand-foreground"
                      : "bg-surface-elevated text-muted-foreground"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className={`text-xs font-semibold ${n.brand ? "text-brand" : ""}`}>
                    {n.label}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground">{n.sub}</p>
                </div>
              </div>
              {n.active && (
                <div className="font-mono text-[10px] uppercase tracking-wider text-brand">
                  Running
                </div>
              )}
              {n.brand && (
                <div className="flex gap-1">
                  <span className="size-1.5 rounded-full bg-brand pulse-dot" />
                  <span className="size-1.5 rounded-full bg-brand pulse-dot" style={{ animationDelay: "0.3s" }} />
                  <span className="size-1.5 rounded-full bg-brand pulse-dot" style={{ animationDelay: "0.6s" }} />
                </div>
              )}
            </div>
            {i < nodes.length - 1 && (
              <div className="flex justify-center py-1.5">
                <div className="h-5 w-px bg-gradient-to-b from-brand/60 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
