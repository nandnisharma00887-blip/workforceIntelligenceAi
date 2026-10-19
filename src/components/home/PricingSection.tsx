import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';

export const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const navigate = useNavigate();

  const handleBuy = async (planId: string) => {
    try {
      const res = await apiService.createOrder(planId);
      if (res.success) {
        if (res.order) {
          navigate('/checkout', { state: { order: res.order, planId } });
        } else {
          navigate('/dashboard');
        }
      } else {
        alert(res.error || 'Failed to create order');
      }
    } catch (err: any) {
      alert(err.message || 'Error processing payment');
    }
  };

  const plans = [
    {
      planId: 'free',
      name: 'Starter Squad',
      description: 'Ideal for engineering teams up to 25 developers looking to protect deep work and avoid burnout.',
      priceMonthly: 499,
      priceAnnual: 499,
      badge: null,
      features: [
        'Up to 25 team members',
        'GitHub, GitLab & Jira telemetry',
        'Basic Workforce Health Score',
        'Google Calendar defragmentation',
        'Bi-weekly burnout risk reports',
        'Community Slack support',
      ],
      ctaText: 'Start 14-Day Free Trial',
      ctaLink: '/register',
      highlighted: false,
    },
    {
      planId: 'professional',
      name: 'Growth Enterprise',
      description: 'Full autonomous intelligence, workload rebalancing, and local Ollama privacy for fast-growing companies.',
      priceMonthly: 999,
      priceAnnual: 999,
      badge: 'Most Popular',
      features: [
        'Up to 250 team members',
        'Full Smart Workload Balancer',
        'Local Ollama & Open-Source LLM support',
        'Employee Focus Shield & meeting deflection',
        'Predictive burnout interception (30-day lookahead)',
        'Slack & Teams proactive AI alerts',
        'Dedicated Customer Success Manager',
        'SOC-2 Type II report access',
      ],
      ctaText: 'Launch Enterprise Trial',
      ctaLink: '/register',
      highlighted: true,
    },
    {
      planId: 'enterprise',
      name: 'Custom Scale & Air-Gapped',
      description: 'For heavily regulated enterprises requiring on-premise air-gapped deployment and custom compliance.',
      priceMonthly: 'Custom',
      priceAnnual: 'Custom',
      badge: 'Air-Gapped Ready',
      features: [
        'Unlimited team members',
        'Full On-Premise / Air-Gapped deployment',
        'Custom fine-tuned LLM models on your data',
        'Custom SSO, SAML & SCIM provisioning',
        'Biometric & ergonomic telemetry integrations',
        '99.99% uptime SLA with financial backing',
        '24/7 dedicated enterprise engineering support',
      ],
      ctaText: 'Contact Enterprise Sales',
      ctaLink: '/contact',
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-navy-900/20 border-t border-white/5" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Predictable Enterprise Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Invest in Sustainable Team Velocity
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Every dollar invested in Workforce AI yields an estimated 4.8x return in recovered focus hours and prevented attrition.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-xl bg-navy-950 border border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                !isAnnual ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isAnnual ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900 border-2 border-cyan-500/60 shadow-glow-cyan'
                  : 'bg-navy-950/70 border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-glow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-400 min-h-[36px] mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-white/5">
                  {typeof plan.priceAnnual === 'number' ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-white">
                        ₹{isAnnual ? plan.priceAnnual : plan.priceMonthly}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">/ seat / month</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-extrabold text-white">Custom Tier</div>
                  )}
                  <div className="text-[11px] text-slate-500 mt-1">
                    {isAnnual ? 'Billed annually with volume discounts' : 'Billed monthly, cancel anytime'}
                  </div>
                </div>

                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {plan.planId === 'free' ? (
                  <Link
                    to={plan.ctaLink}
                    className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-glow-cyan'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-500/30'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <button
                    onClick={() => handleBuy(plan.planId)}
                    className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-glow-cyan'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-500/30'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
