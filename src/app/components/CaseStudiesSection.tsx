import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react';
import { MagneticButton } from '@/app/components/MagneticButton';

const caseStudies = [
  {
    title: 'Luxury Fashion Brand',
    category: 'E-Commerce Growth',
    description: 'Transformed a premium fashion brand\'s digital presence with strategic social media campaigns and influencer partnerships.',
    image: 'https://images.unsplash.com/photo-1755514838747-adfd34197d39?w=800&q=80',
    metrics: [
      { icon: TrendingUp, value: '+320%', label: 'Revenue Growth' },
      { icon: Users, value: '2.5M+', label: 'Reach' },
      { icon: Target, value: '8.5x', label: 'ROAS' },
    ],
    tags: ['Social Media', 'Influencer Marketing', 'Paid Ads'],
  },
  {
    title: 'FinTech Startup',
    category: 'Brand Launch',
    description: 'Complete brand strategy and digital launch for a revolutionary payment platform targeting Gen-Z users.',
    image: 'https://images.unsplash.com/photo-1726137065566-153debe32a53?w=800&q=80',
    metrics: [
      { icon: Users, value: '500K+', label: 'Users in 90 Days' },
      { icon: TrendingUp, value: '+450%', label: 'App Downloads' },
      { icon: Target, value: '42%', label: 'Conversion Rate' },
    ],
    tags: ['Brand Strategy', 'Content Marketing', 'Performance Marketing'],
  },
  {
    title: 'Health & Wellness D2C',
    category: 'Digital Transformation',
    description: 'End-to-end digital marketing transformation including website redesign, SEO optimization, and email automation.',
    image: 'https://images.unsplash.com/photo-1713434638237-203fc6de993a?w=800&q=80',
    metrics: [
      { icon: TrendingUp, value: '+280%', label: 'Organic Traffic' },
      { icon: Users, value: '150K+', label: 'Email Subscribers' },
      { icon: Target, value: '65%', label: 'Repeat Purchase Rate' },
    ],
    tags: ['SEO', 'Email Marketing', 'UX Design'],
  },
];

export function CaseStudiesSection() {
  const ref = useRef(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Scroll progress for the heading
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "end 0.3"]
  });

  // Zoom effect: scales from 0.8 to 1.2 as you scroll - MORE DRAMATIC
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 1.3]);
  
  // Mask reveal: clips from 0% to 100% - WIDER RANGE
  const clipProgress = useTransform(scrollYProgress, [0, 0.8], [0, 100]);
  const clipPath = useTransform(
    clipProgress,
    (value) => `inset(0 ${100 - value}% 0 0)`
  );

  // Opacity for dramatic reveal - MORE CONTRAST
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.2, 1, 1, 0.4]);
  
  // Video opacity - MORE VISIBLE
  const videoOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.2, 1, 1, 0.3]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Ensure ref has proper positioning for useScroll
  useEffect(() => {
    if (headingRef.current) {
      // Force position relative from the start
      headingRef.current.style.position = 'relative';
    }
  }, []);

  return (
    <section id="case-studies" className="relative bg-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          <div className="w-16 h-[1px] bg-primary mx-auto mb-8" />
          
          {/* Scroll-triggered Zoom + Mask Reveal Heading with Video */}
          <div 
            ref={headingRef} 
            className="relative overflow-hidden py-8 md:py-12 mb-6 min-h-[200px] md:min-h-[300px]"
            style={{ position: 'relative' }}
          >
            {/* Background Video */}
            <motion.div
              style={{
                scale,
                opacity: videoOpacity
              }}
              className="absolute inset-0 z-0"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-creative-team-working-together-in-an-office-4935-large.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-foreground/30" />
            </motion.div>

            {/* Heading with Mask Reveal */}
            <motion.h2
              className="relative z-10 text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-none font-light"
              style={{
                textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.6)',
                transform: 'translateZ(0)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              Success Stories
            </motion.h2>
          </div>
          
          <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto">
            Real results for real businesses. Explore how we've helped brands achieve extraordinary growth.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="space-y-24">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative h-[400px] lg:h-[500px] overflow-hidden ${
                index % 2 === 1 ? 'lg:order-2' : ''
              }`}>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-xs tracking-[0.2em] uppercase text-foreground font-light">
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h3 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                    {study.title}
                  </h3>
                  <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed mb-8">
                    {study.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-primary/20">
                    {study.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center lg:text-left">
                        <metric.icon className="w-5 h-5 text-primary mb-2 mx-auto lg:mx-0" />
                        <div className="text-2xl md:text-3xl text-foreground font-light mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs text-foreground/60 uppercase tracking-wide">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {study.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-primary/10 text-foreground/70 text-xs tracking-wide font-light rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <MagneticButton
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-3 px-8 py-3 border border-primary text-foreground hover:bg-primary hover:text-white text-xs tracking-[0.2em] uppercase transition-all duration-300"
                  >
                    Start Your Success Story
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}