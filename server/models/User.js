import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        trim: true,
        required: [true, "please provide name"],
    },
    email: {
        type: String,
        required: [true, "please provide email address"],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "please provide a valid email address",
        },
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, "please provide password"],
    },
    role: {
        type: String,
        required: [true, "please provide a role"],
        enum: ["seller", "buyer"],
    },
});

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (sentPwd) {
    const match = await bcrypt.compare(sentPwd, this.password);
    return match;
};

userSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, userRole: this.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

const User = mongoose.model("User", userSchema);

export default User;
