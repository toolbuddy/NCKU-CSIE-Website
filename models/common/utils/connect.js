/**
 * Database connection module.
 */

const Sequelize = require('sequelize');
const {username, password, domainName, port, dialect, timezone} = require('settings/database/config.js');

/**
 * Connect web server to database `databaseName`.
 *
 * Settings can be found in file `settings/database/config.js`.
 * If file not found, run command `npm run pre-build:database` to create file.
 * @async
 * @param  {string} databaseName - Name of database to be connected.
 * @throws {Error}  Throw error when connection failed.
 */

const connect = databaseName => new Sequelize(
    databaseName,
    username,
    password,
    {
        host: domainName,
        port,
        dialect,
        timezone,
        operatorsAliases: false,
        logging: false,
        define: {
            freezeTableName: true,
            timestamps: false,
        },
        dialectOptions: {
            connectTimeout: 1000000,
            dateStrings: true,
            typeCast (field, next) {
                if (field.type === 'DATETIME')
                    return field.string();

                return next();
            },
        },
        pool: {
            max: 5,
            min: 0,
            idle: 20000,
            acquire: 20000,
        },
    },
);

const faculty = connect('faculty');
const announcement = connect('announcement');
const staff = connect('staff');
const user = connect('user');

module.exports = {
    faculty,
    announcement,
    staff,
    user,
};
