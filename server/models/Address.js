import { TOO_MANY_REQUESTS } from 'http-status-codes';
import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    address1: {
      type: String,
      required: [true, 'Please provide address'],
      trim: true,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      required: [true, 'Please provide city'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'Please provide state'],
      trim: true,
    },
    zipCode: {
      type: String,
      required: [true, 'Please provide zip code'],
      minLength: 5,
      maxLength: 5,
      trim: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide owner'],
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model('Address', addressSchema);

export default Address;
