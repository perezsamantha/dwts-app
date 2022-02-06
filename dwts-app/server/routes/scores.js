import express from 'express';

import { addScore, deleteScore, fetchScores, findScoreById, updateScore } from '../controllers/Score.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addScore);
router.get('/', fetchScores);
router.get('/:id', findScoreById);
//router.get('/by_dance/:id', findScoresByDance)
router.patch('/update/:id', updateScore);
router.delete('/delete/:id', deleteScore);

export default router;