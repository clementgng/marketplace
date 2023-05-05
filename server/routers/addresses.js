import express from 'express';
import verifyToken from '../middleware/verify-token.js';

const router = express.Router();

import { getAllAddresses } from '../controllers/addresses.js';

router.route('').get(verifyToken, getAllAddresses);

export default router;
