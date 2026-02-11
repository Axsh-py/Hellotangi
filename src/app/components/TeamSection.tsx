import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Linkedin, Twitter } from 'lucide-react';

const team = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1766763845598-13da19913a6f?w=400&q=80',
    bio: 'Former Head of Marketing at Fortune 500 companies, bringing 15+ years of strategic expertise.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Ananya Singh',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1735845929510-48e0ecdb53d2?w=400&q=80',
    bio: 'Award-winning designer with a passion for creating memorable brand experiences.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Vikram Patel',
    role: 'Head of Strategy',
    image: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?w=400&q=80',
    bio: 'Data scientist turned strategist, obsessed with measurable results and growth.',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Priya Sharma',
    role: 'Content Lead',
    image: 'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?w=400&q=80',
    bio: 'Storyteller at heart, crafting narratives that connect brands with their audiences.',
    linkedin: '#',
    twitter: '#',
  },
];

export function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative bg-gradient-to-b from-white to-background py-24 lg:py-32">
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
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-foreground mb-6 leading-tight">
            Meet The Team
          </h2>
          <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto">
            A collective of strategists, creatives, and growth hackers united by one mission: making your brand unforgettable.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gradient-to-br from-primary/5 to-transparent">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
                  <div className="flex gap-3">
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors duration-300"
                    >
                      <Linkedin className="w-4 h-4 text-foreground" />
                    </a>
                    <a
                      href={member.twitter}
                      className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors duration-300"
                    >
                      <Twitter className="w-4 h-4 text-foreground" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="text-xl md:text-2xl text-foreground font-light mb-1">
                  {member.name}
                </h3>
                <p className="text-xs tracking-[0.2em] uppercase text-primary mb-4">
                  {member.role}
                </p>
                <p className="text-sm text-foreground/70 font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto p-12 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 border border-primary/20">
            <h3 className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 font-light">
              Join Our Growing Team
            </h3>
            <p className="text-base text-foreground/70 font-light mb-8">
              We're always looking for talented individuals who share our passion for excellence
            </p>
            <a
              href="#contact"
              className="inline-block px-10 py-4 bg-primary text-white text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-all duration-300"
            >
              View Open Positions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}