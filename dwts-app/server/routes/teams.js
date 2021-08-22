import express from 'express';

import { addPic, addTeam, deleteTeam, fetchAll, findTeamById, searchTeams, updatePic, updateTeam } from '../controllers/team.js';

import upload from '../middleware/upload.js';
import upload2 from '../middleware/upload2.js';

const router = express.Router();

router.post('/add', addTeam);
router.patch('/update/:id', updateTeam);
router.patch('/updatePic/:id', upload, updatePic);
router.get('/', fetchAll);
router.post('/search', searchTeams);
router.delete('/delete/:id', deleteTeam);
router.get('/:id', findTeamById);
router.patch('/addPic/:id', upload2, addPic);

export default router;