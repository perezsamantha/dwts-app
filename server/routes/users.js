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
router.post('/add', auth, grantAccess('createAny', 'user'), addUser);
router.get('/', auth, grantAccess('readAny', 'user'), fetchUsers);
router.get('/:id', auth, grantAccess('readAny', 'user'), findUserById);
router.post('/search', auth, grantAccess('readAny', 'user'), searchUsers);
router.patch('/update/:id', auth, grantAccess('updateAny', 'user'), updateUser);
router.patch(
    '/setPic/:id',
    auth,
    grantAccess('updateAny', 'user'),
    uploadCoverPicture,
    setUserPic
);
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'user'),
    deleteUser
);
router.get(
    '/verify/:id',
    auth,
    grantAccess('updateOwn', 'profile'),
    verifyEmail
);

//router.get('/:id', auth, grantAccess("readAny", "profile"), findFanById);

export default router;
