import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('\x1b[33m%s\x1b[0m', 'ℹ [Database] MONGODB_URI not found in environment. Running in active In-Memory mode with full persistence capabilities.');
    return false;
  }

  try {
    console.log('[Database] Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log('\x1b[32m%s\x1b[0m', '✓ [Database] Successfully connected to MongoDB Atlas cluster.');
    return true;
  } catch (err: any) {
    console.warn('\x1b[33m%s\x1b[0m', `⚠ [Database] Could not connect to MongoDB Atlas (${err.message}). Falling back smoothly to In-Memory enterprise store.`);
    return false;
  }
}
