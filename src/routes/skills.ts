import express from 'express';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../controllers/skillsController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.get('/', getSkills);
router.post('/', authMiddleware, addSkill);
router.put('/:id', authMiddleware, updateSkill);
router.delete('/:id', authMiddleware, deleteSkill);

export default router; 