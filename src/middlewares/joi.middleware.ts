import { Request, Response, NextFunction, RequestHandler } from "express";
import { JoiObject } from "../types/router"
import logger from "../logger";

export function joiValidationMiddleware(joiObj: JoiObject | undefined): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await joiObj?.body?.validateAsync(req.body);
            await joiObj?.query?.validateAsync(req.query);
            await joiObj?.params?.validateAsync(req.params);

            next();
        } catch (err: any) {
            logger.error(JSON.stringify(err));
            res.status(400).json({ err: err.message });
        }
    }
}