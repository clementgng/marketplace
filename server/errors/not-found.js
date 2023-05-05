// could not find a record in the DB,
// which is different from the middleware/not-found.js,
// which deals with invalid URL

import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.status = StatusCodes.NOT_FOUND;
    }
}

export default NotFoundError;
