import logger from "../logger";
import { connectDb } from "../models";


async function dbLoader() {
    logger.info('⚪ Connecting db...');

    const dbConnection = await connectDb();

    logger.info('🟢 Db connected !')

    return dbConnection;
}

export default dbLoader;
