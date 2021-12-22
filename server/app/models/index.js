const dbConfig = require("../config/db.config.js");
Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: dbConfig.db,
  username: dbConfig.user,
  password: dbConfig.password,
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: 0
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const allModels = require("./model.js")(sequelize, Sequelize);

db.user = allModels.User;
db.task = allModels.Task;
db.project = allModels.Project;

module.exports = db;
