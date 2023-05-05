import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new UnauthenticatedError("token is missing");
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { userId, userRole } = payload;
        if (!userId) {
            throw new UnauthenticatedError("invalid token");
        }
        req.userId = userId;
        req.userRole = userRole;
        next();
    } catch (error) {
        next(error);
    }
};

export default verifyToken;
