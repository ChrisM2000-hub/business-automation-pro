import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTheme } from "./SiteShell";
import logoAsset from "@/assets/chris-ai-logo.png.asset.json";


const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/tech-stack", label: "Tech Stack" },
  { to: "/ai-assistant", label: "AI Assistant" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src={logoAsset.url}
            alt="Christopher Mendez"
            className="size-9 rounded-full ring-2 ring-brand/40 object-cover"
          />
          <span className="font-display text-base font-medium tracking-tight">
            Christopher Mendez
          </span>
        </Link>


        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {NAV.slice(1, 8).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="hidden md:grid size-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <Link
            to="/contact"
            className="hidden md:inline-flex h-9 items-center gap-2 rounded-full bg-brand pl-2 pr-4 text-sm font-medium text-brand-foreground transition-transform hover:scale-[1.02]"
          >
            <span className="size-5 rounded-full bg-background/20 grid place-items-center">→</span>
            Book Discovery Call
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden grid size-9 place-items-center rounded-md border border-border"
            aria-label="Menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="mx-auto max-w-7xl px-6 py-4 grid gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-surface"
                activeProps={{ className: "text-foreground bg-surface font-medium" }}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
