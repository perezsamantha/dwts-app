import express from 'express';
import {
    addPro,
    findProById,
    searchPros,
    updatePro,
    setProPic,
    deletePro,
    addPic,
    likePro,
    fetchAllPros,
} from '../controllers/pro.js';
import { grantAccess } from '../controllers/user.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';
import uploadExtraPicture from '../middleware/uploadExtraPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, grantAccess('createAny', 'pro'), addPro);
router.get('/', auth, grantAccess('readAny', 'pro'), fetchAllPros);
router.post('/search', auth, grantAccess('readAny', 'pro'), searchPros);
router.get('/:id', auth, grantAccess('readAny', 'pro'), findProById);
router.patch('/update/:id', auth, grantAccess('updateAny', 'pro'), updatePro);
router.patch(
    '/setPic/:id',
    auth,
    grantAccess('updateAny', 'pro'),
    uploadCoverPicture,
    setProPic
);
router.patch(
    '/addPic/:id',
    auth,
    grantAccess('updateAny', 'pro'),
    uploadExtraPicture,
    addPic
);
router.delete('/delete/:id', auth, grantAccess('deleteAny', 'pro'), deletePro);
router.patch(
    '/:id/likePro',
    auth,
    grantAccess('updateAny', 'pro_like'),
    likePro
);

export default router;
