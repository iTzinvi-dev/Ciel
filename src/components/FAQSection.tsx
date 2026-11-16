import { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'Architecture & Delivery',
    question: 'How does Vespera Core structure enterprise microservices migrations?',
    answer:
      'We execute incremental strangler-fig migrations backed by federated GraphQL gateways, isolated Node.js domain services, and automated contract testing. This guarantees zero-downtime transitions from legacy monoliths while maintaining strict sub-50ms p99 latency SLAs.',
  },
  {
    id: 'faq-02',
    category: 'Interactive 3D & WebGL',
    question: 'Can custom WebGL and 3D configurators maintain 60fps on mobile devices?',
    answer:
      'Yes. Our interactive web tools utilize GPU-instanced geometry, adaptive resolution scaling, and compressed KTX2/Draco pipelines with automatic device-tier fallbacks, ensuring fluid 60fps performance across desktop workstations and mobile browsers alike.',
  },
  {
    id: 'faq-03',
    category: 'Security & Compliance',
    question: 'What security and compliance standards govern your cloud infrastructure?',
    answer:
      'All cloud architectures are provisioned via immutable Terraform modules on AWS with end-to-end mTLS, zero-trust IAM boundaries, automated secret rotation, and continuous SOC 2 Type II and ISO 27001 compliance auditing.',
  },
  {
    id: 'faq-04',
    category: 'Engagement Model',
    question: 'What does a typical engagement timeline and team composition look like?',
    answer:
      'Every engagement is led directly by a Principal Architect alongside dedicated full-stack, systems, and WebGL engineers. Discovery and architectural blueprints complete within 2 weeks, followed by bi-weekly production releases over an 8-to-16 week delivery cycle.',
  },
  {
    id: 'faq-05',
    category: 'Post-Launch Support',
    question: 'Do you provide ongoing SLA guarantees or handoff to internal engineering teams?',
    answer:
      'We support both models. We offer 24/7 managed SRE retainers with 99.99% uptime guarantees, or structured co-engineering handoffs complete with runbooks, observability dashboards, and architectural training for your internal teams.',
  },
];

interface FAQSectionProps {
  onOpenConsultation: (focus?: string) => void;
}

export function FAQSection({ onOpenConsultation }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 border-b border-slate-300/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Section Header Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-sm font-medium text-blue-400 mb-3">Architectural Clarity</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-slate-50 text-balance">
              Frequently asked questions.
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Direct answers on how we architect, secure, and scale high-performance web platforms,
              distributed microservices, and real-time 3D tools.
            </p>

            <div className="mt-8 pt-8 border-t border-slate-300/12">
              <p className="text-sm text-slate-300 mb-4">
                Have a specific system requirement or custom technical brief?
              </p>
              <button
                type="button"
                onClick={() => onOpenConsultation('Custom Architecture Inquiry')}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                <span>Consult with a Principal Architect</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          {/* Accordion List Column */}
          <div className="lg:col-span-7 divide-y divide-slate-300/12 border-t border-b border-slate-300/12">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openId === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    aria-expanded={isOpen}
                    className="w-full py-6 flex items-start justify-between gap-6 text-left group cursor-pointer"
                  >
                    <div>
                      <span className="block font-mono text-xs uppercase tracking-wider text-blue-400/90 mb-1.5">
                        {item.category}
                      </span>
                      <span className="font-display text-lg md:text-xl font-medium text-slate-100 group-hover:text-white transition-colors">
                        {item.question}
                      </span>
                    </div>
                    <span
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300/15 bg-slate-900/60 text-slate-300 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 border-blue-500/40 text-blue-400' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-sm md:text-base text-slate-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
