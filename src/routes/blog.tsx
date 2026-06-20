import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/site/SiteShell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — AI Automation & Workflow Design · C. Mendez" },
      {
        name: "description",
        content:
          "Writing on AI automation, workflow design, business operations, lead generation, productivity, and technology.",
      },
      { property: "og:title", content: "Blog — Christopher Mendez" },
      {
        property: "og:description",
        content: "Writing on AI automation, workflows, and operations.",
      },
    ],
  }),
  component: BlogPage,
});

const POSTS = [
  {
    cat: "AI Automation",
    title: "The Real Cost of Repetitive Work (And How to Audit It)",
    excerpt:
      "Most teams underestimate manual work by 4–6x. Here's the audit framework I run on day one of every engagement.",
    date: "Jun 18, 2026",
    read: "7 min read",
  },
  {
    cat: "Workflow Design",
    title: "Why Most Onboarding Flows Break After Step 3",
    excerpt:
      "Onboarding doesn't fail because steps are missing — it fails because no one owns the handoffs. A pattern for fixing it.",
    date: "Jun 10, 2026",
    read: "6 min read",
  },
  {
    cat: "Lead Generation",
    title: "Pipeline Architecture: Building a Lead Engine That Runs at Night",
    excerpt:
      "How to wire Apollo, Claude, and your CRM so qualified leads are sitting in Slack before your second coffee.",
    date: "May 28, 2026",
    read: "9 min read",
  },
  {
    cat: "Business Operations",
    title: "What I Learned About Operations from IT Helpdesk",
    excerpt:
      "Operations is just helpdesk for the business. The ticket structure works in both directions.",
    date: "May 17, 2026",
    read: "5 min read",
  },
  {
    cat: "Productivity",
    title: "AI Isn't a Productivity Tool — It's a Delegation Tool",
    excerpt:
      "Reframing AI from 'faster at things you already do' to 'doing things you shouldn't be doing at all'.",
    date: "May 06, 2026",
    read: "4 min read",
  },
  {
    cat: "Technology",
    title: "Make.com vs Zapier in 2026: When to Pick Which",
    excerpt:
      "A field guide based on real production deployments. Cost, debugging, complexity ceilings.",
    date: "Apr 22, 2026",
    read: "8 min read",
  },
];

function BlogPage() {
  const [hero, ...rest] = POSTS;
  return (
    <>
      <Section className="!py-20 lg:!py-28">
        <Eyebrow>Blog</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight lg:text-7xl">
          Field notes from the automation trenches.
        </h1>
      </Section>

      <Section className="!pt-0">
        <article className="grid gap-8 rounded-3xl border border-border bg-surface/50 p-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:p-14">
          <div className="aspect-[5/4] rounded-2xl border border-border bg-background grid-bg relative overflow-hidden">
            <div className="absolute inset-x-6 bottom-6 rounded-xl bg-surface/80 backdrop-blur p-4 border border-border">
              <p className="font-mono text-[10px] uppercase tracking-wider text-brand">Featured</p>
              <p className="mt-2 text-sm font-medium">{hero.cat}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
              {hero.cat} · {hero.date}
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight lg:text-4xl">
              {hero.title}
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{hero.excerpt}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {hero.read}
            </p>
            <button className="mt-8 inline-flex h-11 w-fit items-center rounded-lg bg-brand px-5 text-sm font-semibold text-brand-foreground">
              Read article →
            </button>
          </div>
        </article>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:bg-surface"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                {p.cat}
              </p>
              <h3 className="mt-4 font-display text-xl font-medium leading-snug">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {p.excerpt}
              </p>
              <div className="mt-auto pt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <span>{p.date}</span>
                <span>{p.read}</span>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
