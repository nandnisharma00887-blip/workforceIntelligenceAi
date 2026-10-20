import React from 'react';
import { Star, Quote, Building2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'Workforce AI detected that our senior backend engineers were spending 23 hours a week in architectural syncs while carrying on-call duties. The proactive workload balancer saved at least 3 critical staff engineers from quitting.',
      author: 'Evelyn St. Claire',
      role: 'VP of Platform Engineering',
      company: 'OmniCloud Infrastructure',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=128&q=80',
      metric: '42% Reduction in Attrition',
      rating: 5,
    },
    {
      quote:
        'The zero-surveillance philosophy was the deciding factor for us. Our developers embraced it instantly because it protects their focus hours rather than spying on their keystrokes. Our sprint predictability rose by 34%.',
      author: 'Marcus Vance',
      role: 'Director of Agile Operations',
      company: 'FintechScale Global',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80',
      metric: '+34% Sprint Predictability',
      rating: 5,
    },
    {
      quote:
        'Having our own on-premises Ollama models analyze Jira and Git telemetry without sending sensitive organizational data to third-party clouds satisfied our strictest financial compliance requirements.',
      author: 'Tariq Al-Mansoor',
      role: 'Chief Information Security Officer',
      company: 'Apex Core Systems',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80',
      metric: '100% On-Premise Privacy',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Social Proof & Proven Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Trusted by Leaders Who Value <br className="hidden sm:inline" />
            Both Output & Well-being
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            See how forward-thinking tech organizations use Workforce AI to protect their talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-navy-900/40 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                    {t.metric}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-cyan-400/20 mb-3" />
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-cyan-400/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.author}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                  <p className="text-[10px] text-cyan-400 font-mono mt-0.5">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
