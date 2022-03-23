import express from 'express';

import {
    addJudge,
    deleteJudge,
    fetchAllJudges,
    findJudgeById,
    updateJudge,
} from '../controllers/Judge.js';
import { grantAccess } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, grantAccess('createAny', 'judge'), addJudge);
router.get('/', auth, grantAccess('readAny', 'judge'), fetchAllJudges);
router.get('/:id', auth, grantAccess('readAny', 'judge'), findJudgeById);
router.patch(
    '/update/:id',
    auth,
    grantAccess('updateAny', 'judge'),
    updateJudge
);
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'judge'),
    deleteJudge
);

export default router;
