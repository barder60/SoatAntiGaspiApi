import { Express } from "express";
import { loadRoutes } from "../routers";
import logger from "../logger";

async function routerLoader(app: Express) {
    logger.info('⚪ Loading ' + process.env.NODE_ENV + ' environment config...');

    const router = loadRoutes();

    app.use("/", router);

    logger.info('🟢 Config loaded !');

    return app;
}

export default routerLoader;
