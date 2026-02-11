import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { MagneticButton } from '@/app/components/MagneticButton';

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const formInView = useInView(formRef, { once: true, margin: '-100px' });

  // Use window scroll to avoid positioning issues
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    freeConsultation: false,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        freeConsultation: false,
        message: '',
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Ensure refs have proper positioning for useScroll
  useEffect(() => {
    if (heroRef.current) {
      // Force position relative from the start
      heroRef.current.style.position = 'relative';
    }
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* Hero Section */}
      <div 
        ref={heroRef} 
        className="relative h-[80vh] overflow-hidden"
        style={{ position: 'relative' }}
      >
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
          <img
            src="https://images.unsplash.com/photo-1764726354430-1b85fa37234f?w=1920&q=80"
            alt="Contact Hello Tangi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative h-full flex items-center justify-center text-center px-8"
        >
          <div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={heroInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-16 h-[1px] bg-white/60 mx-auto mb-12"
            />
            <h2 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              Let's Create
              <br />
              <span className="text-white/90">Something Remarkable</span>
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Form Section */}
      <div className="relative bg-background py-24 lg:py-32">
        <div className="max-w-full mx-auto px-8 lg:px-16">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0 }}
            animate={formInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="bg-[#f8f6f4] backdrop-blur-xl rounded-none shadow-sm px-12 md:px-16 lg:px-20 py-12 border-none max-w-4xl mx-auto"
          >
            {/* Form Header */}
            <div className="text-center mb-12">
              <h3 className="text-sm md:text-base tracking-[0.25em] uppercase text-[#a89080] font-light">
                Book Your Private Meeting
              </h3>
            </div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* First Row: First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* First Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="group"
                >
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-0 border-b border-[#8b7d6b]/30 px-0 py-3 text-sm text-[#5a5047] placeholder:text-[#8b7d6b]/50 focus:outline-none focus:border-[#8b7d6b] transition-colors duration-300"
                      placeholder="First Name*"
                    />
                  </div>
                </motion.div>

                {/* Last Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="group"
                >
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-0 border-b border-[#8b7d6b]/30 px-0 py-3 text-sm text-[#5a5047] placeholder:text-[#8b7d6b]/50 focus:outline-none focus:border-[#8b7d6b] transition-colors duration-300"
                      placeholder="Last Name*"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Second Row: Email (Full Width) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="group"
              >
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-0 border-b border-[#8b7d6b]/30 px-0 py-3 text-sm text-[#5a5047] placeholder:text-[#8b7d6b]/50 focus:outline-none focus:border-[#8b7d6b] transition-colors duration-300"
                    placeholder="Email*"
                  />
                </div>
              </motion.div>

              {/* Third Row: Country Code + Phone Number */}
              <div className="grid grid-cols-12 gap-4">
                {/* Country Code Dropdown */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="group col-span-3 md:col-span-2"
                >
                  <div className="relative">
                    <select
                      name="countryCode"
                      className="w-full bg-transparent border-0 border-b border-[#8b7d6b]/30 px-0 py-3 text-sm text-[#5a5047] focus:outline-none focus:border-[#8b7d6b] transition-colors duration-300 cursor-pointer appearance-none"
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+86">🇨🇳 +86</option>
                    </select>
                  </div>
                </motion.div>

                {/* Phone Number */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="group col-span-9 md:col-span-10"
                >
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-0 border-b border-[#8b7d6b]/30 px-0 py-3 text-sm text-[#5a5047] placeholder:text-[#8b7d6b]/50 focus:outline-none focus:border-[#8b7d6b] transition-colors duration-300"
                      placeholder="Phone Number*"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Fourth Row: Checkbox and Submit Button */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                {/* Broker Checkbox */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="group"
                >
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      name="freeConsultation"
                      checked={formData.freeConsultation}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded border border-[#8b7d6b]/40 text-[#a89080] focus:ring-1 focus:ring-[#a89080]/30 focus:ring-offset-0 cursor-pointer accent-[#a89080]"
                    />
                    <span className="text-sm text-[#5a5047]/70">
                      I am a Broker
                    </span>
                  </label>
                </motion.div>

                {/* Submit Button - Centered */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="md:flex-1 flex justify-center"
                >
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                      className="text-sm text-green-700 flex items-center gap-2"
                    >
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-block"
                      >
                        ✓
                      </motion.span>
                      Message sent successfully
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center justify-center px-12 py-3 bg-[#b5a394] text-white text-xs tracking-[0.25em] uppercase hover:bg-[#a89080] transition-all duration-300 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  )}
                </motion.div>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}