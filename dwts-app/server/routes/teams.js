import express from 'express';

import {
    addPic,
    addTeam,
    deleteTeam,
    fetchAllTeams,
    findTeamById,
    likeTeam,
    searchTeams,
    setTeamPic,
    updateTeam,
} from '../controllers/team.js';
import { grantAccess } from '../controllers/user.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';
import uploadExtraPicture from '../middleware/uploadExtraPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, grantAccess('createAny', 'team'), addTeam);
router.get('/', auth, grantAccess('readAny', 'team'), fetchAllTeams);
router.post('/search', auth, grantAccess('readAny', 'team'), searchTeams);
router.get('/:id', auth, grantAccess('readAny', 'team'), findTeamById);
router.patch('/update/:id', auth, grantAccess('updateAny', 'team'), updateTeam);
router.patch(
    '/setPic/:id',
    auth,
    grantAccess('updateAny', 'team'),
    uploadCoverPicture,
    setTeamPic
);
router.patch(
    '/addPic/:id',
    auth,
    grantAccess('updateAny', 'team'),
    uploadExtraPicture,
    addPic
);
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'team'),
    deleteTeam
);
router.patch(
    '/:id/likeTeam',
    auth,
    grantAccess('updateAny', 'team_like'),
    likeTeam
);

export default router;
