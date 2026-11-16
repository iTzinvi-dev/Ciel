import { useState } from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { STUDIO_IMAGE, VESPERA_STANDARD } from '../data/agencyData';

interface StandardSectionProps {
  onOpenConsultation: () => void;
}

export function StandardSection({ onOpenConsultation }: StandardSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="standard" className="relative py-24 md:py-32 border-b border-slate-300/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Engineering Standards */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-sm font-medium text-blue-400 mb-3">The Vespera Standard</p>
                <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-slate-50 text-balance">
                  Precision engineering without compromise.
                </h2>
                <p className="mt-4 text-slate-300 leading-relaxed max-w-xl">
                  Every engagement follows non-negotiable architectural invariants—designed in
                  London and deployed across resilient global infrastructure.
                </p>
              </motion.div>

              <div className="mt-10 divide-y divide-slate-300/12 border-t border-b border-slate-300/12">
                {VESPERA_STANDARD.map((pillar, idx) => (
                  <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="py-7"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-sm text-blue-400 tabular-nums">
                          {pillar.index}
                        </span>
                        <h3 className="font-display text-xl font-semibold text-slate-50">
                          {pillar.title}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-slate-400">{pillar.benchmark}</span>
                    </div>
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed pl-0 sm:pl-9">
                      {pillar.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Schedule Architecture Review</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="text-xs text-slate-400">
                Direct principal architect engagement from Day 1.
              </span>
            </div>
          </div>

          {/* Right Column: London Studio Visual + Attributable Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="relative flex-1 min-h-[300px] lg:min-h-[400px] rounded-2xl overflow-hidden border border-slate-300/12 bg-slate-950">
              {imageError ? (
                <div className="w-full h-full bg-gradient-to-br from-[#0f1c44] via-[#0a1128] to-[#060b1b] flex flex-col items-center justify-center p-8 text-center">
                  <ShieldCheck className="w-10 h-10 text-blue-400 mb-3" aria-hidden="true" />
                  <span className="font-display text-lg text-slate-200">
                    Vespera Core London Studio
                  </span>
                </div>
              ) : (
                <img
                  src={STUDIO_IMAGE.src}
                  alt={STUDIO_IMAGE.alt}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full lg:h-full object-cover"
                />
              )}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,17,40,0) 45%, rgba(10,17,40,0.86) 100%)',
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                <span>Bishopsgate Studio, London</span>
                <span className="font-mono tabular-nums text-slate-400">51.5145° N · 0.0813° W</span>
              </div>
            </div>

            {/* Adjacent Attributable Proof Card */}
            <div className="glass-card rounded-2xl p-7 md:p-8">
              <blockquote className="text-sm md:text-base text-slate-200 leading-relaxed">
                &ldquo;Replacing our monolithic risk portal with Vespera Core&rsquo;s federated
                GraphQL and Node.js microservices cut p99 latency from 640ms to 18ms across twelve
                global trading desks with zero unplanned downtime.&rdquo;
              </blockquote>
              <div className="mt-5 pt-4 border-t border-slate-300/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-medium text-slate-100">
                  Alistair Finch, Managing Director of Platform Engineering
                </span>
                <span className="text-slate-400">Vanguard Capital Markets</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
