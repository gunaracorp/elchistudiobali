"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./motion";
import { TornPaper, SparkleSticker } from "./torn";
import { useSite } from "./locale-provider";
import { useGo } from "./use-go";
import { cn } from "@/lib/utils";

/**
 * FAQ — accordion answering with official studio policies only.
 * All questions and answers localized in ID / EN / KO.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const { d, data } = useSite();
  const { go, hrefFor } = useGo();
  const t = d.faq;

  return (
    <section id="faq" aria-label={t.aria} className="relative bg-cream">
      <div className="mx-auto max-w-4xl px-5 pb-28 pt-20 sm:px-8 sm:pt-24">
        <div className="mb-12 text-center">
          <Reveal>
            <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-rose">
              {t.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] text-ink sm:text-5xl">
              {t.h2.a}{" "}
              <span className="font-script text-[1.1em] font-normal text-rosedeep">
                {t.h2.script}
              </span>{" "}
              {t.h2.b}
            </h2>
          </Reveal>
        </div>

        <div className="space-y-3.5">
          {data.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i * 0.05, 0.3)}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors duration-300",
                    isOpen ? "border-rose/40 bg-white shadow-[0_10px_30px_rgba(231,90,135,0.12)]" : "border-ink/10 bg-white/60 hover:border-rose/30"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-lg font-bold text-ink">
                      <span className="mr-3 font-monobrand text-xs font-bold text-rose">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
                        isOpen ? "bg-rose text-white" : "bg-blushlight text-rosedeep"
                      )}
                    >
                      <Plus className="h-4 w-4" aria-hidden />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 pl-[4.4rem] leading-relaxed text-inksoft">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <p className="text-center text-inksoft">
            {t.still}{" "}
            <a
              href={hrefFor("#booking")}
              onClick={(e) => {
                e.preventDefault();
                go("#booking");
              }}
              className="link-sweep font-semibold text-rosedeep"
            >
              {t.stillLink}
            </a>{" "}
            {t.stillTail}
          </p>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute right-8 top-24 hidden w-12 animate-floaty lg:block" aria-hidden style={{ "--float-rot": "10deg" } as React.CSSProperties}>
        <SparkleSticker className="w-full" color="#ffc24d" />
      </div>

      <div aria-hidden>
        <TornPaper fill="#34231c" height={44} />
      </div>
    </section>
  );
}
