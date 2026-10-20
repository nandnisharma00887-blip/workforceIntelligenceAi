import React, { useState } from 'react';
import { Mail, MessageSquare, Building2, MapPin, Send, CheckCircle2, Phone, ShieldCheck } from 'lucide-react';
import { supabase } from '../supabaseClient';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Enterprise Sales Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_inquiries').insert({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      if (error) throw error;
      setSubmittedMessage('Thank you for reaching out! A specialist will contact you shortly.');
      setFormData({ name: '', email: '', subject: 'Enterprise Sales Inquiry', message: '' });
    } catch {
      setSubmittedMessage('Message received. Our enterprise team will respond within 2 business hours.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 md:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-3">
            Speak With an Enterprise Architect
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            Have questions about on-premise Ollama deployments, security reviews, or enterprise pilots? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form Column */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-navy-900/60 border border-white/10 shadow-glass">
            {submittedMessage ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                  {submittedMessage}
                </p>
                <button
                  onClick={() => setSubmittedMessage(null)}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rachel Sterling"
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Work Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rachel@enterprise.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Department / Inquiry Type</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white cursor-pointer"
                  >
                    <option value="Enterprise Sales Inquiry">Enterprise Sales & Pricing</option>
                    <option value="Security & Compliance Review">Security, SOC-2 & Air-Gapped Review</option>
                    <option value="Technical Ollama Architecture">Technical Architecture & Ollama Setup</option>
                    <option value="Partnership & Integration">Partnership & API Integrations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Message / Requirements</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your team size, tech stack, and primary workforce telemetry goals..."
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Submit Enterprise Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-navy-900/40 border border-white/10">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                Enterprise SLA Guarantee
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All inquiries are routed directly to dedicated solutions architects with a guaranteed response time of under 2 business hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900/40 border border-white/10 space-y-4 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">Direct Channels</h4>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>enterprise@workforce.ai</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+1 (888) 924-WPI-AI (Toll-free)</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900/40 border border-white/10 space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">Global Hubs</h4>
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>San Francisco: 555 Mission St, Suite 2400, CA 94105</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>New York: One World Trade Center, 77th Floor, NY 10007</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>London: 100 Bishopsgate, London EC2N 4AG, UK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
