import express from 'express';
import { addPro, fetchAll, findProById, searchPros } from '../controllers/pro.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addPro);
//router.patch('/update/:id', updateTeam);
//router.patch('/updatePic/:id', upload, updatePic);
router.get('/', fetchAll);
//router.get('/favorites', auth, getFavoriteTeams);
router.post('/search', searchPros);
//router.delete('/delete/:id', deleteTeam);
router.get('/:id', findProById);
//router.patch('/addPic/:id', upload2, addPic);
//router.patch('/:id/likeTeam', auth, likeTeam);


export default router;