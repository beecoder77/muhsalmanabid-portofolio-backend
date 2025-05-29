import express from 'express';
import { getExperiences, addExperience, updateExperience, deleteExperience } from '../controllers/experienceController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.get('/', getExperiences);
router.post('/', authMiddleware, addExperience);
router.put('/:id', authMiddleware, updateExperience);
router.delete('/:id', authMiddleware, deleteExperience);

export default router; 