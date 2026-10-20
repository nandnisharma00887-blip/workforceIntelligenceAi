import React, { useState } from 'react';
import { Check, X, Sparkles, Shield, ArrowRight, Zap, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PricingSection } from '../components/home/PricingSection';
import { FaqSection } from '../components/home/FaqSection';
import { HealthScoreSimulator } from '../components/home/HealthScoreSimulator';

export const PricingPage: React.FC = () => {
  return (
    <div className="py-12 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Pricing Section */}
        <PricingSection />

        {/* Detailed Feature Comparison Table */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Full Platform Feature Matrix</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">Transparent, side-by-side feature comparison across all enterprise tiers</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-navy-900/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950 text-slate-400 uppercase tracking-wider font-mono border-b border-white/10">
                <tr>
                  <th className="p-4 w-1/3">Feature / Capability</th>
                  <th className="p-4 text-center">Starter Squad</th>
                  <th className="p-4 text-center text-cyan-400">Growth Enterprise</th>
                  <th className="p-4 text-center">Custom Air-Gapped</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr className="bg-white/[0.02]">
                  <td colSpan={4} className="p-3 font-bold text-white uppercase text-[10px] tracking-widest font-mono text-cyan-400">
                    Telemetry & Data Ingestion
                  </td>
                </tr>
                <tr>
                  <td className="p-4">GitHub & GitLab PR Telemetry</td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">Jira & Linear Task Capacity Sync</td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">Google Calendar & Outlook Meeting Defrag</td>
                  <td className="p-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>

                <tr className="bg-white/[0.02]">
                  <td colSpan={4} className="p-3 font-bold text-white uppercase text-[10px] tracking-widest font-mono text-indigo-400">
                    AI & Predictive Intelligence
                  </td>
                </tr>
                <tr>
                  <td className="p-4">Predictive Burnout Interception</td>
                  <td className="p-4 text-center">Standard (14 days)</td>
                  <td className="p-4 text-center text-cyan-400 font-semibold">Advanced (30 days)</td>
                  <td className="p-4 text-center text-white font-semibold">Custom Neural Model (90 days)</td>
                </tr>
                <tr>
                  <td className="p-4">Smart Workload Rebalancer</td>
                  <td className="p-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">Local Air-Gapped Ollama AI (Port 11434)</td>
                  <td className="p-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>

                <tr className="bg-white/[0.02]">
                  <td colSpan={4} className="p-3 font-bold text-white uppercase text-[10px] tracking-widest font-mono text-emerald-400">
                    Security & Compliance
                  </td>
                </tr>
                <tr>
                  <td className="p-4">Zero Keystroke / Screen Surveillance Guarantee</td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">SOC-2 Type II & GDPR Audit Reports</td>
                  <td className="p-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">Dedicated VPC / Air-Gapped On-Premises</td>
                  <td className="p-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-slate-500"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ROI Simulator */}
        <div className="mt-20">
          <HealthScoreSimulator />
        </div>

        {/* FAQs */}
        <div className="mt-12">
          <FaqSection />
        </div>
      </div>
    </div>
  );
};
