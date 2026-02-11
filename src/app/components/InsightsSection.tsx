import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export function InsightsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  return (
    <section id="insights" className="relative bg-background">
      <div className="grid lg:grid-cols-2">
        {/* Left Image */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[50vh] lg:h-screen order-2 lg:order-1"
        >
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
            alt="Architectural Excellence"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/10" />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center px-8 lg:px-16 py-24 lg:py-32 order-1 lg:order-2"
        >
          <div className="max-w-lg">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-12 h-[1px] bg-primary mb-8 origin-left"
            />

            <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-10 leading-tight">
              Sustainability
            </h2>

            <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed">
              HELLO TANGI has been designed from its very conception to target multiple world-class certifications, reflecting its commitment to sustainability, occupant wellbeing, and technological integration.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}