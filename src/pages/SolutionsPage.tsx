import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  Code, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  BarChart, 
  Layers 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SolutionsPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'vpe' | 'chro' | 'em' | 'ic'>('vpe');

  const roleData = {
    vpe: {
      title: 'For VPs of Engineering & CTOs',
      subtitle: 'Predictable Roadmap Delivery Without Burning Out Your Best Technical Minds',
      icon: Briefcase,
      color: 'from-cyan-500 to-blue-600',
      pains: [
        'Surprise resignations from 10x senior engineers after major releases',
        'Missed quarterly roadmap milestones due to hidden burnout bottlenecks',
        'Inefficient PR review cycles and sprawling architectural technical debt'
      ],
      gains: [
        '30-day early warning of staff-level burnout risks',
        '+34% increase in sprint delivery predictability',
        'Defendable board-level reports linking developer health to business velocity'
      ],
      metrics: [
        { label: 'Attrition Avoidance ROI', val: '$1.8M saved / yr' },
        { label: 'Milestone Delivery On-Time', val: '94.2%' },
        { label: 'Engineering Focus Recovery', val: '312 hrs / wk' }
      ]
    },
    chro: {
      title: 'For Chief People Officers & Head of HR',
      subtitle: 'Continuous Workforce Telemetry That Respects Employee Dignity & Psychological Safety',
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      pains: [
        'Quarterly survey fatigue yielding inaccurate or outdated sentiment',
        'Struggling to justify wellness budgets without empirical ROI telemetry',
        'Backlash against invasive screen-monitoring spyware tools'
      ],
      gains: [
        'Passive aggregate telemetry with zero invasive spyware',
        'Demonstrable reduction in sick leave and stress-induced departures',
        'Audit-ready ESG reporting and diversity-friendly workload parity metrics'
      ],
      metrics: [
        { label: 'Burnout Intervention Rate', val: '89.4%' },
        { label: 'Employee Trust & Adoption', val: '98.2%' },
        { label: 'Survey Overhead Elimination', val: '100%' }
      ]
    },
    em: {
      title: 'For Engineering Managers & Scrum Leads',
      subtitle: 'Smarter Sprint Planning, Equal Load Distribution & Zero Meeting Churn',
      icon: Layers,
      color: 'from-indigo-500 to-purple-600',
      pains: [
        'Uneven task distribution where the same 2 senior devs carry every sprint',
        'Hours wasted in tedious status check-ins that could have been async',
        'On-call engineers exhausted by nighttime paging rotations'
      ],
      gains: [
        '1-Click AI Workload Rebalancing matching domain expertise and capacity',
        'Automated calendar cleanup clustering meetings into dedicated slots',
        'Live sprint risk radar identifying blocked tickets before standup'
      ],
      metrics: [
        { label: 'Capacity Variance Drop', val: '-64%' },
        { label: 'Meeting Hours Reduced', val: '6.2 hrs / wk' },
        { label: 'Sprint Velocity Boost', val: '+18.4%' }
      ]
    },
    ic: {
      title: 'For Individual Engineers & Architects',
      subtitle: 'Your Personal Deep-Work Shield: Write Code, Not Meeting Notes',
      icon: Code,
      color: 'from-emerald-500 to-teal-600',
      pains: [
        'Context switching across 5 repos with meetings every 45 minutes',
        'Guilt over saying no to redundant syncs and review requests',
        'Working late into the evening just to find quiet coding time'
      ],
      gains: [
        'Guaranteed 3-4 hour contiguous focus blocks every day',
        'Empirical data proving meeting overload to leadership without confrontation',
        'Personal wellness dashboard with zero employer surveillance or spyware'
      ],
      metrics: [
        { label: 'Unbroken Focus Time', val: '28.5 hrs / wk' },
        { label: 'Evening Pings Blocked', val: '92%' },
        { label: 'Deep Work Satisfaction', val: '4.9 / 5' }
      ]
    }
  };

  const current = roleData[selectedRole];
  const Icon = current.icon;

  return (
    <div className="py-16 md:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Tailored Enterprise Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-3">
            Built for Every Role in the Tech Organization
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            Select your role to explore how Workforce AI delivers immediate value to your specific day-to-day challenges.
          </p>
        </div>

        {/* Role Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'vpe', label: 'VP of Engineering / CTO', icon: Briefcase },
            { id: 'chro', label: 'Chief People Officer / HR', icon: Heart },
            { id: 'em', label: 'Engineering Manager', icon: Layers },
            { id: 'ic', label: 'Individual IC Engineer', icon: Code },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isSelected = selectedRole === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedRole(tab.id as any)}
                className={`px-5 py-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-400/50 shadow-glow-sm'
                    : 'bg-navy-900/50 text-slate-400 hover:text-white border border-white/5 hover:bg-navy-900'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Role Content Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900/60 border border-white/10 shadow-glass">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{current.title}</h2>
              <p className="text-xs sm:text-sm text-cyan-400 font-mono mt-1">{current.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            {/* The Challenges */}
            <div className="p-6 rounded-2xl bg-navy-950/70 border border-rose-500/20">
              <h3 className="text-sm font-bold text-rose-400 uppercase font-mono tracking-wider mb-4 flex items-center gap-2">
                <span>The Traditional Blindspots</span>
              </h3>
              <ul className="space-y-3">
                {current.pains.map((pain, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Solution */}
            <div className="p-6 rounded-2xl bg-navy-950/70 border border-cyan-500/30">
              <h3 className="text-sm font-bold text-cyan-400 uppercase font-mono tracking-wider mb-4 flex items-center gap-2">
                <span>The Workforce AI Advantage</span>
              </h3>
              <ul className="space-y-3">
                {current.gains.map((gain, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{gain}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Impact Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
            {current.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-navy-950/50 border border-white/5">
                <div className="text-[11px] text-slate-400">{m.label}</div>
                <div className="text-2xl font-black text-white mt-1">{m.val}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
            <span className="text-xs text-slate-400">
              Experience the {current.title} interactive view now in your browser.
            </span>
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-cyan flex items-center gap-1.5 transition-all"
              >
                <span>Launch Role View in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
