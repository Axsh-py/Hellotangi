import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function PageTransition() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1500); // Reduced to 1.5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{ 
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
          className="bg-black flex items-center justify-center"
        >
          {/* Simple elegant loader */}
          <div className="flex flex-col items-center gap-8">
            {/* Brand Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-5xl md:text-6xl text-white font-black tracking-tighter"
            >
              HELLO TANGI
            </motion.h1>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ 
                duration: 1.2,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="w-48 h-0.5 bg-white/30 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}