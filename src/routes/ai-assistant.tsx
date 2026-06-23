import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { Section, Eyebrow } from "@/components/site/SiteShell";
import logoAsset from "@/assets/chris-ai-logo.png.asset.json";


export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "Chris AI | Free AI Automation Assistant & Consultant Chat" },
      {
        name: "description",
        content:
          "Chat with Chris AI — a free AI assistant that explains automation, recommends workflows, and helps you scope your first AI agent or Make.com build.",
      },
      { property: "og:title", content: "Chris AI — Automation Assistant" },
      { property: "og:url", content: "https://chris-automation-pro.lovable.app/ai-assistant" },
      {
        property: "og:description",
        content: "Talk to my digital business assistant about AI automation.",
      },
    ],
    links: [{ rel: "canonical", href: "https://chris-automation-pro.lovable.app/ai-assistant" }],
  }),
  component: AIAssistantPage,
});

const PROMPTS = [
  "What kind of businesses do you typically work with?",
  "Walk me through an example AI automation project",
  "What's your discovery call process?",
  "How do you handle data security and privacy?",
  "Recommend a service for my use case",
  "I'd like to book a discovery call",
];

function AIAssistantPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const [input, setInput] = useState("");
  const submit = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || isLoading) return;
    sendMessage({ text: value });
    setInput("");
  };

  return (
    <>
      <Section className="!py-16 lg:!py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <Eyebrow>AI Assistant</Eyebrow>
            <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight lg:text-6xl">
              Meet <span className="text-gradient-brand">Chris AI</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              My digital business assistant. Trained on my experience, services, and
              methodology. Ask anything — Chris AI will explain, recommend, and even
              schedule a Discovery Call.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                ["Explain expertise", "Cross-discipline background"],
                ["Recommend services", "AI · workflow · ops · IT"],
                ["Provide examples", "Real automation use cases"],
                ["Book consultations", "Direct to calendar"],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-surface/50 p-4"
                >
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div className="flex h-[640px] flex-col overflow-hidden rounded-3xl border border-border bg-surface/60 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={logoAsset.url}
                    alt="Chris AI"
                    className="size-10 rounded-full object-cover ring-2 ring-brand/40"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-brand pulse-dot" />
                </div>

                <div>
                  <p className="font-display text-base font-medium">Chris AI</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-brand">
                    Online · Powered by Lovable AI
                  </p>
                </div>
              </div>
              <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-brand">
                Beta · v1.0
              </span>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-6 space-y-4 bg-background/40"
            >
              {messages.length === 0 && (
                <>
                  <Bubble
                    role="assistant"
                    text="Hey 👋 I'm Chris AI — Christopher's digital business assistant. I can explain his services, recommend the right approach for your business, or help you book a Discovery Call. What would you like to know?"
                  />
                  <div className="grid gap-2 sm:grid-cols-2 pt-2">
                    {PROMPTS.map((p) => (
                      <button
                        key={p}
                        onClick={() => submit(p)}
                        className="rounded-lg border border-border bg-surface/60 px-3.5 py-2.5 text-left text-xs text-foreground/80 hover:border-brand/40 hover:text-foreground transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-brand animate-pulse" />
                  Chris AI is thinking…
                </div>
              )}
            </div>

            <div className="border-t border-border bg-surface p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="flex items-end gap-2 rounded-xl border border-border bg-background p-2 focus-within:border-brand/40"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  placeholder="Ask Chris AI anything about automation, services, or experience…"
                  rows={1}
                  className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand text-brand-foreground disabled:opacity-40"
                  aria-label="Send"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function MessageBubble({ message }: { message: UIMessage }) {
  const text = message.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
  if (!text) return null;
  return <Bubble role={message.role as "user" | "assistant"} text={text} />;
}

function Bubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isUser = role === "user";
  const chunks = isUser
    ? [text]
    : text
        .split(/\n{2,}/)
        .map((c) => c.trim())
        .filter(Boolean);

  return (
    <div className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
      {chunks.map((chunk, i) => (
        <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}>
          {!isUser && i === 0 && (
            <img
              src={logoAsset.url}
              alt=""
              className="size-7 shrink-0 rounded-full object-cover mr-2 mt-0.5 ring-1 ring-brand/30"
            />
          )}
          {!isUser && i > 0 && <span className="size-7 shrink-0 mr-2" aria-hidden />}
          <div
            className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              isUser
                ? "rounded-br-sm bg-brand text-brand-foreground font-medium"
                : "rounded-bl-sm bg-surface text-foreground border border-border"
            }`}
          >
            {chunk}
          </div>
        </div>
      ))}
    </div>
  );
}

