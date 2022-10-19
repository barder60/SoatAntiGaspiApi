import { Express } from 'express';
import configLoader from './config.loader';
import dbLoader from './db.loader';
import baseMiddlewaresLoader from './baseMiddlewares.loader';
import routerLoader from './router.loader';


async function startupLoaders(app: Express) {
    const config = await configLoader();
    const dbConnection = await dbLoader();

    await baseMiddlewaresLoader(app);
    await routerLoader(app);

    return { app, dbConnection, config };
}

export default startupLoaders;
