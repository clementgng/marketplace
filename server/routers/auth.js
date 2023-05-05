import express from "express";
import verifyToken from "../middleware/verify-token.js";

const router = express.Router();

import { register, login, getUser } from "../controllers/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/current").get(verifyToken, getUser);

export default router;
