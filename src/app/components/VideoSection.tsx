import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export function VideoSection() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <div className="w-16 h-[1px] bg-primary mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-foreground mb-6 leading-tight">
            See Our Work in Action
          </h2>
          <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto">
            Experience the creativity and strategy that powers our campaigns
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          {/* Video Placeholder - Using a cinematic image */}
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <img
              src="https://images.unsplash.com/photo-1664277497091-d4919922b55c?w=1920&q=80"
              alt="Marketing Campaign Video Showcase"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Play Button */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-white transition-all duration-300"
              >
                <Play className="w-8 h-8 md:w-12 md:h-12 text-foreground ml-1" />
              </motion.div>
            </button>

            {/* Video Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-light mb-2">
                  Brand Transformation 2024
                </h3>
                <p className="text-sm md:text-base text-white/80 font-light">
                  A showcase of our most impactful campaigns
                </p>
              </motion.div>
            </div>
          </div>

          {/* Stats Grid Below Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8"
          >
            {[
              { value: '50M+', label: 'Total Impressions' },
              { value: '12M+', label: 'Engagement' },
              { value: '2.5M+', label: 'Conversions' },
              { value: '850%', label: 'Average ROI' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl text-foreground font-light mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-foreground/60 uppercase tracking-wide font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}