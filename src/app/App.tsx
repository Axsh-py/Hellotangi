import { Header } from '@/app/components/Header';
import { HeroSection } from '@/app/components/HeroSection';
import { IntroSection } from '@/app/components/IntroSection';
import { WhatWeDoSection } from '@/app/components/WhatWeDoSection';
import { ServicesSection } from '@/app/components/ServicesSection';
import { CaseStudiesSection } from '@/app/components/CaseStudiesSection';
import { TestimonialsSection } from '@/app/components/TestimonialsSection';
import { ClientsSection } from '@/app/components/ClientsSection';
import { VideoSection } from '@/app/components/VideoSection';
import { TeamSection } from '@/app/components/TeamSection';
import { HowWeWorkSection } from '@/app/components/HowWeWorkSection';
import { IndustriesSection } from '@/app/components/IndustriesSection';
import { InsightsSection } from '@/app/components/InsightsSection';
import { WhyHelloTangiSection } from '@/app/components/WhyHelloTangiSection';
import { ContactSection } from '@/app/components/ContactSection';
import { Footer } from '@/app/components/Footer';
import { SmoothScroll } from '@/app/components/SmoothScroll';
import { PageTransition } from '@/app/components/PageTransition';
import { ScrollProgress } from '@/app/components/ScrollProgress';
import { BackToTop } from '@/app/components/BackToTop';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Suppress Motion.js positioning warnings (we have proper positioning via inline styles + CSS)
    const originalWarn = console.warn;
    console.warn = (...args) => {
      // Filter out Motion.js scroll positioning warnings
      if (args[0]?.includes?.('non-static position')) {
        return;
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      <PageTransition />
      <SmoothScroll />
      <ScrollProgress />
      <BackToTop />
      <Header />
      <main>
        <HeroSection />
        <IntroSection />
        <WhatWeDoSection />
        <ServicesSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <ClientsSection />
        <VideoSection />
        <TeamSection />
        <HowWeWorkSection />
        <IndustriesSection />
        <InsightsSection />
        <WhyHelloTangiSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}