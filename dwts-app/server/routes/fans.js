import express from 'express';
import { getAll, searchFans, grantAccess, findFanById } from '../controllers/fans.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get("/", getAll);
router.post("/search", auth, grantAccess("readAny", "profile"), searchFans);
router.get('/:id', auth, grantAccess("readAny", "profile"), findFanById);


export default router;