import express from 'express';
import { trackVisit, getVisitStats } from '../controllers/visitorController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.post('/track', trackVisit);
router.get('/stats', authMiddleware, getVisitStats);

export default router; 