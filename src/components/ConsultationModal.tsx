import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ConsultationModalProps {
  open: boolean;
  initialFocus?: string;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  'Full-Stack Web Apps',
  'Microservices Architecture',
  'Interactive Web Tools',
  'End-to-End Platform Audit',
];

const TIMELINE_OPTIONS = ['Immediate (Q2 2026)', 'Next Quarter (Q3 2026)', 'Strategic Planning'];

export function ConsultationModal({
  open,
  initialFocus,
  onClose,
}: ConsultationModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceFocus, setServiceFocus] = useState(SERVICE_OPTIONS[0]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[0]);
  const [brief, setBrief] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (initialFocus) {
      if (SERVICE_OPTIONS.includes(initialFocus)) {
        setServiceFocus(initialFocus);
      } else {
        setBrief(`Inquiry regarding ${initialFocus}.`);
      }
    }
  }, [initialFocus]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          company,
          serviceFocus,
          timeline,
          brief,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setError(data.error || 'Unable to submit consultation brief. Please check your details.');
      } else {
        setConfirmation({
          referenceId: data.referenceId,
          message: data.message,
        });
      }
    } catch {
      setError('Network error reaching Vespera Core intake service. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setConfirmation(null);
    setError(null);
    setFullName('');
    setEmail('');
    setCompany('');
    setBrief('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consult-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
      onClick={handleResetAndClose}
    >
      <div
        className="glass-modal rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-7 md:p-9 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-medium text-blue-400 mb-1.5">London Architecture Desk</p>
            <h2
              id="consult-modal-title"
              className="font-display text-2xl font-semibold text-slate-50"
            >
              Consult with an Architect
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close consultation modal"
            className="w-10 h-10 rounded-lg border border-slate-300/15 text-slate-300 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmation ? (
          <div className="py-6 space-y-5">
            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-blue-600/12 border border-blue-500/30">
              <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1.5">
                <p className="font-mono text-xs text-blue-300 tabular-nums">
                  Reference {confirmation.referenceId}
                </p>
                <p className="text-sm text-slate-200 leading-relaxed">{confirmation.message}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3 px-5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
            >
              Return to Vespera Core
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="consult-name" className="block text-xs font-medium text-slate-300">
                  Full Name
                </label>
                <input
                  id="consult-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full px-3.5 py-2.5 text-sm text-slate-100 bg-slate-950/70 border border-slate-300/15 rounded-lg placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="consult-email" className="block text-xs font-medium text-slate-300">
                  Work Email
                </label>
                <input
                  id="consult-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.vance@enterprise.co.uk"
                  className="w-full px-3.5 py-2.5 text-sm text-slate-100 bg-slate-950/70 border border-slate-300/15 rounded-lg placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="consult-company"
                  className="block text-xs font-medium text-slate-300"
                >
                  Organization
                </label>
                <input
                  id="consult-company"
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Meridian Financial Group"
                  className="w-full px-3.5 py-2.5 text-sm text-slate-100 bg-slate-950/70 border border-slate-300/15 rounded-lg placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="consult-timeline"
                  className="block text-xs font-medium text-slate-300"
                >
                  Target Horizon
                </label>
                <select
                  id="consult-timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm text-slate-100 bg-slate-950/70 border border-slate-300/15 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0a1128] text-slate-100">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="consult-focus" className="block text-xs font-medium text-slate-300">
                Primary Architectural Scope
              </label>
              <select
                id="consult-focus"
                value={serviceFocus}
                onChange={(e) => setServiceFocus(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm text-slate-100 bg-slate-950/70 border border-slate-300/15 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0a1128] text-slate-100">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="consult-brief" className="block text-xs font-medium text-slate-300">
                System Objectives & Constraints
              </label>
              <textarea
                id="consult-brief"
                rows={4}
                required
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Outline your performance targets, integration requirements, or microservices migration goals."
                className="w-full px-3.5 py-2.5 text-sm text-slate-100 bg-slate-950/70 border border-slate-300/15 rounded-lg placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="text-xs font-medium text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3.5 py-2.5"
              >
                {error}
              </p>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded-lg transition-colors cursor-pointer"
              >
                {submitting ? 'Submitting Brief...' : 'Submit Architecture Brief'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
