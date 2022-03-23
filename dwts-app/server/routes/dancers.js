import express from 'express';

import {
    addDancer,
    deleteDancer,
    fetchDancers,
    findDancerById,
    updateDancer,
} from '../controllers/dancer.js';
import { grantAccess } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, grantAccess('createAny', 'dancer'), addDancer);
router.get('/', auth, grantAccess('readAny', 'dancer'), fetchDancers);
router.get('/:id', auth, grantAccess('readAny', 'dancer'), findDancerById);
router.patch(
    '/update/:id',
    auth,
    grantAccess('updateAny', 'dancer'),
    updateDancer
);
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'dancer'),
    deleteDancer
);

export default router;
