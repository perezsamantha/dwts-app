import express from 'express';

import { addJudge, deleteJudge, fetchAllJudges, findJudgeById, updateJudge } from '../controllers/Judge.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addJudge);
router.patch('/update/:id', updateJudge);
router.get('/', fetchAllJudges);
router.delete('/delete/:id', deleteJudge);
router.get('/:id', findJudgeById);

export default router;