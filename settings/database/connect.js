import Sequelize from 'sequelize';
import config from 'settings/database/config.js';

export default async ( databaseName, debug = false ) => {
    const database = new Sequelize(
        databaseName,
        config.username,
        config.password,
        {
            host:             config.domainName,
            dialect:          config.protocol,
            operatorsAliases: false,
            logging:          debug,
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
