import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with OPTIMIZED settings to prevent vibration
    const lenis = new Lenis({
      duration: 1.0, // Faster response = less jitter
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for stability
      touchMultiplier: 1.5,
      infinite: false,
      normalizeWheel: true,
      autoResize: true, // Auto-resize on window changes
      prevent: (node) => node.classList.contains('lenis-prevent'), // Allow preventing on specific elements
    });

    // Add Lenis class to html
    document.documentElement.classList.add("lenis");

    // Request Animation Frame loop with timestamp tracking
    let lastTime = 0;
    function raf(time: number) {
      // Throttle to prevent too frequent updates
      if (time - lastTime >= 16) { // ~60fps cap
        lenis.raf(time);
        lastTime = time;
      }
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return null;
}