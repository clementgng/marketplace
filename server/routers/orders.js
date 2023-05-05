import express from 'express';
import verifyToken from '../middleware/verify-token.js';

const router = express.Router();

import { createOrder, getAllOrders } from '../controllers/orders.js';

router.route('').post(verifyToken, createOrder).get(verifyToken, getAllOrders);

export default router;
