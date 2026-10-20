import { Router, Request, Response } from 'express';

const router = Router();

interface DemoBooking {
  id: string;
  name: string;
  workEmail: string;
  companyName: string;
  teamSize: string;
  interest: string;
  preferredDate: string;
  createdAt: string;
}

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const demoBookings: DemoBooking[] = [
  {
    id: 'demo-1',
    name: 'Robert Hastings',
    workEmail: 'robert@fintechscale.io',
    companyName: 'FintechScale Systems',
    teamSize: '250-1,000 employees',
    interest: 'Executive Workforce Telemetry & Burnout Prevention',
    preferredDate: '2026-10-24 14:00 EST',
    createdAt: new Date().toISOString()
  }
];

const contactMessages: ContactInquiry[] = [];

// POST /api/demo/book
router.post('/book', (req: Request, res: Response) => {
  const { name, workEmail, companyName, teamSize, interest, preferredDate } = req.body;

  if (!name || !workEmail || !companyName) {
    return res.status(400).json({ error: 'Name, work email, and company name are required' });
  }

  const newBooking: DemoBooking = {
    id: `demo-${Date.now()}`,
    name,
    workEmail,
    companyName,
    teamSize: teamSize || '50-250 employees',
    interest: interest || 'Full Platform Walkthrough',
    preferredDate: preferredDate || 'Next Available Slot',
    createdAt: new Date().toISOString()
  };

  demoBookings.unshift(newBooking);

  return res.status(201).json({
    success: true,
    message: 'Demo scheduled successfully! Our enterprise workforce architect has dispatched calendar invites.',
    booking: newBooking
  });
});

// POST /api/contact
router.post('/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const newContact: ContactInquiry = {
    id: `contact-${Date.now()}`,
    name,
    email,
    subject: subject || 'General Enterprise Inquiry',
    message,
    createdAt: new Date().toISOString()
  };

  contactMessages.unshift(newContact);

  return res.status(201).json({
    success: true,
    message: 'Thank you for reaching out. A specialist will reply within 2 business hours.',
    inquiry: newContact
  });
});

export default router;
