import express from 'express';

import {
    addUser,
    grantAccess,
    deleteUser,
    fetchUsers,
    findUserById,
    searchUsers,
    setUserPic,
    signIn,
    signUp,
    updateUser,
    verifyEmail,
    fetchAuthData,
    logout,
} from '../controllers/user.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.get('/authData', auth, fetchAuthData);
router.post('/logout', logout);
router.post('/add', addUser);
router.get('/', fetchUsers);
router.get('/:id', findUserById);
router.post('/search', searchUsers);
router.patch('/update/:id', updateUser);
router.patch('/setPic/:id', uploadCoverPicture, setUserPic);
router.delete('/delete/:id', deleteUser);
router.get('/verify/:id', verifyEmail);

//router.get('/:id', auth, grantAccess("readAny", "profile"), findFanById);

export default router;
