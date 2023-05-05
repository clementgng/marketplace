import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        item: {
          type: mongoose.Types.ObjectId,
          ref: 'Item',
          required: [true, 'please specify item'],
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, 'invalid quantity'],
        },
      },
    ],
    address: {
      type: mongoose.Types.ObjectId,
      ref: 'Address',
      required: [true, 'Please provide address'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide created by'],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
