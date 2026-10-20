import React from 'react';
import { TrendingUp, Users, Clock, ShieldCheck } from 'lucide-react';

export const TrustedLogos: React.FC = () => {
  const logos = [
    { name: 'DATADOG', style: 'font-mono tracking-widest' },
    { name: 'SNOWFLAKE', style: 'font-sans font-black tracking-wider' },
    { name: 'STRIPE', style: 'font-serif font-black tracking-normal' },
    { name: 'VERCEL', style: 'font-sans font-extrabold tracking-widest' },
    { name: 'LINEAR', style: 'font-mono font-semibold tracking-widest' },
    { name: 'FIGMA', style: 'font-sans font-extrabold tracking-wider' },
    { name: 'RAMP', style: 'font-mono font-black tracking-widest' },
  ];

  const stats = [
    {
      label: 'Average Workforce Health Score',
      value: '84.7 / 100',
      change: '+14% improvement',
      icon: TrendingUp,
      color: 'text-emerald-400',
    },
    {
      label: 'Predictive Burnout Interception',
      value: '89.4%',
      change: 'pre-attrition accuracy',
      icon: ShieldCheck,
      color: 'text-cyan-400',
    },
    {
      label: 'Engineering Focus Hours Saved',
      value: '312 hrs',
      change: 'weekly per 100 engineers',
      icon: Clock,
      color: 'text-indigo-400',
    },
    {
      label: 'Active Enterprise Seats',
      value: '185,000+',
      change: 'across 42 countries',
      icon: Users,
      color: 'text-pink-400',
    },
  ];

  return (
    <section className="py-16 border-y border-white/5 bg-navy-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
          Trusted by engineering leaders and People Ops at forward-thinking technology enterprises
        </p>

        {/* Logos Marquee / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center opacity-65 hover:opacity-100 transition-opacity duration-300">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className={`text-slate-300 hover:text-cyan-400 text-sm md:text-base font-bold transition-colors ${logo.style}`}
            >
              {logo.name}
            </div>
          ))}
        </div>

        {/* Key Statistics Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-navy-900/40 border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="text-3xl font-black text-white tracking-tight mb-1">{stat.value}</div>
                <div className="text-xs text-cyan-400 font-mono">{stat.change}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
