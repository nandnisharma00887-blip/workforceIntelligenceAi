import { Router, Request, Response } from 'express';
import { initialEmployees, metricsOverview } from '../data/mockData.js';

const router = Router();
let employees = [...initialEmployees];

// GET /api/analytics/overview
router.get('/overview', (_req: Request, res: Response) => {
  // Re-calculate real-time aggregates
  const total = employees.length;
  const criticalOrHighRisk = employees.filter(e => e.burnoutRisk === 'Critical' || e.burnoutRisk === 'High').length;
  const avgHealth = Math.round(employees.reduce((acc, e) => acc + e.healthScore, 0) / (total || 1));
  const avgCapacity = Math.round(employees.reduce((acc, e) => acc + e.capacityUsed, 0) / (total || 1));
  const avgFocus = Number((employees.reduce((acc, e) => acc + e.focusHours, 0) / (total || 1)).toFixed(1));
  const avgMeetings = Number((employees.reduce((acc, e) => acc + e.meetingHours, 0) / (total || 1)).toFixed(1));

  return res.json({
    ...metricsOverview,
    healthScore: avgHealth,
    burnoutRiskCount: criticalOrHighRisk,
    averageCapacityUsed: avgCapacity,
    deepWorkHoursAvg: avgFocus,
    meetingHoursAvg: avgMeetings,
  });
});

// GET /api/analytics/employees
router.get('/employees', (_req: Request, res: Response) => {
  return res.json(employees);
});

// GET /api/analytics/predictions
router.get('/predictions', (_req: Request, res: Response) => {
  return res.json({
    burnoutPredictions: [
      {
        employeeId: 'emp-6',
        name: 'Liam Becker',
        currentCapacity: '104%',
        burnoutRisk: 'Critical (89%)',
        primaryDrivers: ['3 on-call rotations', 'Exceeded 45 active hours', 'Context-switching factor 4.8x'],
        aiRecommendation: 'Reassign 2 high-complexity tasks immediately to Sarah Chen or Elena Rostova.'
      },
      {
        employeeId: 'emp-2',
        name: 'Marcus Vance',
        currentCapacity: '96%',
        burnoutRisk: 'High (76%)',
        primaryDrivers: ['21 hrs/week in meetings', 'Focus fragmentation index 0.32'],
        aiRecommendation: 'Activate "Focus Shield": Decline recurring status syncs and merge design system reviews.'
      }
    ],
    teamHealthTrend: 'Optimizing (+6% improvement over 14 days)',
    capacityForecastNextSprint: 'Estimated 82% (Ideal green zone)'
  });
});

export default router;
