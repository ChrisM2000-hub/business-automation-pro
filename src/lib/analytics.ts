// Lightweight GA4 wrapper. Safe to call from any client component.
export const GA_MEASUREMENT_ID = "G-2D3SG4LRFF";

type GtagParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(eventName: string, params: GtagParams = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", eventName, params);
  } catch {
    /* no-op */
  }
}

// Pre-named conversion events.
export const trackBookCall = (source: string) =>
  track("book_call", { event_category: "conversion", source });

export const trackChatOpen = () =>
  track("chat_open", { event_category: "engagement" });

export const trackChatMessage = () =>
  track("chat_message_sent", { event_category: "conversion" });

export const trackNewsletterSignup = (email_domain?: string) =>
  track("newsletter_signup", { event_category: "conversion", email_domain });
