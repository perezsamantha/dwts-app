import express from 'express';
import {
    addSeason,
    deleteSeason,
    fetchAllSeasons,
    findSeasonById,
    setSeasonPic,
    updateSeason,
} from '../controllers/season.js';
import { grantAccess } from '../controllers/user.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, grantAccess('createAny', 'season'), addSeason);
router.get('/', auth, grantAccess('readAny', 'season'), fetchAllSeasons);
router.get('/:id', auth, grantAccess('readAny', 'season'), findSeasonById);
router.patch(
    '/update/:id',
    auth,
    grantAccess('updateAny', 'season'),
    updateSeason
);
router.patch(
    '/setPic/:id',
    auth,
    grantAccess('updateAny', 'season'),
    uploadCoverPicture,
    setSeasonPic
);
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'season'),
    deleteSeason
);
//addPic
//likeSeason

export default router;
