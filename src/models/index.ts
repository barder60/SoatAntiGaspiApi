import { getConfig } from "../config";
import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";

const db: any = {};

export async function connectDb() {
	const config = getConfig();
	const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
		dialect: config.DB_DIALECT,
		host: config.DB_HOST
	});
	const modelsFiles = fs.readdirSync(__dirname).filter(file => !file.includes("index"));

	db.Sequelize = Sequelize;
	db.sequelize = sequelize;

	for (let i = 0; i < modelsFiles.length; i++) {
		const filePath = path.join(__dirname, modelsFiles[i]);
		const model = require(filePath)(sequelize, DataTypes);

		db[model.name];
	}

	return db;
}

export function getDb() {
	return db;
}
