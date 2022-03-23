import express from 'express';

import {
    addTour,
    deleteTour,
    fetchAllTours,
    findTourById,
    updateTour,
    setTourPic,
} from '../controllers/tour.js';
import { grantAccess } from '../controllers/user.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, grantAccess('createAny', 'tour'), addTour);
router.get('/', auth, grantAccess('readAny', 'tour'), fetchAllTours);
router.get('/:id', auth, grantAccess('readAny', 'tour'), findTourById);
router.patch('/update/:id', auth, grantAccess('updateAny', 'tour'), updateTour);
router.patch(
    '/setPic/:id',
    auth,
    grantAccess('updateAny', 'tour'),
    uploadCoverPicture,
    setTourPic
);
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'tour'),
    deleteTour
);

export default router;
