import dotenv from "dotenv";
import { Env } from "../types/config";

let config: Env;


export function loadEnvFile(): Env {
	checkEnvFile();
	dotenv.config({ path: '.env.' + process.env.NODE_ENV });
	config = checkConfig(getConfigFromProcessEnv());

	return config;
}

function checkEnvFile(): void {
	if (!['development', 'production', 'test'].includes(process.env.NODE_ENV))
		throw new Error("Please set a correct NODE_ENV [development | production | test]");
}


function getConfigFromProcessEnv(): Env {
	return {
		NODE_ENV: process.env.NODE_ENV,
		API_PORT: process.env.API_PORT,
		DB_USER: process.env.DB_USER,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_PORT: process.env.DB_PORT,
		DB_HOST: process.env.DB_HOST,
		DB_DRIVER: process.env.DB_DRIVER,
		DB_NAME: process.env.DB_NAME,
		DB_DIALECT: process.env.DB_DIALECT
	};
}


function checkConfig(config: Env): Env {
	for (const [key, value] of Object.entries(config))
		if (value === undefined)
			throw new Error(`Missing key ${key} in .env file`);

	return config;
}


export function getConfig(): Env {
	return config;
}
