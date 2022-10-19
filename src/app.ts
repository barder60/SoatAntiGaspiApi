import express from "express";
import startupLoaders from "./loaders";
import logger from "./logger";

async function startApp() {
	try {
		const app = express();
		const t0 = performance.now();
		const { dbConnection, config } = await startupLoaders(app);

		if (config.NODE_ENV === 'test')
			return { app, dbConnection };

		app.listen(config.API_PORT, () => {
			logger.info('🟢 App listening on port ' + config.API_PORT + ' !');
			const t1 = performance.now();
			logger.info("⚪ Startup duration " + (t1 - t0).toFixed(3) + " ms");
		});
	} catch (err) {
		logger.error("🔴 Startup Failed: " + err);
	}
}

if (require.main == module) {
	startApp();
}
