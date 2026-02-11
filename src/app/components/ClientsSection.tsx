import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const clients = [
  { name: 'Amazon', logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&q=80' },
  { name: 'Google', logo: 'https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=200&q=80' },
  { name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&q=80' },
  { name: 'Apple', logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200&q=80' },
  { name: 'Meta', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=80' },
  { name: 'Netflix', logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&q=80' },
  { name: 'Spotify', logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&q=80' },
  { name: 'Tesla', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80' },
];

export function ClientsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative bg-background py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <div className="w-16 h-[1px] bg-primary mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            Trusted By Industry Leaders
          </h2>
          <p className="text-base text-foreground/60 font-light">
            Proud to partner with innovative brands across industries
          </p>
        </motion.div>

        {/* Logo Marquee - First Row */}
        <div className="relative mb-8">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-12 overflow-hidden"
          >
            <motion.div
              animate={{
                x: ['0%', '-100%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
              className="flex gap-12 flex-shrink-0"
            >
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-40 h-24 bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex-shrink-0 grayscale hover:grayscale-0 rounded-2xl shadow-lg"
                >
                  <div className="text-center px-4">
                    <div className="text-lg font-light text-foreground/60 tracking-wide">
                      {client.name}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Logo Marquee - Second Row (Reverse) */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-12 overflow-hidden"
          >
            <motion.div
              animate={{
                x: ['-100%', '0%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
              className="flex gap-12 flex-shrink-0"
            >
              {[...clients.reverse(), ...clients].map((client, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-40 h-24 bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex-shrink-0 grayscale hover:grayscale-0 rounded-2xl shadow-lg"
                >
                  <div className="text-center px-4">
                    <div className="text-lg font-light text-foreground/60 tracking-wide">
                      {client.name}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}