import express from 'express';
import { addEpisode, deleteEpisode, fetchAllEpisodes, findEpisodeById, updateEpisode } from '../controllers/episode.js';

const router = express.Router();

router.post('/add', addEpisode);
router.get('/', fetchAllEpisodes);
router.get('/:id', findEpisodeById);
router.patch('/update/:id', updateEpisode);
router.delete('/delete/:id', deleteEpisode);

export default router;