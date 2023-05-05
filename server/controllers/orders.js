import Cart from '../models/Cart.js';
import Address from '../models/Address.js';
import Order from '../models/Order.js';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/index.js';
import { isBuyer } from '../utils/role.js';
import { StatusCodes } from 'http-status-codes';

const createOrder = async (req, res, next) => {
  try {
    if (!isBuyer(req.userRole)) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const { cartId, addressId, address: addressObj } = req.body;
    if (!cartId) {
      throw new BadRequestError('values missing', {
        reason: 'missing',
        fields: ['cartId'],
      });
    }
    const cart = await Cart.findOne({ _id: cartId });
    if (!cart) {
      throw new NotFoundError(`No cart with id: ${cartId}`);
    }

    let address;
    if (addressId) {
      // existing address that has been saved before
      address = await Address.findOne({ _id: addressId });
      if (!address) {
        throw new NotFoundError(`No address with id: ${addressId}`);
      }
    } else if (addressObj) {
      const { address1, address2, city, state, zipCode } = addressObj;
      if (!address1 || !city || !state || !zipCode) {
        const fields = [];
        if (!address1) fields.push('address1');
        if (!city) fields.push('city');
        if (!state) fields.push('state');
        if (!zipCode) fields.push('zipCode');
        throw new BadRequestError('values missing', {
          reason: 'missing',
          fields,
        });
      }

      address = await Address.create({
        address1,
        address2,
        city,
        state,
        zipCode,
        owner: req.userId,
      });
    }

    if (!address) {
      throw new BadRequestError('values missing', {
        reason: 'missing',
        fields: ['address'],
      });
    }

    let order = await Order.create({
      items: cart.items,
      address: address._id,
      createdBy: req.userId,
    });
    order = await order.populate('items.item');
    order = await order.populate('address');

    await cart.remove();

    res.status(StatusCodes.CREATED).json({ order });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    if (!isBuyer(req.userRole)) {
      throw new UnauthenticatedError('Unauthorized');
    }
    const orders = await Order.find({ createdBy: req.userId })
      .sort({
        createdAt: -1,
      })
      .populate('items.item')
      .populate('address');

    res.status(StatusCodes.OK).json({ orders });
  } catch (error) {
    next(error);
  }
};

export { createOrder, getAllOrders };
