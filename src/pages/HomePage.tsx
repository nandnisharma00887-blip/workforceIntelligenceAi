import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustedLogos } from '../components/home/TrustedLogos';
import { ProblemSolution } from '../components/home/ProblemSolution';
import { HealthScoreSimulator } from '../components/home/HealthScoreSimulator';
import { WorkloadBalancerPreview } from '../components/home/WorkloadBalancerPreview';
import { AiChatPreview } from '../components/home/AiChatPreview';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { PricingSection } from '../components/home/PricingSection';
import { FaqSection } from '../components/home/FaqSection';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Hero with Mockup */}
      <HeroSection />

      {/* 2. Trusted Logos & Key Stats */}
      <TrustedLogos />

      {/* 3. Problem vs Solution */}
      <ProblemSolution />

      {/* 4. Live Workload Balancer Interactive Preview */}
      <WorkloadBalancerPreview />

      {/* 5. Health Score & ROI Simulator */}
      <HealthScoreSimulator />

      {/* 6. Conversational AI Ollama Showcase */}
      <AiChatPreview />

      {/* 7. Testimonials */}
      <TestimonialsSection />

      {/* 8. Pricing */}
      <PricingSection />

      {/* 9. FAQs */}
      <FaqSection />

      {/* 10. Final Call to Action Banner */}
      <section className="py-24 relative overflow-hidden bg-navy-950 border-t border-white/10">
        <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Zero-Friction Enterprise Onboarding
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Stop Silent Burnout Before It Costs <br className="hidden sm:inline" />
            Your Best Talent
          </h2>

          <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join over 185,000 engineers and leaders who use Workforce AI to protect focus time, optimize sprint allocations, and build enduring high performance.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-glow-cyan flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Launch Live Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/book-demo"
              className="px-7 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-850 text-white font-semibold text-sm border border-white/10 hover:border-cyan-500/40 flex items-center gap-2 transition-all"
            >
              <span>Schedule 1:1 Guided Tour</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              SOC-2 Type II Certified
            </span>
            <span>•</span>
            <span>No agent installation required</span>
            <span>•</span>
            <span>100% aggregate privacy</span>
          </div>
        </div>
      </section>
    </div>
  );
};
