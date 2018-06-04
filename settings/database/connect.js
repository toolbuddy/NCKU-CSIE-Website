const Sequelize = require( 'sequelize' );
const config = require( './config' );

module.exports = async ( databaseName, debug = false ) => {
    const database = new Sequelize(
        databaseName,
        config.username,
        config.password,
        {
            host:             config.host,
            dialect:          config.protocol,
            operatorsAliases: false,
            pool:             config.pool,
            logging:          debug,
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
