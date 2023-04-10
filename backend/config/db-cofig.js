/**
 * Import configuration file
 * config.js contains information about database
 */
const env = require('./config.json');

/* 
* Import Sequelize
*/
const Sequelize = require('sequelize');

/**
 * Connecting sequelize with the database
 */

const sequelize = new Sequelize(env.development.database, env.development.username, env.development.password, {
  host: env.development.host,
  dialect: env.development.dialect,
  // operatorsAliases: false,
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.images = require('../models/image.model.js')(sequelize, Sequelize); // Images


module.exports = db;