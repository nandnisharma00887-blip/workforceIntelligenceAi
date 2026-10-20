import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  BarChart3, 
  Cpu, 
  Calendar, 
  GitBranch, 
  Users, 
  Lock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturesPage: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      title: 'Predictive Burnout Telemetry',
      subtitle: 'Identify cognitive exhaustion 30 days before it impacts velocity or leads to attrition.',
      icon: Cpu,
      color: 'from-cyan-500 to-blue-600',
      description:
        'Continuous analysis of PR turnaround latency, after-hours commit spikes, on-call paging frequency, and meeting fragmentation creates a real-time burnout probability index.',
      highlights: [
        'Multi-signal cognitive fatigue modeling',
        'Early warning alerts for engineering leads',
        'Trend analysis across 14, 30, and 90-day sprint corridors',
        'Completely passive metadata without client desktop agents'
      ],
      telemetrySample: {
        metric: 'Burnout Risk Index',
        score: '12.4% (Low)',
        trend: '-4.8% vs last sprint',
        details: 'On-call shifts balanced; deep focus restored.'
      }
    },
    {
      title: 'Smart Workload Rebalancer',
      subtitle: 'Mathematical optimization of sprint assignments based on capacity and skill affinity.',
      icon: Zap,
      color: 'from-indigo-500 to-purple-600',
      description:
        'When unexpected production incidents overload key architects, our algorithm computes the optimal reassignment to team members with bandwidth headroom while respecting technical domain familiarity.',
      highlights: [
        'One-click automated sprint redistribution',
        'Direct bidirectional sync with Jira, Linear, and GitHub Issues',
        'Protects engineers from exceeding 88% capacity limit',
        'Reduces sprint capacity variance by up to 64%'
      ],
      telemetrySample: {
        metric: 'Capacity Spread',
        score: '84% (Ideal)',
        trend: 'Zero devs in 95%+ critical overload',
        details: '2 tasks dynamically reassigned to Sarah Chen & Elena Rostova.'
      }
    },
    {
      title: 'Deep Work Shield',
      subtitle: 'Defragment fragmented calendars into contiguous 3-4 hour coding focus blocks.',
      icon: Clock,
      color: 'from-emerald-500 to-teal-600',
      description:
        'Calendar fragmentation is the single biggest productivity killer in modern software engineering. Deep Work Shield autonomously coordinates with Google Calendar and Microsoft Outlook to cluster meetings.',
      highlights: [
        'Automated No-Meeting Wednesday scheduling',
        'Deflects low-value status syncs to async AI digests',
        'Guarantees minimum 20 hours of unbroken focus time / week',
        'Integrated with Slack Do-Not-Disturb and status sync'
      ],
      telemetrySample: {
        metric: 'Avg Unbroken Focus Block',
        score: '3.8 hours',
        trend: '+1.4 hrs this month',
        details: 'Recovered 8.4 weekly hours per senior engineer.'
      }
    },
    {
      title: 'Cross-Tool Unified Telemetry',
      subtitle: 'Synthesize signals across your entire development and collaboration stack.',
      icon: GitBranch,
      color: 'from-pink-500 to-rose-600',
      description:
        'Engineers work across multiple systems every day. Workforce AI ingests webhooks from GitHub, GitLab, Jira, Slack, Teams, and Google Workspace into a single high-performance telemetry graph.',
      highlights: [
        'Turnkey 5-minute OAuth integrations',
        'Correlates PR cycle times with meeting load',
        'Tracks code review turnaround bottlenecks without micromanagement',
        'Identifies siloed knowledge and bus factors across repositories'
      ],
      telemetrySample: {
        metric: 'Connected Data Pipelines',
        score: '6 Services',
        trend: '100% telemetry fidelity',
        details: 'GitHub, Jira, Linear, Slack, GSuite, Notion.'
      }
    },
    {
      title: 'Executive Workforce Telemetry',
      subtitle: 'Board-ready workforce health scores, velocity forecasts, and ESG compliance.',
      icon: BarChart3,
      color: 'from-amber-500 to-orange-600',
      description:
        'Empower CTOs, VPs of Engineering, and Chief People Officers with empirical data on engineering health, delivery predictability, and organizational cognitive capacity.',
      highlights: [
        'Automated executive PDF/CSV monthly exports',
        'Sprint delivery reliability probability distributions',
        'Departmental benchmarking across business units',
        'Calculated payroll ROI and attrition avoidance savings'
      ],
      telemetrySample: {
        metric: 'Delivery Predictability',
        score: '94.2%',
        trend: '+6.1% vs Q2',
        details: '98% of P0 milestone commitments delivered on schedule.'
      }
    },
    {
      title: 'Zero-Surveillance Privacy Guardian',
      subtitle: 'Strict ethical AI that honors developer autonomy and psychological safety.',
      icon: Lock,
      color: 'from-cyan-400 to-indigo-500',
      description:
        'We believe surveillance spyware destroys trust. Workforce AI enforces a cryptographically verifiable privacy guarantee: zero keystroke tracking, zero screen capturing, and zero message eavesdropping.',
      highlights: [
        'SOC-2 Type II Certified, ISO 27001, GDPR & CCPA compliant',
        'Transparent employee self-service privacy portal',
        'Support for local air-gapped Ollama AI models',
        'Bring-Your-Own-Key (BYOK) encryption for enterprise data'
      ],
      telemetrySample: {
        metric: 'Surveillance Safeguard',
        score: '100% Aggregate',
        trend: 'Zero keylogging verified',
        details: 'Full psychological safety compliance certified.'
      }
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Comprehensive Platform Capabilities
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Built for Sustainable <br />
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              High-Velocity Engineering
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            Discover the six pillars powering modern workforce productivity, predictive burnout prevention, and ethical telemetry.
          </p>
        </div>

        {/* Pillar Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-12">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isSelected = activePillar === idx;
            return (
              <button
                key={idx}
                onClick={() => setActivePillar(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-navy-900 border-cyan-400/50 shadow-glow-sm'
                    : 'bg-navy-950/60 border-white/5 hover:bg-navy-900/40 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="text-xs font-semibold leading-tight line-clamp-2">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Deep Dive Card */}
        {(() => {
          const current = pillars[activePillar];
          const Icon = current.icon;
          return (
            <div className="p-8 sm:p-12 rounded-3xl bg-navy-900/60 border border-white/10 shadow-glass relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Description Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-glow-sm">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{current.title}</h2>
                      <p className="text-xs text-cyan-400 font-mono mt-0.5">{current.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {current.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Core Enterprise Capabilities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {current.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      to="/dashboard"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-glow-cyan flex items-center gap-2 transition-all active:scale-95"
                    >
                      <span>Try in Live Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/book-demo"
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-colors"
                    >
                      Book Technical Walkthrough
                    </Link>
                  </div>
                </div>

                {/* Right Interactive Telemetry Preview Graphic */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-navy-950 border border-cyan-500/30 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      Live Telemetry Output
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Updated real-time</span>
                  </div>

                  <div className="p-4 rounded-xl bg-navy-900/60 border border-white/5">
                    <div className="text-[11px] text-slate-400">{current.telemetrySample.metric}</div>
                    <div className="text-3xl font-extrabold text-white mt-1">
                      {current.telemetrySample.score}
                    </div>
                    <div className="text-xs text-emerald-400 font-mono mt-1">
                      {current.telemetrySample.trend}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-navy-900/60 border border-white/5">
                    <div className="text-[11px] text-slate-400">Autonomous Recommendation</div>
                    <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                      {current.telemetrySample.details}
                    </p>
                  </div>

                  <div className="text-center pt-2">
                    <span className="text-[10px] text-slate-500 font-mono">
                      End-to-end encrypted • TLS 1.3 • SOC-2 Type II
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Feature Comparison Grid */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white">Compare Against Legacy Approaches</h3>
            <p className="text-xs text-slate-400 mt-2">Why modern tech teams choose telemetry over spyware</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-navy-900/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950/80 text-slate-400 uppercase tracking-wider font-mono border-b border-white/10">
                <tr>
                  <th className="p-4">Capability</th>
                  <th className="p-4 text-cyan-400">Workforce AI Platform</th>
                  <th className="p-4">Spyware (Hubstaff, TimeDoctor)</th>
                  <th className="p-4">Quarterly Surveys (CultureAmp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="p-4 font-medium text-white">Ethical Privacy Guarantee</td>
                  <td className="p-4 text-emerald-400 font-bold">100% Zero Surveillance</td>
                  <td className="p-4 text-rose-400">Keystrokes & Webcam Shots</td>
                  <td className="p-4 text-slate-400">Self-reported surveys</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Burnout Detection Lead Time</td>
                  <td className="p-4 text-emerald-400 font-bold">30 Days Proactive</td>
                  <td className="p-4 text-slate-400">None (Tracks activity only)</td>
                  <td className="p-4 text-rose-400">90 Days Too Late (Post-mortem)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Local Air-Gapped AI (Ollama)</td>
                  <td className="p-4 text-emerald-400 font-bold">Native Port 11434 Support</td>
                  <td className="p-4 text-rose-400">No AI</td>
                  <td className="p-4 text-slate-400">Cloud only</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Autonomous Workload Rebalancing</td>
                  <td className="p-4 text-emerald-400 font-bold">1-Click Sprint Rebalancer</td>
                  <td className="p-4 text-rose-400">None</td>
                  <td className="p-4 text-slate-400">None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
