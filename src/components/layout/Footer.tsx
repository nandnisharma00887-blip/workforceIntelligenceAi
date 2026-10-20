import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Lock, CheckCircle2, ArrowUpRight, Globe, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-navy-950 border-t border-white/10 relative overflow-hidden text-slate-400 text-xs">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-navy-950 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Workforce<span className="text-cyan-400">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-6">
              The AI-powered workforce productivity & predictive burnout intelligence platform. Empowering high-performance engineering, product, and enterprise teams without invasive surveillance.
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational (99.99%)
              </span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><Link to="/features" className="hover:text-cyan-400 transition-colors">Features Overview</Link></li>
              <li><Link to="/ai-capabilities" className="hover:text-cyan-400 transition-colors">Ollama AI Engine</Link></li>
              <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Manager Dashboard</Link></li>
              <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Employee Focus Shield</Link></li>
              <li><Link to="/pricing" className="hover:text-cyan-400 transition-colors">Pricing & ROI</Link></li>
            </ul>
          </div>

          {/* Solutions & Industries */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2.5">
              <li><Link to="/solutions" className="hover:text-cyan-400 transition-colors">For Engineering Leaders</Link></li>
              <li><Link to="/solutions" className="hover:text-cyan-400 transition-colors">For People Ops & HR</Link></li>
              <li><Link to="/industries" className="hover:text-cyan-400 transition-colors">Software & SaaS</Link></li>
              <li><Link to="/industries" className="hover:text-cyan-400 transition-colors">FinTech & Banking</Link></li>
              <li><Link to="/case-studies" className="hover:text-cyan-400 transition-colors">Enterprise Case Studies</Link></li>
            </ul>
          </div>

          {/* Trust & Company */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Company & Trust</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Research Blog</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact Enterprise</Link></li>
              <li><Link to="/book-demo" className="hover:text-cyan-400 transition-colors">Book 1:1 Demo</Link></li>
              <li><a href="#compliance" className="hover:text-cyan-400 transition-colors flex items-center gap-1">Security Pledge <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        {/* Enterprise Security Badges Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              SOC-2 Type II Certified
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-4 h-4 text-indigo-400" />
              256-Bit TLS & At-Rest Encryption
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              GDPR & CCPA Compliant
            </span>
            <span className="text-slate-400">Zero Keystroke Logging Guarantee</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <a href="https://workforce.ai" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Global</span>
            </a>
            <a href="https://workforce.ai" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span>Network</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600">
          <p>© {new Date().getFullYear()} Workforce Productivity Intelligence Inc. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link to="/about" className="hover:underline">Privacy Policy</Link>
            <Link to="/about" className="hover:underline">Terms of Service</Link>
            <Link to="/about" className="hover:underline">Security Whitepaper</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
