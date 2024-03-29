import express from 'express';

import {
    addScore,
    deleteScore,
    fetchScores,
    findScoreById,
    setUserScore,
    updateScore,
} from '../controllers/score.js';
import { grantAccess } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, grantAccess('createAny', 'score'), addScore);
router.get('/', auth, grantAccess('readAny', 'score'), fetchScores);
router.get('/:id', auth, grantAccess('readAny', 'score'), findScoreById);
router.patch(
    '/update/:id',
    auth,
    grantAccess('updateAny', 'score'),
    updateScore
);
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'score'),
    deleteScore
);

router.patch(
    '/user/:id',
    auth,
    grantAccess('updateOwn', 'user_score'),
    setUserScore
);

export default router;
