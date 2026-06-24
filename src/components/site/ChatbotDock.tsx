import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/chris-ai-logo.png.asset.json";
import { trackChatOpen, trackChatMessage } from "@/lib/analytics";


function Avatar({ size = 36 }: { size?: number }) {
  return (
    <img
      src={logoAsset.url}
      alt="Chris AI"
      style={{ width: size, height: size }}
      className="rounded-full object-cover ring-2 ring-brand/40 bg-surface"
    />
  );
}


const SUGGESTIONS = [
  "What exactly is automation?",
  "When do I actually need automation?",
  "Workflow vs AI agent — what's the difference?",
  "I'd like to book a discovery call",
];

const INTRO_CHUNKS = [
  "Hey 👋 I'm Chris AI — Christopher's digital business assistant.",
  "Quick intro: **Automation** is software doing repetitive tasks for you, automatically. Set it up once, it runs forever — even while you sleep.",
  "You need it when you're losing leads to slow replies, repeating weekly admin work, or can't scale without hiring more people.",
  "Tell me about your business and I'll show you exactly where automation would save you the most time — then we can book a quick Discovery Call.",
];

export function ChatbotDock() {
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  // Auto-open the dock once per session to deliver the automation intro.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("chris-ai-greeted")) return;
    const t = setTimeout(() => {
      setOpen(true);
      trackChatOpen();
      sessionStorage.setItem("chris-ai-greeted", "1");
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status, open]);

  const isLoading = status === "submitted" || status === "streaming";

  const [input, setInput] = useState("");
  const submit = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || isLoading) return;
    trackChatMessage();
    sendMessage({ text: value });
    setInput("");
  };


  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-[min(380px,calc(100vw-2rem))] md:right-6 rise">
          <div className="flex h-[560px] max-h-[80vh] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl glass">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar size={36} />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-brand pulse-dot" />
                </div>

                <div>
                  <p className="text-sm font-semibold">Chris AI</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-brand">
                    Online · Avg. reply 5s
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  {INTRO_CHUNKS.map((chunk, i) => (
                    <div
                      key={i}
                      className="rounded-2xl rounded-tl-sm bg-background p-3.5 text-sm leading-relaxed rise"
                      style={{ animationDelay: `${i * 120}ms` }}
                    >
                      {chunk.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={j} className="text-brand">{part.slice(2, -2)}</strong>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </div>
                  ))}
                  <div className="space-y-2 pt-1">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => submit(s)}
                        className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-left text-xs text-foreground/80 hover:border-brand/40 hover:text-foreground transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <Bubble key={m.id} message={m} />
              ))}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-brand animate-pulse" />
                  Chris AI is thinking…
                </div>
              )}
            </div>

            <div className="border-t border-border bg-background/60 p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="flex items-end gap-2 rounded-xl border border-border bg-background p-1.5 focus-within:border-brand/40"
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
                  placeholder="Ask anything about Christopher…"
                  rows={1}
                  className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="grid size-8 shrink-0 place-items-center rounded-md bg-brand text-brand-foreground disabled:opacity-40"
                  aria-label="Send"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </button>
              </form>
              <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                Powered by Lovable AI ·{" "}
                <Link to="/ai-assistant" className="text-brand hover:underline">
                  Open full chat
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 z-50 md:right-6 flex items-center gap-3 rounded-full bg-surface-elevated p-1.5 pr-5 ring-1 ring-border shadow-2xl backdrop-blur-xl transition-all hover:ring-brand/50"
      >
        <Avatar size={36} />

        <div className="text-left">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-brand">
            Online
          </p>
          <p className="text-xs font-medium">
            {open ? "Close Chris AI" : "Talk to Chris AI"}
          </p>
        </div>
      </button>
    </>
  );
}

function Bubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const text = message.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("");
  if (!text) return null;

  // Split assistant replies into separate chat bubbles per paragraph.
  const chunks = isUser
    ? [text]
    : text
        .split(/\n{2,}/)
        .map((c) => c.trim())
        .filter(Boolean);

  return (
    <div className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
      {chunks.map((chunk, i) => (
        <div
          key={i}
          className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "rounded-br-sm bg-brand text-brand-foreground font-medium"
              : "rounded-bl-sm bg-background text-foreground"
          }`}
        >
          {chunk}
        </div>
      ))}
    </div>
  );
}

