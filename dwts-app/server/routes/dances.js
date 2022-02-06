import express from 'express';

import { addDance, addPic, deleteDance, fetchDances, findDanceById, likeDance, searchDances, updateDance } from '../controllers/dance.js';

//import uploadCoverPicture from '../middleware/uploadCoverPicture.js';
import uploadExtraPicture from '../middleware/uploadExtraPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addDance);
router.patch('/update/:id', updateDance);
//router.patch('/setPic/:id', uploadCoverPicture, setDancePic);
router.get('/', fetchDances);
//router.get('/favorites', auth, getFavoriteDances);
router.post('/search', searchDances);
router.delete('/delete/:id', deleteDance);
router.get('/:id', findDanceById);
router.patch('/addPic/:id', uploadExtraPicture, addPic);
router.patch('/:id/likeDance', auth, likeDance);


export default router;