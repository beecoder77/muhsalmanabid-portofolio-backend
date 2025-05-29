import { Request, Response } from 'express';
import redisClient from '../config/redis';

const VISIT_INTERVAL = 30 * 60 * 1000; // 30 minutes in milliseconds
const CACHE_TTL = 60 * 60; // 1 hour in seconds

export const trackVisit = async (req: Request, res: Response) => {
  try {
    const { fingerprint } = req.body;
    if (!fingerprint) {
      return res.status(400).json({ message: 'Fingerprint is required' });
    }

    const now = new Date().toISOString();
    const visitorKey = `visitor:${fingerprint}`;
    const statsKey = 'visitor:stats';

    // Update visitor's last visit
    await redisClient.set(visitorKey, now);

    // Update total visits
    const totalVisits = await redisClient.incr('visitor:total');

    // Update unique visitors count if this is a new visitor
    const isNewVisitor = !(await redisClient.exists(visitorKey));
    if (isNewVisitor) {
      await redisClient.incr('visitor:unique');
    }

    // Update last updated timestamp
    await redisClient.set('visitor:lastUpdated', now);

    res.json({
      message: 'Visit tracked successfully',
      isNewVisit: isNewVisitor
    });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ message: 'Error tracking visit' });
  }
};

export const getVisitStats = async (req: Request, res: Response) => {
  try {
    const [totalVisits, uniqueVisitors, lastUpdated] = await Promise.all([
      redisClient.get('visitor:total'),
      redisClient.get('visitor:unique'),
      redisClient.get('visitor:lastUpdated')
    ]);

    res.json({
      totalVisits: parseInt(totalVisits || '0'),
      uniqueVisitors: parseInt(uniqueVisitors || '0'),
      lastUpdated: lastUpdated || new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting visit stats:', error);
    res.status(500).json({ message: 'Error getting visit stats' });
  }
}; 