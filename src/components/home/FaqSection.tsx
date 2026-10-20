import React, { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does Workforce AI record keystrokes, webcam feeds, or take screenshots?',
      a: 'Absolutely not. Workforce AI was founded on an uncompromising anti-surveillance pledge. We strictly analyze aggregated metadata — such as Jira sprint velocity, GitHub PR turnaround cycles, and Google Calendar meeting block densities. We never read message bodies, capture screen frames, or monitor keystroke counts.'
    },
    {
      q: 'How does the local Ollama integration work for air-gapped enterprise privacy?',
      a: 'Workforce AI natively connects to local Ollama instances (e.g. `http://127.0.0.1:11434` running Llama-3, Mistral, or Qwen 2.5). This allows your internal telemetry, sprint retrospective questions, and workload balance queries to execute entirely on your own private infrastructure without transmitting organizational data to external third-party cloud LLMs.'
    },
    {
      q: 'Which platforms and developer tools are supported?',
      a: 'We feature turnkey native integrations for GitHub, GitLab, Jira Software, Linear, Slack, Google Calendar, Microsoft Teams, and Asana. Webhooks sync in real-time, and setup typically takes under 5 minutes without writing custom scripts.'
    },
    {
      q: 'What parameters determine an employee’s Workforce Health Score?',
      a: 'The proprietary score evaluates four vectors: (1) Deep Focus Ratio (unbroken 2+ hour focus blocks), (2) Meeting Fragmentation Index, (3) After-Hours Commit & On-Call Burden, and (4) Context Switching Factor across disparate project repos. Scores above 80 indicate sustainable high velocity.'
    },
    {
      q: 'How does the Smart Workload Balancer decide task redistribution?',
      a: 'Our algorithm performs constrained optimization matching task technical domain tags with teammate historic familiarity, while ensuring no engineer exceeds 88% weekly capacity and protecting engineers currently in on-call rotations.'
    },
    {
      q: 'What compliance certifications and security guarantees are provided?',
      a: 'Workforce AI is SOC-2 Type II certified, ISO 27001 compliant, GDPR and CCPA compliant, and HIPAA ready. All data is encrypted with TLS 1.3 in transit and AES-256 at rest, with support for Bring-Your-Own-Key (BYOK) in enterprise tiers.'
    }
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-navy-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Everything You Need to Know
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Have questions about privacy, integrations, or deployment? We have answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-navy-900/50 border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-navy-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
