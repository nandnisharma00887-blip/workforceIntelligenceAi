import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Lock, Mail, User, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    role: 'manager' as 'manager' | 'employee'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Form validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError('Please provide your full name (at least 2 characters).');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid work email address.');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters in length.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter both passwords.');
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        company: formData.company.trim() || 'Enterprise Corp'
      });

      if (result.success) {
        setSuccessMsg(result.message || 'Account successfully created! You can now log in.');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Server connection error during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-navy-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial-glow opacity-75 pointer-events-none" />

      <div className="max-w-md w-full space-y-6 p-8 sm:p-10 rounded-3xl bg-navy-900/80 border border-white/10 shadow-glass relative z-10">
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 p-[1px] shadow-glow-sm">
              <div className="w-full h-full bg-navy-950 rounded-xl flex items-center justify-center group-hover:bg-transparent transition-colors">
                <Activity className="w-4 h-4 text-cyan-400 group-hover:text-white" />
              </div>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Workforce<span className="text-cyan-400">AI</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-white tracking-tight">Create Your Account</h2>
          <p className="text-xs text-slate-400 mt-1">
            Empower your team with autonomous AI workforce intelligence
          </p>
        </div>

        {/* Success Message Banner */}
        {successMsg ? (
          <div className="p-6 rounded-2xl bg-navy-950 border border-emerald-500/30 text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Registration Successful!</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {successMsg}
              </p>
            </div>
            <button
              onClick={() => navigate('/login', { state: { registeredMessage: 'Your account is ready! Please sign in with your password.' } })}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            {/* Error banner */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sarah Chen"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@enterprise.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Primary Perspective
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'manager' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      formData.role === 'manager'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-glow-sm'
                        : 'bg-navy-950 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    Engineering Lead
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'employee' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      formData.role === 'employee'
                        ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-glow-sm'
                        : 'bg-navy-950 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    Individual Dev
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Enterprise Account...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-xs text-slate-400 pt-3 border-t border-white/5">
              Already have an enterprise account?{' '}
              <Link to="/login" className="text-cyan-400 font-semibold hover:underline">
                Sign in here
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
