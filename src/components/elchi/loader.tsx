"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Loader — premium branded entrance.
 * Watercolour blob grows, script wordmark reveals, curtain lifts.
 * Skipped quickly for reduced-motion users (accessibility lens D6).
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false);
      onDone();
    }, reduce ? 400 : 2100);
    return () => clearTimeout(t);
  }, [reduce, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="relative flex flex-col items-center">
            <motion.svg
              viewBox="0 0 320 200"
              className="absolute -z-0 w-[300px] max-w-[80vw]"
              initial={reduce ? "hide" : "hidden"}
              animate="show"
            >
              <motion.path
                d="M40 120 C30 60 90 22 160 30 C240 38 296 74 284 122 C272 168 190 184 120 172 C64 162 48 150 40 120 Z"
                fill="#f9cbd9"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: "easeInOut" } },
                }}
              />
              <motion.path
                d="M52 116 C44 68 96 38 158 44 C228 52 276 82 266 120 C256 156 184 170 124 160 C74 152 58 142 52 116 Z"
                fill="#fde9ef"
                variants={{
                  hidden: { scale: 0, opacity: 0, transformOrigin: "50% 50%" },
                  show: { scale: 1, opacity: 1, transition: { duration: 0.7, delay: 0.5 } },
                }}
              />
            </motion.svg>

            <motion.span
              className="relative z-10 font-script text-6xl text-rosedeep sm:text-7xl"
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Elchí
            </motion.span>

            <motion.span
              className="relative z-10 mt-3 font-monobrand text-[11px] tracking-[0.55em] text-ink"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              STUDIO BALI
            </motion.span>

            <motion.div
              className="relative z-10 mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-blush"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="h-full bg-rose"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ delay: 1, duration: reduce ? 0.2 : 0.9, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
