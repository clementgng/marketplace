import express from "express";
import verifyToken from "../middleware/verify-token.js";

const router = express.Router();

import {
    createCart,
    updateCart,
    getCart,
    deleteCart,
} from "../controllers/cart.js";

router.route("").post(verifyToken, createCart);
router
    .route("/:id")
    .get(verifyToken, getCart)
    .patch(verifyToken, updateCart)
    .delete(verifyToken, deleteCart);

export default router;
