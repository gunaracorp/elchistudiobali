"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Cursor — trailing watercolour ring for fine pointers.
 * Native cursor is preserved (never hidden) so text fields,
 * links and screen magnifiers keep behaving normally (lens D6).
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const move = (e: MouseEvent) => {
      setEnabled(true);
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setActive(!!t?.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-rose"
        animate={{
          width: active ? 52 : 26,
          height: active ? 52 : 26,
          opacity: active ? 0.9 : 0.55,
          backgroundColor: active ? "rgba(231,90,135,0.12)" : "rgba(231,90,135,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </motion.div>
  );
}
