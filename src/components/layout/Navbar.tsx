import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles, 
  LayoutDashboard, 
  LogOut,
  Cpu,
  User as UserIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'AI Capabilities', path: '/ai-capabilities', badge: 'Ollama' },
    { name: 'Industries', path: '/industries' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-navy-950/80 backdrop-blur-xl border-b border-white/10 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-glow-sm">
              <div className="w-full h-full bg-navy-950 rounded-xl flex items-center justify-center group-hover:bg-transparent transition-all duration-300">
                <Activity className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                Workforce<span className="text-cyan-400">AI</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Enterprise</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                  isActive(link.path)
                    ? 'text-cyan-300 bg-white/5 border border-cyan-500/30 shadow-glow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {link.badge && (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-0.5">
                    <Cpu className="w-2.5 h-2.5" />
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/book-demo"
              className="text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1.5 border border-white/5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Book Demo
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/dashboard"
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-glow-cyan transition-all duration-200 flex items-center gap-1.5 active:scale-95"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1.5 rounded-lg bg-navy-850 border border-white/10 hover:border-cyan-500/40 text-slate-300 transition-colors cursor-pointer">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-6 h-6 rounded-full object-cover border border-cyan-400/40" 
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-bold font-mono">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-semibold text-white max-w-[120px] truncate hidden sm:inline">
                      {user.name}
                    </span>
                  </button>
                  <div className="absolute right-0 mt-1 w-52 py-2 bg-navy-900 border border-white/10 rounded-xl shadow-glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                    <div className="px-3 py-1.5 border-b border-white/5">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      <p className="text-[10px] text-cyan-400 uppercase font-mono mt-0.5">{user.role} role</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/5"
                    >
                      Enter Dashboard
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="block px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/5"
                    >
                      Settings & Integrations
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-xs font-medium text-slate-200 hover:text-white px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-glow-cyan transition-all duration-200 flex items-center gap-1 active:scale-95"
                >
                  <span>Sign Up</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center space-x-2">
            {user ? (
              <Link
                to="/dashboard"
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white/10 text-white border border-white/10"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-navy-900/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-2">
          {user && (
            <div className="p-3 mb-2 rounded-xl bg-navy-950 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">{user.name}</p>
                <p className="text-[10px] text-cyan-400 font-mono">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 text-xs hover:bg-rose-500/20"
              >
                Sign Out
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-between ${
                  isActive(link.path)
                    ? 'text-cyan-300 bg-white/10 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-indigo-500/30 text-indigo-300">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {!user ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 text-xs font-semibold rounded-lg bg-white/10 border border-white/10 text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-glow-cyan"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-glow-cyan flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Launch Live Dashboard
              </Link>
            )}

            <Link
              to="/book-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Book Live Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
