import express from 'express';
import { getProfile, updateProfile, getContactCounts, updateContactCounts } from '../controllers/profileController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.get('/', getProfile);
router.get('/contact-counts', getContactCounts);
router.put('/contact-counts', authMiddleware, updateContactCounts);
router.put('/', authMiddleware, updateProfile);

export default router; 