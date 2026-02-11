import { motion } from 'motion/react';
import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

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
    <footer className="relative bg-[#1a1816] text-white overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c9b798]/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Top section with brand and CTA */}
        <div className="py-20 lg:py-28 border-b border-[#c9b798]/20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.05em] mb-6 text-[#f5f1eb]">
                Let's Create<br />
                <span className="text-[#d4af7a]">Something Great</span>
              </h2>
              <p className="text-base md:text-lg text-[#c9b798]/80 font-light leading-relaxed max-w-md">
                Ready to elevate your brand? Let's start a conversation.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:text-right"
            >
              <a
                href="mailto:hello@hellotangi.com"
                className="inline-block text-2xl md:text-3xl lg:text-4xl font-light text-[#f5f1eb] hover:text-[#ff8c61] transition-colors duration-500 tracking-wide"
              >
                hello@hellotangi.com
              </a>
              <p className="mt-4 text-base text-[#f5f0eb]/70">
                +971 XXX XXXX
              </p>
            </motion.div>
          </div>
        </div>

        {/* Middle section with links */}
        <div className="py-16 lg:py-20">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl lg:text-4xl font-light tracking-[0.15em] mb-4 text-white">
                HELLO<br />TANGI
              </h3>
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#c9b798] to-transparent mb-6" />
              <p className="text-sm text-[#c9b798]/70 font-light leading-relaxed">
                Crafting meaningful connections between brands and the people they serve
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-[10px] tracking-[0.3em] uppercase mb-8 text-white/60 font-light">Navigate</h4>
              <nav className="space-y-4">
                {[
                  { id: 'services', label: 'Services' },
                  { id: 'approach', label: 'Our Approach' },
                  { id: 'industries', label: 'Industries' },
                  { id: 'why-us', label: 'Why Us' },
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="group block text-left"
                  >
                    <span className="text-sm text-[#c9b798]/70 group-hover:text-[#d4af7a] transition-all duration-300 inline-block group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </button>
                ))}
              </nav>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-[10px] tracking-[0.3em] uppercase mb-8 text-white/60 font-light">Location</h4>
              <div className="space-y-2">
                <p className="text-sm text-white/70 leading-relaxed">
                  Dubai, United Arab Emirates
                </p>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-[10px] tracking-[0.3em] uppercase mb-8 text-white/60 font-light">Follow</h4>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, href: '#', label: 'Instagram' },
                  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { Icon: Facebook, href: '#', label: 'Facebook' },
                  { Icon: Twitter, href: '#', label: 'Twitter' },
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="group w-11 h-11 flex items-center justify-center rounded-full border border-[#c9b798]/20 hover:border-[#d4af7a]/60 bg-[#c9b798]/5 hover:bg-[#d4af7a]/15 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 text-[#c9b798]/70 group-hover:text-[#d4af7a] transition-colors duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs text-white/60 font-light tracking-wide"
            >
              © {currentYear} Hello Tangi. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-8"
            >
              <a 
                href="#" 
                className="text-xs text-white/60 hover:text-[#d4af7a] transition-colors duration-300 font-light tracking-wide"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-xs text-white/60 hover:text-[#d4af7a] transition-colors duration-300 font-light tracking-wide"
              >
                Terms of Service
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}