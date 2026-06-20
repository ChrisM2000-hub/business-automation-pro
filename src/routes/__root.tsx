import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteShell } from "../components/site/SiteShell";

function NotFoundComponent() {
  return (
    <SiteShell>
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">Error 404</p>
          <h1 className="mt-3 font-display text-5xl font-medium tracking-tight">Route not found</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            That endpoint isn't part of this workflow. Let's get you back online.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex h-11 items-center rounded-lg bg-brand px-5 text-sm font-medium text-brand-foreground transition-transform hover:scale-[1.02]"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AI Automation & Workflow Builder" },
      {
        name: "description",
        content:
          "Christopher Mendez builds AI-powered workflows that save time, reduce manual work, and scale operations. Make.com, Zapier, OpenAI, Claude — based in Davao City, Philippines.",
      },
      { name: "author", content: "Christopher Mendez" },
      {
        name: "keywords",
        content:
          "AI Automation Consultant Philippines, Workflow Builder, Make.com Expert, Business Automation, Lead Generation Automation, AI Operations, Virtual Assistant Philippines",
      },
      { property: "og:title", content: "AI Automation & Workflow Builder" },
      {
        property: "og:description",
        content:
          "AI-powered workflows that save time, reduce manual work, and scale operations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AI Automation & Workflow Builder" },
      { name: "description", content: "This application is a premium, responsive business website for an AI Automation Consultant." },
      { property: "og:description", content: "This application is a premium, responsive business website for an AI Automation Consultant." },
      { name: "twitter:description", content: "This application is a premium, responsive business website for an AI Automation Consultant." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/55b6e725-2230-43f2-938a-0b5acaa74a06/id-preview-0daf5872--55990ca5-a3b4-4b3f-b940-a302c993d927.lovable.app-1781910106246.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/55b6e725-2230-43f2-938a-0b5acaa74a06/id-preview-0daf5872--55990ca5-a3b4-4b3f-b940-a302c993d927.lovable.app-1781910106246.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteShell>
        <Outlet />
      </SiteShell>
    </QueryClientProvider>
  );
}
