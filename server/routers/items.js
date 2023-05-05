import express from "express";
import verifyToken from "../middleware/verify-token.js";

const router = express.Router();

import {
    createItem,
    getAllItems,
    deleteItem,
    updateItem,
} from "../controllers/items.js";

// /api/items

// collection view
router.route("").post(verifyToken, createItem).get(verifyToken, getAllItems);
// record view
router
    .route("/:id")
    .delete(verifyToken, deleteItem)
    .put(verifyToken, updateItem);

export default router;
