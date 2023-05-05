import { StatusCodes } from 'http-status-codes';
import { UnauthenticatedError } from '../errors/index.js';
import Address from '../models/Address.js';
import { isBuyer } from '../utils/role.js';

const getAllAddresses = async (req, res, next) => {
  try {
    if (!isBuyer(req.userRole)) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const addresses = await Address.find({ owner: req.userId }).sort({
      createdAt: -1,
    });
    res.status(StatusCodes.OK).json({ addresses });
  } catch (error) {
    next(error);
  }
};

export { getAllAddresses };
