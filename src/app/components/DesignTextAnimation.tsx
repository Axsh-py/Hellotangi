import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const designTerms = [
  "Graphic",
  "Design",
  "Marketing",
  "Ads",
  "Growth",
  "SEO",
  "Content",
  "Branding",
  "UX/UI",
  "Shoot",
  "Ranking",
  "Strategy",
  "Social",
  "Analytics",
  "Creative",
  "Digital",
];

export function DesignTextAnimation() {
  const [currentIndex, setCurrentIndex] = useState(4); // Start with "Growth"

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % designTerms.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
      {/* Main text container */}
      <div className="relative w-full max-w-2xl">
        {/* Background blurred terms */}
        <div className="absolute inset-0 flex flex-col items-start justify-center space-y-4 pl-20">
          {designTerms.map((term, index) => {
            const distance = Math.abs(index - currentIndex);
            const opacity = distance === 0 ? 0 : Math.max(0.15, 0.4 - distance * 0.1);
            const blur = distance === 0 ? 10 : Math.min(8, distance * 2);

            return (
              <motion.div
                key={term}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white select-none"
                animate={{
                  opacity: opacity,
                  filter: `blur(${blur}px)`,
                  y: distance === 0 ? -20 : 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              >
                {term}
              </motion.div>
            );
          })}
        </div>

        {/* Highlighted current term with arrow */}
        <div className="relative flex items-center justify-start pl-20 z-10">
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-6xl md:text-7xl lg:text-8xl font-bold text-white"
              >
                {designTerms[currentIndex]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}