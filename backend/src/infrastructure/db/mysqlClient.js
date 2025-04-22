const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
  models: [path.join(__dirname, "../models")],
  logging: false,
});

module.exports = { sequelize };
