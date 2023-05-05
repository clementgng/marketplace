import Cart from '../models/Cart.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/index.js';
import { checkPermission } from '../utils/permission.js';
import { isBuyer } from '../utils/role.js';

// a user adds an item to his/her cart
const createCart = async (req, res, next) => {
  try {
    if (!isBuyer(req.userRole)) {
      throw new UnauthenticatedError('unauthorized');
    }
    const { item } = req.body;
    if (!item) {
      throw new BadRequestError('value missing', {
        reason: 'missing',
        fields: ['item'],
      });
    }

    let cart = await Cart.create({
      items: [
        {
          item: item,
          quantity: 1,
        },
      ],
      createdBy: req.userId,
    });
    cart = await cart.populate('items.item');

    res.status(StatusCodes.CREATED).json({ cart });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const { id: cartId } = req.params;

    const cart = await Cart.findOne({ _id: cartId }).populate('items.item');
    if (!cart) {
      throw new NotFoundError(`No cart with id: ${cartId}`);
    }

    checkPermission(req, cart);
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const { id: cartId } = req.params;
    const cart = await Cart.findOne({ _id: cartId });
    if (!cart) {
      throw new NotFoundError(`No cart with id: ${cartId}`);
    }
    checkPermission(req, cart);
    await cart.remove();
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

/*
All the possible use cases:
case 1: add a new item - item: {id: abc}
case 2: add an existing item - item: {id: abc}
case 3: update quantity of an existing item - item: {id: abc, quantity: 5}
case 4: delete an existing item - item: {id: abc, quantity: 0}
*/

const updateCart = async (req, res, next) => {
  try {
    const { id: cartId } = req.params;
    const { item } = req.body;

    let cart = await Cart.findOne({ _id: cartId });
    if (!cart) {
      throw new NotFoundError(`No cart with id: ${cartId}`);
    }
    checkPermission(req, cart);

    const idx = cart.items.findIndex(
      (cartEntry) => cartEntry.item.toString() === item.id
    );
    if (idx === -1) {
      // case 1
      // the current entry from the request is not in the cart yet
      cart.items.push({
        item: item.id,
        quantity: item.quantity || 1,
      });
    } else {
      // case 2, 3, 4
      if (item.quantity === undefined) {
        // case 2
        cart.items[idx].quantity++;
      } else {
        if (item.quantity === 0) {
          // case 4
          cart.items.splice(idx, 1);
        } else {
          // case 3
          cart.items[idx].quantity = item.quantity;
        }
      }
    }
    cart.save();
    cart = await cart.populate('items.item');
    // For the PUT request, since it is the replace approach,
    // the front end should have the complete info of the cart.
    // Therefore, we return 204 NO_CONTENT since wedo not need to return the cart
    // For the PATCH request, since it is the update approach,
    // the front end request only has the partial data.
    // Therefore, we should return 200 OK with the updated cart
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    next(error);
  }
};

export { createCart, getCart, deleteCart, updateCart };
