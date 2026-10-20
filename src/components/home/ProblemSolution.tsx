import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Flame, ShieldAlert, Cpu, Zap, BatteryCharging, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProblemSolution: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('solution');

  const problems = [
    {
      title: 'Silent Burnout Blindspot',
      description: 'Engineers rarely speak up until they are already exhausted or interviewing. High performers absorb extra work until critical failure.',
      stat: '76% of tech workers report chronic exhaustion before resignation',
      icon: Flame,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    },
    {
      title: 'Meeting Calendar Fragmentation',
      description: 'Back-to-back 30-minute syncs shatter deep focus time. Engineers spend less than 18% of their day writing code.',
      stat: '21.4 hrs/week wasted in context-switching and low-value syncs',
      icon: AlertTriangle,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Invasive Spyware Backlash',
      description: 'Traditional workforce trackers monitor keystrokes and webcam feeds, devastating psychological safety and driving top talent away.',
      stat: '4.8x higher attrition rate at companies using screen-monitoring tools',
      icon: ShieldAlert,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    }
  ];

  const solutions = [
    {
      title: 'Autonomous Predictive Telemetry',
      description: 'Passive metadata from Jira, Git commits, and calendar density detects burnout weeks before humans notice, without reading code or messages.',
      stat: '89.4% accuracy in intercepting burnout 30 days ahead',
      icon: Cpu,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: 'Smart Workload Rebalancing',
      description: 'One-click AI redistribution shifts critical tasks from overloaded devs (104% capacity) to teammates with available bandwidth (74% capacity).',
      stat: '64% reduction in team capacity variance in one click',
      icon: Zap,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Employee Focus Shield & Privacy',
      description: 'Strict privacy architecture with zero keylogging. Employees get personal deep-work shields, meeting deflection recommendations, and wellness scores.',
      stat: 'Recover 8.4 hours of uninterrupted deep work every week',
      icon: BatteryCharging,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    }
  ];

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Problem vs. Intelligent Solution
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Why High-Performance Teams Need <br className="hidden sm:inline" />
            Productivity Intelligence
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            The modern enterprise cannot manage cognitive fatigue with retrospective quarterly surveys. You need continuous, ethical workforce telemetry.
          </p>

          {/* Switcher Tabs */}
          <div className="mt-8 inline-flex p-1 rounded-xl bg-navy-900 border border-white/10">
            <button
              onClick={() => setActiveTab('problem')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === 'problem'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              The Silent Burnout Trap
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === 'solution'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              The Workforce AI Advantage
            </button>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(activeTab === 'problem' ? problems : solutions).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-navy-900/50 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-6 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="text-xs font-mono font-medium text-slate-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item.stat}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white">Ready to inspect your team's real-time health score?</h4>
            <p className="text-xs text-slate-400 mt-1">Simulate live rebalancing or connect your sandbox in under 3 minutes.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/features"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              Learn All Features
            </Link>
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-xs font-semibold text-white shadow-glow-cyan flex items-center gap-1.5 transition-all"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
