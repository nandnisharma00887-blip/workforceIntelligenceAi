import React from 'react';
import { ShieldCheck, Heart, Users, Target, Lock, Sparkles, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Alexandra Wright',
      role: 'CEO & Co-Founder',
      bio: 'Former VP of Engineering at Datadog. 15+ years scaling distributed systems and engineering organizations.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Technology Officer',
      bio: 'PhD in Distributed Systems from MIT. Pioneer in cognitive telemetry modeling and asynchronous team coordination.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Tariq Al-Mansoor',
      role: 'Chief Information Security Officer',
      bio: 'Ex-CISO at major fintech institution. Champion of zero-surveillance telemetry and on-premise AI privacy.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Product Experience',
      bio: 'Former Design Director at Stripe. Dedicated to crafting tactile, frictionless, and respectful software interfaces.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    }
  ];

  const values = [
    {
      title: 'Empowerment Over Surveillance',
      desc: 'We categorically reject surveillance software. True engineering velocity is born from psychological safety, autonomy, and respectful aggregate telemetry.',
      icon: ShieldCheck,
      color: 'text-cyan-400 bg-cyan-500/10'
    },
    {
      title: 'Deep Work as a Sacred Right',
      desc: 'Fragmented days kill creative breakthroughs. We believe every engineer deserves minimum 4-hour daily uninterrupted deep work blocks.',
      icon: Target,
      color: 'text-indigo-400 bg-indigo-500/10'
    },
    {
      title: 'Empirical Evidence Over Hype',
      desc: 'We replace subjective gut feelings and post-mortem surveys with rigorous mathematical models of workload variance and cognitive fatigue.',
      icon: Award,
      color: 'text-emerald-400 bg-emerald-500/10'
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Our Mission & Principles
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-3">
            Building the Future of <br />
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Sustainable High-Velocity Teams
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
            Workforce AI was created in response to a pervasive crisis in tech: brilliant engineers burning out silently while leadership remained blind until the resignation letter landed. We built an AI platform that protects the humans who build the future.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="p-8 rounded-2xl bg-navy-900/50 border border-white/10 hover:border-cyan-500/30 transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/5 ${v.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Ethical AI & Privacy Charter */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 border border-cyan-500/30 shadow-glass mb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono mb-4">
              <Lock className="w-3.5 h-3.5" />
              The Worker Privacy Charter
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Our Zero-Surveillance Ethical Guarantee
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
              We pledge to never build keystroke loggers, screenshot capture daemons, or message eavesdropping crawlers. We analyze only operational metadata: commit rhythms, PR cycle latency, on-call distribution, and calendar density. All insights are transparent to both managers and employees alike.
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Leadership & Advisory</h2>
            <p className="text-xs text-slate-400 mt-2">Former operators and architects from Datadog, Stripe, MIT, and AWS</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-navy-900/40 border border-white/10 hover:border-cyan-500/40 transition-all text-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4 border border-cyan-400/30"
                />
                <h3 className="text-base font-bold text-white">{member.name}</h3>
                <p className="text-xs text-cyan-400 font-mono mt-0.5 mb-2">{member.role}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
