import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface Text3DAnimationProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  perspective?: number;
  rotationIntensity?: number;
}

export function Text3DAnimation({
  text,
  className = "",
  staggerDelay = 0.03,
  perspective = 1000,
  rotationIntensity = 45,
}: Text3DAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    setLetters(text.split(""));
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        perspective: `${perspective}px`,
        position: 'relative',
      }}
    >
      <div className="flex flex-wrap justify-center relative">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            style={{
              transformStyle: "preserve-3d",
              whiteSpace: letter === " " ? "pre" : "normal",
            }}
            initial={{
              opacity: 0,
              rotateX: rotationIntensity,
              rotateY: -rotationIntensity,
              z: -300,
              scale: 0.3,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    rotateX: 0,
                    rotateY: 0,
                    z: 0,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              duration: 1.2,
              delay: index * staggerDelay,
              ease: [0.22, 1, 0.36, 1], // Cinematic easing
            }}
            whileHover={{
              rotateY: 20,
              rotateX: -15,
              z: 80,
              scale: 1.15,
              transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
}