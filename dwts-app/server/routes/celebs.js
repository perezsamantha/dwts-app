import express from 'express';

import { addCeleb, deleteCeleb, fetchAllCelebs, findCelebById, updateCeleb, setCelebPic } from '../controllers/Celeb.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addCeleb);
router.patch('/update/:id', updateCeleb);
router.patch('/setPic/:id', uploadCoverPicture, setCelebPic);
router.get('/', fetchAllCelebs);
//router.post('/search', searchCelebs);
router.delete('/delete/:id', deleteCeleb);
router.get('/:id', findCelebById);


export default router;