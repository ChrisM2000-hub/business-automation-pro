import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { ChatbotDock } from "./ChatbotDock";
import { track, trackBookCall } from "@/lib/analytics";

export function SiteShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  // SPA page_view tracking
  useEffect(() => {
    const unsub = router.subscribe("onResolved", () => {
      const path = window.location.pathname + window.location.search;
      track("page_view", {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
      });
    });
    return () => unsub();
  }, [router]);

  // Global Calendly click delegation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";
      if (href.includes("calendly.com")) {
        trackBookCall(window.location.pathname);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <BackgroundGrid />
      <SiteNav />
      <main className="relative">{children}</main>
      <SiteFooter />
      <ChatbotDock />
    </div>
  );
}


function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 grid-bg radial-fade opacity-50"
    />
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative py-20 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1">
      <span className="size-1.5 rounded-full bg-brand pulse-dot" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand">
        {children}
      </span>
    </div>
  );
}

export const CALENDLY_URL = "https://calendly.com/va-chrismendez/30min?month=2026-06";

export function CTAButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener"
        className="inline-flex h-12 items-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground ring-2 ring-brand ring-offset-2 ring-offset-background transition-transform hover:scale-[1.02]"
      >
        Book a Discovery Call →
      </a>
      <Link
        to="/ai-assistant"
        className="inline-flex h-12 items-center rounded-lg border border-border bg-surface px-6 text-sm font-semibold text-foreground transition-colors hover:bg-surface-elevated"
      >
        Talk to My AI Assistant
      </Link>
    </div>
  );
}


// Theme toggle hook (mounted in nav)
export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "dark"
      | "light"
      | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("light", saved === "light");
      document.documentElement.classList.toggle("dark", saved !== "light");
    }
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.classList.toggle("dark", next !== "light");
    if (typeof window !== "undefined") localStorage.setItem("theme", next);
  };
  return { theme, toggle };
}
