import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, Eyebrow } from "@/components/site/SiteShell";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio | AI Automation & Workflow Projects" },
      {
        name: "description",
        content:
          "Selected automation work: Make.com & Zapier pipelines, AI agents, lead generation systems, CRM automations, technical support, and design.",
      },
      { property: "og:title", content: "Portfolio — Christopher Mendez" },
      { property: "og:url", content: "https://chris-automation-pro.lovable.app/portfolio" },
      {
        property: "og:description",
        content: "Selected work across AI, workflows, IT, and design.",
      },
    ],
    links: [{ rel: "canonical", href: "https://chris-automation-pro.lovable.app/portfolio" }],
  }),
  component: PortfolioPage,
});

const CATEGORIES = [
  "All",
  "AI Automation",
  "Workflow Design",
  "Technical Support",
  "Community Management",
  "Graphic Design",
] as const;

const ITEMS = [
  { cat: "AI Automation", title: "Multi-channel Lead Scorer", desc: "Real-time scoring across web forms, LinkedIn, and Apollo.", stack: "Make · Claude · Salesforce" },
  { cat: "AI Automation", title: "Document Extraction Agent", desc: "PDF invoices → structured JSON in QuickBooks.", stack: "OpenAI · QuickBooks API" },
  { cat: "AI Automation", title: "Smart Inbox Triage", desc: "Auto-categorizes and routes 400+ daily emails.", stack: "Gmail · Zapier · GPT-4o" },
  { cat: "Workflow Design", title: "Sales Pipeline OS", desc: "10-stage pipeline with automated handoffs.", stack: "GoHighLevel · Slack" },
  { cat: "Workflow Design", title: "Client Onboarding Engine", desc: "Zero-touch onboarding from signup to kickoff call.", stack: "ClickUp · Calendly" },
  { cat: "Workflow Design", title: "Reporting Dashboard Sync", desc: "Multi-tool KPIs unified into one Notion board.", stack: "Notion · Make · APIs" },
  { cat: "Technical Support", title: "AD Migration Project", desc: "Migrated 200+ users to a hardened domain.", stack: "Active Directory · GPO" },
  { cat: "Technical Support", title: "Hyper-V Lab Build", desc: "Full virtualized lab for ops training.", stack: "Hyper-V · Windows Server" },
  { cat: "Community Management", title: "Pitch N Hire Community", desc: "Daily ops across Discord and Slack channels.", stack: "Discord · Slack · Notion" },
  { cat: "Graphic Design", title: "Oasis Foundation Visuals", desc: "Brand assets and event collateral.", stack: "Canva · Figma" },
  { cat: "Graphic Design", title: "Editorial Social Series", desc: "Recurring carousel format for thought leadership.", stack: "Canva · CapCut" },
  { cat: "Community Management", title: "Founder Newsletter Loop", desc: "Editorial + automation for weekly comms.", stack: "Mailchimp · Make" },
];

function PortfolioPage() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = active === "All" ? ITEMS : ITEMS.filter((i) => i.cat === active);

  return (
    <>
      <Section className="!py-20 lg:!py-28">
        <Eyebrow>Portfolio</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight lg:text-7xl">
          A decade of work across five disciplines.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Filter by discipline. Each card is a representative project — happy to walk
          through any of them on a call.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                active === c
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border bg-surface/50 p-6 transition-all hover:-translate-y-0.5 hover:bg-surface"
            >
              <div className="aspect-[5/3] overflow-hidden rounded-lg border border-border bg-background grid-bg relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-display text-base font-medium text-muted-foreground">
                    {item.title}
                  </p>
                </div>
                <div className="absolute top-3 left-3 rounded-full bg-background/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-brand backdrop-blur">
                  {item.cat}
                </div>
              </div>
              <div className="mt-5">
                <h3 className="font-display text-lg font-medium">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
                  {item.stack}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
