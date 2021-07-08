import express from 'express';
import { getAll, searchFans } from '../controllers/fans.js';


const router = express.Router();

router.get("/", getAll);
router.post("/search", searchFans);


export default router;