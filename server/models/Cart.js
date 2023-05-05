import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        items: [
            {
                item: {
                    type: mongoose.Types.ObjectId,
                    ref: "Item",
                    required: [true, "please specify item"],
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: [1, "invalid quantity"],
                },
            },
        ],
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "please provide created by"],
        },
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
