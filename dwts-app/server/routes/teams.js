import express from 'express';

import { addTeam, deleteTeam, fetchAll, searchTeams, updateTeam } from '../controllers/team.js';

const router = express.Router();

router.post('/add', addTeam);
router.patch('/update/:id', updateTeam);
router.get('/', fetchAll);
router.post('/search', searchTeams);
router.delete('/delete/:id', deleteTeam);

export default router;