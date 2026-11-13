import { cn } from "@/lib/utils";

/**
 * TornPaper — signature Elchí brand element (torn watercolour paper edge).
 * Pure inline SVG, no image requests, colors via `fill`.
 */
export function TornPaper({
  fill = "#fff8f0",
  flip = false,
  className,
  height = 48,
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
  height?: number;
}) {
  const path =
    "M0 48 L0 27 L34 31 L64 19 L102 29 L146 13 L192 27 L236 17 L278 31 L328 15 L372 25 L420 11 L470 27 L515 19 L560 33 L610 17 L655 27 L700 13 L748 29 L795 19 L840 31 L890 15 L935 27 L985 17 L1030 31 L1080 13 L1125 27 L1170 21 L1215 33 L1260 17 L1305 27 L1350 15 L1395 25 L1440 19 L1440 48 Z";
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={cn("block w-full", flip && "rotate-180", className)}
      style={{ height }}
    >
      <path d={path} fill={fill} />
    </svg>
  );
}

/* Decorative stickers, pure SVG, brand hues */
export function SunSticker({ className }: { className?: string }) {
  const pts = Array.from({ length: 12 }).map((_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return {
      x1: +(50 + Math.cos(a) * 34).toFixed(3),
      y1: +(50 + Math.sin(a) * 34).toFixed(3),
      x2: +(50 + Math.cos(a) * 46).toFixed(3),
      y2: +(50 + Math.sin(a) * 46).toFixed(3),
    };
  });
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <circle cx="50" cy="50" r="26" fill="#ffc24d" />
      {pts.map((p, i) => (
        <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke="#ffc24d" strokeWidth="6" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export function PalmSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" aria-hidden className={className}>
      <path d="M60 138 C58 100 56 70 48 44 L54 40 C64 66 66 100 66 138 Z" fill="#4e9e74" />
      <path d="M52 42 C30 20 12 22 4 34 C26 30 40 36 52 46 Z" fill="#4e9e74" />
      <path d="M52 42 C44 16 26 6 12 10 C32 14 44 26 54 44 Z" fill="#5cb183" />
      <path d="M54 44 C56 18 74 4 92 6 C72 12 62 26 58 46 Z" fill="#4e9e74" />
      <path d="M55 43 C74 26 96 28 108 40 C86 34 70 38 57 47 Z" fill="#5cb183" />
      <circle cx="52" cy="46" r="6" fill="#c96f4a" />
    </svg>
  );
}

export function SparkleSticker({ className, color = "#e75a87" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 60" aria-hidden className={className}>
      <path
        d="M30 2 C33 18 42 27 58 30 C42 33 33 42 30 58 C27 42 18 33 2 30 C18 27 27 18 30 2 Z"
        fill={color}
      />
    </svg>
  );
}

export function SmileSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden className={className}>
      <circle cx="40" cy="40" r="38" fill="#ff8a5e" />
      <circle cx="27" cy="33" r="4.5" fill="#34231c" />
      <circle cx="53" cy="33" r="4.5" fill="#34231c" />
      <path d="M24 48 Q40 62 56 48" fill="none" stroke="#34231c" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function FlowerSticker({ className }: { className?: string }) {
  const petals = Array.from({ length: 5 }).map((_, i) => {
    const a = ((i * 72 - 90) * Math.PI) / 180;
    return {
      cx: +(40 + Math.cos(a) * 17).toFixed(3),
      cy: +(40 + Math.sin(a) * 17).toFixed(3),
      rot: i * 72 - 90,
    };
  });
  return (
    <svg viewBox="0 0 80 80" aria-hidden className={className}>
      {petals.map((p, i) => (
        <ellipse
          key={i}
          cx={p.cx}
          cy={p.cy}
          rx="13"
          ry="16"
          fill="#f9cbd9"
          transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}
        />
      ))}
      <circle cx="40" cy="40" r="10" fill="#ffc24d" />
    </svg>
  );
}
