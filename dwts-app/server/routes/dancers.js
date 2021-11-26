import express from 'express';

import { addDancer, deleteDancer, fetchAllDancers, findDancersByDance, updateDancer } from '../controllers/dancer.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addDancer);
router.get('/', fetchAllDancers);
router.get('/by_dance/:id', findDancersByDance)
router.patch('/update/:id', updateDancer);
router.delete('/delete/:id', deleteDancer);

export default router;