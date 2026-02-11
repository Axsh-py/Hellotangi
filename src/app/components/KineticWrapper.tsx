import { useEffect, useRef, useState, ReactNode, cloneElement, isValidElement } from "react";
import { useScroll } from "motion/react";

type Letter = {
  char: string;
  scatterX: number;
  scatterY: number;
  scatterRotate: number;
  scatterScale: number;
  nodeIndex: number;
  charIndex: number;
};

// Seeded random function
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Recursively extract all text nodes from children
function extractTextNodes(children: ReactNode): string[] {
  const texts: string[] = [];

  const traverse = (node: ReactNode) => {
    if (typeof node === "string") {
      texts.push(node);
    } else if (typeof node === "number") {
      texts.push(String(node));
    } else if (isValidElement(node)) {
      if (node.props.children) {
        traverse(node.props.children);
      }
    } else if (Array.isArray(node)) {
      node.forEach(traverse);
    }
  };

  traverse(children);
  return texts;
}

// Recursively wrap text nodes with kinetic spans
function wrapTextNodesWithKinetic(
  children: ReactNode,
  letters: Letter[],
  progress: number,
  nodeIndexRef: { current: number },
  charIndexRef: { current: number }
): ReactNode {
  const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
  const p = easeOutCubic(progress);

  const wrapText = (text: string): ReactNode => {
    const chars: ReactNode[] = [];
    for (let i = 0; i < text.length; i++) {
      const letter = letters.find(
        (l) => l.nodeIndex === nodeIndexRef.current && l.charIndex === charIndexRef.current
      );
      charIndexRef.current++;

      if (!letter) {
        chars.push(text[i]);
        continue;
      }

      const currentX = letter.scatterX * (1 - p);
      const currentY = letter.scatterY * (1 - p);
      const currentRotate = letter.scatterRotate * (1 - p);
      const currentScale = letter.scatterScale + (1 - letter.scatterScale) * p;
      const currentOpacity = 0.15 + 0.85 * p;

      chars.push(
        <span
          key={`${nodeIndexRef.current}-${i}`}
          className="inline-block"
          style={{
            transform: `translate(${currentX}px, ${currentY}px) rotate(${currentRotate}deg) scale(${currentScale})`,
            opacity: currentOpacity,
            whiteSpace: letter.char === " " ? "pre" : "normal",
            transition: "none",
            willChange: "transform, opacity",
          }}
        >
          {letter.char === " " ? "\u00A0" : letter.char}
        </span>
      );
    }
    nodeIndexRef.current++;
    charIndexRef.current = 0;
    return <>{chars}</>;
  };

  const traverse = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      return wrapText(node);
    } else if (typeof node === "number") {
      return wrapText(String(node));
    } else if (isValidElement(node)) {
      return cloneElement(node, {
        ...node.props,
        children: traverse(node.props.children),
      } as any);
    } else if (Array.isArray(node)) {
      return node.map((child, i) => <span key={i}>{traverse(child)}</span>);
    }
    return node;
  };

  return traverse(children);
}

