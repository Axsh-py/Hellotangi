import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const amenities = [
  'Sky Pool',
  'Signature Sky Restaurant',
  'Executive Fitness Centre',
  'Wellness & Spa Facilities',
  'Hydrotherapy & Treatment Rooms',
  'Outdoor Rejuvenation Terraces',
  'Executive Business Centre',
  'Co-working Facilities',
  'Conference and Events Space',
  'Barista Lounges',
];

export function WhyHelloTangiSection() {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const imageInView = useInView(imageRef, { once: true, margin: '-150px' });

  return (
    <section id="why-us" className="relative bg-[#e8e2da]">
      <div className="grid lg:grid-cols-[40%_60%]">
        {/* Left Content */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center px-8 lg:px-16 py-24 lg:py-32 relative"
        >
          <div className="max-w-md">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-12 h-[1px] bg-primary mb-8 origin-left"
            />

            <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-12 leading-tight">
              Amenities at Altitude
            </h2>

            <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed mb-12">
              Life in HELLO TANGI is shaped not by additions but by orchestrated moments that lift the everyday into something remarkable. Each amenity is conceived as part of the tower's vertical journey, turning necessity into theatre and leisure into spectacle.
            </p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              {amenities.map((amenity, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                  className="text-base text-foreground/60 font-light"
                >
                  {amenity}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, x: 30 }}
          animate={imageInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[60vh] lg:h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80"
            alt="Luxury Amenities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#e8e2da]/20" />
        </motion.div>
      </div>
    </section>
  );
}