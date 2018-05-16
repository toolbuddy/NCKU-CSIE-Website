const Sequelize = require( 'sequelize' );
const config = require( './config' );

module.exports = async ( databaseName ) => {
    const database = new Sequelize(
        databaseName,
        config.username,
        config.password,
        {
            host: config.host,
            dialect: 'mysql',
            operatorsAliases: false,
            pool: config.pool,
        }
    );

    try {
        await database.authenticate();
    } catch( err ) {
        console.error( 'Unable to connect to the database: ', err );
        throw Error( 'database need to be checked.' );
    }

    return database;
};
