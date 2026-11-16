import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { StandardSection } from './components/StandardSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [consultOpen, setConsultOpen] = useState(false);
  const [consultFocus, setConsultFocus] = useState<string | undefined>(undefined);

  const { scrollYProgress } = useScroll();
  const ambientParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  const handleOpenConsultation = (focus?: string) => {
    setConsultFocus(focus);
    setConsultOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0a1128] text-slate-200 overflow-x-hidden">
      {/* Subtle Parallax Atmospheric Depth Field */}
      <motion.div
        aria-hidden="true"
        style={{ y: ambientParallaxY }}
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
      >
        <div
          className="absolute -top-40 left-1/4 w-[640px] h-[640px] rounded-full blur-[160px]"
          style={{ background: 'rgba(37, 99, 235, 0.14)' }}
        />
        <div
          className="absolute top-1/2 -right-32 w-[520px] h-[520px] rounded-full blur-[160px]"
          style={{ background: 'rgba(148, 163, 184, 0.08)' }}
        />
      </motion.div>

      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      <main className="relative z-10">
        <HeroSection onOpenConsultation={() => handleOpenConsultation()} />
        <ServicesSection onOpenConsultation={handleOpenConsultation} />
        <CaseStudiesSection onOpenConsultation={handleOpenConsultation} />
        <StandardSection onOpenConsultation={() => handleOpenConsultation()} />
        <FAQSection onOpenConsultation={handleOpenConsultation} />
      </main>

      <div className="relative z-10">
        <Footer onOpenConsultation={() => handleOpenConsultation()} />
      </div>

      <ConsultationModal
        open={consultOpen}
        initialFocus={consultFocus}
        onClose={() => setConsultOpen(false)}
      />
    </div>
  );
}
