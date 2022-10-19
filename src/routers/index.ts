import * as path from "path";
import * as fs from "fs";
import { Router, RequestHandler, Request, Response, NextFunction } from "express";
import { Route } from "../types/router"
import { ApiError } from "../types/error";
import logger from "../logger";
import { joiValidationMiddleware } from "../middlewares/joi.middleware";


export function loadRoutes(): Router {
    const router = Router();
    const routerFiles = fs.readdirSync(__dirname).filter(file => !file.includes("index"));

    for (let i = 0; i < routerFiles.length; i++) {
        const { routes } = require(path.join(__dirname, routerFiles[i]));

        for (let j = 0; j < routes.length; j++) {
            let r: Route = routes[j];

            if (r.method === 'get') router.get(r.path, joiValidationMiddleware(r.validator), errorCatcher(r.handler));
            else if (r.method === 'post') router.post(r.path, joiValidationMiddleware(r.validator), errorCatcher(r.handler));
            else if (r.method === 'put') router.put(r.path, joiValidationMiddleware(r.validator), errorCatcher(r.handler));
            else if (r.method === 'delete') router.delete(r.path, joiValidationMiddleware(r.validator), errorCatcher(r.handler));
        }
    }

    router.use((req, res, next) => {
        const err = new ApiError('404 not found', 404);
        next(err);
    });

    router.use(errorHandler);

    return router;
}


function errorCatcher(controller: RequestHandler): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(controller(req, res, next)).catch(next);
}


async function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    logger.error(JSON.stringify(err));

    if (err instanceof ApiError) {
        res.status(err.code).json({ err: err.msg });
    } else {
        res.status(500).json({ err: "internal error" });
    }
}