import express from 'express';
import {
    fetchRecentLikes,
    fetchRecentScores,
} from '../controllers/activity.js';
import { grantAccess } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/likes', auth, grantAccess('readAny', 'like'), fetchRecentLikes);
router.get('/scores', auth, grantAccess('readAny', 'score'), fetchRecentScores);

export default router;
