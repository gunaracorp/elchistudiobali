"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, X, Send, Sparkles } from "lucide-react";
import { useSite } from "./locale-provider";

type Msg = { role: "user" | "assistant"; content: string };

/**
 * Concierge — AI Studio Concierge.
 * Answers strictly from official studio information via
 * /api/concierge (z-ai-web-dev-sdk, backend only), replying in the
 * visitor's active site language (ID / EN / KO).
 */
export function Concierge() {
  const [open, setOpen] = useState(false);
  const { locale, d } = useSite();
  const t = d.concierge;

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Reset the conversation (and its greeting) when the language changes.
  useEffect(() => {
    setMsgs([{ role: "assistant", content: t.greeting }]);
  }, [t.greeting]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;
    const next = [...msgs, { role: "user" as const, content: clean }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-8), locale }),
      });
      const data = await res.json();
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content: data.reply || t.failReply,
        },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: t.failCatch },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-[75] flex h-14 w-14 items-center justify-center rounded-full bg-rosedeep text-white shadow-[0_14px_34px_rgba(201,58,108,0.45)] transition-transform hover:scale-105"
        aria-label={open ? t.close : t.open}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 3.8, type: "spring", stiffness: 260, damping: 18 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
              <X className="h-6 w-6" aria-hidden />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <MessageCircleHeart className="h-6 w-6" aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 animate-softpulse rounded-full border-2 border-cream bg-sun" aria-hidden />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-5 z-[75] flex h-[min(560px,70svh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-cream shadow-[0_30px_80px_rgba(52,35,28,0.35)]"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label={t.dialogAria}
          >
            <div className="flex items-center gap-3 bg-ink px-5 py-4 text-cream">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose">
                <Sparkles className="h-4.5 w-4.5" aria-hidden />
              </span>
              <div>
                <p className="font-script text-lg leading-none text-blush">{t.title}</p>
                <p className="mt-1 font-monobrand text-[9px] uppercase tracking-[0.25em] text-cream/60">
                  {t.badge}
                </p>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-rosedeep text-white"
                      : "bg-white text-ink shadow-[0_2px_10px_rgba(52,35,28,0.06)]"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {busy && (
                <div className="flex w-16 items-center justify-center gap-1.5 rounded-2xl bg-white px-4 py-3 shadow-[0_2px_10px_rgba(52,35,28,0.06)]" aria-label={t.typing}>
                  {[0, 1, 2].map((dd) => (
                    <motion.span
                      key={dd}
                      className="h-1.5 w-1.5 rounded-full bg-rose"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: dd * 0.12 }}
                    />
                  ))}
                </div>
              )}
            </div>

            {msgs.length <= 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {t.quick.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-rose/30 bg-blushlight px-3 py-1.5 text-xs font-medium text-rosedeep transition-colors hover:bg-blush"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              className="flex items-center gap-2 border-t border-ink/10 bg-white/60 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.ph}
                aria-label={t.ph}
                className="flex-1 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm focus:border-rosedeep focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rosedeep text-white disabled:opacity-50"
                aria-label={t.sendAria}
              >
                <Send className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
