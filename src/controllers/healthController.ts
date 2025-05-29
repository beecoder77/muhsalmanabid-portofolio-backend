import { Request, Response } from 'express';
import mongoose from 'mongoose';
import redisClient from '../config/redis';

export const healthCheck = async (req: Request, res: Response) => {
  try {
    // Check MongoDB connection status
    const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    // Check Redis connection status
    // The redis client automatically manages the connection. Checking client.isReady indicates if it's connected.
    const redisStatus = redisClient.isReady ? 'connected' : 'disconnected';

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      database: mongoStatus,
      redis: redisStatus
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      error: (error as Error).message
    });
  }
}; 