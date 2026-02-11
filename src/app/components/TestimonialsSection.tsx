import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Founder & CEO',
    company: 'LuxeLife Fashion',
    image: 'https://images.unsplash.com/photo-1735845929510-48e0ecdb53d2?w=400&q=80',
    quote: 'Hello Tangi transformed our entire digital presence. Their strategic approach to social media and influencer marketing resulted in a 320% increase in revenue within just 6 months. Absolutely phenomenal work.',
    rating: 5,
  },
  {
    name: 'Rahul Mehta',
    role: 'CMO',
    company: 'TechPay Solutions',
    image: 'https://images.unsplash.com/photo-1766763845598-13da19913a6f?w=400&q=80',
    quote: 'Working with Hello Tangi was a game-changer for our startup. They understood our vision and helped us acquire 500K users in the first 90 days. Their expertise in performance marketing is unmatched.',
    rating: 5,
  },
  {
    name: 'Ananya Patel',
    role: 'Director of Marketing',
    company: 'WellnessHub',
    image: 'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?w=400&q=80',
    quote: 'The team at Hello Tangi is exceptional. From SEO to email marketing, they handled our complete digital transformation with precision. Our organic traffic grew by 280% and customer retention improved dramatically.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Co-Founder',
    company: 'GreenEarth Organics',
    image: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?w=400&q=80',
    quote: 'Hello Tangi doesn\'t just execute campaigns—they become true partners in your growth. Their data-driven approach and creative excellence helped us scale from a local brand to a national presence.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative bg-gradient-to-b from-background to-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          <div className="w-16 h-[1px] bg-primary mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-foreground mb-6 leading-tight">
            Client Testimonials
          </h2>
          <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the brands we've helped grow.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 z-0"
          >
            <Quote className="w-24 h-24 text-primary" />
          </motion.div>

          {/* Testimonial Cards */}
          <div className="relative h-[500px] md:h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-primary/10 max-w-4xl w-full backdrop-blur-sm">
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-8">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl lg:text-3xl text-foreground font-light text-center leading-relaxed mb-12">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 ring-offset-4"
                    />
                    <div className="text-center md:text-left">
                      <div className="text-lg text-foreground font-light mb-1">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-sm text-foreground/60">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={handlePrev}
              className="group w-12 h-12 flex items-center justify-center rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-primary'
                      : 'w-2 h-2 bg-primary/30 hover:bg-primary/50'
                  } rounded-full`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="group w-12 h-12 flex items-center justify-center rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}