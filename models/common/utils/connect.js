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
 */

const connect = databaseName => new Sequelize(
    databaseName,
    config.username,
    config.password,
    {
        host:             config.domainName,
        port:             config.port,
        dialect:          config.dialect,
        operatorsAliases: false,
        logging:          false,
        define:           {
            freezeTableName:  true,
            timestamps:       false,
        },
    }
);

export const faculty = connect( 'faculty' );
export const announcement = connect( 'announcement' );

export default {
    faculty,
    announcement,
};
