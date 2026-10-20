import { Router, Request, Response } from 'express';
import axios from 'axios';
import { initialEmployees, metricsOverview } from '../data/mockData.js';

const router = Router();
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3';

// System prompt injecting real-time workforce context
const buildSystemContext = () => {
  return `You are Workforce Productivity Intelligence (WPI) AI Assistant, an enterprise-grade AI advisor for Engineering Managers, People Ops, and Executives.
Current Workforce Telemetry:
- Team Health Score: ${metricsOverview.healthScore}/100
- Overloaded / Burnout Alert Members: Liam Becker (104% capacity, DevOps), Marcus Vance (96% capacity, Frontend)
- Healthy Bandwidth Members: Sarah Chen (78% capacity), Elena Rostova (74% capacity)
- Average Deep Work Hours: ${metricsOverview.deepWorkHoursAvg} hrs/week
- Average Meeting Load: ${metricsOverview.meetingHoursAvg} hrs/week
- Recommendation Tone: Concise, analytical, empathetic, actionable enterprise advice.`;
};

// Fallback intelligent responder when local Ollama is not active
function generateFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('burnout') || q.includes('risk') || q.includes('overload') || q.includes('stress')) {
    return `### 🚨 Real-Time Burnout Risk Analysis

Based on biometric and work telemetry from Jira, GitHub, and Google Calendar:

1. **Liam Becker (DevOps)**:
   - **Risk Level**: **Critical (89%)**
   - **Active Capacity**: **104%** (44.5 hrs tracked this sprint)
   - **Root Cause**: 3 consecutive on-call incident triage shifts + 11 concurrent tasks.
   - **Recommended Action**: Reallocate *T-101 (ElastiCache migration)* to Sarah Chen immediately. Impose a 48-hour quiet period on non-P1 Slack pings.

2. **Marcus Vance (Staff Frontend)**:
   - **Risk Level**: **High (76%)**
   - **Active Capacity**: **96%**
   - **Root Cause**: 21.0 hours spent in meetings this week; context fragmented across 5 PR reviews.
   - **Recommended Action**: Implement "Focus Shield" — consolidate 4 recurring syncs into async Loom updates.`;
  }

  if (q.includes('workload') || q.includes('distribut') || q.includes('rebalance') || q.includes('capacity')) {
    return `### ⚖️ Smart Workload Balancing Recommendation

Current Team Variance: **30% spread between max and min utilization**.

- **Surplus Bandwidth Available**:
  - **Sarah Chen**: 78% utilized (12 hrs available headroom)
  - **Elena Rostova**: 74% utilized (14 hrs available headroom)

- **Suggested Balancing Flow**:
  1. Transfer **T-101 (Migrate Redis cluster)** from Liam Becker → Sarah Chen.
  2. Shift **T-102 (OAuth 2.1 PKCE)** code review leadership from Marcus Vance → Elena Rostova.
  3. **Predicted Post-Rebalance State**: All team members within safe **78% - 86%** productivity corridors. Zero members in critical red zone.`;
  }

  if (q.includes('meeting') || q.includes('calendar') || q.includes('sync')) {
    return `### 📅 Meeting Fatigue & Calendar Optimization Report

- **Current Organization Avg**: 14.8 hours in meetings / week.
- **Top Inefficient Meeting Pattern**: "Status check-ins" accounting for **6.2 hours** across Engineering.
- **AI Recommendation**:
  - Convert 3 daily standups into automated 9:00 AM Slack AI summaries.
  - Establish **"No-Meeting Wednesdays"** company-wide, predicted to recover **240 engineer hours/week** (est. $18,400 monthly productivity value).`;
  }

  if (q.includes('health') || q.includes('score') || q.includes('overview') || q.includes('velocity')) {
    return `### 📊 Enterprise Workforce Health Score: 84.7 / 100

- **Focus-to-Meeting Ratio**: **1.58** (Target: > 1.80)
- **Sprint Delivery Reliability**: **92.4%**
- **Cognitive Load Index**: **Moderate-Stable**
- **Key Highlight**: Deep work hours improved by **+4.2%** week-over-week following the deployment of automated PR reviewer round-robins.`;
  }

  return `### 🤖 Workforce Intelligence Insight

I have analyzed the current organizational telemetry across active sprints, repository commits, and calendar density:

- **Organizational Focus Index**: **73.8%** Deep Work Ratio.
- **Top Optimization Opportunity**: 2 team members currently exceed the 90% sustainable capacity threshold (Liam Becker & Marcus Vance).
- **Proactive Next Step**: Click **"Smart Workload Rebalance"** in the Manager Dashboard to normalize team workloads with one click, or ask me for deep-dive team telemetry!`;
}

// POST /api/ai/chat
router.post('/chat', async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const systemPrompt = buildSystemContext();

  try {
    // Attempt local Ollama connection
    const response = await axios.post(
      `${OLLAMA_HOST}/api/generate`,
      {
        model: OLLAMA_MODEL,
        prompt: `${systemPrompt}\n\nUser Question: ${prompt}\n\nWorkforce AI Answer:`,
        stream: false,
      },
      { timeout: 3500 }
    );

    if (response.data && response.data.response) {
      return res.json({
        reply: response.data.response,
        source: 'ollama',
        model: OLLAMA_MODEL,
        latencyMs: 320
      });
    }
  } catch (error: any) {
    // Ollama not running or timed out -> gracefully use enterprise fallback engine
  }

  const fallback = generateFallbackResponse(prompt);
  return res.json({
    reply: fallback,
    source: 'intelligence_engine',
    model: `${OLLAMA_MODEL} (Enterprise Telemetry Fallback - start Ollama with 'ollama run ${OLLAMA_MODEL}' to use local LLM weights)`,
    latencyMs: 140
  });
});

// POST /api/ai/analyze-workload
router.post('/analyze-workload', (_req: Request, res: Response) => {
  return res.json({
    summary: 'Workload distribution is moderately skewed. 2 team members are in burnout danger zones.',
    actions: [
      { action: 'Rebalance 2 tasks from Liam Becker to Sarah Chen', impact: 'Decreases Liam load by 16%' },
      { action: 'Protect Marcus Vance focus time for 3 days', impact: 'Restores 9.5 hours of uninterrupted deep work' },
      { action: 'Consolidate architectural syncs', impact: 'Eliminates 3.5 hrs/week fragmented time' }
    ],
    predictedVelocityGain: '+18.4%'
  });
});

export default router;
