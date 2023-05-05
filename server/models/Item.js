import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide name"],
            maxLength: 100,
            trim: true,
        },
        description: {
            type: String,
            required: [true, "please provide description"],
        },
        price: {
            type: Number,
            default: 1,
            min: [1, "invalid price"],
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "please provide created by"],
        },
    },
    { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
