/**
 * Database connection module.
 */

import Sequelize from 'sequelize';
import config from 'settings/database/config.js';

/**
 * Connect web server to database `databaseName`.
 *
 * Settings can be found in file `settings/database/config.js`.
 * If file not found, run command `npm run pre-build:database` to create file.
 * @async
 * @param  {string} databaseName - Name of database to be connected.
 * @throws {Error}  Throw error when connection failed.
 * @see {@link https://github.com/sequelize/sequelize/blob/3e5b8772ef75169685fc96024366bca9958fee63/lib/errors.js} for error information.
 */

export default async ( databaseName ) => {
    const database = new Sequelize(
        databaseName,
        config.username,
        config.password,
        {
            host:             config.domainName,
            dialect:          config.protocol,
            operatorsAliases: false,
            logging:          false,
            dialectOptions:   {
                useUTC:   false,
            },
            timezone: '+08:00',
        }
    );

    try {
        await database.authenticate();
    }
    catch ( err ) {
        console.error( 'Unable to connect to the database: ', err );
        throw new Error( 'database need to be checked.' );
    }

    return database;
};
