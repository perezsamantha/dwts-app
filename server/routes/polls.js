import express from 'express';
import {
    addPoll,
    addPollOption,
    deletePoll,
    deletePollOption,
    fetchPolls,
    voteOption,
} from '../controllers/poll.js';
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
router.post('/', auth, grantAccess('readAny', 'poll'), fetchPolls);
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
