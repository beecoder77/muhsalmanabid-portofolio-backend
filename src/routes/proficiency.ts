import express from 'express';
import { getProficiencies, addProficiency, updateProficiency, deleteProficiency } from '../controllers/proficiencyController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.get('/', getProficiencies);
router.post('/', authMiddleware, addProficiency);
router.put('/:id', authMiddleware, updateProficiency);
router.delete('/:id', authMiddleware, deleteProficiency);

export default router; 