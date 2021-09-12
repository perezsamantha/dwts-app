import express from 'express';

import { addPic, addTeam, deleteTeam, fetchAll, findTeamById, getFavoriteTeams, likeTeam, searchTeams, updatePic, updateTeam } from '../controllers/team.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';
import uploadExtraPicture from '../middleware/uploadExtraPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addTeam);
router.patch('/update/:id', updateTeam);
router.patch('/updatePic/:id', uploadCoverPicture, updatePic);
router.get('/', fetchAll);
router.get('/favorites', auth, getFavoriteTeams);
router.post('/search', searchTeams);
router.delete('/delete/:id', deleteTeam);
router.get('/:id', findTeamById);
router.patch('/addPic/:id', uploadExtraPicture, addPic);
router.patch('/:id/likeTeam', auth, likeTeam);


export default router;