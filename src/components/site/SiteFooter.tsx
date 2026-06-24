import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { trackNewsletterSignup } from "@/lib/analytics";



export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <footer className="relative border-t border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="grid size-7 place-items-center rounded-md bg-brand text-brand-foreground font-display font-bold text-sm">
                cm
              </div>
              <span className="font-display text-base font-medium tracking-tight">
                Christopher Mendez
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI Automation Consultant & Workflow Builder. Helping operators eliminate
              repetitive work and scale what matters.
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="size-1.5 inline-block mr-2 rounded-full bg-brand align-middle pulse-dot" />
              Davao City · Philippines
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
              Services
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/services" className="text-foreground/80 hover:text-foreground">AI Automation</Link></li>
              <li><Link to="/services" className="text-foreground/80 hover:text-foreground">Workflow Builder</Link></li>
              <li><Link to="/services" className="text-foreground/80 hover:text-foreground">Lead Generation</Link></li>
              <li><Link to="/services" className="text-foreground/80 hover:text-foreground">Technical Support</Link></li>
              <li><Link to="/services" className="text-foreground/80 hover:text-foreground">Virtual Assistance</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
              Company
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/about" className="text-foreground/80 hover:text-foreground">About</Link></li>
              <li><Link to="/case-studies" className="text-foreground/80 hover:text-foreground">Case Studies</Link></li>
              <li><Link to="/portfolio" className="text-foreground/80 hover:text-foreground">Portfolio</Link></li>
              <li><Link to="/tech-stack" className="text-foreground/80 hover:text-foreground">Tech Stack</Link></li>
              <li><Link to="/blog" className="text-foreground/80 hover:text-foreground">Blog</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
              Newsletter
            </p>
            <p className="mt-5 text-sm text-muted-foreground">
              One automation idea every other week. No fluff.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-background p-1.5"
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-transparent px-2 py-1.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <button className="rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground">
                Join
              </button>
            </form>
            <div className="mt-6 flex gap-4 text-sm">
              <a href="https://www.linkedin.com/in/mendez-christopher/" target="_blank" rel="noopener" className="text-muted-foreground hover:text-foreground">LinkedIn</a>
              <a href="https://upwork.com" target="_blank" rel="noopener" className="text-muted-foreground hover:text-foreground">Upwork</a>
              <a href="https://onlinejobs.ph" target="_blank" rel="noopener" className="text-muted-foreground hover:text-foreground">OnlineJobs</a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Christopher Mendez. All systems operational.
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            Crafted in Davao City — Built for the world.
          </p>
        </div>
      </div>
    </footer>
  );
}
