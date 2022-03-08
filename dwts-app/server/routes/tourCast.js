import express from 'express';

import {
    addCast,
    findCastById,
    updateCast,
    deleteCast,
    fetchAllCast,
} from '../controllers/tour.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addCast);
router.get('/', fetchAllCast);
router.get('/:id', findCastById);
router.patch('/update/:id', updateCast);
router.delete('/delete/:id', deleteCast);

export default router;
