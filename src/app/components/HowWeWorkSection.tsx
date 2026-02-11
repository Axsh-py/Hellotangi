import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { MagneticButton } from '@/app/components/MagneticButton';

const features = [
  'Strategic brand discovery and market positioning',
  'Data-driven marketing campaigns with measurable ROI',
  'Premium visual identity and brand storytelling',
  'Multi-channel digital presence and content strategy',
  'Customer journey mapping and experience design',
  'Performance analytics and continuous optimization',
];

export function HowWeWorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // Parallax image ref with proper positioning
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Ensure proper positioning for scroll tracking
  useEffect(() => {
    if (imageRef.current) {
      const position = window.getComputedStyle(imageRef.current).position;
      if (position === 'static') {
        imageRef.current.style.position = 'relative';
      }
    }
  }, []);
  
  // Use window scroll instead to avoid positioning warnings
  const { scrollYProgress } = useScroll();
  
  // Transform values for parallax
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.1, 1.2]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="features" className="relative bg-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Split Layout: Images + Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image Collage */}
            <div className="relative h-[600px] lg:h-[700px]">
              {/* Main large image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-0 left-0 w-[70%] h-[60%] overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1709281847802-9aef10b6d4bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwc3RyYXRlZ3klMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcwMjYyNTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Digital Marketing Strategy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>

              {/* Secondary image top-right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute top-[10%] right-0 w-[45%] h-[35%] overflow-hidden border-8 border-white shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1634671495197-fb9ec3230ef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbiUyMGNyZWF0aXZlJTIwcHJvY2Vzc3xlbnwxfHx8fDE3NzAzNjU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Brand Design Process"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>

              {/* Third image bottom-right */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute bottom-0 right-[5%] w-[55%] h-[45%] overflow-hidden border-8 border-white shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1758873271902-a63ecd5b5235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjB0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1vZGVybnxlbnwxfHx8fDE3NzAzNjU0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Marketing Team Collaboration"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>

              {/* Decorative accent */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-[45%] left-[65%] w-[1px] h-24 bg-primary origin-top"
              />
            </div>

            {/* Right: Content */}
            <div className="relative">
              {/* Decorative Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-16 h-[1px] bg-primary mb-8 origin-left"
              />

              {/* Section Label */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xs tracking-[0.3em] uppercase text-primary mb-6"
              >
                Our Approach
              </motion.p>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-[1.1]"
              >
                How We Build
                <br />
                <span className="text-primary/80">Exceptional Brands</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-foreground/70 font-light leading-relaxed mb-12 max-w-xl"
              >
                We combine strategic thinking with creative excellence to deliver
                marketing solutions that don't just look beautiful—they drive
                real business results.
              </motion.p>

              {/* Features List */}
              <motion.ul
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="space-y-5 mb-12"
              >
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2.5 group-hover:scale-150 transition-transform duration-300" />
                    <span className="text-base md:text-lg text-foreground/80 font-light leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <MagneticButton
                  onClick={scrollToContact}
                  className="inline-block px-12 py-4 bg-primary text-white text-xs tracking-[0.25em] uppercase hover:bg-primary/90 transition-all duration-300"
                >
                  Start Your Project
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Decorative Image - Cinematic Parallax */}
      <div
        ref={imageRef}
        className="mt-24 w-full h-[60vh] md:h-[70vh] lg:h-[80vh] relative overflow-hidden bg-black"
      >
        {/* Parallax + Ken Burns image container */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
            alt="Luxury Interior"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
          />
        </motion.div>
        
        {/* Layered depth - Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10 pointer-events-none" />
        
        {/* Side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10 pointer-events-none" />
        
        {/* Vignette shadow effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.4)] pointer-events-none z-20" />
        
        {/* Optional: Subtle light leak effect */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}