export interface EmployeeData {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  healthScore: number;
  burnoutRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
  capacityUsed: number; // percentage
  focusHours: number; // hrs/week
  meetingHours: number; // hrs/week
  tasksActive: number;
  tasksCompleted: number;
  recentActivity: string;
  burnoutFactors: string[];
}

export interface TaskItem {
  id: string;
  title: string;
  department: string;
  assignedTo: string;
  assigneeName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedHours: number;
  complexity: 'Low' | 'Medium' | 'High';
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  dueDate: string;
}

export const initialEmployees: EmployeeData[] = [
  {
    id: 'emp-1',
    name: 'Sarah Chen',
    role: 'Principal Cloud Architect',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    healthScore: 94,
    burnoutRisk: 'Low',
    capacityUsed: 78,
    focusHours: 29.5,
    meetingHours: 8.5,
    tasksActive: 4,
    tasksCompleted: 28,
    recentActivity: 'Optimized Kubernetes cluster auto-scaling',
    burnoutFactors: ['Healthy deep work blocks', 'Minimal after-hours pings']
  },
  {
    id: 'emp-2',
    name: 'Marcus Vance',
    role: 'Staff Frontend Engineer',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    healthScore: 68,
    burnoutRisk: 'High',
    capacityUsed: 96,
    focusHours: 18.2,
    meetingHours: 21.0,
    tasksActive: 9,
    tasksCompleted: 34,
    recentActivity: 'Merged Design System v3 migration PR',
    burnoutFactors: ['Context-switching across 5 repos', '21 hrs/wk in meetings', 'Late evening commits']
  },
  {
    id: 'emp-3',
    name: 'Elena Rostova',
    role: 'Lead Product Designer',
    department: 'Design',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    healthScore: 89,
    burnoutRisk: 'Low',
    capacityUsed: 74,
    focusHours: 26.0,
    meetingHours: 11.5,
    tasksActive: 5,
    tasksCompleted: 22,
    recentActivity: 'Published interactive onboarding prototype',
    burnoutFactors: ['Optimal meeting distribution', 'High creative autonomy']
  },
  {
    id: 'emp-4',
    name: 'David Okafor',
    role: 'Senior Data Scientist',
    department: 'AI & Research',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    healthScore: 74,
    burnoutRisk: 'Moderate',
    capacityUsed: 88,
    focusHours: 24.5,
    meetingHours: 14.5,
    tasksActive: 6,
    tasksCompleted: 19,
    recentActivity: 'Trained vector retrieval model for LLM pipeline',
    burnoutFactors: ['Compute queue wait delays', 'Back-to-back syncs on Thursdays']
  },
  {
    id: 'emp-5',
    name: 'Priya Patel',
    role: 'VP of Product Operations',
    department: 'Operations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    healthScore: 82,
    burnoutRisk: 'Moderate',
    capacityUsed: 84,
    focusHours: 16.0,
    meetingHours: 22.0,
    tasksActive: 7,
    tasksCompleted: 41,
    recentActivity: 'Finalized Q4 OKR alignment matrix',
    burnoutFactors: ['High cross-functional sync load']
  },
  {
    id: 'emp-6',
    name: 'Liam Becker',
    role: 'Senior DevOps Engineer',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
    healthScore: 59,
    burnoutRisk: 'Critical',
    capacityUsed: 104,
    focusHours: 12.0,
    meetingHours: 18.0,
    tasksActive: 11,
    tasksCompleted: 31,
    recentActivity: 'Triaged P1 database failover incident',
    burnoutFactors: ['3 on-call rotations this month', 'High context switching', 'Capacity threshold breached']
  }
];

export const initialTasks: TaskItem[] = [
  {
    id: 'tsk-101',
    title: 'Migrate Redis cluster to AWS ElastiCache serverless',
    department: 'Engineering',
    assignedTo: 'emp-6',
    assigneeName: 'Liam Becker',
    priority: 'urgent',
    estimatedHours: 14,
    complexity: 'High',
    status: 'in_progress',
    dueDate: '2026-10-22'
  },
  {
    id: 'tsk-102',
    title: 'Implement OAuth 2.1 PKCE authorization flow',
    department: 'Engineering',
    assignedTo: 'emp-2',
    assigneeName: 'Marcus Vance',
    priority: 'high',
    estimatedHours: 16,
    complexity: 'High',
    status: 'in_progress',
    dueDate: '2026-10-24'
  },
  {
    id: 'tsk-103',
    title: 'Design high-density data table components',
    department: 'Design',
    assignedTo: 'emp-3',
    assigneeName: 'Elena Rostova',
    priority: 'medium',
    estimatedHours: 8,
    complexity: 'Medium',
    status: 'in_progress',
    dueDate: '2026-10-25'
  },
  {
    id: 'tsk-104',
    title: 'Benchmarking Ollama inference latency on g4dn.xlarge',
    department: 'AI & Research',
    assignedTo: 'emp-4',
    assigneeName: 'David Okafor',
    priority: 'medium',
    estimatedHours: 10,
    complexity: 'Medium',
    status: 'todo',
    dueDate: '2026-10-28'
  },
  {
    id: 'tsk-105',
    title: 'Conduct weekly cross-functional capacity retro',
    department: 'Operations',
    assignedTo: 'emp-5',
    assigneeName: 'Priya Patel',
    priority: 'low',
    estimatedHours: 4,
    complexity: 'Low',
    status: 'todo',
    dueDate: '2026-10-23'
  },
  {
    id: 'tsk-106',
    title: 'Setup canary deployment pipeline for auth service',
    department: 'Engineering',
    assignedTo: 'emp-1',
    assigneeName: 'Sarah Chen',
    priority: 'medium',
    estimatedHours: 8,
    complexity: 'Medium',
    status: 'review',
    dueDate: '2026-10-21'
  }
];

export const metricsOverview = {
  healthScore: 84.7,
  healthScoreDelta: '+4.2% vs last month',
  burnoutRiskCount: 2,
  totalTeamMembers: 142,
  activeProjects: 24,
  averageCapacityUsed: 81.3,
  deepWorkHoursAvg: 23.4,
  meetingHoursAvg: 14.8,
  estimatedSavedHoursPerWeek: 312,
  productivityIndex: 92.4,
  distributionBalance: '88% Optimized',
  weeklyTrend: [
    { day: 'Mon', focusHours: 5.6, meetingHours: 2.8, outputScore: 88 },
    { day: 'Tue', focusHours: 6.2, meetingHours: 2.1, outputScore: 94 },
    { day: 'Wed', focusHours: 4.8, meetingHours: 3.9, outputScore: 78 },
    { day: 'Thu', focusHours: 5.9, meetingHours: 2.4, outputScore: 91 },
    { day: 'Fri', focusHours: 6.8, meetingHours: 1.2, outputScore: 96 }
  ],
  departmentBreakdown: [
    { name: 'Engineering', members: 64, capacity: 88, healthScore: 81, riskCount: 2 },
    { name: 'Product & Design', members: 28, capacity: 76, healthScore: 90, riskCount: 0 },
    { name: 'AI & Data', members: 22, capacity: 82, healthScore: 86, riskCount: 1 },
    { name: 'Operations & HR', members: 18, capacity: 79, healthScore: 88, riskCount: 0 },
    { name: 'Sales & Success', members: 10, capacity: 85, healthScore: 84, riskCount: 0 }
  ]
};
