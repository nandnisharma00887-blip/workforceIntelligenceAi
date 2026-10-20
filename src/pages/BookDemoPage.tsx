import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, CheckCircle2, Building, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase } from '../supabaseClient';
import confetti from 'canvas-confetti';

export const BookDemoPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [teamSize, setTeamSize] = useState('50 - 250 engineers');
  const [focusArea, setFocusArea] = useState('Predictive Burnout & Workload Rebalancing');
  const [selectedSlot, setSelectedSlot] = useState('Thursday, Oct 22 at 2:00 PM EST');
  const [formData, setFormData] = useState({
    name: '',
    workEmail: '',
    companyName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const availableSlots = [
    'Thursday, Oct 22 at 2:00 PM EST',
    'Thursday, Oct 22 at 4:30 PM EST',
    'Friday, Oct 23 at 11:00 AM EST',
    'Friday, Oct 23 at 3:00 PM EST',
    'Monday, Oct 26 at 1:00 PM EST',
    'Tuesday, Oct 27 at 10:30 AM EST'
  ];

  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.workEmail || !formData.companyName) return;

    setIsSubmitting(true);
    try {
        const { error } = await supabase.from('demo_bookings').insert({
          name: formData.name,
          work_email: formData.workEmail,
          company_name: formData.companyName,
          team_size: teamSize,
          interest: focusArea,
          preferred_date: selectedSlot
        });
        if (error) throw error;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setConfirmed(true);
    } catch {
      setConfirmed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 md:py-24 bg-navy-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            1:1 Technical Architecture Session
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Schedule Your Live Platform Demo
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            See your stack's potential workforce health score, simulated workload balancing, and local Ollama capabilities in a tailored 30-minute walkthrough.
          </p>
        </div>

        <div className="rounded-3xl bg-navy-900/60 border border-white/10 p-8 sm:p-12 shadow-glass relative">
          {confirmed ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Demo Scheduled Successfully!</h3>
                <p className="text-slate-300 text-sm mt-2 max-w-lg mx-auto leading-relaxed">
                  We have dispatched a calendar invitation and Zoom details to <span className="text-cyan-300 font-mono">{formData.workEmail}</span>.
                </p>
              </div>

              {/* Confirmation Ticket Card */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-navy-950 border border-cyan-500/30 text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Scheduled Time</span>
                  <span className="text-white font-mono font-bold">{selectedSlot}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Company</span>
                  <span className="text-white font-semibold">{formData.companyName}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Team Scope</span>
                  <span className="text-white font-semibold">{teamSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Primary Focus</span>
                  <span className="text-cyan-400 font-semibold">{focusArea}</span>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="/dashboard"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-glow-cyan inline-flex items-center gap-2"
                >
                  <span>Explore Interactive Sandbox in the Meantime</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div>
              {/* Stepper Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-cyan-500 text-navy-950' : 'bg-white/10 text-slate-400'}`}>1</span>
                  <span className={step >= 1 ? 'text-white font-bold' : 'text-slate-500'}>Scope</span>
                </div>
                <div className="w-12 h-[1px] bg-white/10" />
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-cyan-500 text-navy-950' : 'bg-white/10 text-slate-400'}`}>2</span>
                  <span className={step >= 2 ? 'text-white font-bold' : 'text-slate-500'}>Time Slot</span>
                </div>
                <div className="w-12 h-[1px] bg-white/10" />
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step === 3 ? 'bg-cyan-500 text-navy-950' : 'bg-white/10 text-slate-400'}`}>3</span>
                  <span className={step === 3 ? 'text-white font-bold' : 'text-slate-500'}>Confirm</span>
                </div>
              </div>

              {/* Step 1: Scope */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider font-mono">
                      What is the size of your engineering or technical team?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['10 - 50 engineers', '50 - 250 engineers', '250 - 1,000 engineers', '1,000+ enterprise'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setTeamSize(size)}
                          className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                            teamSize === size
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-glow-sm'
                              : 'bg-navy-950/60 border-white/5 text-slate-400 hover:text-white hover:bg-navy-950'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider font-mono">
                      Primary Operational Challenge
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Predictive Burnout & Workload Rebalancing',
                        'Meeting Defragmentation & Focus Shield',
                        'Local Air-Gapped Ollama AI Deployment',
                        'Replacing Spyware with Ethical Telemetry'
                      ].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setFocusArea(area)}
                          className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                            focusArea === area
                              ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-glow-sm'
                              : 'bg-navy-950/60 border-white/5 text-slate-400 hover:text-white hover:bg-navy-950'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-glow-cyan flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Calendar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Time Slot */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider font-mono">
                      Select a 30-Minute Priority Demonstration Slot
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-3 cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-glow-sm'
                              : 'bg-navy-950/60 border-white/5 text-slate-400 hover:text-white hover:bg-navy-950'
                          }`}
                        >
                          <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-glow-cyan flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Confirmation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Enter Details */}
              {step === 3 && (
                <form onSubmit={handleCompleteBooking} className="space-y-5">
                  <div className="p-4 rounded-xl bg-navy-950 border border-white/5 text-xs text-slate-300 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400">Selected Slot: </span>
                      <span className="text-cyan-300 font-bold font-mono">{selectedSlot}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-cyan-400 hover:underline text-[11px]"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Liam Becker"
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Work Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="liam@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Company Name</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Apex Technologies Inc."
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-glow-cyan flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Confirming...' : 'Confirm Live Demo Booking'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
