import express from 'express';

import {
    addDance,
    addPic,
    deleteDance,
    fetchAllDances,
    findDanceById,
    likeDance,
    searchDances,
    updateDance,
} from '../controllers/dance.js';
import { grantAccess } from '../controllers/user.js';

import uploadExtraPicture from '../middleware/uploadExtraPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, grantAccess('createAny', 'dance'), addDance);
router.get('/', auth, grantAccess('readAny', 'dance'), fetchAllDances);
router.post('/search', auth, grantAccess('readAny', 'dance'), searchDances);
router.get('/:id', auth, grantAccess('readAny', 'dance'), findDanceById);
router.patch(
    '/update/:id',
    auth,
    grantAccess('updateAny', 'dance'),
    updateDance
);
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'dance'),
    deleteDance
);
router.patch(
    '/addPic/:id',
    auth,
    grantAccess('updateAny', 'dance'),
    uploadExtraPicture,
    addPic
);
router.patch(
    '/:id/likeDance',
    auth,
    grantAccess('updateAny', 'dance_like'),
    likeDance
);

export default router;
