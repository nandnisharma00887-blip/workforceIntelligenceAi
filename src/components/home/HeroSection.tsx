import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Play, Cpu, CheckCircle } from 'lucide-react';
import { DashboardPreviewMockup } from './DashboardPreviewMockup';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Radiant ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-radial-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900/90 border border-cyan-500/30 text-xs font-medium text-cyan-300 shadow-glow-sm hover:border-cyan-400 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-300">Announcing Workforce AI 3.0</span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 font-mono text-cyan-300">
              <Cpu className="w-3 h-3 text-cyan-400" /> Local Ollama Ready
            </span>
            <ArrowRight className="w-3 h-3 text-cyan-400 ml-1" />
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Workforce Productivity <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Intelligence Platform
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Predict silent burnout, balance engineering capacity, and maximize deep work output with autonomous AI telemetry. <span className="text-cyan-300 font-medium">Zero invasive surveillance. 100% actionable telemetry.</span>
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-glow-cyan flex items-center gap-2 transition-all duration-200 active:scale-95"
            >
              <span>Launch Live Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/book-demo"
              className="px-6 py-3.5 rounded-xl bg-navy-900/90 hover:bg-navy-850 text-slate-200 hover:text-white font-semibold text-sm border border-white/10 hover:border-cyan-500/40 flex items-center gap-2 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Book 1:1 Executive Demo</span>
            </Link>
          </div>

          {/* Value Props Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              14-Day Free Enterprise Sandbox
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-cyan-400" />
              SOC-2 Type II Certified
            </span>
          </div>
        </div>

        {/* High-Fidelity Interactive Dashboard Mockup */}
        <div className="mt-10 sm:mt-14 relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-indigo-500/20 to-teal-500/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000" />
          <DashboardPreviewMockup />
        </div>
      </div>
    </section>
  );
};
