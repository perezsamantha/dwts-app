import express from 'express';

import {
    addTour,
    deleteTour,
    fetchAllTours,
    findTourById,
    updateTour,
    setTourPic,
} from '../controllers/tour.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addTour);
router.patch('/update/:id', updateTour);
router.patch('/setPic/:id', uploadCoverPicture, setTourPic);
router.get('/', fetchAllTours);
router.delete('/delete/:id', deleteTour);
router.get('/:id', findTourById);

export default router;
