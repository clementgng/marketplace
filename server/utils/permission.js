import { UnauthenticatedError } from "../errors/index.js";

// the user associated with the req is same as the user who created the item
export const checkPermission = (req, record) => {
    if (req.userId === record.createdBy.toString()) return;

    throw new UnauthenticatedError(
        `No permission to access record with id: ${record._id}`
    );
};
