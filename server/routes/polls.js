import express from 'express';
import {
    addPoll,
    addPollOption,
    deletePoll,
    deletePollOption,
    fetchAllPolls,
    voteOption,
} from '../controllers/polls.js';
import { grantAccess } from '../controllers/user.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, grantAccess('createAny', 'poll'), addPoll);
router.post(
    '/addOption',
    auth,
    grantAccess('createAny', 'poll'),
    addPollOption
);
router.get('/', auth, grantAccess('readAny', 'poll'), fetchAllPolls);
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'poll'),
    deletePoll
);
router.delete(
    '/deleteOption/:id',
    auth,
    grantAccess('deleteAny', 'poll'),
    deletePollOption
);
router.post(
    '/:id/vote',
    auth,
    grantAccess('updateAny', 'poll_option'),
    voteOption
);

export default router;
