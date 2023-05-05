import { StatusCodes } from "http-status-codes";

const serverErrorMiddleware = (error, req, res, next) => {
    const { status, ...rest } = error;
    res.status(status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        // message is a built-in part of the error object,
        // which is not available through destruct
        message: error.message,
        ...rest,
    });
};

export default serverErrorMiddleware;
