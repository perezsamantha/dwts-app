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
    findUserByUsername,
    updateAuth,
} from '../controllers/user.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.get('/authData', auth, fetchAuthData);
router.post('/logout', logout);
router.post('/add', auth, grantAccess('createAny', 'user'), addUser);
router.get('/', auth, grantAccess('readAny', 'user_admin'), fetchUsers);
router.get(
    '/admin/:id',
    auth,
    grantAccess('readAny', 'user_admin'),
    findUserById
);
router.get(
    '/:username',
    auth,
    grantAccess('readAny', 'user'),
    findUserByUsername
);
router.post('/search', auth, grantAccess('readAny', 'user'), searchUsers);
router.patch(
    '/update/admin/:id',
    auth,
    grantAccess('updateAny', 'user_admin'),
    updateUser
);
router.patch('/update/:id', auth, grantAccess('updateOwn', 'user'), updateAuth);
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
router.get('/verify/:id', auth, grantAccess('updateAny', 'user'), verifyEmail);

export default router;
