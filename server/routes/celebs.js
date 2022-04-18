import express from 'express';

import {
    addCeleb,
    deleteCeleb,
    fetchAllCelebs,
    findCelebById,
    updateCeleb,
    setCelebPic,
} from '../controllers/celeb.js';
import { grantAccess } from '../controllers/user.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, grantAccess('createAny', 'celeb'), addCeleb);
router.get('/', auth, grantAccess('readAny', 'celeb'), fetchAllCelebs);
router.get('/:id', auth, grantAccess('readAny', 'celeb'), findCelebById);
router.patch(
    '/update/:id',
    auth,
    grantAccess('updateAny', 'celeb'),
    updateCeleb
);
router.patch(
    '/setPic/:id',
    auth,
    grantAccess('updateAny', 'celeb'),
    uploadCoverPicture,
    setCelebPic
);
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'celeb'),
    deleteCeleb
);

export default router;
