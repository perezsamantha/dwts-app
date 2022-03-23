import express from 'express';

import {
    addCast,
    findCastById,
    updateCast,
    deleteCast,
    fetchAllCast,
} from '../controllers/tour.js';
import { grantAccess } from '../controllers/user.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, grantAccess('createAny', 'tour_cast'), addCast);
router.get('/', auth, grantAccess('readAny', 'tour_cast'), fetchAllCast);
router.get('/:id', auth, grantAccess('readAny', 'tour_cast'), findCastById);
router.patch(
    '/update/:id',
    auth,
    grantAccess('updateAny', 'tour_cast'),
    updateCast
);
// set pic?
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'tour_cast'),
    deleteCast
);

export default router;
