import Item from "../models/Item.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { checkPermission } from "../utils/permission.js";
import { isSeller } from "../utils/role.js";

const checkMissingFields = (name, description, price) => {
    const missing = [];
    if (!name) missing.push("name");
    if (!description) missing.push("description");
    if (!price) missing.push("price");
    return missing;
};

const createItem = async (req, res, next) => {
    try {
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            throw new BadRequestError("values missing", {
                reason: "missing",
                fields: checkMissingFields(name, description, price),
            });
        }

        const item = await Item.create({
            name,
            description,
            price,
            createdBy: req.userId,
        });

        res.status(StatusCodes.CREATED).json({
            _id: item._id,
            name: item.name,
            description: item.description,
            price: item.price,
        });
    } catch (error) {
        next(error);
    }
};

const getAllItems = async (req, res, next) => {
    try {
        let query = {};
        if (req.userId && isSeller(req.userRole)) {
            query = {
                createdBy: req.userId,
            };
        }
        const items = await Item.find(query).select(
            "_id name description price"
        );
        res.status(StatusCodes.OK).json({ items });
    } catch (error) {
        next(error);
    }
};

const deleteItem = async (req, res, next) => {
    try {
        const { id: itemId } = req.params;

        const item = await Item.findOne({ _id: itemId });

        if (!item) {
            throw new NotFoundError(`No item with id: ${itemId}`);
        }

        checkPermission(req, item);
        await item.remove();
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
};

const updateItem = async (req, res, next) => {
    try {
        const { id: itemId } = req.params;

        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            throw new BadRequestError("values missing", {
                reason: "missing",
                fields: checkMissingFields(name, description, price),
            });
        }

        const item = await Item.findOne({ _id: itemId });

        if (!item) {
            throw new NotFoundError(`No item with id: ${itemId}`);
        }
        checkPermission(req, item);

        await Item.findOneAndUpdate(
            { _id: itemId },
            req.body,
            // set the new option to true to return the document
            // after update was applied
            {
                runValidators: true,
            }
        );

        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
};

export { createItem, getAllItems, deleteItem, updateItem };
