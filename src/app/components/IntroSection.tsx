import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { TextReveal } from '@/app/components/TextReveal';
import { MagneticButton } from '@/app/components/MagneticButton';

export function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="intro" className="relative bg-[#d4c4ad] py-32 lg:py-48">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center relative"
        >
          {/* Title */}
          <TextReveal className="text-4xl md:text-5xl lg:text-6xl text-white mb-16 leading-tight max-w-4xl mx-auto">
            Shaping Icons of Tomorrow
          </TextReveal>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              Few names unfold with the limitless lightness of the sky, the reach of infinite horizons, and the promise of rise in the very same breath. Its vowels open, lift, coalesce, lifts, and the light stays with you.
            </p>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              Rising 380 metres above the city, HELLO TANGI is a living sculpture of light and movement. Conceived for global visionaries who define the future of business and culture, this next generation icon unifies luxury commercial, hospitality and lifestyle spaces within a single, soaring masterpiece.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <MagneticButton
              onClick={scrollToContact}
              className="inline-block px-12 py-4 bg-white text-foreground text-xs tracking-[0.25em] uppercase hover:bg-white/95 transition-all duration-300"
            >
              Book Your Private Meeting
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}