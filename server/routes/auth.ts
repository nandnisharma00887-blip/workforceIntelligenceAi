import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User, IUser } from '../models/User.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'workforce_jwt_super_secret_enterprise_key_2026';

// In-memory fallback cache when MongoDB is offline
interface MemoryUser {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  role: 'manager' | 'employee' | 'admin';
  company: string;
  department: string;
  avatar: string;
}
const memoryUsers: MemoryUser[] = [];

// Helper to check if MongoDB connection is active
function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

// Helper to sign JWT
function generateToken(user: { id: string; name: string; email: string; role: string; company?: string; department?: string; avatar?: string }): string {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company || 'Enterprise Corp',
      department: user.department || 'Engineering',
      avatar: user.avatar,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'manager', company = 'Apex Technologies Inc.', department = 'Engineering' } = req.body;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please provide a valid full name (at least 2 characters).' });
    }

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    const normalizedEmail = email.toLowerCase().trim();
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long.' });
    }

    // 2. Check if user already exists
    let existingUser = null;
    if (isDbConnected()) {
      existingUser = await User.findOne({ email: normalizedEmail });
    } else {
      existingUser = memoryUsers.find((u) => u.email === normalizedEmail);
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email address already exists. Please log in instead.'
      });
    }

    // 3. Hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}&backgroundColor=070C1B,1C2E5E`;

    let createdId = `usr-${Date.now()}`;
    let createdUserRecord: any = null;

    if (isDbConnected()) {
      const newUser = new User({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: role as any,
        company: company.trim(),
        department: department.trim(),
        avatar: avatarUrl,
      });

      const saved = await newUser.save();
      createdId = saved._id.toString();
      createdUserRecord = {
        id: createdId,
        name: saved.name,
        email: saved.email,
        role: saved.role,
        company: saved.company,
        department: saved.department,
        avatar: saved.avatar,
      };
    } else {
      const memoryRecord: MemoryUser = {
        id: createdId,
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: role as any,
        company: company.trim(),
        department: department.trim(),
        avatar: avatarUrl,
      };
      memoryUsers.push(memoryRecord);
      createdUserRecord = {
        id: createdId,
        name: memoryRecord.name,
        email: memoryRecord.email,
        role: memoryRecord.role,
        company: memoryRecord.company,
        department: memoryRecord.department,
        avatar: memoryRecord.avatar,
      };
    }

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Please log in with your credentials to access the platform.',
      user: createdUserRecord
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Registration failed due to a server error.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user: any = null;

    if (isDbConnected()) {
      user = await User.findOne({ email: normalizedEmail });
    } else {
      user = memoryUsers.find((u) => u.email === normalizedEmail);
    }

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    // Verify hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const userId = user._id ? user._id.toString() : user.id;
    const userPayload = {
      id: userId,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
      department: user.department,
      avatar: user.avatar,
    };

    const token = generateToken(userPayload);

    return res.json({
      success: true,
      token,
      user: userPayload
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Login failed due to a server error.' });
  }
});

// GET /api/auth/me
router.get('/me', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Missing or malformed Authorization header.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    if (isDbConnected()) {
      const dbUser = await User.findById(decoded.id).select('-password');
      if (dbUser) {
        return res.json({
          success: true,
          user: {
            id: dbUser._id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            company: dbUser.company,
            department: dbUser.department,
            avatar: dbUser.avatar,
          }
        });
      }
    } else {
      const memoryUser = memoryUsers.find((u) => u.id === decoded.id || u.email === decoded.email);
      if (memoryUser) {
        return res.json({
          success: true,
          user: {
            id: memoryUser.id,
            name: memoryUser.name,
            email: memoryUser.email,
            role: memoryUser.role,
            company: memoryUser.company,
            department: memoryUser.department,
            avatar: memoryUser.avatar,
          }
        });
      }
    }

    // If still valid token from payload
    return res.json({
      success: true,
      user: decoded
    });
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired authentication session.' });
  }
});

// Google OAuth integration
import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/google/callback';

const oauth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

// GET /api/auth/google - redirect user to Google consent screen
router.get('/google', (req: Request, res: Response) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
    prompt: 'select_account',
  });
  res.redirect(authUrl);
});

// GET /api/auth/google/callback - handle Google OAuth callback
router.get('/google/callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  if (!code) {
    return res.status(400).json({ success: false, error: 'Missing code parameter.' });
  }
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    // Verify ID token
    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token as string,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ success: false, error: 'Invalid Google token payload.' });
    }
    const email = payload.email.toLowerCase();
    const name = payload.name || email.split('@')[0];
    const googleId = payload.sub;

    // Find existing user by googleId or email
    let userRecord: any = null;
    if (isDbConnected()) {
      userRecord = await User.findOne({ $or: [{ googleId }, { email }] });
    } else {
      userRecord = memoryUsers.find((u) => u.email === email);
    }
    // If user does not exist, create a new one (no password)
    if (!userRecord) {
      const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=070C1B,1C2E5E`;
      if (isDbConnected()) {
        const newUser = new User({
          name,
          email,
          password: '', // placeholder, will not be used for Google login
          role: 'employee',
          avatar: avatarUrl,
          googleId,
        });
        const saved = await newUser.save();
        userRecord = saved;
      } else {
        const memUser: any = {
          id: `usr-${Date.now()}`,
          name,
          email,
          password: '',
          role: 'employee',
          avatar: avatarUrl,
          googleId,
        };
        memoryUsers.push(memUser);
        userRecord = memUser;
      }
    } else {
      // Ensure googleId is stored for future logins
      if (isDbConnected()) {
        if (!userRecord.googleId) {
          userRecord.googleId = googleId;
          await userRecord.save();
        }
      } else {
        // memoryUsers already contains the object reference
        if (!userRecord.googleId) userRecord.googleId = googleId;
      }
    }

    // Build JWT payload
    const userId = userRecord._id ? userRecord._id.toString() : userRecord.id;
    const token = generateToken({
      id: userId,
      name: userRecord.name,
      email: userRecord.email,
      role: userRecord.role,
      company: userRecord.company,
      department: userRecord.department,
      avatar: userRecord.avatar,
    });

    // Redirect back to frontend with token
    const frontendBase = process.env.FRONTEND_URL || 'http://localhost:5173';
    const redirectUrl = `${frontendBase}/auth/google/callback?token=${token}`;
    res.redirect(redirectUrl);
  } catch (err: any) {
    console.error('Google OAuth error:', err);
    return res.status(500).json({ success: false, error: 'Google authentication failed.' });
  }
});

// Existing routes above remain unchanged

export default router;
