import express from 'express';

import { addTeam, fetchAll, searchTeams, updateTeam } from '../controllers/team.js';

const router = express.Router();

router.post('/add', addTeam);
router.post('/update/:id', updateTeam);
router.get('/', fetchAll);
router.post('/search', searchTeams)

export default router;