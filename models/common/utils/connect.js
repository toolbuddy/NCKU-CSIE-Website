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

        // For writing to database
        timezone:         config.timezone,
        operatorsAliases: false,
        logging:          false,
        define:           {
            freezeTableName:  true,
            timestamps:       false,
        },
        dialectOptions: {
            connectTimeout: 1000000,
            dateStrings:    true,
            typeCast ( field, next ) {
                // For reading from database
                if ( field.type === 'DATETIME' )
                    return field.string();

                return next();
            },
        },
        pool: {
            max:     5,
            min:     0,
            idle:    20000,
            acquire: 20000,
        },
    }
);

export const faculty = connect( 'faculty' );
export const announcement = connect( 'announcement' );
export const staff = connect( 'staff' );
export const user = connect( 'user' );

export default {
    faculty,
    announcement,
    staff,
    user,
};
