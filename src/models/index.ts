'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = 'development';
const config = {
    "username": 'user',
    "password": 'password',
    "database": 'antigaspi',
    "host": "postgres",
    "dialect": "postgres"
};
const db: any = {};

let sequelize: any;

sequelize = new Sequelize(config.database, config.username, config.password, config);

function getConnection() {
  fs
    .readdirSync(__dirname)
    .filter((file: string) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach((file: any) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      console.log("dfefefef", model)
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  console.log('\x1b[31m' + __dirname + '\x1b[37m');

  return db;
}

export default getConnection;