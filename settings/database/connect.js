module.exports = function( database ){

    const Sequelize = require('sequelize');
    const dbconfig = require('./config');
    const sequelize = new Sequelize( database, dbconfig.username, dbconfig.password, {
        host: dbconfig.host,
        dialect: 'mysql',
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    } );

    sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    return sequelize;

  }
