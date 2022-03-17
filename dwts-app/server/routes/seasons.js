import express from 'express';
import {
    addSeason,
    deleteSeason,
    fetchAllSeasons,
    findSeasonById,
    setSeasonPic,
    updateSeason,
} from '../controllers/season.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addSeason);
router.get('/', fetchAllSeasons);
router.get('/:id', findSeasonById);
router.patch('/update/:id', updateSeason);
router.delete('/delete/:id', deleteSeason);
router.patch('/setPic/:id', uploadCoverPicture, setSeasonPic);
//addPic
//likeSeason

export default router;
