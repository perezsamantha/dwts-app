import express from 'express';

import { addScore, deleteScore, fetchAllScores, findScoresByDance, updateScore } from '../controllers/Score.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addScore);
router.get('/', fetchAllScores);
router.get('/by_dance/:id', findScoresByDance)
router.patch('/update/:id', updateScore);
router.delete('/delete/:id', deleteScore);

export default router;