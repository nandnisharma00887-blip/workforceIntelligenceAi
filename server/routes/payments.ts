// payments.ts - Razorpay order creation and verification routes
import { Router, Request, Response } from 'express';
import Razorpay from 'razorpay';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import mongoose from 'mongoose';

const router = Router();

// Load environment variables
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const JWT_SECRET = process.env.JWT_SECRET || 'workforce_jwt_super_secret_enterprise_key_2026';

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// Simple JWT auth middleware (reuse logic from auth routes)
function authenticate(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Missing Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    (req as any).userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}

// Define subscription plans (prices in paise)
const plans = {
  free: { price: 0, name: 'Free' },
  professional: { price: 49900, name: 'Professional' }, // ₹499.00
  enterprise: { price: 149900, name: 'Enterprise' }, // ₹1499.00
};

// POST /api/payments/create-order
router.post('/create-order', authenticate, async (req: Request, res: Response) => {
  const { planId } = req.body as { planId: keyof typeof plans };
  if (!planId || !(planId in plans)) {
    return res.status(400).json({ success: false, error: 'Invalid plan selected.' });
  }
  const plan = plans[planId];
  // For free plan, no order needed – just update subscription directly
  if (plan.price === 0) {
    // Update user subscription to free
    const userId = (req as any).userId;
    if (mongoose.connection.readyState === 1) {
      await User.findByIdAndUpdate(userId, {
        subscription: { plan: 'free', status: 'active', startedAt: new Date() },
      });
    }
    return res.json({ success: true, order: null, planId });
  }
  try {
    const order = await razorpay.orders.create({
      amount: plan.price,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { planId },
    });
    res.json({ success: true, order, planId });
  } catch (err: any) {
    console.error('Razorpay order creation error:', err);
    res.status(500).json({ success: false, error: 'Failed to create payment order.' });
  }
});

// POST /api/payments/verify
router.post('/verify', authenticate, async (req: Request, res: Response) => {
  const { order_id, payment_id, signature, planId } = req.body as {
    order_id: string;
    payment_id: string;
    signature: string;
    planId: keyof typeof plans;
  };
  if (!order_id || !payment_id || !signature || !planId) {
    return res.status(400).json({ success: false, error: 'Missing required fields.' });
  }
  // Verify signature using Razorpay utility
  const generatedSignature = require('crypto')
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest('hex');
  if (generatedSignature !== signature) {
    return res.status(400).json({ success: false, error: 'Invalid payment signature.' });
  }
  // Update user subscription status
  const userId = (req as any).userId;
  try {
    if (mongoose.connection.readyState === 1) {
      await User.findByIdAndUpdate(userId, {
        subscription: {
          plan: planId,
          status: 'active',
          razorpayOrderId: order_id,
          razorpayPaymentId: payment_id,
          startedAt: new Date(),
          // optional expiry logic could be added here
        },
      });
    }
    res.json({ success: true, message: 'Payment verified and subscription activated.' });
  } catch (err: any) {
    console.error('Subscription update error:', err);
    res.status(500).json({ success: false, error: 'Failed to update subscription.' });
  }
});

export default router;
