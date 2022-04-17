import express from 'express';

import {
    addUser,
    grantAccess,
    deleteAuth,
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
    googleAuth,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    setAuthPic,
} from '../controllers/user.js';

import uploadCoverPicture from '../middleware/uploadCoverPicture.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/googleAuth', googleAuth);
router.get('/verify/:token', verifyEmail);
router.post('/resendVerification', resendVerificationEmail);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);
router.get('/authData', auth, fetchAuthData);
router.post('/logout', logout);
router.post('/add', auth, grantAccess('createAny', 'user'), addUser);
router.get('/', auth, grantAccess('readAny', 'user'), fetchUsers);
router.get('/admin/:id', auth, grantAccess('readAny', 'user'), findUserById);
router.get(
    '/:username',
    auth,
    grantAccess('readAny', 'profile'),
    findUserByUsername
);
router.post('/search', auth, grantAccess('readAny', 'profile'), searchUsers);
router.patch(
    '/update/auth',
    auth,
    grantAccess('updateOwn', 'profile'),
    updateAuth
);
router.patch('/update/:id', auth, grantAccess('updateAny', 'user'), updateUser);
router.patch(
    '/setPic/auth',
    auth,
    grantAccess('updateOwn', 'profile'),
    uploadCoverPicture,
    setAuthPic
);
router.patch(
    '/setPic/:id',
    auth,
    grantAccess('updateAny', 'user'),
    uploadCoverPicture,
    setUserPic
);
router.delete(
    '/delete/auth',
    auth,
    grantAccess('deleteOwn', 'profile'),
    deleteAuth
);
router.delete(
    '/delete/:id',
    auth,
    grantAccess('deleteAny', 'user'),
    deleteUser
);

export default router;
