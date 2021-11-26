
import express from 'express';

import { grantAccess, deleteUser, fetchAllUsers, findUserById, searchUsers, setUserPic, signIn, signUp, updateUser } from '../controllers/user.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.get('/', fetchAllUsers);
router.get('/:id', findUserById);
router.post('/search', searchUsers);
router.patch('/update/:id', updateUser);
router.patch('/updatePic/:id', uploadCoverPicture, setUserPic);
router.delete('/delete/:id', deleteUser);

//router.get('/:id', auth, grantAccess("readAny", "profile"), findFanById);


export default router;