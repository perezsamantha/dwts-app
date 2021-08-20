import express from 'express';

import { addTeam, deleteTeam, fetchAll, findTeamById, searchTeams, updatePic, updateTeam } from '../controllers/team.js';

import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/add', addTeam);
router.patch('/update/:id', updateTeam);
router.patch('/updatePic/:id', upload, updatePic);
router.get('/', fetchAll);
router.post('/search', searchTeams);
router.delete('/delete/:id', deleteTeam);
router.get('/:id', findTeamById);

export default router;