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

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';
import uploadExtraPicture from '../middleware/uploadExtraPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addTeam);
router.patch('/update/:id', updateTeam);
router.patch('/setPic/:id', uploadCoverPicture, setTeamPic);
router.get('/', fetchAllTeams);
router.post('/search', searchTeams);
router.delete('/delete/:id', deleteTeam);
router.get('/:id', findTeamById);
router.patch('/addPic/:id', uploadExtraPicture, addPic);
router.patch('/:id/likeTeam', auth, likeTeam);

export default router;
