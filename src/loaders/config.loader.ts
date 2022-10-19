import { loadEnvFile } from "../config";
import logger from "../logger";

async function configLoader() {
    logger.info('⚪ Loading ' + process.env.NODE_ENV + ' environment config...');

    const config = loadEnvFile();

    logger.info('🟢 Config loaded !');

    return config;
}

export default configLoader;
