import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow, CTAButtons } from "@/components/site/SiteShell";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies | AI Automation Results & ROI Examples" },
      {
        name: "description",
        content:
          "AI automation case studies: lead generation pipelines, AI email assistants, client onboarding workflows, CRM automation. See methodology, stack, and measurable ROI.",
      },
      { name: "keywords", content: "AI automation case studies, workflow automation results, Make.com case study, Zapier ROI examples, lead generation automation case study, CRM automation results, AI agent case study" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "Case Studies — AI Automation Results" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://business-automation-pro.lovable.app/case-studies" },
      { property: "og:locale", content: "en_US" },
      {
        property: "og:description",
        content: "AI automation projects with measurable operational outcomes.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AI Automation Case Studies" },
      { name: "twitter:description", content: "Real automation projects with measurable ROI." },
    ],
    links: [{ rel: "canonical", href: "https://business-automation-pro.lovable.app/case-studies" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://business-automation-pro.lovable.app/" },
            { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://business-automation-pro.lovable.app/case-studies" },
          ],
        }),
      },
    ],
  }),
  component: CaseStudiesPage,
});

const CASES = [
  {
    tag: "Demonstration Project",
    category: "AI Automation",
    title: "Automated Lead Generation Pipeline",
    problem:
      "A B2B agency was spending 12+ hours per week manually enriching leads and updating their CRM. Response times to hot leads averaged 4 hours.",
    solution:
      "Built a Make.com pipeline ingesting from LinkedIn Sales Navigator, Apollo, and inbound forms. Claude 3.5 enriches and scores each lead, routes hot prospects to a Slack channel with a one-click follow-up sequence, and syncs everything to Salesforce.",
    metrics: [
      { value: "80%", label: "Less manual work" },
      { value: "<2 min", label: "Avg lead response" },
      { value: "100%", label: "CRM sync accuracy" },
    ],
    tools: ["Make.com", "Claude 3.5", "Apollo", "Salesforce", "Slack"],
  },
  {
    tag: "Demonstration Project",
    category: "AI Automation",
    title: "AI Email Response Assistant",
    problem:
      "A founder was personally answering 40+ support emails daily, each with a similar shape but unique details. Response quality and tone drifted by the end of the day.",
    solution:
      "Deployed an OpenAI-powered drafting assistant that reads incoming emails, fetches relevant customer context from the CRM, and writes a draft reply matching the founder's tone — ready for one-click review and send.",
    metrics: [
      { value: "12×", label: "Faster response time" },
      { value: "94%", label: "Drafts sent unedited" },
      { value: "0", label: "Tone drift complaints" },
    ],
    tools: ["OpenAI", "Gmail API", "HubSpot", "Zapier"],
  },
  {
    tag: "Demonstration Project",
    category: "Workflow Design",
    title: "Client Onboarding Workflow",
    problem:
      "A SaaS team took 6 days to onboard new clients — across 4 disconnected tools and 11 manual touch-points. Clients reported confusion before they ever logged in.",
    solution:
      "Designed an end-to-end onboarding workflow with automated welcome sequences, dynamic kickoff doc generation, Calendly-triggered Slack channels, and progress visibility for the client.",
    metrics: [
      { value: "5×", label: "Faster onboarding" },
      { value: "92%", label: "Client CSAT" },
      { value: "11→2", label: "Manual touch-points" },
    ],
    tools: ["ClickUp", "Calendly", "Slack", "Notion", "Zapier"],
  },
];

function CaseStudiesPage() {
  return (
    <>
      <Section className="!py-20 lg:!py-28">
        <Eyebrow>Case Studies</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight lg:text-7xl">
          Operational outcomes,{" "}
          <span className="text-gradient-brand">measured.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          These are demonstration projects illustrating my methodology and the kind of
          outcomes I architect. Real client work is available on request under NDA.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="space-y-16">
          {CASES.map((c, i) => (
            <article
              key={c.title}
              className="grid gap-10 rounded-3xl border border-border bg-surface/40 p-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:p-14"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-brand/30 bg-brand-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-brand">
                    {c.tag}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {c.category} — {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-3xl font-medium leading-tight lg:text-4xl">
                  {c.title}
                </h2>
                <div className="mt-8 space-y-5 text-foreground/80 leading-relaxed">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                      Problem
                    </p>
                    <p>{c.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                      Solution
                    </p>
                    <p>{c.solution}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 self-start">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Results
                </p>
                <div className="space-y-px overflow-hidden rounded-2xl border border-border bg-border">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="bg-background p-6">
                      <p className="font-display text-5xl font-medium tracking-tight text-foreground">
                        {m.value}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-surface/30 border-t border-border">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl font-medium tracking-tight">
            Your operation is the next case study.
          </h2>
          <div className="mt-8 flex justify-center">
            <CTAButtons />
          </div>
        </div>
      </Section>
    </>
  );
}
