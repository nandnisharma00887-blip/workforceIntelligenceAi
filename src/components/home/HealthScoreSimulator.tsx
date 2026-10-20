import React, { useState } from 'react';
import { DollarSign, Clock, HeartPulse, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HealthScoreSimulator: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(45);
  const [avgSalary, setAvgSalary] = useState<number>(145000);
  const [meetingHours, setMeetingHours] = useState<number>(16);

  // Calculations
  const hourlyRate = avgSalary / (52 * 40);
  // Estimate that 35% of meetings are low-value or fragmented syncs
  const wastedMeetingHoursPerYear = teamSize * (meetingHours * 0.35) * 48;
  const annualWastedCost = Math.round(wastedMeetingHoursPerYear * hourlyRate);
  
  // WPI recovers ~55% of that fragmented time + avoids ~2 key developer resignations
  const annualSavings = Math.round(annualWastedCost * 0.55 + (teamSize > 25 ? 180000 : 90000));
  const recoveredHoursPerDev = Math.round((meetingHours * 0.35 * 0.55) * 52);
  const projectedHealthScore = Math.min(96, Math.round(72 + (24 - meetingHours) * 1.2));

  return (
    <section className="py-20 bg-navy-900/30 border-y border-white/5 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Interactive Telemetry Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Simulate Your Team's Productivity ROI
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            Adjust the sliders to estimate how much engineering payroll and focus time Workforce AI will recover for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Sliders Column */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-navy-950/80 border border-white/10 shadow-glass space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Organizational Parameters
            </h3>

            {/* Slider 1: Team Size */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-slate-300">Team / Department Size</label>
                <span className="text-sm font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                  {teamSize} members
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>5 devs</span>
                <span>125 devs</span>
                <span>250+ devs</span>
              </div>
            </div>

            {/* Slider 2: Average Salary */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-slate-300">Average Annual Compensation</label>
                <span className="text-sm font-mono font-bold text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30">
                  ${(avgSalary / 1000).toFixed(0)}k / year
                </span>
              </div>
              <input
                type="range"
                min="60000"
                max="250000"
                step="5000"
                value={avgSalary}
                onChange={(e) => setAvgSalary(Number(e.target.value))}
                className="w-full h-2 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>$60k</span>
                <span>$150k</span>
                <span>$250k</span>
              </div>
            </div>

            {/* Slider 3: Meeting Load */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-slate-300">Avg Meeting Load (per engineer)</label>
                <span className="text-sm font-mono font-bold text-pink-300 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/30">
                  {meetingHours} hrs / week
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={meetingHours}
                onChange={(e) => setMeetingHours(Number(e.target.value))}
                className="w-full h-2 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-pink-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>5 hrs (minimal)</span>
                <span>17 hrs (standard)</span>
                <span>30 hrs (severe fatigue)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Biometric telemetry models updated:</span>
              <span className="text-emerald-400 font-mono">Oct 2026 calibrated</span>
            </div>
          </div>

          {/* Real-Time Projected Output Cards */}
          <div className="lg:col-span-6 space-y-4">
            {/* Big Projected Savings Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 border border-cyan-500/40 shadow-glow-cyan">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-cyan-300 uppercase font-mono tracking-wider">
                  Estimated Annual Economic Value
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  3.8x - 6.2x ROI
                </span>
              </div>

              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1">
                <span className="text-cyan-400">$</span>
                {annualSavings.toLocaleString()}
                <span className="text-sm text-slate-400 font-normal">/ year</span>
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Recovered through meeting consolidation, optimized PR turnarounds, and preventing high-cost developer turnover.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    Deep Work Recovered
                  </div>
                  <div className="text-xl font-bold text-white">{recoveredHoursPerDev} hrs</div>
                  <div className="text-[10px] text-cyan-400">per developer / year</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                    <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                    Projected Health Score
                  </div>
                  <div className="text-xl font-bold text-emerald-400">{projectedHealthScore} / 100</div>
                  <div className="text-[10px] text-emerald-300">+22% vs baseline</div>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="p-4 rounded-xl bg-navy-950 border border-white/10 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                Want a custom audit for your exact stack?
              </div>
              <Link
                to="/book-demo"
                className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-semibold transition-all flex items-center gap-1 shrink-0"
              >
                <span>Request Custom Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
