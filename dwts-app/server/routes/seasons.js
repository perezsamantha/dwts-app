import express from 'express';
import { addSeason, deleteSeason, fetchSeasons, findSeasonById, updateSeason } from '../controllers/season.js';

const router = express.Router();

router.post('/add', addSeason);
router.get('/', fetchSeasons);
router.get('/:id', findSeasonById);
router.patch('/update/:id', updateSeason);
router.delete('/delete/:id', deleteSeason);
//setSeasonPic
//getFavoriteSeasons
//addPic
//likeSeason

export default router;