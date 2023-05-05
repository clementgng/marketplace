import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class BadRequestError extends CustomAPIError {
    constructor(message, details) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
        this.details = details;
    }
}

export default BadRequestError;
