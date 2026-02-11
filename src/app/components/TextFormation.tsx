import React, { useEffect, useMemo, useRef } from "react";
import { useInView } from "motion/react";

type Letter = {
  ch: string;
  finalX: number;   // final position in text
  finalY: number;
  randomX: number;  // scattered start position
  randomY: number;
  randomS: number;  // random scale
  randomA: number;  // random alpha
  index: number;
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function TextFormation({
  text = "HELLO TANGI",
  className = "",
  textClassName = "",
  seed = 42,
}: {
  text?: string;
  className?: string;
  textClassName?: string;
  seed?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hiddenTextRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const animatedRef = useRef(false);

  const letters: Letter[] = useMemo(() => {
    const rand = mulberry32(seed);
    const arr: Letter[] = [];
    
    // Include spaces and all characters
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      arr.push({
        ch,
        finalX: 0,  // Will be calculated from actual DOM
        finalY: 0,
        randomX: rand(),  // 0-1
        randomY: rand(),
        randomS: 0.5 + rand() * 1.5,
        randomA: 0.2 + rand() * 0.6,
        index: i,
      });
    }
    return arr;
  }, [text, seed]);

  useEffect(() => {
    const container = containerRef.current;
    const hiddenText = hiddenTextRef.current;
    if (!container || !hiddenText || animatedRef.current) return;

    // Get actual character positions from hidden text
    const spans = hiddenText.querySelectorAll("span");
    const containerRect = container.getBoundingClientRect();

    spans.forEach((span, i) => {
      const rect = span.getBoundingClientRect();
      const letter = letters[i];
      
      // Calculate position relative to container
      letter.finalX = rect.left - containerRect.left + rect.width / 2;
      letter.finalY = rect.top - containerRect.top + rect.height / 2;
    });

    // Animate on scroll into view
    if (isInView && !animatedRef.current) {
      animatedRef.current = true;
      
      const animatedSpans = container.querySelectorAll(".animated-letter");
      const w = container.clientWidth;
      const h = container.clientHeight;

      animatedSpans.forEach((span, i) => {
        const el = span as HTMLElement;
        const L = letters[i];

        // Start: random scattered position
        const startX = L.randomX * w;
        const startY = L.randomY * h;

        el.style.transform = `translate(${startX}px, ${startY}px) scale(${L.randomS})`;
        el.style.opacity = String(L.randomA);

        // Animate to final position
        setTimeout(() => {
          el.style.transition = `all ${800 + i * 20}ms cubic-bezier(0.22, 1, 0.36, 1)`;
          el.style.transform = `translate(${L.finalX}px, ${L.finalY}px) scale(1)`;
          el.style.opacity = "1";
        }, 50 + i * 15);
      });
    }
  }, [isInView, letters]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Hidden text to measure actual positions */}
      <div
        ref={hiddenTextRef}
        className={`invisible absolute inset-0 relative ${textClassName}`}
        aria-hidden="true"
      >
        {letters.map((L, i) => (
          <span key={i} style={{ whiteSpace: L.ch === " " ? "pre" : "normal" }}>
            {L.ch === " " ? "\u00A0" : L.ch}
          </span>
        ))}
      </div>

      {/* Animated letters */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {letters.map((L, i) => (
          <span
            key={i}
            className="animated-letter absolute left-0 top-0"
            style={{
              willChange: "transform, opacity",
              whiteSpace: "pre",
            }}
          >
            {L.ch === " " ? "\u00A0" : L.ch}
          </span>
        ))}
      </div>

      {/* Final visible text (fades in after animation) */}
      <div
        className={textClassName}
        style={{
          opacity: isInView ? 1 : 0,
          transition: "opacity 800ms ease-in-out 1.2s",
        }}
      >
        {text}
      </div>
    </div>
  );
}