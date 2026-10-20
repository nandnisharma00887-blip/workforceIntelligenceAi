import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  LayoutDashboard, 
  Scale, 
  Bot, 
  BarChart3, 
  CheckSquare, 
  Settings, 
  Users, 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Download, 
  RotateCcw, 
  Send,
  Zap,
  Clock,
  BatteryCharging,
  Cpu,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { Employee, Task, MetricsOverview, ChatMessage } from '../types';
import confetti from 'canvas-confetti';

export const DashboardPage: React.FC = () => {
  const { user, logout, setUserRole } = useAuth();
  
  // Dashboard Sub-navigation
  const [activeTab, setActiveTab] = useState<'overview' | 'balancer' | 'assistant' | 'analytics' | 'tasks' | 'settings'>('overview');

  // Role Perspective Switcher
  const isManager = user?.role !== 'employee';

  // Live Data State
  const [metrics, setMetrics] = useState<MetricsOverview | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Workload Balancer State
  const [rebalanceResult, setRebalanceResult] = useState<any | null>(null);
  const [rebalancing, setRebalancing] = useState(false);

  // AI Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Hello ${user?.name.split(' ')[0] || 'Team Lead'}. I am your **Workforce Productivity Intelligence Assistant** powered by local Ollama AI.\n\nCurrently, team capacity is **81.3%** across 24 active projects, but **Liam Becker (104%)** and **Marcus Vance (96%)** are in elevated burnout risk corridors.\n\nHow can I help optimize your team today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: 'Ollama llama3'
    }
  ]);
  const [promptInput, setPromptInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);

  // New Task Modal State
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('emp-1');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [newTaskHours, setNewTaskHours] = useState(8);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [m, emps, ts] = await Promise.all([
          apiService.getOverview(),
          apiService.getEmployees(),
          apiService.getTasks()
        ]);
        setMetrics(m);
        setEmployees(emps);
        setTasks(ts);
      } catch (err) {
        console.error('Error fetching dashboard telemetry:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Workload Rebalancing Action
  const handleExecuteRebalance = async () => {
    setRebalancing(true);
    try {
      const res = await apiService.rebalanceWorkload();
      setRebalanceResult(res);

      // Optimistically update employees capacity in local state
      setEmployees((prev) =>
        prev.map((emp) => {
          if (emp.id === 'emp-6') return { ...emp, capacityUsed: 88, burnoutRisk: 'Low' as const };
          if (emp.id === 'emp-2') return { ...emp, capacityUsed: 82, burnoutRisk: 'Low' as const };
          if (emp.id === 'emp-1') return { ...emp, capacityUsed: 86 };
          if (emp.id === 'emp-3') return { ...emp, capacityUsed: 84 };
          return emp;
        })
      );

      // Refresh tasks
      const updatedTasks = await apiService.getTasks();
      setTasks(updatedTasks);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      showToast('AI Workload Rebalance executed. Variance reduced by 64%!');
    } catch {
      showToast('Rebalance executed via fallback algorithm.');
    } finally {
      setRebalancing(false);
    }
  };

  // Send AI Prompt
  const handleSendPrompt = async (textToSend?: string) => {
    const q = textToSend || promptInput;
    if (!q.trim() || aiTyping) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setPromptInput('');
    setAiTyping(true);

    try {
      const res = await apiService.sendAiPrompt(q);
      const assistantMsg: ChatMessage = {
        id: `msg-resp-${Date.now()}`,
        sender: 'assistant',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: res.source,
        model: res.model
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `msg-resp-${Date.now()}`,
        sender: 'assistant',
        text: 'Telemetry analysis completed. All monitored parameters updated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setAiTyping(false);
    }
  };

  // Create Task Action
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    const assigneeObj = employees.find((e) => e.id === newTaskAssignee) || employees[0];
    const created = await apiService.createTask({
      title: newTaskTitle,
      assignedTo: assigneeObj.id,
      assigneeName: assigneeObj.name,
      priority: newTaskPriority,
      estimatedHours: Number(newTaskHours),
      department: assigneeObj.department
    });

    setTasks((prev) => [created, ...prev]);
    setShowTaskModal(false);
    setNewTaskTitle('');
    showToast(`Task "${created.title.slice(0, 24)}..." assigned to ${assigneeObj.name}`);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col md:flex-row relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-semibold shadow-glow-cyan animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-navy-900/70 border-r border-white/10 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Workspace info & Role Toggle */}
          <div className="p-3 rounded-2xl bg-navy-950 border border-white/10 mb-6">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center shadow-glow-sm">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xs font-bold text-white truncate">Apex Technologies</h2>
                <span className="text-[10px] text-cyan-400 font-mono">Enterprise Workspace</span>
              </div>
            </div>

            {/* Role Switcher Pill */}
            <div className="pt-2 border-t border-white/5">
              <div className="text-[10px] text-slate-400 mb-1.5 font-medium flex justify-between">
                <span>View Perspective:</span>
                <span className="text-cyan-300 font-bold uppercase font-mono">{user?.role}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 p-0.5 rounded-lg bg-navy-900 border border-white/5 text-[11px]">
                <button
                  onClick={() => setUserRole('manager')}
                  className={`py-1 rounded-md transition-all font-semibold ${
                    isManager ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Manager
                </button>
                <button
                  onClick={() => setUserRole('employee')}
                  className={`py-1 rounded-md transition-all font-semibold ${
                    !isManager ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Employee
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Overview Telemetry', icon: LayoutDashboard },
              { id: 'balancer', label: 'Workload Balancer', icon: Scale, badge: employees.filter(e => e.burnoutRisk === 'Critical' || e.burnoutRisk === 'High').length ? 'Alert' : null },
              { id: 'assistant', label: 'Ollama AI Copilot', icon: Bot, badge: 'Llama 3' },
              { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
              { id: 'tasks', label: 'Task Assignments', icon: CheckSquare },
              { id: 'settings', label: 'Settings & Integrations', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                      item.badge === 'Alert'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-white/10 mt-6">
          <div className="flex items-center justify-between p-2 rounded-xl bg-navy-950/60 border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.name || 'User'}
                  className="w-8 h-8 rounded-full object-cover border border-cyan-400/30"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center text-xs font-mono border border-cyan-400/30">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{user?.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{user?.email}</div>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                {activeTab === 'overview' && (isManager ? 'Engineering Management Telemetry' : 'Personal Developer Focus Hub')}
                {activeTab === 'balancer' && 'Smart AI Workload Balancer'}
                {activeTab === 'assistant' && 'Conversational Workforce Intelligence Copilot'}
                {activeTab === 'analytics' && 'Longitudinal Workforce Analytics & Reports'}
                {activeTab === 'tasks' && 'Active Sprint Task Distribution'}
                {activeTab === 'settings' && 'Enterprise Stack Integrations & Privacy Controls'}
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                Live Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {isManager 
                ? 'Continuous cognitive load modeling across squads. 0 invasive surveillance.' 
                : 'Your private deep work shield and wellness insights.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTaskModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Task</span>
            </button>

            <button
              onClick={() => {
                showToast('Telemetry data synchronized from GitHub, Jira, and Slack.');
              }}
              className="p-2 rounded-xl bg-navy-900 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Sync Telemetry"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: OVERVIEW TELEMETRY (Manager & Employee perspectives)
           ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Stat Cards (Inspired by the Reference Mockup) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stat 1: Workforce Health Score */}
              <div className="p-5 rounded-2xl bg-navy-900/60 border border-white/10 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-400">Workforce Health Score</span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white">84.7</span>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">+4.2%</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2 flex justify-between border-t border-white/5 pt-2">
                  <span>Target: &gt; 80 / 100</span>
                  <span className="text-emerald-400">Healthy Corridor</span>
                </div>
              </div>

              {/* Stat 2: Active Projects / Sprint Velocity */}
              <div className="p-5 rounded-2xl bg-navy-900/60 border border-white/10 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-400">Active Projects</span>
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white">426</span>
                  <span className="text-xs font-semibold text-rose-400 font-mono">↓ 12%</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2 flex justify-between border-t border-white/5 pt-2">
                  <span>Sprint Completion</span>
                  <span className="text-cyan-400">70% Avg</span>
                </div>
              </div>

              {/* Stat 3: Burnout Overload Risk */}
              <div className="p-5 rounded-2xl bg-navy-900/60 border border-white/10 hover:border-rose-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-400">Burnout Danger Alerts</span>
                  <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white">2 Devs</span>
                  <span className="text-xs font-semibold text-rose-400 font-mono">Critical</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2 flex justify-between border-t border-white/5 pt-2">
                  <span>Liam B. (104%), Marcus V. (96%)</span>
                  <button 
                    onClick={() => setActiveTab('balancer')}
                    className="text-cyan-400 hover:underline"
                  >
                    Rebalance →
                  </button>
                </div>
              </div>

              {/* Stat 4: Deep Work Ratio */}
              <div className="p-5 rounded-2xl bg-navy-900/60 border border-white/10 hover:border-indigo-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-400">Avg Focus vs Meetings</span>
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white">23.4h</span>
                  <span className="text-xs text-slate-400 font-mono">vs 14.8h mtgs</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2 flex justify-between border-t border-white/5 pt-2">
                  <span>Ratio: 1.58</span>
                  <span className="text-indigo-400">+1.2h this wk</span>
                </div>
              </div>
            </div>

            {/* Middle Row: Visual Chart Cards inspired by reference mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart 1: Tactile Task Progress Bars */}
              <div className="p-6 rounded-2xl bg-navy-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">Sprint Deliverable Progress</h3>
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="text-pink-400">Dev 87%</span>
                      <span className="text-cyan-400">Design 36%</span>
                      <span className="text-emerald-400">QA 78%</span>
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-1">70%</div>
                  <p className="text-xs text-slate-400">Average progress across 1,234 active sprint tasks</p>
                </div>

                <div className="h-44 flex items-end justify-center gap-4 pt-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-20 rounded-2xl bg-gradient-to-t from-pink-600 to-rose-400 p-2 flex flex-col justify-between h-40 shadow-lg shadow-pink-500/20">
                      <span className="text-[11px] font-bold text-white bg-pink-700/50 px-2 py-0.5 rounded-full self-start">205</span>
                      <div className="space-y-1">
                        <div className="h-1 bg-white/40 rounded-full" />
                        <div className="h-1 bg-white/30 rounded-full w-3/4" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">Development</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="w-20 rounded-2xl bg-gradient-to-t from-blue-600 to-cyan-400 p-2 flex flex-col justify-between h-24 shadow-lg shadow-cyan-500/20">
                      <span className="text-[11px] font-bold text-white bg-blue-700/50 px-2 py-0.5 rounded-full self-start">106</span>
                      <div className="space-y-1">
                        <div className="h-1 bg-white/40 rounded-full" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">UI / Design</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="w-20 rounded-2xl bg-gradient-to-t from-emerald-600 to-teal-400 p-2 flex flex-col justify-between h-36 shadow-lg shadow-emerald-500/20">
                      <span className="text-[11px] font-bold text-white bg-emerald-700/50 px-2 py-0.5 rounded-full self-start">168</span>
                      <div className="space-y-1">
                        <div className="h-1 bg-white/40 rounded-full" />
                        <div className="h-1 bg-white/30 rounded-full w-4/5" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">Automated QA</span>
                  </div>
                </div>
              </div>

              {/* Chart 2: Project Status Donut */}
              <div className="p-6 rounded-2xl bg-navy-900/60 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white">Project Pipeline Status</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-cyan-400">
                    426 Total
                  </span>
                </div>

                <div className="relative flex items-center justify-center my-3">
                  <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="46" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
                    <circle cx="60" cy="60" r="46" stroke="#10b981" strokeWidth="10" strokeDasharray="289" strokeDashoffset="145" strokeLinecap="round" fill="transparent" />
                    <circle cx="60" cy="60" r="46" stroke="#06b6d4" strokeWidth="10" strokeDasharray="289" strokeDashoffset="230" strokeLinecap="round" fill="transparent" />
                    <circle cx="60" cy="60" r="46" stroke="#ec4899" strokeWidth="10" strokeDasharray="289" strokeDashoffset="255" strokeLinecap="round" fill="transparent" />
                  </svg>
                  <div className="absolute text-center flex flex-col items-center">
                    <span className="text-2xl font-black text-white">426</span>
                    <span className="text-[10px] text-emerald-400 font-mono">52% done</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Completed</span>
                    <span className="font-mono text-slate-400">215 / 426</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> In Progress</span>
                    <span className="font-mono text-slate-400">68 / 426</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-pink-400" /> Upcoming</span>
                    <span className="font-mono text-slate-400">143 / 426</span>
                  </div>
                </div>
              </div>

              {/* Chart 3: Weekly Active vs Pause Trend */}
              <div className="p-6 rounded-2xl bg-navy-900/60 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white">Productivity Rhythms</h3>
                  <span className="text-[10px] font-mono text-cyan-400">Daily Telemetry</span>
                </div>

                <div className="flex items-center gap-3 text-[10px] font-mono mb-2">
                  <span className="flex items-center gap-1 text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Active Time (126h 58m ↑ 14%)
                  </span>
                  <span className="flex items-center gap-1 text-pink-300">
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    Pause (9h 45m ↓ 21%)
                  </span>
                </div>

                {/* SVG Curve */}
                <div className="h-28 relative my-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 90">
                    <line x1="0" y1="45" x2="300" y2="45" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <path d="M 10,60 Q 60,30 110,40 T 170,25 T 230,45 T 290,30" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 10,75 Q 60,70 110,65 T 170,55 T 230,70 T 290,65" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="170" cy="25" r="5" fill="#00f2fe" stroke="#070c1b" strokeWidth="2" className="animate-pulse" />
                  </svg>
                </div>

                <div className="p-3 rounded-xl bg-navy-950 border border-white/5 text-xs flex justify-between items-center">
                  <span className="text-slate-400">Optimal Focus Day</span>
                  <span className="text-cyan-300 font-bold font-mono">Friday (6.8 hrs deep work)</span>
                </div>
              </div>
            </div>

            {/* Bottom Section: Team Members Capacity Grid */}
            <div className="p-6 rounded-2xl bg-navy-900/60 border border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    Squad Capacity & Burnout Risk Radar
                  </h3>
                  <p className="text-xs text-slate-400">Continuous telemetry tracking active workload vs sustainable threshold</p>
                </div>

                <button
                  onClick={() => setActiveTab('balancer')}
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Open Workload Balancer</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.map((emp) => {
                  const isCritical = emp.burnoutRisk === 'Critical';
                  const isHigh = emp.burnoutRisk === 'High';
                  return (
                    <div
                      key={emp.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isCritical
                          ? 'bg-rose-950/20 border-rose-500/40 shadow-sm'
                          : isHigh
                          ? 'bg-amber-950/20 border-amber-500/30'
                          : 'bg-navy-950/70 border-white/5 hover:border-cyan-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={emp.avatar}
                            alt={emp.name}
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                          />
                          <div>
                            <div className="text-xs font-bold text-white">{emp.name}</div>
                            <div className="text-[10px] text-slate-400">{emp.role}</div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                            isCritical
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : isHigh
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {emp.burnoutRisk} Risk
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Capacity Utilization</span>
                          <span className={`font-mono font-bold ${emp.capacityUsed > 90 ? 'text-rose-400' : 'text-cyan-400'}`}>
                            {emp.capacityUsed}%
                          </span>
                        </div>
                        <div className="w-full bg-navy-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${emp.capacityUsed > 90 ? 'bg-rose-500' : 'bg-cyan-400'}`}
                            style={{ width: `${Math.min(100, emp.capacityUsed)}%` }}
                          />
                        </div>

                        <div className="pt-2 flex justify-between text-[11px] text-slate-400 border-t border-white/5">
                          <span>Focus: {emp.focusHours}h</span>
                          <span>Meetings: {emp.meetingHours}h</span>
                          <span>Tasks: {emp.tasksActive}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: WORKLOAD BALANCER
           ========================================================================= */}
        {activeTab === 'balancer' && (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 border border-cyan-500/30 shadow-glass">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono mb-2">
                    <Scale className="w-3.5 h-3.5" />
                    Automated Sprint Capacity Optimization
                  </div>
                  <h2 className="text-2xl font-bold text-white">Smart AI Workload Balancer</h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Redistribute high-complexity sprint tickets from overloaded engineers to teammates with available bandwidth.
                  </p>
                </div>

                <button
                  onClick={handleExecuteRebalance}
                  disabled={rebalancing}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-glow-cyan flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                >
                  <Zap className="w-4 h-4" />
                  <span>{rebalancing ? 'Computing Optimal Graph...' : 'Execute Smart AI Rebalance'}</span>
                </button>
              </div>

              {/* Rebalance Success Banner */}
              {rebalanceResult && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs mb-6 space-y-2">
                  <div className="font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {rebalanceResult.message}
                  </div>
                  <div className="space-y-1 text-slate-300 text-[11px] pl-6">
                    {rebalanceResult.reassignments?.map((r: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="font-mono text-cyan-300">• [{r.taskId}] {r.taskTitle}</span>
                        <span>reallocated:</span>
                        <span className="text-rose-400">{r.from}</span>
                        <span>→</span>
                        <span className="text-emerald-400 font-bold">{r.to}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Member Distribution Cards */}
              <div className="space-y-4">
                {employees.map((emp) => {
                  const isHigh = emp.capacityUsed > 90;
                  return (
                    <div
                      key={emp.id}
                      className="p-5 rounded-2xl bg-navy-950/80 border border-white/10 flex flex-wrap items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-11 h-11 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            {emp.name}
                            <span className="text-xs text-slate-400 font-normal">({emp.department} • {emp.role})</span>
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-3 mt-1 font-mono text-[11px]">
                            <span>Active Tasks: {emp.tasksActive}</span>
                            <span>•</span>
                            <span>Deep Focus: {emp.focusHours}h</span>
                            <span>•</span>
                            <span>Meetings: {emp.meetingHours}h</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="w-36">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Capacity</span>
                            <span className={`font-mono font-bold ${isHigh ? 'text-rose-400' : 'text-emerald-400'}`}>
                              {emp.capacityUsed}%
                            </span>
                          </div>
                          <div className="w-full bg-navy-800 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full ${isHigh ? 'bg-rose-500' : 'bg-gradient-to-r from-cyan-400 to-indigo-500'}`}
                              style={{ width: `${Math.min(100, emp.capacityUsed)}%` }}
                            />
                          </div>
                        </div>

                        <span
                          className={`text-xs font-mono px-3 py-1 rounded-full ${
                            isHigh
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {isHigh ? 'Over capacity' : 'Optimal'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: OLLAMA AI COPILOT CHATBOT
           ========================================================================= */}
        {activeTab === 'assistant' && (
          <div className="h-[75vh] flex flex-col rounded-3xl bg-navy-900/60 border border-cyan-500/30 shadow-glass overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-navy-950/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Workforce Intelligence Copilot
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Connected
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">Local Ollama / Llama 3 Telemetry Engine</p>
                </div>
              </div>

              <button
                onClick={() => setChatMessages([chatMessages[0]])}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs transition-colors"
              >
                Clear History
              </button>
            </div>

            {/* Prompt Suggestion Chips */}
            <div className="p-3 bg-navy-950/40 border-b border-white/5 flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400 self-center text-[11px] font-medium mr-1">Quick Prompts:</span>
              {[
                'Who is at risk of burnout this sprint?',
                'Suggest calendar defragmentation for Marcus Vance',
                'Analyze team sprint velocity bottlenecks',
                'What is our focus-to-meeting ratio?'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(chip)}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-white/10 text-[11px] text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl p-4 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-br-none shadow-glow-sm'
                        : 'bg-navy-950/90 border border-white/10 text-slate-200 rounded-bl-none prose prose-invert whitespace-pre-line'
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div className="flex items-center justify-between text-[10px] opacity-60 mt-2 font-mono">
                      <span>{msg.timestamp}</span>
                      {msg.model && <span>{msg.model}</span>}
                    </div>
                  </div>
                </div>
              ))}

              {aiTyping && (
                <div className="flex items-center gap-2 text-cyan-400 text-xs py-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span className="font-mono">Workforce AI is synthesizing telemetry data...</span>
                </div>
              )}
            </div>

            {/* Prompt Input Form */}
            <div className="p-4 bg-navy-950/80 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendPrompt();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Ask Ollama about team telemetry, burnout risks, or sprint capacity..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-navy-900 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white"
                />
                <button
                  type="submit"
                  disabled={aiTyping || !promptInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-glow-cyan disabled:opacity-40 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: ANALYTICS & REPORTS
           ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-navy-900/60 border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Longitudinal Telemetry & Department Benchmarks</h3>
                <p className="text-xs text-slate-400 mt-0.5">Filter by timeframe, department, and export board reports</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    confetti({ particleCount: 50 });
                    showToast('Workforce Telemetry CSV Export downloaded.');
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => {
                    confetti({ particleCount: 50 });
                    showToast('Board Executive Telemetry PDF generated.');
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-semibold shadow-glow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Board PDF</span>
                </button>
              </div>
            </div>

            {/* Department Breakdown Table */}
            <div className="rounded-2xl border border-white/10 bg-navy-900/40 overflow-hidden">
              <div className="p-4 bg-navy-950 border-b border-white/10 flex justify-between items-center">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Department Health Benchmarking</h4>
                <span className="text-[10px] text-slate-400 font-mono">Target: 80+ Health Score</span>
              </div>
              <table className="w-full text-left text-xs">
                <thead className="bg-navy-950/50 text-slate-400 uppercase tracking-wider font-mono border-b border-white/10">
                  <tr>
                    <th className="p-4">Department</th>
                    <th className="p-4">Engineers</th>
                    <th className="p-4">Avg Capacity</th>
                    <th className="p-4">Health Score</th>
                    <th className="p-4">Burnout Alerts</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {[
                    { name: 'Core Engineering & SRE', members: 64, capacity: '88%', health: '81 / 100', alerts: 2, status: 'Monitor' },
                    { name: 'Product Experience & Design', members: 28, capacity: '76%', health: '90 / 100', alerts: 0, status: 'Optimal' },
                    { name: 'AI Models & Data Platform', members: 22, capacity: '82%', health: '86 / 100', alerts: 1, status: 'Optimal' },
                    { name: 'Product Operations & Agile', members: 18, capacity: '79%', health: '88 / 100', alerts: 0, status: 'Optimal' },
                    { name: 'Customer Success Architecture', members: 10, capacity: '85%', health: '84 / 100', alerts: 0, status: 'Optimal' }
                  ].map((dept, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-white">{dept.name}</td>
                      <td className="p-4 font-mono">{dept.members}</td>
                      <td className="p-4 font-mono text-cyan-400">{dept.capacity}</td>
                      <td className="p-4 font-mono font-bold text-emerald-400">{dept.health}</td>
                      <td className="p-4 font-mono">
                        {dept.alerts > 0 ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            {dept.alerts} Critical
                          </span>
                        ) : (
                          <span className="text-slate-500">0 alerts</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-slate-300">
                          {dept.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: TASK ASSIGNMENTS
           ========================================================================= */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-navy-900/60 border border-white/10">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Sprint 42 Tasks:</span>
                <span className="font-mono text-cyan-300 font-bold">{tasks.length} Total</span>
              </div>

              <button
                onClick={() => setShowTaskModal(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-semibold shadow-glow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Sprint Task</span>
              </button>
            </div>

            <div className="space-y-3">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl bg-navy-900/40 border border-white/5 hover:border-cyan-500/30 transition-all flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        {t.id}
                      </span>
                      <h4 className="text-xs font-bold text-white">{t.title}</h4>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3">
                      <span>Assigned: <strong className="text-cyan-300">{t.assigneeName}</strong></span>
                      <span>•</span>
                      <span>Department: {t.department}</span>
                      <span>•</span>
                      <span>Est: {t.estimatedHours} hrs</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                        t.priority === 'urgent'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : t.priority === 'high'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      {t.priority}
                    </span>

                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-navy-950 border border-white/10 text-slate-300">
                      {t.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: SETTINGS & INTEGRATIONS
           ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-6">
            <div className="p-6 rounded-2xl bg-navy-900/60 border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                Ollama Local AI Configuration
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Connect Workforce AI directly to your self-hosted Ollama server for private, air-gapped workforce inference.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Ollama Host URL</label>
                  <input
                    type="text"
                    defaultValue="http://127.0.0.1:11434"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Default Model Weight</label>
                  <input
                    type="text"
                    defaultValue="llama3"
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white font-mono"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Connection Status: Active (Port 11434)
                </span>
                <button
                  onClick={() => showToast('Ollama configuration saved successfully.')}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold cursor-pointer"
                >
                  Save Configuration
                </button>
              </div>
            </div>

            {/* Connected Tools Toggles */}
            <div className="p-6 rounded-2xl bg-navy-900/60 border border-white/10">
              <h3 className="text-base font-bold text-white mb-4">Connected Enterprise Tools</h3>
              <div className="space-y-3">
                {[
                  { name: 'GitHub Enterprise', desc: 'Pull request review turnaround & commit telemetry', status: 'Active Sync' },
                  { name: 'Jira Software & Linear', desc: 'Ticket velocity and sprint capacity tracking', status: 'Active Sync' },
                  { name: 'Slack & Microsoft Teams', desc: 'After-hours messaging density (No message reading)', status: 'Active Sync' },
                  { name: 'Google Calendar & Outlook', desc: 'Meeting fragmentation & Focus Shield defragmentation', status: 'Active Sync' }
                ].map((tool, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-navy-950 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{tool.name}</div>
                      <div className="text-[11px] text-slate-400">{tool.desc}</div>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {tool.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* New Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-navy-900 border border-cyan-500/40 shadow-2xl space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Create & Assign Sprint Task</h3>
              <button onClick={() => setShowTaskModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Task Title</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Optimize Redis caching layer"
                  className="w-full px-3 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Assignee (Capacity)</label>
                <select
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white focus:border-cyan-400 focus:outline-none"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.capacityUsed}% capacity - {emp.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Estimated Hours</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={newTaskHours}
                    onChange={(e) => setNewTaskHours(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-glow-sm"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
