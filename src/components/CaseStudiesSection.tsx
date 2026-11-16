import { useState } from 'react';
import { ArrowUpRight, Layers, X } from 'lucide-react';
import { motion } from 'motion/react';
import { CASE_STUDIES, type CaseStudy } from '../data/agencyData';

interface CaseStudiesSectionProps {
  onOpenConsultation: (defaultFocus?: string) => void;
}

const CATEGORIES: Array<'All Systems' | CaseStudy['category']> = [
  'All Systems',
  '3D & WebGL',
  'FinTech & APIs',
  'Headless Commerce',
];

function CaseStudyImage({ study }: { study: CaseStudy }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0f1c44] via-[#0a1128] to-[#060b1b] flex flex-col items-center justify-center p-6 text-center">
        <Layers className="w-8 h-8 text-blue-400 mb-3" aria-hidden="true" />
        <span className="font-display text-base font-medium text-slate-200">{study.title}</span>
      </div>
    );
  }

  return (
    <img
      src={study.image}
      alt={study.imageAlt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
    />
  );
}

export function CaseStudiesSection({ onOpenConsultation }: CaseStudiesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All Systems' | CaseStudy['category']>(
    'All Systems',
  );
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  const visibleStudies =
    selectedCategory === 'All Systems'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((s) => s.category === selectedCategory);

  return (
    <section id="case-studies" className="relative py-24 md:py-32 border-b border-slate-300/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header + Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-sm font-medium text-blue-400 mb-3">Featured Case Studies</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-slate-50 text-balance">
              Large-scale digital flagships built for market leaders.
            </h2>
          </motion.div>

          <div
            role="group"
            aria-label="Filter case studies by discipline"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-slate-300/12 self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    active ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {visibleStudies.map((study, idx) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveStudy(study)}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <CaseStudyImage study={study} />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(10, 17, 40, 0) 40%, rgba(10, 17, 40, 0.85) 100%)',
                    }}
                  />
                </div>

                <div className="p-7">
                  {/* Unboxed Metadata Line */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <span>{study.clientSector}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{study.year}</span>
                  </div>

                  <h3 className="font-display text-xl font-semibold tracking-tight text-slate-50 mb-3">
                    {study.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{study.summary}</p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-5 border-t border-slate-300/10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-mono text-sm font-medium text-slate-100 tabular-nums">
                      {study.primaryMetric}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">Benchmark</div>
                  </div>
                  <div>
                    <div className="font-mono text-sm font-medium text-blue-400 tabular-nums">
                      {study.secondaryMetric}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">Business Impact</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStudy(study);
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span>Inspect Architecture Dossier</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Interactive Architectural Dossier Modal */}
      {activeStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
          onClick={() => setActiveStudy(null)}
        >
          <div
            className="glass-modal rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-slate-950">
              <CaseStudyImage study={activeStudy} />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,17,40,0.2) 0%, rgba(7,12,30,0.92) 100%)',
                }}
              />
              <button
                type="button"
                onClick={() => setActiveStudy(null)}
                aria-label="Close case study dossier"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/75 border border-slate-300/20 text-slate-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-7 right-7">
                <div className="text-xs text-slate-300 mb-1.5">
                  {activeStudy.clientSector} · {activeStudy.category} · {activeStudy.year}
                </div>
                <h3
                  id="dossier-title"
                  className="font-display text-2xl md:text-3xl font-semibold text-white"
                >
                  {activeStudy.title}
                </h3>
              </div>
            </div>

            <div className="p-7 md:p-9 space-y-8">
              <div className="grid grid-cols-3 gap-4 pb-6 border-b border-slate-300/12">
                {activeStudy.outcomes.map((outcome) => (
                  <div key={outcome.label}>
                    <div className="font-mono text-xl md:text-2xl font-medium text-slate-50 tabular-nums">
                      {outcome.value}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{outcome.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="font-display text-sm font-semibold text-blue-400">
                  Engineering Challenge
                </h4>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  {activeStudy.challenge}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-display text-sm font-semibold text-blue-400">
                  System Architecture Delivered
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-300 leading-relaxed">
                  {activeStudy.architecture.map((line, i) => (
                    <li key={line} className="flex items-start gap-3">
                      <span className="font-mono text-xs text-slate-500 mt-1 tabular-nums">
                        0{i + 1}.
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-300/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-400">
                  {activeStudy.stack.join(' · ')}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const studyTitle = activeStudy.title;
                    setActiveStudy(null);
                    onOpenConsultation(`Architecture similar to ${studyTitle}`);
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Request Similar Architecture
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
