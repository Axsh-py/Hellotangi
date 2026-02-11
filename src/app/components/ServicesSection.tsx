import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createLayout } from "animejs/layout";
import { stagger } from "animejs/utils";
import { KineticWrapper } from "@/app/components/KineticWrapper";
import { AnimatedCounter } from "@/app/components/AnimatedCounter";

const stats = [
  { value: "500+", label: "Campaigns Launched" },
  { value: "150+", label: "Happy Clients" },
  { value: "₹50Cr+", label: "Revenue Generated" },
  { value: "98%", label: "Client Retention" },
  { value: "15+", label: "Industry Awards" },
];

export function ServicesSection() {
  const imageRef = useRef(null);

  const imageInView = useInView(imageRef, { once: true, margin: "-200px" });

  // layout
  const statsRootRef = useRef<HTMLDivElement | null>(null);
  const layoutRef = useRef<any>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (!statsRootRef.current) return;
    layoutRef.current = createLayout(statsRootRef.current);
    statsRootRef.current.dataset.view = "grid";
  }, []);

  // Auto toggle layout every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const layout = layoutRef.current;
      const root = statsRootRef.current;
      if (!layout || !root) return;

      const next = root.dataset.view === "grid" ? "list" : "grid";

      layout.update(
        ({ root }: any) => {
          root.dataset.view = next;
        },
        {
          duration: 1200,
          delay: stagger(60),
          ease: "inOutCubic",
        }
      );

      setView(next);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const toggleLayout = () => {
    const layout = layoutRef.current;
    const root = statsRootRef.current;
    if (!layout || !root) return;

    const next = root.dataset.view === "grid" ? "list" : "grid";

    layout.update(
      ({ root }: any) => {
        root.dataset.view = next;
      },
      {
        duration: 1200,
        delay: stagger(60),
        ease: "inOutCubic",
      }
    );

    setView(next);
  };

  return (
    <section id="services" className="relative bg-background">
      {/* Scroll-pinned kinetic typography section - Increased to 6000px for slower, smoother animation */}
      <KineticWrapper seed={42} scatterDistance={450} scrollHeight={6000}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
          <div className="text-center">
            <div className="w-16 h-[1px] bg-primary mx-auto mb-8" />

            <h2 className="text-4xl md:text-5xl lg:text-7xl text-foreground mb-6 leading-tight">
              Our Impact in Numbers
            </h2>

            <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto mb-8">
              Delivering exceptional results through data-driven strategies and creative excellence across digital marketing campaigns.
            </p>

            <button
              onClick={toggleLayout}
              className="px-5 py-2.5 rounded-full border border-primary/40 text-foreground/80 hover:text-foreground hover:border-primary/70 transition-all duration-300 backdrop-blur-sm bg-background/20"
            >
              <span className="flex items-center gap-2">
                <span className="text-xs font-light tracking-wider uppercase">
                  {view === "grid" ? "Grid View" : "List View"}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </span>
            </button>
          </div>
        </div>
      </KineticWrapper>

      {/* Stats section - compact spacing with automatic toggle */}
      <div className="relative bg-background py-20">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
          {/* Layout root */}
          <div ref={statsRootRef} className="stats-root relative" data-view="grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="stat-item text-center relative"
              >
                <div className="stat-content pb-8 mb-8">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 font-light">
                    <AnimatedCounter value={stat.value} />
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/60 uppercase tracking-[0.25em] font-light">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <style>{`
            .stats-root{
              position:relative;
              transition: all 0.3s ease;
            }
            .stats-root[data-view="grid"]{
              display:grid;
              grid-template-columns:repeat(2,minmax(0,1fr));
              gap:2rem;
            }
            @media(min-width:640px){
              .stats-root[data-view="grid"]{
                grid-template-columns:repeat(3,minmax(0,1fr));
                gap:2.5rem;
              }
            }
            @media(min-width:1024px){
              .stats-root[data-view="grid"]{
                grid-template-columns:repeat(5,minmax(0,1fr));
                gap:3.5rem;
              }
            }
            .stats-root[data-view="grid"] .stat-item:not(:nth-child(2n)) .stat-content{
              border-right: 1px solid rgba(199,178,153,0.2);
              padding-right: 2rem;
              margin-right: -1rem;
            }
            @media(min-width:640px){
              .stats-root[data-view="grid"] .stat-item:not(:nth-child(2n)) .stat-content{
                border-right: none;
                padding-right: 0;
                margin-right: 0;
              }
              .stats-root[data-view="grid"] .stat-item:not(:nth-child(3n)) .stat-content{
                border-right: 1px solid rgba(199,178,153,0.2);
                padding-right: 2.5rem;
                margin-right: -1.25rem;
              }
            }
            @media(min-width:1024px){
              .stats-root[data-view="grid"] .stat-item:not(:nth-child(3n)) .stat-content{
                border-right: none;
                padding-right: 0;
                margin-right: 0;
              }
              .stats-root[data-view="grid"] .stat-item:not(:nth-child(5n)) .stat-content{
                border-right: 1px solid rgba(199,178,153,0.2);
                padding-right: 3.5rem;
                margin-right: -1.75rem;
              }
            }
            .stats-root[data-view="list"]{
              display:grid;
              grid-template-columns:1fr;
              gap:1.5rem;
            }
            .stats-root[data-view="list"] .stat-item{
              text-align:left;
              padding:28px 36px;
              border:1px solid rgba(199,178,153,0.15);
              border-radius:20px;
              background: rgba(199,178,153,0.03);
              backdrop-filter: blur(10px);
              transition: all 0.3s ease;
            }
            .stats-root[data-view="list"] .stat-item:hover{
              background: rgba(199,178,153,0.08);
              border-color: rgba(199,178,153,0.25);
              transform: translateX(8px);
            }
            .stats-root[data-view="list"] .stat-item .stat-content{
              border:none !important;
              margin:0 !important;
              padding:0 !important;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 2rem;
            }
            .stats-root[data-view="list"] .stat-item h3{
              min-width: 200px;
              margin-bottom: 0 !important;
            }
          `}</style>
        </div>
      </div>

      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, y: 40 }}
        animate={imageInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[50vh] lg:h-[60vh] w-full overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1758873271902-a63ecd5b5235?w=1920&q=80"
          alt="Creative Marketing Strategy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>
    </section>
  );
}