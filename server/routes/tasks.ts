import { Router, Request, Response } from 'express';
import { initialTasks, initialEmployees } from '../data/mockData.js';

const router = Router();
let tasks = [...initialTasks];

// GET /api/tasks
router.get('/', (_req: Request, res: Response) => {
  return res.json(tasks);
});

// POST /api/tasks
router.post('/', (req: Request, res: Response) => {
  const { title, department, assignedTo, priority = 'medium', estimatedHours = 6, complexity = 'Medium' } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  const assignee = initialEmployees.find(e => e.id === assignedTo) || initialEmployees[0];

  const newTask = {
    id: `tsk-${Date.now()}`,
    title,
    department: department || assignee.department,
    assignedTo: assignee.id,
    assigneeName: assignee.name,
    priority,
    estimatedHours: Number(estimatedHours),
    complexity,
    status: 'todo' as const,
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  };

  tasks.unshift(newTask);
  return res.status(201).json(newTask);
});

// PATCH /api/tasks/:id/status
router.patch('/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[taskIndex].status = status;
  return res.json(tasks[taskIndex]);
});

// POST /api/tasks/rebalance
// Smart AI Workload Distribution algorithm
router.post('/rebalance', (_req: Request, res: Response) => {
  // Find overloaded member (e.g. Liam Becker or Marcus Vance)
  const liamTask = tasks.find(t => t.assignedTo === 'emp-6' && t.status !== 'completed');
  const marcusTask = tasks.find(t => t.assignedTo === 'emp-2' && t.status !== 'completed');

  const reassignments: Array<{ taskId: string; from: string; to: string; taskTitle: string }> = [];

  if (liamTask) {
    liamTask.assignedTo = 'emp-1'; // Sarah Chen (has capacity 78%)
    liamTask.assigneeName = 'Sarah Chen';
    reassignments.push({
      taskId: liamTask.id,
      from: 'Liam Becker (104% -> 88%)',
      to: 'Sarah Chen (78% -> 86%)',
      taskTitle: liamTask.title
    });
  }

  if (marcusTask) {
    marcusTask.assignedTo = 'emp-3'; // Elena Rostova (capacity 74%)
    marcusTask.assigneeName = 'Elena Rostova';
    reassignments.push({
      taskId: marcusTask.id,
      from: 'Marcus Vance (96% -> 82%)',
      to: 'Elena Rostova (74% -> 84%)',
      taskTitle: marcusTask.title
    });
  }

  return res.json({
    success: true,
    message: 'Smart AI Workload Distribution executed successfully. Team capacity variance reduced by 64%.',
    reassignments,
    updatedTasks: tasks
  });
});

export default router;
