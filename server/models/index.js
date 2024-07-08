const env = process.env;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    env.CULTIVOX_DB_NAME,
    env.CULTIVOX_DB_USER,
    env.CULTIVOX_DB_PASSWORD,
    {
        host: env.CULTIVOX_DB_HOST,
        port: env.CULTIVOX_DB_PORT,
        dialect: 'mysql',
        define: {
            underscored: true
        },
        logging: false
    }
);


var models = {};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

//Models/tables
models.account = require('./account')(sequelize, Sequelize)

module.exports = models;