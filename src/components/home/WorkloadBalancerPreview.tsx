import React, { useState } from 'react';
import { Zap, CheckCircle2, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WorkloadBalancerPreview: React.FC = () => {
  const [isRebalanced, setIsRebalanced] = useState(false);
  const [animating, setAnimating] = useState(false);

  const initialMembers = [
    {
      id: 'emp-6',
      name: 'Liam Becker',
      role: 'Senior DevOps',
      capacity: 104,
      rebalancedCapacity: 88,
      status: 'Critical (Burnout Risk)',
      rebalancedStatus: 'Optimized (Green Zone)',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=128&q=80',
      tag: '3 on-calls active'
    },
    {
      id: 'emp-2',
      name: 'Marcus Vance',
      role: 'Staff Frontend',
      capacity: 96,
      rebalancedCapacity: 82,
      status: 'High Load',
      rebalancedStatus: 'Balanced',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80',
      tag: '5 PR reviews pending'
    },
    {
      id: 'emp-1',
      name: 'Sarah Chen',
      role: 'Principal Cloud Architect',
      capacity: 78,
      rebalancedCapacity: 86,
      status: 'Available Headroom',
      rebalancedStatus: 'Optimal Capacity',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
      tag: 'Headroom: +12 hrs'
    },
    {
      id: 'emp-3',
      name: 'Elena Rostova',
      role: 'Lead Product Designer',
      capacity: 74,
      rebalancedCapacity: 84,
      status: 'Available Headroom',
      rebalancedStatus: 'Optimal Capacity',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=128&q=80',
      tag: 'Headroom: +14 hrs'
    }
  ];

  const handleRebalance = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsRebalanced(true);
      setAnimating(false);
    }, 600);
  };

  const handleReset = () => {
    setIsRebalanced(false);
  };

  return (
    <section className="py-20 lg:py-28 relative bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Smart Workload Balancer
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Rebalance Overloaded Sprints with a Single Click
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              When sprint commitments skew or an emergency incident overwhelms your on-call engineers, Workforce AI models team bandwidth and automatically suggests redistribution to prevent burnout before delivery slips.
            </p>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Monitors cognitive load, commit cadence & review queues</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Matches tasks to domain familiarity and available sprint headroom</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Syncs directly to Jira, Linear, and GitHub Project boards</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/features"
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Read how the mathematical balancing algorithm works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Interactive Simulator Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-navy-900/80 border border-white/10 shadow-glass relative">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  Sprint 42 Live Team Capacity
                  {isRebalanced && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      AI Optimized
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-400">Target utilization corridor: 75% – 88%</p>
              </div>

              <div className="flex items-center gap-2">
                {!isRebalanced ? (
                  <button
                    onClick={handleRebalance}
                    disabled={animating}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-cyan flex items-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{animating ? 'Analyzing Telemetry...' : 'Execute AI Rebalance'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Simulation</span>
                  </button>
                )}
              </div>
            </div>

            {/* Members Capacity List */}
            <div className="space-y-4 my-6">
              {initialMembers.map((member) => {
                const currentCap = isRebalanced ? member.rebalancedCapacity : member.capacity;
                const isOverloaded = currentCap > 90;
                const isCritical = currentCap > 100;

                return (
                  <div
                    key={member.id}
                    className="p-4 rounded-xl bg-navy-950/70 border border-white/5 hover:border-cyan-500/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-9 h-9 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            {member.name}
                            <span className="text-[10px] font-normal text-slate-400">• {member.role}</span>
                          </div>
                          <div className="text-[11px] text-slate-400">{member.tag}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-sm font-mono font-bold transition-colors duration-500 ${
                            isCritical
                              ? 'text-rose-400'
                              : isOverloaded
                              ? 'text-amber-400'
                              : 'text-cyan-400'
                          }`}
                        >
                          {currentCap}%
                        </span>
                        <div className="text-[10px] text-slate-400">
                          {isRebalanced ? member.rebalancedStatus : member.status}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-navy-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${
                          isCritical
                            ? 'bg-rose-500'
                            : isOverloaded
                            ? 'bg-amber-400'
                            : 'bg-gradient-to-r from-cyan-400 to-indigo-500'
                        }`}
                        style={{ width: `${Math.min(100, currentCap)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rebalance Impact Footer */}
            <div className="p-3.5 rounded-xl bg-navy-950 border border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  {isRebalanced
                    ? 'All 4 engineers now in sustainable 82%–88% corridor. 0 burnout alerts.'
                    : '2 engineers currently exceed safe cognitive fatigue thresholds.'}
                </span>
              </span>
              <span className="font-mono text-cyan-400 font-semibold">
                {isRebalanced ? 'Variance: -64%' : 'Variance: High'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
