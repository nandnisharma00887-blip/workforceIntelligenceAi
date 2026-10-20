import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if directed from successful registration
  const registrationSuccessMsg = location.state?.registeredMessage as string | undefined;
  const fromPath = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!email.trim()) {
      setError('Please enter your work email.');
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const result = await login(email.trim(), password);
      if (result.success) {
        navigate(fromPath, { replace: true });
      } else {
        setError(result.error || 'Invalid email or password.');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to connect to the authentication service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-navy-950 relative overflow-hidden">
      {/* Background radial glow */}
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
          <h2 className="text-2xl font-black text-white tracking-tight">Welcome Back</h2>
          <p className="text-xs text-slate-400 mt-1">
            Sign in to access your enterprise workforce telemetry & dashboard
          </p>
        </div>

        {/* Success message banner from registration */}
        {registrationSuccessMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{registrationSuccessMsg}</span>
          </div>
        )}

        {/* Error message banner */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@enterprise.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex flex-col space-y-4">
              <a
                href="/api/auth/google"
                className="flex items-center justify-center w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M533.5 278.4c0-17.5-1.6-35-4.7-51.9H272v98.1h146.8c-6.4 34.7-25.6 64.1-54.5 83.8v69.7h88.2c51.6-47.6 81.5-117.9 81.5-199.7"/>
                  <path fill="#34A853" d="M272 544.3c73.5 0 135.2-24.4 180.3-66.3l-88.2-69.7c-24.4 16.4-55.8 26-92.1 26-70.8 0-130.9-47.7-152.5-111.6H30.8v70.2c45.2 89.7 138.6 151.4 241.2 151.4"/>
                  <path fill="#FBBC04" d="M119.5 322.7c-10.5-31.1-10.5-64.3 0-95.4V157.1H30.8c-41.6 81.9-41.6 180.2 0 262.1l88.7-69.5"/>
                  <path fill="#EA4335" d="M272 108.5c39.8-.6 78.5 14.9 107.5 42.5l80.4-80.4C414.7 22.6 344.9-2.9 272 0 169.3 0 75.9 61.6 30.8 151.4l88.7 70.2C141.2 157.4 201.2 108.5 272 108.5"/>
                </svg>
                Continue with Google
              </a>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
        </form>

        {/* Switch to Register */}
        <div className="text-center text-xs text-slate-400 pt-3 border-t border-white/5">
          Don't have an enterprise account?{' '}
          <Link to="/register" className="text-cyan-400 font-semibold hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
