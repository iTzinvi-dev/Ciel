import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
}

export function Footer({ onOpenConsultation }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus('error');
        setFeedback(data.error || 'Please enter a valid email address.');
      } else {
        setStatus('success');
        setFeedback(data.message);
        if (!data.alreadySubscribed) {
          setEmail('');
        }
      }
    } catch {
      setStatus('error');
      setFeedback('Unable to connect right now. Please try again shortly.');
    }
  };

  return (
    <footer className="bg-[#060b1b] pt-20 pb-12 border-t border-slate-300/12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-300/10">
          {/* Brand & Global Footprint */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 text-lg font-display font-semibold tracking-tight text-slate-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="text-blue-500"
              >
                <polygon
                  points="12,2 21,7 21,17 12,22 3,17 3,7"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <polygon points="12,6 17,12 12,18 7,12" stroke="#cbd5e1" strokeWidth="1.25" />
              </svg>
              <span>Vespera Core</span>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Full-stack digital platforms, resilient microservices ecosystems, and real-time WebGL
              tools engineered for global industry leaders.
            </p>

            <p className="text-xs font-medium text-slate-300 pt-2">
              Headquartered in London <span aria-hidden="true" className="mx-1.5 text-slate-500">|</span> Operating Globally.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-3 grid grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <h3 className="font-display text-xs font-semibold text-slate-200">Practice</h3>
              <ul className="space-y-2.5 text-slate-400">
                <li>
                  <a href="#services" className="hover:text-slate-100 transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#case-studies" className="hover:text-slate-100 transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-slate-100 transition-colors">
                    Architecture
                  </a>
                </li>
                <li>
                  <a href="#standard" className="hover:text-slate-100 transition-colors">
                    Vespera Standard
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xs font-semibold text-slate-200">Advisory</h3>
              <ul className="space-y-2.5 text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={onOpenConsultation}
                    className="hover:text-slate-100 transition-colors text-left cursor-pointer"
                  >
                    Consult an Architect
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:architects@vesperacore.io"
                    className="hover:text-slate-100 transition-colors"
                  >
                    architects@vesperacore.io
                  </a>
                </li>
                <li className="text-slate-500">Bishopsgate, EC2N</li>
              </ul>
            </div>
          </div>

          {/* Tech Insights Newsletter */}
          <div className="md:col-span-4 space-y-3.5">
            <h3 className="font-display text-sm font-semibold text-slate-100">Tech Insights</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Quarterly engineering notes on distributed systems, GraphQL federation, and WebGL
              performance.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-stretch gap-2" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address for Tech Insights
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="flex-1 min-w-0 px-3.5 py-2.5 text-sm text-slate-100 bg-[#0a1128] border border-slate-300/18 rounded-lg placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                aria-label="Subscribe to Tech Insights"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{status === 'loading' ? 'Joining' : 'Subscribe'}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>

            {status === 'success' && (
              <p className="flex items-start gap-2 text-xs text-blue-300 pt-1">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{feedback}</span>
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="text-xs text-rose-300 pt-1">
                {feedback}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Copyright Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>Vespera Core © 2026. Precision engineered.</p>
          <p>Next.js · TypeScript · Node.js · GraphQL · AWS · Docker</p>
        </div>
      </div>
    </footer>
  );
}
