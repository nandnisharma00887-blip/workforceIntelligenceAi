export interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'employee' | 'admin';
  company: string;
  department: string;
  avatar: string;
  subscription?: {
    planId: string; // 'free', 'professional', 'enterprise'
    status: 'active' | 'inactive' | 'cancelled';
    validUntil?: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
  };
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  healthScore: number;
  burnoutRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
  capacityUsed: number;
  focusHours: number;
  meetingHours: number;
  tasksActive: number;
  tasksCompleted: number;
  recentActivity: string;
  burnoutFactors: string[];
}

export interface Task {
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

export interface MetricsOverview {
  healthScore: number;
  healthScoreDelta: string;
  burnoutRiskCount: number;
  totalTeamMembers: number;
  activeProjects: number;
  averageCapacityUsed: number;
  deepWorkHoursAvg: number;
  meetingHoursAvg: number;
  estimatedSavedHoursPerWeek: number;
  productivityIndex: number;
  distributionBalance: string;
  weeklyTrend: Array<{
    day: string;
    focusHours: number;
    meetingHours: number;
    outputScore: number;
  }>;
  departmentBreakdown: Array<{
    name: string;
    members: number;
    capacity: number;
    healthScore: number;
    riskCount: number;
  }>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
  model?: string;
}
