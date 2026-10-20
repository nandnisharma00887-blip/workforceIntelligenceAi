import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'manager' | 'employee' | 'admin';
  company?: string;
  department?: string;
  avatar?: string;
  createdAt: Date;
  // Optional Google OAuth identifier
  googleId?: string;
  // Subscription information for Razorpay plans
  subscription?: {
    plan: string; // e.g., 'free', 'professional', 'enterprise'
    status: string; // e.g., 'active', 'inactive', 'canceled'
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    startedAt?: Date;
    expiresAt?: Date;
  };
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['manager', 'employee', 'admin'],
      default: 'manager',
    },
    company: {
      type: String,
      default: 'Apex Technologies Inc.',
      trim: true,
    },
    department: {
      type: String,
      default: 'Engineering',
      trim: true,
    },
    avatar: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Fallback safety if model is compiled multiple times during hot reload
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
