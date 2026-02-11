import React, { useEffect, useMemo, useRef } from "react";

type Letter = {
  ch: string;
  x: number;   // 0..1
  y: number;   // 0..1
  s: number;   // scale
  a: number;   // alpha
  d: number;   // drift strength
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function LetterField({
  text = "MAXMILKINHELLOTANGI",
  count = 90,
  seed = 7,
  className = "",
}: {
  text?: string;
  count?: number;
  seed?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const tRef = useRef(0);

  const letters: Letter[] = useMemo(() => {
    const rand = mulberry32(seed);
    const arr: Letter[] = [];
    for (let i = 0; i < count; i++) {
      const ch = text[Math.floor(rand() * text.length)] ?? "•";
      arr.push({
        ch,
        x: rand(),                 // scattered
        y: rand(),
        s: 0.75 + rand() * 0.9,    // sizes
        a: 0.18 + rand() * 0.55,   // opacity
        d: 0.6 + rand() * 1.4,     // drift factor
      });
    }
    return arr;
  }, [text, count, seed]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);  // -1..1
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      mouseRef.current = { x: nx, y: ny };
    };

    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      tRef.current += 0.016;

      const { x: mx, y: my } = mouseRef.current;
      const w = el.clientWidth;
      const h = el.clientHeight;

      // update each child transform
      const children = el.children;
      for (let i = 0; i < children.length; i++) {
        const node = children[i] as HTMLElement;
        const L = letters[i];

        // base position
        const px = L.x * w;
        const py = L.y * h;

        // subtle float/drift
        const driftX = Math.sin(tRef.current * (0.7 + L.d)) * (6 * L.d);
        const driftY = Math.cos(tRef.current * (0.9 + L.d)) * (6 * L.d);

        // mouse parallax (small)
        const parX = mx * (10 * L.d);
        const parY = my * (10 * L.d);

        node.style.transform = `translate3d(${px + driftX + parX}px, ${py + driftY + parY}px, 0) scale(${L.s})`;
        node.style.opacity = String(L.a);
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [letters]);

  return (
    <div
      ref={containerRef}
      className={`letter-field ${className}`}
      aria-hidden="true"
    >
      {letters.map((L, i) => (
        <span key={i} className="lf-letter">
          {L.ch}
        </span>
      ))}
    </div>
  );
}
