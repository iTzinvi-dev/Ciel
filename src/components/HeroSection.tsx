import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroGeometryCanvas } from './HeroGeometryCanvas';
import { TECH_STACK_OVERVIEW } from '../data/agencyData';

interface HeroSectionProps {
  onOpenConsultation: () => void;
}

export function HeroSection({ onOpenConsultation }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative min-h-[88vh] flex items-center pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-300/10"
    >
      <HeroGeometryCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-medium tracking-wide text-slate-300 mb-5"
          >
            London Engineering Studio <span aria-hidden="true" className="mx-2 text-slate-500">·</span> Global Enterprise Delivery
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold tracking-tight text-slate-50 text-balance leading-[1.06]"
            style={{ fontSize: 'clamp(2.5rem, 4.8vw, 4.25rem)' }}
          >
            Architecting the Digital Future.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg leading-relaxed text-slate-300 max-w-xl"
          >
            Vespera Core delivers modern, clean, and classy full-stack web applications,
            scalable microservices, and interactive web tools for industry leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#case-studies"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 shadow-[0_0_32px_-6px_rgba(37,99,235,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1128]"
            >
              <span>View Our Work</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-slate-200 border border-slate-300/35 hover:border-slate-200/75 hover:bg-white/[0.06] rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1128]"
            >
              Consult with an Architect
            </button>
          </motion.div>

          {/* Clean Unboxed Tech Stack Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-14 pt-8 border-t border-slate-300/12"
          >
            <p className="text-xs font-medium text-slate-400 mb-3">
              Core Engineering Stack
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs md:text-sm font-mono text-slate-300">
              {TECH_STACK_OVERVIEW.map((tech, idx) => (
                <span key={tech} className="inline-flex items-center gap-3">
                  <span>{tech}</span>
                  {idx < TECH_STACK_OVERVIEW.length - 1 && (
                    <span aria-hidden="true" className="text-slate-500">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
