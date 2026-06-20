import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow, CTAButtons } from "@/components/site/SiteShell";

export const Route = createFileRoute("/tech-stack")({
  head: () => ({
    meta: [
      { title: "Tech Stack — Christopher Mendez" },
      {
        name: "description",
        content:
          "The full tech stack: AI (OpenAI, Claude, Gemini), Automation (Make, Zapier), CRM, Systems (Windows Server, VMware), Cloud, Productivity, and Design tools.",
      },
      { property: "og:title", content: "Tech Stack — Christopher Mendez" },
      {
        property: "og:description",
        content: "AI, Automation, CRM, Systems, Cloud, Productivity, and Design tools.",
      },
    ],
  }),
  component: TechStackPage,
});

const STACK = [
  {
    cat: "AI",
    tools: ["OpenAI (GPT-4o, GPT-4)", "Anthropic Claude 3.5", "Google Gemini", "Custom Prompting", "Function Calling"],
  },
  {
    cat: "Automation",
    tools: ["Make.com (Expert)", "Zapier", "Webhooks", "REST APIs", "Python Scripting"],
  },
  {
    cat: "CRM",
    tools: ["Salesforce", "GoHighLevel", "Mailchimp", "Flodesk", "HubSpot"],
  },
  {
    cat: "Systems",
    tools: ["Windows Server", "Active Directory", "Hyper-V", "VMware", "Linux", "Intune", "SCCM"],
  },
  {
    cat: "Cloud",
    tools: ["AWS", "Linode", "Google Cloud", "DigitalOcean"],
  },
  {
    cat: "Productivity",
    tools: ["ClickUp", "Asana", "Trello", "Google Workspace", "Microsoft 365", "Notion"],
  },
  {
    cat: "Design",
    tools: ["Canva", "CapCut", "Behance", "Figma (basic)"],
  },
];

function TechStackPage() {
  return (
    <>
      <Section className="!py-20 lg:!py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-end">
          <div>
            <Eyebrow>Tech Stack</Eyebrow>
            <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight lg:text-6xl">
              Vetted tools. <br />
              Production-ready.
            </h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed lg:max-w-xl">
            I only work with industry-standard platforms that guarantee uptime, security,
            and longevity for my clients. Below is the working stack across every
            engagement.
          </p>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="space-y-10">
          {STACK.map((group) => (
            <div
              key={group.cat}
              className="grid gap-6 border-t border-border pt-10 lg:grid-cols-[260px_1fr]"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand">
                  {group.cat}
                </p>
                <h2 className="mt-3 font-display text-2xl font-medium tracking-tight">
                  {group.cat} Tooling
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((t) => (
                  <div
                    key={t}
                    className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground/90 transition-colors hover:border-brand/40 hover:text-foreground"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface/30 border-t border-border">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl font-medium tracking-tight">
            Working with a tool not listed?
          </h2>
          <p className="mt-4 text-muted-foreground">
            If it has an API or a webhook, it can probably be automated. Let's talk.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButtons />
          </div>
        </div>
      </Section>
    </>
  );
}
