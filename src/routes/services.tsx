import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow, CTAButtons } from "@/components/site/SiteShell";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AI Automation & Workflow Building" },
      {
        name: "description",
        content:
          "Full-stack automation services: AI Automation, Workflow Builder, Lead Generation Systems, Technical Support, and Virtual Assistant Operations.",
      },
      { property: "og:title", content: "Services — Christopher Mendez" },
      {
        property: "og:description",
        content: "AI Automation, Workflow Building, Lead Generation, IT Support, VA Operations.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [
            { "@type": "Service", name: "AI Automation", provider: { "@type": "Person", name: "Christopher Mendez" } },
            { "@type": "Service", name: "Workflow Builder", provider: { "@type": "Person", name: "Christopher Mendez" } },
            { "@type": "Service", name: "Lead Generation Systems", provider: { "@type": "Person", name: "Christopher Mendez" } },
            { "@type": "Service", name: "Technical Support", provider: { "@type": "Person", name: "Christopher Mendez" } },
            { "@type": "Service", name: "Virtual Assistant Operations", provider: { "@type": "Person", name: "Christopher Mendez" } },
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    name: "AI Automation",
    headline: "Intelligent automations that decide and act.",
    desc: "Build automations powered by Make.com, Zapier, OpenAI, Claude, Gemini, APIs, CRMs, and custom workflows — wherever there's a repetitive decision waiting to be removed.",
    items: ["Lead Qualification", "Email Automation", "AI Chatbots", "Document Processing", "Data Extraction", "CRM Automation"],
  },
  {
    name: "Workflow Builder",
    headline: "Operations that don't depend on memory.",
    desc: "Design efficient workflows that remove manual handoffs and increase team output without increasing headcount.",
    items: ["Client Onboarding", "Sales Pipelines", "Project Management", "Task Routing", "Reporting Systems"],
  },
  {
    name: "Lead Generation Systems",
    headline: "A pipeline that runs while you sleep.",
    desc: "Build repeatable lead-generation engines powered by automation and AI — from prospecting to appointment-setting.",
    items: ["Prospecting", "Data Enrichment", "CRM Updates", "Follow-Up Sequences", "Appointment Setting"],
  },
  {
    name: "Technical Support",
    headline: "Enterprise IT for non-enterprise teams.",
    desc: "Remote IT support and infrastructure management with deep systems-admin experience across Microsoft and virtualization stacks.",
    items: ["Active Directory", "Group Policies", "Windows Server", "Hyper-V", "VMware", "Remote Support", "Intune", "BitLocker", "SCCM"],
  },
  {
    name: "Virtual Assistant Operations",
    headline: "Administrative leverage, AI-enhanced.",
    desc: "Administrative and operational support enhanced by AI — for executives, operators, and lean teams who need their day back.",
    items: ["Inbox Management", "Calendar Management", "Research", "Documentation", "Reporting"],
  },
];

const TIERS = [
  {
    name: "Starter",
    desc: "Single workflow or focused engagement.",
    feats: ["1 production workflow", "Integration with up to 3 tools", "Documentation & handover", "30-day support"],
    cta: "Custom Pricing Available",
  },
  {
    name: "Professional",
    feature: true,
    desc: "Multi-workflow systems for growing teams.",
    feats: ["3–5 production workflows", "Custom AI agents", "CRM + reporting integration", "Async ops support", "60-day support"],
    cta: "Custom Pricing Available",
  },
  {
    name: "Enterprise",
    desc: "End-to-end operations automation engagement.",
    feats: ["Operations audit", "Workflow architecture", "AI agent suite", "Dedicated infrastructure", "Quarterly optimization"],
    cta: "Custom Pricing Available",
  },
];

function ServicesPage() {
  return (
    <>
      <Section className="!py-20 lg:!py-28">
        <Eyebrow>Services</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight lg:text-7xl">
          Five disciplines, one operating philosophy.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Every engagement starts with the same question: <em>where is your team's time
          leaking?</em> Then we plug it.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="space-y-6">
          {SERVICES.map((s, i) => (
            <div
              key={s.name}
              className="grid gap-8 rounded-3xl border border-border bg-surface/40 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
                  {String(i + 1).padStart(2, "0")} — {s.name}
                </p>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight lg:text-4xl">
                  {s.headline}
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start md:grid-cols-3 lg:self-center">
                {s.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-border bg-background px-3 py-2.5 text-xs font-medium text-foreground/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section className="bg-surface/30 border-y border-border">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight lg:text-5xl">
            Engagement tiers built around outcomes.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every engagement is scoped during the Discovery Call. No two operations are
            identical, so neither is the pricing.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl border p-8 ${
                t.feature
                  ? "border-brand/40 bg-brand-soft ring-1 ring-brand/30"
                  : "border-border bg-background"
              }`}
            >
              {t.feature && (
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                  Most Common
                </p>
              )}
              <h3 className="mt-2 font-display text-2xl font-medium">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              <p className="mt-6 font-display text-2xl text-foreground">{t.cta}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {t.feats.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-brand shrink-0" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg text-sm font-semibold ${
                  t.feature
                    ? "bg-brand text-brand-foreground"
                    : "bg-foreground text-background"
                }`}
              >
                Discuss this tier →
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl font-medium tracking-tight">
            Not sure which tier fits?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Let Chris AI ask a few questions and recommend a path.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButtons />
          </div>
        </div>
      </Section>
    </>
  );
}
