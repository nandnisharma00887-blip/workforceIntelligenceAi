import React from 'react';
import { 
  Laptop, 
  Landmark, 
  Stethoscope, 
  Briefcase, 
  Globe2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const IndustriesPage: React.FC = () => {
  const industries = [
    {
      title: 'High-Growth Software & SaaS',
      subtitle: 'Protect developer velocity during rapid scaling and feature releases',
      icon: Laptop,
      color: 'from-cyan-500 to-blue-600',
      challenges: 'Rapid headcount additions, fragmented GitHub repositories, and continuous delivery pressure lead to severe staff engineer burnout.',
      solution: 'Workforce AI balances sprint tickets across squads, detects unmonitored on-call burdens, and provides managers with real-time capacity heatmaps.',
      stats: '42% lower senior dev attrition; 28% faster PR merge cycles.'
    },
    {
      title: 'FinTech, Banking & Regulated Markets',
      subtitle: 'Air-gapped telemetry and local Ollama inference without compliance risk',
      icon: Landmark,
      color: 'from-indigo-500 to-purple-600',
      challenges: 'Strict regulatory audits prohibit sending employee source code or customer data to third-party public AI providers.',
      solution: 'Full on-premise deployment with local Ollama models on dedicated VPCs. SOC-2 Type II and ISO 27001 verified.',
      stats: '100% on-premises data isolation; approved by Fortune 50 risk officers.'
    },
    {
      title: 'HealthTech & Medical Systems',
      subtitle: 'Balancing critical 24/7 clinical software uptime and engineer wellness',
      icon: Stethoscope,
      color: 'from-emerald-500 to-teal-600',
      challenges: 'Life-critical software demands high reliability, but frequent emergency pager duty results in sleep disruption and errors.',
      solution: 'On-call fatigue counters mandate quiet focus blocks post-incident and rebalance sprint commitments automatically.',
      stats: '68% reduction in post-incident fatigue errors; HIPAA ready.'
    },
    {
      title: 'Technology & Management Consulting',
      subtitle: 'Preventing cross-client context thrashing across multiple engagements',
      icon: Briefcase,
      color: 'from-amber-500 to-orange-600',
      challenges: 'Consultants juggle multiple clients and context-switch across dozens of Slack workspaces and calendars daily.',
      solution: 'Unified cross-client capacity visualization guarantees engineers have uninterrupted deep work blocks.',
      stats: 'Recovered 7.2 billable hours/week per senior consultant.'
    },
    {
      title: 'Distributed Remote & Global Teams',
      subtitle: 'Ethical asynchronous telemetry that replaces toxic spyware trackers',
      icon: Globe2,
      color: 'from-pink-500 to-rose-600',
      challenges: 'Timezone-crossing meetings and lack of in-person cues make remote burnout invisible until people quit.',
      solution: 'Passive telemetry spots late-night Slack messaging, timezone meeting overload, and provides psychological safety without webcam spyware.',
      stats: '96% remote employee trust score; zero keystroke spying.'
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Industry Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-3">
            Tailored for Mission-Critical Sectors
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            From hypergrowth unicorns to tier-1 financial institutions, Workforce AI adapts to your compliance, security, and operational standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-navy-900/50 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-950 border border-white/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{ind.title}</h3>
                  <p className="text-xs text-cyan-400 font-mono mb-4">{ind.subtitle}</p>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div>
                      <span className="font-semibold text-slate-200">The Challenge: </span>
                      <span className="text-slate-400">{ind.challenges}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-200">The WPI Solution: </span>
                      <span className="text-slate-400">{ind.solution}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-4">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{ind.stats}</span>
                  </div>

                  <Link
                    to="/book-demo"
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Request Industry Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
