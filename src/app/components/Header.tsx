import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { MagneticButton } from '@/app/components/MagneticButton';
import { MobileMenu } from '@/app/components/MobileMenu';
import { Menu } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/20 backdrop-blur-xl shadow-lg shadow-black/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20 lg:h-28">
          {/* Left Navigation - Premium Style */}
          <nav className="hidden lg:flex items-center gap-12">
            <button
              onClick={() => scrollToSection('services')}
              className="group relative text-xs tracking-[0.25em] uppercase text-white/80 hover:text-white transition-all duration-500"
            >
              <span className="relative z-10">Services</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/60 transition-all duration-500 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('approach')}
              className="group relative text-xs tracking-[0.25em] uppercase text-white/80 hover:text-white transition-all duration-500"
            >
              <span className="relative z-10">Approach</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/60 transition-all duration-500 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('industries')}
              className="group relative text-xs tracking-[0.25em] uppercase text-white/80 hover:text-white transition-all duration-500"
            >
              <span className="relative z-10">Industries</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/60 transition-all duration-500 group-hover:w-full" />
            </button>
          </nav>

          {/* Centered Logo - Elevated Premium Design */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute left-1/2 -translate-x-1/2 group"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center relative"
            >
              {/* Top accent line */}
              <div className="w-8 h-[1px] bg-white/70 mx-auto mb-3 transition-all duration-500 group-hover:w-16" />
              
              <h1 className="text-2xl lg:text-3xl font-light tracking-[0.2em] text-white transition-all duration-500 group-hover:tracking-[0.25em]">
                HELLO TANGI
              </h1>
              
              {/* Bottom accent line */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent mt-2" />
              
              {/* Tagline */}
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/60 mt-2 font-light">
                Digital Excellence
              </p>
            </motion.div>
          </button>

          {/* Right Navigation - Premium Style */}
          <nav className="hidden lg:flex items-center gap-10">
            <button
              onClick={() => scrollToSection('insights')}
              className="group relative text-xs tracking-[0.25em] uppercase text-white/80 hover:text-white transition-all duration-500"
            >
              <span className="relative z-10">Insights</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/60 transition-all duration-500 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('why-us')}
              className="group relative text-xs tracking-[0.25em] uppercase text-white/80 hover:text-white transition-all duration-500"
            >
              <span className="relative z-10">Why Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/60 transition-all duration-500 group-hover:w-full" />
            </button>
            
            {/* Premium CTA Button */}
            <MagneticButton
              onClick={() => scrollToSection('contact')}
              className="relative px-10 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs tracking-[0.25em] uppercase transition-all duration-500 hover:bg-white hover:text-foreground group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </MagneticButton>
          </nav>

          {/* Mobile Menu Button - Premium Style */}
          <button
            className="lg:hidden text-white relative group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Menu className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="absolute inset-0 border border-white/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </motion.header>
  );
}