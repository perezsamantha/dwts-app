import express from 'express';
import {
    addEpisode,
    deleteEpisode,
    fetchAllEpisodes,
    findEpisodeById,
    updateEpisode,
} from '../controllers/episode.js';
import { grantAccess } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, grantAccess('createAny', 'episode'), addEpisode);
router.get('/', auth, grantAccess('readAny', 'episode'), fetchAllEpisodes);
router.get('/:id', auth, grantAccess('readAny', 'episode'), findEpisodeById);
router.patch(
    '/update/:id',
    auth,
    grantAccess('updateAny', 'episode'),
    updateEpisode
);
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'episode'),
    deleteEpisode
);

export default router;
