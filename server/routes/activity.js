import express from 'express';
import { fetchRecentLikes } from '../controllers/activity.js';
import { grantAccess } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/likes', auth, grantAccess('readAny', 'like'), fetchRecentLikes);

export default router;
