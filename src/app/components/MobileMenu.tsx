import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { MagneticButton } from '@/app/components/MagneticButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      onClose();
    }
  };

  const menuItems = [
    { id: 'services', label: 'Services' },
    { id: 'approach', label: 'Approach' },
    { id: 'industries', label: 'Industries' },
    { id: 'insights', label: 'Insights' },
    { id: 'why-us', label: 'Why Us' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-[101] overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-primary/20">
                <h2 className="text-2xl font-light tracking-[0.15em] text-foreground">
                  MENU
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors duration-300"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-8 py-12">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                    >
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="group w-full text-left py-4 border-b border-primary/10 hover:border-primary/30 transition-all duration-300"
                      >
                        <span className="block text-xl text-foreground/70 group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300 font-light tracking-wide">
                          {item.label}
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="p-8 border-t border-primary/20 bg-gradient-to-t from-primary/5 to-transparent"
              >
                <p className="text-sm text-foreground/60 mb-6 font-light">
                  Ready to elevate your brand?
                </p>
                <MagneticButton
                  onClick={() => scrollToSection('contact')}
                  className="w-full px-8 py-4 bg-primary text-white text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-primary/90"
                >
                  Get In Touch
                </MagneticButton>

                {/* Contact Info */}
                <div className="mt-8 pt-8 border-t border-primary/20 space-y-3">
                  <a
                    href="mailto:hello@hellotangi.com"
                    className="block text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    hello@hellotangi.com
                  </a>
                  <a
                    href="tel:+971"
                    className="block text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    +971 XXX XXXX
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
