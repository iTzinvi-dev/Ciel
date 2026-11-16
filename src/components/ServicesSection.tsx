import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { ARCHITECTURE_LAYERS, SERVICES } from '../data/agencyData';

interface ServicesSectionProps {
  onOpenConsultation: (defaultFocus?: string) => void;
}

export function ServicesSection({ onOpenConsultation }: ServicesSectionProps) {
  const [activeLayerId, setActiveLayerId] = useState(ARCHITECTURE_LAYERS[0].id);
  const activeLayer =
    ARCHITECTURE_LAYERS.find((layer) => layer.id === activeLayerId) ?? ARCHITECTURE_LAYERS[0];

  return (
    <section id="services" className="relative py-24 md:py-32 border-b border-slate-300/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14 md:mb-16"
        >
          <p className="text-sm font-medium text-blue-400 mb-3">What We Build</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-slate-50 text-balance">
            Systems engineered for speed, longevity, and executive clarity.
          </h2>
        </motion.div>

        {/* Asymmetric Bento Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {SERVICES.map((service, idx) => {
            const isLead = Boolean(service.featured);
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`glass-card rounded-2xl p-8 md:p-10 flex flex-col justify-between group ${
                  isLead ? 'lg:col-span-12' : 'lg:col-span-6'
                }`}
              >
                <div className={isLead ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-start' : ''}>
                  <div className={isLead ? 'lg:col-span-6' : ''}>
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="font-mono text-sm text-blue-400 tabular-nums">
                        {service.index}
                      </span>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-50">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-base max-w-xl">
                      {service.summary}
                    </p>
                  </div>

                  <div className={isLead ? 'lg:col-span-6' : 'mt-7 pt-6 border-t border-slate-300/10'}>
                    <ul className="space-y-3">
                      {service.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-3 text-sm text-slate-300">
                          <Check
                            className="w-4 h-4 text-blue-400 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-300/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs font-mono text-slate-400">{service.stackNote}</span>
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(service.title)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Discuss {service.title}</span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Interactive Architecture Stack Blueprint Explorer */}
        <motion.div
          id="architecture"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-16 border-t border-slate-300/10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-sm font-medium text-blue-400 mb-2">Backend & Platform Blueprint</p>
              <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
                Production infrastructure, inspected layer by layer.
              </h3>
            </div>

            <div
              role="tablist"
              aria-label="Architecture Layers"
              className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-slate-300/12"
            >
              {ARCHITECTURE_LAYERS.map((layer) => {
                const isSelected = layer.id === activeLayer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveLayerId(layer.id)}
                    className={`px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {layer.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h4 className="font-display text-xl md:text-2xl font-semibold text-slate-50">
                {activeLayer.headline}
              </h4>
              <p className="text-slate-300 leading-relaxed max-w-2xl">{activeLayer.description}</p>
              <p className="pt-2 text-xs font-mono text-slate-400">
                {activeLayer.technologies.join(' · ')}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 gap-4 pt-6 lg:pt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-slate-300/12">
              {activeLayer.specifications.map((spec) => (
                <div key={spec.label} className="space-y-1">
                  <div className="font-mono text-lg md:text-xl font-medium text-slate-50 tabular-nums">
                    {spec.value}
                  </div>
                  <div className="text-xs text-slate-400 leading-snug">{spec.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
