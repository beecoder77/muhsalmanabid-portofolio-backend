import express from 'express';
import { getProjects, addProject, updateProject, deleteProject } from '../controllers/projectsController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.get('/', getProjects);
router.post('/', authMiddleware, addProject);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router; 