"use client";

/**
 * ELCHÍ motion primitives — the shared animation vocabulary.
 * Every animated element on the site flows through here so timing,
 * easing and reduced-motion behaviour stay coherent (Cinematic Motion
 * Direction lens D4 + WCAG 2.2 lens D6).
 */
import { useRef, useState, useEffect, type ReactNode, type ElementRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* ------------------------------ useMounted --------------------------------- */

/**
 * True after the component has mounted on the client.
 * Scroll-linked transforms are gated behind this flag so the server HTML
 * and the first client render always match (no hydration mismatch).
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return mounted;
}

/* ---------------------------------- Reveal --------------------------------- */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "span" | "li" | "figure";
}) {
  const reduce = useReducedMotion();
  const Comp = (motion as any)[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------ Stagger words ------------------------------ */

export function StaggerWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.08,
  animate = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  if (reduce || !animate) return <span className={className}>{text}</span>;
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={cn("inline-block will-change-transform", wordClassName)}
          variants={{
            hidden: { opacity: 0, y: "0.65em", rotate: 4 },
            show: {
              opacity: 1,
              y: 0,
              rotate: 0,
              transition: { duration: 0.7, ease: EASE_OUT },
            },
          }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* --------------------------------- Magnetic -------------------------------- */

export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<ElementRef<"div">>(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------- ParallaxEl -------------------------------- */

export function ParallaxEl({
  children,
  className,
  distance = 80,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={mounted && !reduce ? { y } : undefined}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------ useYProgress ------------------------------- */

export function useSectionY(
  ref: React.RefObject<HTMLElement | null>,
  from: number,
  to: number
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return useTransform(scrollYProgress, [0, 1], [from, to]);
}

/* ----------------------------- ScrollProgress ------------------------------ */

/**
 * ScrollProgress — thin watercolour ribbon at the very top of the
 * viewport, filling left → right as the visitor scrolls.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[95] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #e75a87 0%, #ff8a5e 55%, #ffc24d 100%)",
      }}
    />
  );
}

/* ----------------------------------- Tilt ---------------------------------- */

/**
 * Tilt — gentle 3D pointer tilt for cards (fine pointers only,
 * skipped under reduced motion; touch devices untouched).
 */
export function Tilt({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<ElementRef<"div">>(null);
  const rx = useSpring(0, { stiffness: 240, damping: 22, mass: 0.5 });
  const ry = useSpring(0, { stiffness: 240, damping: 22, mass: 0.5 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * max);
        rx.set(-py * max);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
