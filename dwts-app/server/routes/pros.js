import express from 'express';
import { addPro, fetchAll, findProById, searchPros, updatePro, setProPic, getFavoritePros, deletePro, addPic, likePro } from '../controllers/pro.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';
import uploadExtraPicture from '../middleware/uploadExtraPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addPro);
router.patch('/update/:id', updatePro);
router.patch('/setPic/:id', uploadCoverPicture, setProPic);
router.get('/', fetchAll);
router.get('/favorites', auth, getFavoritePros);
router.post('/search', searchPros);
router.delete('/delete/:id', deletePro);
router.get('/:id', findProById);
router.patch('/addPic/:id', uploadExtraPicture, addPic);
router.patch('/:id/likePro', auth, likePro);


export default router;