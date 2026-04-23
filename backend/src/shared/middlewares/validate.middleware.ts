import { NextFunction, Response, Request, RequestHandler } from "express";
import z, { ZodType } from "zod";

export const validate = (schema: ZodType): RequestHandler => {

    return (req: Request, res: Response, next: NextFunction): void => {
        
        const result = schema.safeParse(req.body);

        if (!result.success) {

            const errors = result.error.issues.reduce<Record<string, string[]>>((acc, err) => {
               
                const field = err.path.length ? err.path.join(".") : "body";

                if (!acc[field]) {
                    acc[field] = [];
                }

                acc[field].push(err.message);

                return acc;
            }, {});

            res.status(400).json({
                errors,
            });

            return;
        }

        req.body = result.data;
        
        next();
    };
};