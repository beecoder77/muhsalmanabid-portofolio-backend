import express from 'express';
import { getEducations, addEducation, updateEducation, deleteEducation } from '../controllers/educationController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.get('/', getEducations);
router.post('/', authMiddleware, addEducation);
router.put('/:id', authMiddleware, updateEducation);
router.delete('/:id', authMiddleware, deleteEducation);

export default router; 