import React, { useState } from 'react';
import { 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Bell, 
  Settings, 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  FolderGit2,
  ChevronDown,
  Sparkles,
  Zap
} from 'lucide-react';

export const DashboardPreviewMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calendar' | 'messages' | 'resources'>('dashboard');
  const [trendView, setTrendView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [hoveredDay, setHoveredDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('Wed');

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-navy-900/90 via-navy-900/80 to-navy-950/95 border border-cyan-500/20 shadow-2xl backdrop-blur-xl p-3 sm:p-6 lg:p-8 relative overflow-hidden group">
      {/* Decorative ambient glow behind preview */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700" />

      {/* Top App Header inside preview */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-glow-sm">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">Workforce<span className="text-cyan-400">AI</span></span>
          </div>

          {/* Navigation Pill Switches */}
          <div className="hidden md:flex items-center gap-1 bg-navy-950/70 p-1 rounded-full border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 font-medium ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 font-medium ${
                activeTab === 'calendar' 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 font-medium ${
                activeTab === 'messages' 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AI Insights
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 font-medium ${
                activeTab === 'resources' 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Workload Balancer
            </button>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Live Ollama Connected
          </div>
          <button className="p-2 rounded-lg bg-navy-950/60 border border-white/10 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-navy-950/60 border border-white/10 text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-navy-900" />
          </button>
          <div className="flex items-center gap-2 pl-1 border-l border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80" 
              alt="Manager Avatar" 
              className="w-8 h-8 rounded-full border border-cyan-400/50 object-cover" 
            />
          </div>
        </div>
      </div>

      {/* Overview Title Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 my-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Project Management Overview</h3>
          <p className="text-xs text-slate-400 mt-1">Cross-team capacity telemetry, task velocity & cognitive focus load</p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-glow-sm transition-all duration-150">
          <Plus className="w-4 h-4" />
          <span>New task</span>
        </button>
      </div>

      {/* Top 3 Stat Cards (Inspired by Reference) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Card 1: Active Projects */}
        <div className="p-5 rounded-2xl bg-navy-950/70 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 relative group/c">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-300">Active Projects</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover/c:text-emerald-400 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">426</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-0.5">
              <ArrowDownRight className="w-3 h-3" />
              12%
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/5">
            <span>∞ Dynamic of changes</span>
            <span className="text-slate-400 font-medium">Monthly</span>
          </div>
        </div>

        {/* Card 2: Total Tasks */}
        <div className="p-5 rounded-2xl bg-navy-950/70 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 relative group/c">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-300">Total Tasks</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover/c:text-cyan-400 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">1,234</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              23%
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/5">
            <span>∞ Dynamic of changes</span>
            <span className="text-slate-400 font-medium">Monthly</span>
          </div>
        </div>

        {/* Card 3: Team Members */}
        <div className="p-5 rounded-2xl bg-navy-950/70 border border-white/10 hover:border-pink-500/40 transition-all duration-300 relative group/c">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-300">Team Members</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover/c:text-pink-400 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">102</span>
            <span className="text-xs font-medium text-cyan-400 font-mono">84% avg capacity</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
            <span>Manage Capacity</span>
            <div className="flex items-center -space-x-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80" alt="emp" className="w-6 h-6 rounded-full border border-navy-900 object-cover" />
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=64&q=80" alt="emp" className="w-6 h-6 rounded-full border border-navy-900 object-cover" />
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-[10px] text-cyan-300 font-bold">
                +4
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3 Detailed Visual/Chart Cards (Exact Layout from Image) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Task Progress */}
        <div className="p-5 rounded-2xl bg-navy-950/70 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-white">Task Progress</h4>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-[11px] text-pink-400">
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  Dev 87%
                </span>
                <span className="flex items-center gap-1 text-[11px] text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Design 36%
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Test 78%
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-extrabold text-white">70%</div>
              <div className="text-xs text-slate-400">Average task progress across 6 squads</div>
            </div>
          </div>

          {/* Tactile Colorful Pill Bars (from mockup) */}
          <div className="h-44 flex items-end justify-center gap-3 pt-4">
            {/* Development bar */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-20 rounded-2xl bg-gradient-to-t from-pink-600 to-rose-400 p-2 flex flex-col justify-between h-40 shadow-lg shadow-pink-500/20 transition-all hover:scale-105 duration-200 cursor-pointer">
                <span className="text-[11px] font-bold text-white bg-pink-700/50 px-2 py-0.5 rounded-full self-start">205</span>
                <div className="space-y-1">
                  <div className="h-1 bg-white/40 rounded-full" />
                  <div className="h-1 bg-white/30 rounded-full w-3/4" />
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Dev</span>
            </div>

            {/* Design bar */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-20 rounded-2xl bg-gradient-to-t from-blue-600 to-cyan-400 p-2 flex flex-col justify-between h-24 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 duration-200 cursor-pointer">
                <span className="text-[11px] font-bold text-white bg-blue-700/50 px-2 py-0.5 rounded-full self-start">106</span>
                <div className="space-y-1">
                  <div className="h-1 bg-white/40 rounded-full" />
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Design</span>
            </div>

            {/* Testing bar */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-20 rounded-2xl bg-gradient-to-t from-emerald-600 to-teal-400 p-2 flex flex-col justify-between h-36 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 duration-200 cursor-pointer">
                <span className="text-[11px] font-bold text-white bg-emerald-700/50 px-2 py-0.5 rounded-full self-start">168</span>
                <div className="space-y-1">
                  <div className="h-1 bg-white/40 rounded-full" />
                  <div className="h-1 bg-white/30 rounded-full w-4/5" />
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">QA/Test</span>
            </div>
          </div>
        </div>

        {/* Card 2: Project Status (Circular Donut Chart) */}
        <div className="p-5 rounded-2xl bg-navy-950/70 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-white">Project Status</h4>
            <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md text-[11px] text-slate-400 font-mono">
              <span className="text-cyan-400 font-semibold">Σ</span> %
            </div>
          </div>

          {/* SVG Circular Donut Chart */}
          <div className="relative flex items-center justify-center my-4">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="46"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-white/5"
              />
              {/* Completed sector (Green) */}
              <circle
                cx="60"
                cy="60"
                r="46"
                stroke="#10b981"
                strokeWidth="10"
                strokeDasharray="289"
                strokeDashoffset="145"
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000"
              />
              {/* In Progress sector (Blue/Cyan) */}
              <circle
                cx="60"
                cy="60"
                r="46"
                stroke="#06b6d4"
                strokeWidth="10"
                strokeDasharray="289"
                strokeDashoffset="230"
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000"
              />
              {/* Upcoming sector (Pink) */}
              <circle
                cx="60"
                cy="60"
                r="46"
                stroke="#ec4899"
                strokeWidth="10"
                strokeDasharray="289"
                strokeDashoffset="255"
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute text-center flex flex-col items-center">
              <span className="text-2xl font-black text-white">426</span>
              <span className="text-[11px] text-slate-400">projects</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 mt-0.5">
                ● 143 (52%)
              </span>
            </div>
          </div>

          {/* Status Breakdown Bars */}
          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Completed</span>
                <span className="font-mono text-slate-400">215 / 426</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '50.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> In progress</span>
                <span className="font-mono text-slate-400">68 / 426</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: '16%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-pink-400" /> Upcoming</span>
                <span className="font-mono text-slate-400">143 / 426</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-pink-400 h-1.5 rounded-full" style={{ width: '33.6%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Productivity Trend (Line Chart with Days) */}
        <div className="p-5 rounded-2xl bg-navy-950/70 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-white">Productivity Trend</h4>
            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg text-xs text-slate-300">
              <CalendarIcon className="w-3 h-3 text-cyan-400" />
              <select 
                value={trendView} 
                onChange={(e) => setTrendView(e.target.value as any)}
                className="bg-transparent text-slate-200 text-[11px] focus:outline-none cursor-pointer"
              >
                <option value="daily" className="bg-navy-900">Daily</option>
                <option value="weekly" className="bg-navy-900">Weekly</option>
                <option value="monthly" className="bg-navy-900">Monthly</option>
              </select>
            </div>
          </div>

          {/* Badges Legend */}
          <div className="flex items-center gap-3 text-[11px] mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-navy-900 border border-cyan-500/40 text-cyan-300 flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              24h active time
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-navy-900 border border-pink-500/40 text-pink-300 flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-pink-400" />
              1h 5m pause
            </span>
          </div>

          {/* Interactive Line Graph Area */}
          <div className="relative h-28 my-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 90">
              <defs>
                <linearGradient id="cyanLineGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid guide */}
              <line x1="0" y1="45" x2="300" y2="45" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Active curve (Cyan / Blue) */}
              <path
                d="M 10,60 Q 60,30 110,40 T 170,25 T 230,45 T 290,30"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 10,60 Q 60,30 110,40 T 170,25 T 230,45 T 290,30 L 290,85 L 10,85 Z"
                fill="url(#cyanLineGlow)"
              />

              {/* Pause curve (Pink) */}
              <path
                d="M 10,75 Q 60,70 110,65 T 170,55 T 230,70 T 290,65"
                fill="none"
                stroke="#ec4899"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Active Highlight Marker on Wednesday */}
              <line x1="170" y1="10" x2="170" y2="85" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="170" cy="25" r="5" fill="#00f2fe" stroke="#070c1b" strokeWidth="2" className="animate-pulse" />
              <circle cx="170" cy="55" r="4" fill="#ec4899" stroke="#070c1b" strokeWidth="2" />
            </svg>
          </div>

          {/* Day Selector Pills */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 py-1 bg-white/5 rounded-xl mb-3">
            {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const).map((day) => (
              <button
                key={day}
                onClick={() => setHoveredDay(day)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  hoveredDay === day 
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' 
                    : 'hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Bottom Metric Aggregates */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-xs">
            <div>
              <div className="text-[11px] text-slate-400">Total active time</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-base font-bold text-white">126h 58m</span>
                <span className="text-[10px] text-emerald-400 font-semibold">↑ 14%</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Total pause time</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-base font-bold text-white">9h 45m</span>
                <span className="text-[10px] text-rose-400 font-semibold">↓ 21%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
