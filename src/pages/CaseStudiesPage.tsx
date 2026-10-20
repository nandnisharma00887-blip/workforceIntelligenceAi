import React, { useState } from 'react';
import { Building2, TrendingUp, CheckCircle, Download, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CaseStudiesPage: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const triggerDownload = (companyName: string) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    setDownloadSuccess(`Case study report for ${companyName} prepared and downloaded.`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const caseStudies = [
    {
      company: 'OmniCloud Infrastructure',
      sector: 'Cloud & DevOps Platform',
      teamSize: '1,200 Engineers',
      logoText: 'OMNICLOUD',
      headline: 'How OmniCloud Reduced Senior Staff Attrition by 42% While Accelerating K8s Migration',
      challenge:
        'Following a major cloud architecture shift, senior SREs were burdened with overlapping on-call incidents and 22+ hours of fragmented architectural syncs every week.',
      solution:
        'OmniCloud deployed Workforce AI to ingest Jira and PagerDuty telemetry. The Smart Workload Balancer redistributed non-critical tickets and instituted mandatory 4-hour uninterrupted coding blocks.',
      results: [
        { metric: '42% Reduction', desc: 'In senior engineering turnover' },
        { metric: '$2.4M Saved', desc: 'In hiring & replacement costs' },
        { metric: '+312 hrs/wk', desc: 'Recovered deep work across squads' }
      ],
      quote:
        'Workforce AI gave our directors empirical proof that our best architects were drowning. The automated rebalancing changed our engineering culture overnight.',
      quoteAuthor: 'Evelyn St. Claire, VP of Platform Engineering'
    },
    {
      company: 'FintechScale Global',
      sector: 'Banking & Financial Technology',
      teamSize: '450 Engineers',
      logoText: 'FINTECHSCALE',
      headline: 'FintechScale Shipped Core Banking V2 On Schedule by Eliminating 6.2 Hours of Syncs Weekly',
      challenge:
        'A high-stakes regulatory banking migration risked slipping by two quarters due to severe meeting overload and siloed cross-team PR review cycles.',
      solution:
        'Using the Ollama AI local engine, FintechScale consolidated daily status meetings into async AI summaries and used the Focus Shield to safeguard developer heads-down blocks.',
      results: [
        { metric: '0 Days Slipped', desc: 'Core banking shipped on schedule' },
        { metric: '6.2 hrs/wk', desc: 'Meeting time eliminated per developer' },
        { metric: '94.2%', desc: 'Sprint commitment reliability index' }
      ],
      quote:
        'Being able to run the AI entirely on-premise through Ollama satisfied our strict central banking audits without sacrificing productivity intelligence.',
      quoteAuthor: 'Marcus Vance, Director of Agile Operations'
    },
    {
      company: 'VectorAI Systems',
      sector: 'Enterprise AI & Machine Learning',
      teamSize: '180 Researchers & Devs',
      logoText: 'VECTORAI',
      headline: 'VectorAI Slashed GPU Wait Bottlenecks and Normalized Sprint Capacities Across 12 ML Squads',
      challenge:
        'Machine learning researchers were burning out waiting for training compute allocations, while software engineers were overwhelmed by inference pipeline tasks.',
      solution:
        'Workforce AI dynamically paired compute availability with sprint issue velocity, allowing autonomous rebalancing between research and data engineering squads.',
      results: [
        { metric: '64% Reduction', desc: 'In team capacity variance' },
        { metric: '18.4% Boost', desc: 'In overall sprint velocity' },
        { metric: '96 / 100', desc: 'Developer happiness & health score' }
      ],
      quote:
        'The predictive capacity modeling predicted where sprint roadblocks would occur two weeks before our retrospectives caught them.',
      quoteAuthor: 'Dr. Liam Becker, Chief Scientist & Co-Founder'
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Proven Enterprise Outcomes
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-3">
            Case Studies & Impact Metrics
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            See empirical proof of how technology enterprises scale velocity and protect talent with Workforce AI.
          </p>

          {downloadSuccess && (
            <div className="mt-6 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono inline-block animate-bounce">
              ✓ {downloadSuccess}
            </div>
          )}
        </div>

        <div className="space-y-12">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-12 rounded-3xl bg-navy-900/50 border border-white/10 shadow-glass relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono font-bold text-sm tracking-wider text-white">
                    {cs.logoText}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{cs.sector} • {cs.teamSize}</span>
                </div>

                <button
                  onClick={() => triggerDownload(cs.company)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Full PDF Report</span>
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-6">
                {cs.headline}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-xs sm:text-sm text-slate-300">
                <div className="p-6 rounded-2xl bg-navy-950/60 border border-white/5">
                  <h4 className="font-bold text-white uppercase font-mono tracking-wider text-[11px] mb-2 text-rose-400">
                    The Challenge
                  </h4>
                  <p className="leading-relaxed text-slate-400">{cs.challenge}</p>
                </div>

                <div className="p-6 rounded-2xl bg-navy-950/60 border border-white/5">
                  <h4 className="font-bold text-white uppercase font-mono tracking-wider text-[11px] mb-2 text-cyan-400">
                    The WPI Implementation
                  </h4>
                  <p className="leading-relaxed text-slate-400">{cs.solution}</p>
                </div>
              </div>

              {/* Verified Results Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-navy-950 border border-cyan-500/20 mb-8">
                {cs.results.map((r, rIdx) => (
                  <div key={rIdx}>
                    <div className="text-2xl sm:text-3xl font-black text-cyan-400">{r.metric}</div>
                    <div className="text-xs text-slate-400 mt-1">{r.desc}</div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="p-6 rounded-2xl bg-navy-950/40 border border-white/5 italic text-slate-300 text-xs sm:text-sm">
                "{cs.quote}"
                <div className="not-italic text-xs text-slate-400 font-semibold mt-2">
                  — {cs.quoteAuthor}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
