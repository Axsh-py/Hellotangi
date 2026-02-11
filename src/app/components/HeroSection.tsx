import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect } from "react";
import { MagneticButton } from "@/app/components/MagneticButton";
import { Text3DAnimation } from "@/app/components/Text3DAnimation";
import { BrandAnimation } from "@/app/components/BrandAnimation";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  
  // Use window scroll instead to avoid positioning warnings
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 0.3], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 0.8, 0]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-visible bg-black">
      {/* Parallax Background with curved bottom */}
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 w-full h-[120%]"
      >
        <div 
          className="w-full h-full"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1636645096936-fc8704bc8083?w=1920&q=80"
            alt="Hello Tangi - Digital Marketing Excellence"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/90" />
        </div>
      </motion.div>

      {/* Content Overlay */}
      <motion.div 
        style={{ opacity }} 
        className="absolute inset-0"
      >
        <BrandAnimation />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            opacity: { delay: 1.5, duration: 0.8 },
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/70">
            Scroll Down
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}