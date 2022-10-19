import fs from "fs";
import { Express, json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import logger from "../logger";
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';

async function baseMiddlewaresLoader(app: Express) {
    const swaggerFile = yaml.load(fs.readFileSync('../swagger/swgger_output.yaml', 'utf8'));

    app.use(helmet());
    app.use(compression());
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(cors());
    app.use(morgan("dev", {
        stream: {
            write: message => logger.http(message)
        }
    }));
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

    return app;
}

export default baseMiddlewaresLoader;
