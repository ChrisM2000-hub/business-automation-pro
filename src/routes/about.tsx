import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow, CTAButtons } from "@/components/site/SiteShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Christopher Mendez · AI Automation Consultant" },
      {
        name: "description",
        content:
          "From IT helpdesk to AI workflow architect — Christopher Mendez's journey building automation systems for modern businesses.",
      },
      { property: "og:title", content: "About — Christopher Mendez" },
      {
        property: "og:description",
        content: "From IT helpdesk to AI workflow architect.",
      },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  {
    company: "Oasis Protocol Foundation",
    role: "Graphic Designer",
    period: "Recent",
    desc: "Brand and visual systems for a Web3 privacy foundation — taught me to translate complex technical work into clean, persuasive visuals.",
  },
  {
    company: "Surge Freelancing Marketplace",
    role: "Virtual Executive Assistant — Internship",
    period: "Operations track",
    desc: "Calendar, inbox, research, documentation, and reporting — built the operator instincts that now power every workflow I ship.",
  },
  {
    company: "Pitch N Hire",
    role: "Community Manager",
    period: "Growth phase",
    desc: "Daily community ops across multiple channels. Learned how repetitive tasks compound into burnout — and how AI removes them.",
  },
  {
    company: "Veratex",
    role: "IT Technical Support",
    period: "Foundation",
    desc: "Frontline IT support, Active Directory administration, endpoint troubleshooting. Where I learned that good systems are invisible.",
  },
];

const SKILLS = [
  ["IT Support", "Active Directory", "Windows Server", "Hyper-V"],
  ["VMware", "Linux", "Cloud Platforms", "Intune"],
  ["QuickBooks", "CRM Systems", "Project Management", "Automation"],
];

function AboutPage() {
  return (
    <>
      <Section className="!py-20 lg:!py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div className="rise">
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight lg:text-6xl">
              I make repetitive work disappear.
            </h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed lg:max-w-xl">
            I'm Christopher Mendez — an AI Automation Consultant and Workflow Builder based
            in Davao City, Philippines. I help operators stop drowning in manual tasks and
            start running businesses that scale.
          </p>
        </div>
      </Section>

      {/* Story */}
      <Section className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-3xl font-medium tracking-tight">My story</h2>
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90 lg:max-w-2xl">
            <p>
              I started in <strong className="text-foreground">IT and technical support</strong> —
              the classic help-desk grind. Active Directory, Group Policies, fixing broken
              laptops at 9pm. It taught me that businesses run on systems most people never
              see.
            </p>
            <p>
              From there I moved into <strong className="text-foreground">systems administration</strong>,
              managing Windows Server, virtualization with Hyper-V and VMware, and cloud
              infrastructure. Then I crossed over into{" "}
              <strong className="text-foreground">virtual assistance and operations support</strong>,
              where I watched smart people lose entire days to repetitive work.
            </p>
            <p>
              That's when AI clicked. Not as a gimmick — as a leverage tool. I started
              building automations with Make.com, Zapier, OpenAI and Claude that handled
              the things humans shouldn't be doing. Now I help businesses{" "}
              <strong className="text-foreground">automate repetitive tasks and scale operations</strong>{" "}
              with workflows that actually survive in production.
            </p>
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section className="bg-surface/30 border-y border-border">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-medium tracking-tight">
            Skills across the stack
          </h2>
          <Link to="/tech-stack" className="text-sm font-semibold text-brand hover:underline">
            See full tech stack →
          </Link>
        </div>
        <div className="grid gap-3">
          {SKILLS.map((row, i) => (
            <div key={i} className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {row.map((s) => (
                <div
                  key={s}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <p className="text-sm font-medium">{s}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <Eyebrow>Experience</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-medium tracking-tight lg:text-5xl">
          A non-linear path on purpose.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every role taught me something the next would need. The result: full-stack
          operational thinking, from the kernel to the customer email.
        </p>

        <div className="mt-14 relative">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
          <div className="space-y-12">
            {TIMELINE.map((t, i) => (
              <div
                key={t.company}
                className={`relative grid gap-6 md:grid-cols-2 md:gap-12 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="absolute left-3 md:left-1/2 top-2 size-3 -translate-x-1/2 rounded-full bg-brand ring-4 ring-background" />
                <div className="pl-10 md:pl-0 md:text-right md:pr-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                    {t.period}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-medium">{t.company}</h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{t.role}</p>
                </div>
                <div className="pl-10 md:pl-10">
                  <p className="text-foreground/80 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface/30 border-t border-border">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl font-medium tracking-tight">
            Let's automate something that matters.
          </h2>
          <div className="mt-8 flex justify-center">
            <CTAButtons />
          </div>
        </div>
      </Section>
    </>
  );
}
