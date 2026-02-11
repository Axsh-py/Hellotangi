import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { TextReveal } from '@/app/components/TextReveal';
import { MagneticButton } from '@/app/components/MagneticButton';
import { DesignTextAnimation } from '@/app/components/DesignTextAnimation';

export function WhatWeDoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="approach" className="relative bg-background">
      <div className="grid lg:grid-cols-2 min-h-screen relative">
        {/* Left Content */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center px-8 lg:px-16 py-24 lg:py-32 relative"
        >
          <div className="max-w-lg">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-12 h-[1px] bg-primary mb-8 origin-left"
            />

            <TextReveal className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-10 leading-tight">
              Strategic Marketing Excellence
            </TextReveal>

            <div className="space-y-6 mb-12">
              <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed">
                Hello Tangi is a full-service digital marketing agency that transforms brands through strategic storytelling, data-driven campaigns, and creative innovation.
              </p>
              <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed">
                We partner with startups, D2C brands, and enterprises to build meaningful connections with their audiences and drive measurable business growth.
              </p>
            </div>

            <MagneticButton
              onClick={scrollToContact}
              className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-all duration-300"
            >
              Enquire Now
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[60vh] lg:h-full"
        >
          <DesignTextAnimation />
          
          {/* Hello Tangi Branding Overlay */}
          <div className="absolute bottom-8 left-8 z-10">
            <h3 className="text-3xl md:text-4xl text-white font-light mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Hello Tangi
            </h3>
            <p className="text-sm md:text-base text-white/80 font-light">
              Strategic Marketing Excellence
            </p>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}