import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions";
import { Logger } from "../utils";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof HttpException) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            error: err.statusName,
            message: err.message
        });
    }

    Logger.error(err.message);

    return res.status(500).json({
        status: 500,
        error: "Internal Server Error"
    });

}