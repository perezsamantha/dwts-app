import express from 'express';

import { addDance, addPic, deleteDance, fetchAllDances, findDanceById, getFavoriteDances, likeDance, searchDances, setDancePic, updateDance } from '../controllers/dance.js';

import upload from '../middleware/upload.js';
import upload2 from '../middleware/upload2.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addDance);
router.patch('/update/:id', updateDance);
router.patch('/setPic/:id', upload, setDancePic);
router.get('/', fetchAllDances);
router.get('/favorites', auth, getFavoriteDances);
router.post('/search', searchDances);
router.delete('/delete/:id', deleteDance);
router.get('/:id', findDanceById);
router.patch('/addPic/:id', upload2, addPic);
router.patch('/:id/likeDance', auth, likeDance);


export default router;