export function KineticWrapper({
  children,
  seed = 42,
  scatterDistance = 400,
  scrollHeight = 2500,
}: {
  children: ReactNode;
  seed?: number;
  scatterDistance?: number;
  scrollHeight?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  
  const [letters] = useState<Letter[]>(() => {
    const textNodes = extractTextNodes(children);
    const rand = mulberry32(seed);
    const allLetters: Letter[] = [];

    textNodes.forEach((text, nodeIndex) => {
      for (let charIndex = 0; charIndex < text.length; charIndex++) {
        allLetters.push({
          char: text[charIndex],
          scatterX: (rand() - 0.5) * scatterDistance * 2,
          scatterY: (rand() - 0.5) * scatterDistance * 2,
          scatterRotate: (rand() - 0.5) * 720,
          scatterScale: 0.3 + rand() * 0.5,
          nodeIndex,
          charIndex,
        });
      }
    });

    return allLetters;
  });

  // Use target-based scroll for proper kinetic animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subscribe to scroll progress changes in useEffect
  useEffect(() => {
    // Ensure container has proper positioning for useScroll
    if (containerRef.current) {
      // Force position relative from the start
      containerRef.current.style.position = 'relative';
    }

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setProgress(latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const nodeIndexRef = { current: 0 };
  const charIndexRef = { current: 0 };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${scrollHeight}px`, position: 'relative' }}
    >
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden bg-[#faf8f5] relative">
        {/* Subtle premium background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdfcfa] via-[#faf8f5] to-[#f5f1ed] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(199,186,165,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(180,165,145,0.06)_0%,transparent_50%)]" />
        
        {/* Animated Marketing Elements - Premium & Visible */}
        <div className="absolute inset-0 overflow-hidden opacity-60">
          {/* Animated Growth Line Chart with Pulsing Points */}
          <svg className="absolute top-[12%] left-[8%] w-56 h-40 animate-[float_25s_ease-in-out_infinite]" viewBox="0 0 200 100" fill="none">
            <path 
              d="M10 80 Q40 70, 60 55 T110 40 T160 25 L190 20" 
              stroke="url(#gradient1)" 
              strokeWidth="3" 
              strokeLinecap="round" 
              fill="none"
              className="animate-[drawLine_3s_ease-in-out_infinite]"
            />
            <circle cx="60" cy="55" r="5" fill="#c7baa5" className="animate-[pulse_2s_ease-in-out_infinite]" opacity="0.8"/>
            <circle cx="110" cy="40" r="5" fill="#b5a394" className="animate-[pulse_2s_ease-in-out_infinite_0.5s]" opacity="0.8"/>
            <circle cx="160" cy="25" r="5" fill="#a89080" className="animate-[pulse_2s_ease-in-out_infinite_1s]" opacity="0.8"/>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c7baa5" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#a89080" stopOpacity="0.9"/>
              </linearGradient>
            </defs>
          </svg>
          
          {/* Rotating Target with Rings */}
          <div className="absolute top-[55%] right-[12%] w-36 h-36 animate-[float_20s_ease-in-out_infinite_2s]">
            <div className="w-full h-full rounded-full border-[3px] border-[#c7baa5]/50 relative animate-[spin_40s_linear_infinite]">
              <div className="absolute inset-4 rounded-full border-2 border-[#b5a394]/50 animate-[spin_30s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full border-[3px] border-[#a89080]/60" />
              <div className="absolute inset-12 rounded-full bg-[#a89080]/40 animate-[pulse_3s_ease-in-out_infinite]" />
            </div>
          </div>
          
          {/* Animated ROI Arrow with Trail */}
          <div className="absolute bottom-[18%] left-[68%] animate-[float_22s_ease-in-out_infinite_4s]">
            <svg className="w-40 h-40" viewBox="0 0 120 120" fill="none">
              <path 
                d="M20 100 L30 80 L45 85 L60 60 L75 65 L95 30" 
                stroke="#b5a394" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeDasharray="4 4"
                opacity="0.6"
                className="animate-[drawLine_4s_ease-in-out_infinite]"
              />
              <path d="M95 30 L95 42 M95 30 L83 30" stroke="#b5a394" strokeWidth="3.5" strokeLinecap="round" opacity="0.7"/>
              <circle cx="95" cy="30" r="5" fill="#a89080" opacity="0.8" className="animate-[pulse_2s_ease-in-out_infinite]"/>
            </svg>
          </div>
          
          {/* Animated Bar Chart with Growing Bars */}
          <div className="absolute top-[32%] right-[22%] flex items-end gap-3 animate-[float_24s_ease-in-out_infinite_6s]">
            <div className="w-5 h-12 bg-[#c7baa5]/50 rounded-t animate-[growBar_3s_ease-in-out_infinite]" />
            <div className="w-5 h-20 bg-[#b5a394]/55 rounded-t animate-[growBar_3s_ease-in-out_infinite_0.3s]" />
            <div className="w-5 h-28 bg-[#a89080]/60 rounded-t animate-[growBar_3s_ease-in-out_infinite_0.6s]" />
            <div className="w-5 h-16 bg-[#c7baa5]/50 rounded-t animate-[growBar_3s_ease-in-out_infinite_0.9s]" />
            <div className="w-5 h-24 bg-[#b5a394]/55 rounded-t animate-[growBar_3s_ease-in-out_infinite_1.2s]" />
          </div>
          
          {/* Megaphone with Sound Waves */}
          <div className="absolute bottom-[35%] left-[15%] animate-[float_21s_ease-in-out_infinite_8s]">
            <svg className="w-36 h-36" viewBox="0 0 120 120" fill="none">
              <path d="M30 45 L45 38 L70 38 L70 82 L45 82 L30 75 Z" stroke="#b5a394" strokeWidth="3" fill="rgba(181, 163, 148, 0.15)" opacity="0.6"/>
              <circle cx="70" cy="60" r="25" stroke="#c7baa5" strokeWidth="2" opacity="0.4" className="animate-[ping_3s_ease-in-out_infinite]"/>
              <circle cx="70" cy="60" r="30" stroke="#b5a394" strokeWidth="1.5" opacity="0.3" className="animate-[ping_3s_ease-in-out_infinite_0.5s]"/>
              <circle cx="70" cy="60" r="35" stroke="#a89080" strokeWidth="1" opacity="0.2" className="animate-[ping_3s_ease-in-out_infinite_1s]"/>
            </svg>
          </div>
          
          {/* Network Connection with Animated Lines */}
          <div className="absolute top-[22%] left-[42%] animate-[float_23s_ease-in-out_infinite_10s]">
            <div className="relative w-32 h-32">
              <div className="absolute top-0 left-0 w-5 h-5 rounded-full bg-[#c7baa5]/70 animate-[pulse_2.5s_ease-in-out_infinite]" />
              <div className="absolute top-0 right-0 w-5 h-5 rounded-full bg-[#b5a394]/70 animate-[pulse_2.5s_ease-in-out_infinite_0.5s]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#a89080]/70 animate-[pulse_2.5s_ease-in-out_infinite_1s]" />
              <div className="absolute bottom-0 left-0 w-5 h-5 rounded-full bg-[#c7baa5]/70 animate-[pulse_2.5s_ease-in-out_infinite_1.5s]" />
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#b5a394]/70 animate-[pulse_2.5s_ease-in-out_infinite_2s]" />
              <svg className="absolute inset-0" viewBox="0 0 96 96">
                <line x1="8" y1="8" x2="88" y2="8" stroke="#b5a394" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 3" className="animate-[drawLine_4s_ease-in-out_infinite]"/>
                <line x1="8" y1="8" x2="48" y2="88" stroke="#b5a394" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 3" className="animate-[drawLine_4s_ease-in-out_infinite_0.5s]"/>
                <line x1="88" y1="8" x2="48" y2="88" stroke="#b5a394" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 3" className="animate-[drawLine_4s_ease-in-out_infinite_1s]"/>
                <line x1="8" y1="88" x2="48" y2="88" stroke="#b5a394" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 3" className="animate-[drawLine_4s_ease-in-out_infinite_1.5s]"/>
                <line x1="48" y1="88" x2="88" y2="88" stroke="#b5a394" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 3" className="animate-[drawLine_4s_ease-in-out_infinite_2s]"/>
              </svg>
            </div>
          </div>
          
          {/* Animated Percentage with Circle */}
          <div className="absolute bottom-[62%] right-[38%] animate-[float_19s_ease-in-out_infinite_12s]">
            <div className="relative w-28 h-28">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" stroke="#c7baa5" strokeWidth="3" fill="none" opacity="0.3"/>
                <circle 
                  cx="40" 
                  cy="40" 
                  r="35" 
                  stroke="#a89080" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeDasharray="220"
                  strokeDashoffset="55"
                  opacity="0.7"
                  className="animate-[drawCircle_3s_ease-in-out_infinite]"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-5xl font-light text-[#b5a394]/50">
                %
              </div>
            </div>
          </div>
          
          {/* Pie Chart Segments */}
          <div className="absolute top-[70%] left-[35%] w-32 h-32 animate-[float_26s_ease-in-out_infinite_14s]">
            <svg viewBox="0 0 100 100" className="animate-[spin_50s_linear_infinite]">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#c7baa5" strokeWidth="25" strokeDasharray="75 175" opacity="0.4" className="animate-[pulse_4s_ease-in-out_infinite]"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#b5a394" strokeWidth="25" strokeDasharray="50 200" strokeDashoffset="-75" opacity="0.45" className="animate-[pulse_4s_ease-in-out_infinite_0.5s]"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#a89080" strokeWidth="25" strokeDasharray="100 150" strokeDashoffset="-125" opacity="0.4" className="animate-[pulse_4s_ease-in-out_infinite_1s]"/>
            </svg>
          </div>
          
          {/* SEO Keywords Cloud - Bigger & More Visible */}
          <div className="absolute top-[45%] left-[75%] animate-[float_20s_ease-in-out_infinite_16s]">
            <div className="relative w-40 h-40 opacity-50">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-sm font-light text-[#c7baa5] tracking-[0.3em] animate-[pulse_3s_ease-in-out_infinite]">ROI</div>
              <div className="absolute top-10 left-2 text-xs font-light text-[#b5a394] tracking-[0.3em] animate-[pulse_3s_ease-in-out_infinite_0.5s]">SEO</div>
              <div className="absolute top-10 right-2 text-xs font-light text-[#a89080] tracking-[0.3em] animate-[pulse_3s_ease-in-out_infinite_1s]">CTR</div>
              <div className="absolute bottom-10 left-4 text-sm font-light text-[#c7baa5] tracking-[0.3em] animate-[pulse_3s_ease-in-out_infinite_1.5s]">CPA</div>
              <div className="absolute bottom-10 right-4 text-sm font-light text-[#b5a394] tracking-[0.3em] animate-[pulse_3s_ease-in-out_infinite_2s]">KPI</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-light text-[#a89080] tracking-[0.3em] animate-[pulse_3s_ease-in-out_infinite_2.5s]">ROAS</div>
            </div>
          </div>
          
          {/* Cursor Click Ripple Effect */}
          <div className="absolute top-[8%] right-[45%] w-24 h-24 animate-[float_18s_ease-in-out_infinite_18s]">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full border-[3px] border-[#c7baa5]/50 animate-[ping_2s_ease-in-out_infinite]" />
              <div className="absolute inset-3 rounded-full border-2 border-[#b5a394]/45 animate-[ping_2s_ease-in-out_infinite_0.5s]" />
              <div className="absolute inset-8 w-8 h-8 rounded-full bg-[#a89080]/60" />
            </div>
          </div>

          {/* Additional Dollar Sign - Bottom Left */}
          <div className="absolute bottom-[25%] left-[8%] text-7xl font-light text-[#c7baa5]/40 animate-[float_17s_ease-in-out_infinite_20s]">
            $
          </div>

          {/* Trending Up Symbol */}
          <svg className="absolute top-[40%] right-[8%] w-32 h-32 animate-[float_21s_ease-in-out_infinite_22s]" viewBox="0 0 100 100" fill="none">
            <path d="M10 70 L40 40 L60 50 L90 20" stroke="#b5a394" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
            <path d="M90 20 L90 35 M90 20 L75 20" stroke="#b5a394" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
          </svg>
        </div>
        
        {/* Soft Shadow Overlays */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black/3 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black/3 to-transparent pointer-events-none" />
        
        {/* Content with Shadow */}
        <div className="relative z-10 drop-shadow-2xl">
          {wrapTextNodesWithKinetic(children, letters, progress, nodeIndexRef, charIndexRef)}
        </div>
      </div>
    </div>
  );
}