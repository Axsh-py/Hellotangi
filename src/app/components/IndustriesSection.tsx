import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export function IndustriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  return (
    <section id="industries" className="relative bg-[#d4c4ad] py-24 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20 relative"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-[1px] bg-white/60 mx-auto mb-12"
          />

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-10 leading-tight max-w-4xl mx-auto">
            A Symphony Within
          </h2>

          <p className="text-lg md:text-xl text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
            The ascent of HELLO TANGI continues within. Triple height arrival halls rise with sculptural authority setting a first impression that is both grand and unmistakable. Lounges and upper-level terraces extend the journey, drawing the city upward into the tower.
          </p>
        </motion.div>

        {/* Image Grid */}
        <div className="grid lg:grid-cols-3 gap-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[40vh] lg:h-[50vh] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80"
              alt="Interior Design 1"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-[40vh] lg:h-[50vh] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80"
              alt="Interior Design 2"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative h-[40vh] lg:h-[50vh] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80"
              alt="Interior Design 3"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}