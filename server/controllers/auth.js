import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            const fields = [];
            if (!name) fields.push("name");
            if (!email) fields.push("email");
            if (!password) fields.push("password");
            if (!role) fields.push("role");
            throw new BadRequestError("values missing", {
                reason: "missing",
                fields,
            });
        }

        const emailAlreadyExists = await User.findOne({ email });
        if (emailAlreadyExists) {
            throw new BadRequestError("values already existed", {
                reason: "existed",
                fields: ["email"],
            });
        }
        const user = await User.create({ name, email, password, role });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({
            userId: user._id,
            name: user.name,
            role: user.role,
            token,
        });
    } catch (error) {
        // validation error from User model
        if (error.name === "ValidationError") {
            error = new BadRequestError("values invalid", {
                reason: "invalid",
                fields: [Object.keys(error.errors)],
            });
        }
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            const fields = [];
            if (!email) fields.push("email");
            if (!password) fields.push("password");
            throw new BadRequestError("values missing", {
                reason: "missing",
                fields,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new UnauthenticatedError("invalid credential");
        }

        const match = await user.comparePassword(password);
        if (!match) {
            throw new UnauthenticatedError("invalid credential");
        }

        const token = user.createJWT();
        res.status(StatusCodes.OK).json({
            userId: user._id,
            name: user.name,
            role: user.role,
            token,
        });
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.userId });
        if (!user) {
            throw new UnauthenticatedError("invalid token");
        }

        res.status(StatusCodes.OK).json({
            userId: user._id,
            name: user.name,
            role: user.role,
        });
    } catch (error) {
        next(error);
    }
};

export { register, login, getUser };
