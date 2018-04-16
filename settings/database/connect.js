module.exports = function ( databaseName ) {

    const Sequelize = require( 'sequelize' );
    const databaseConfig = require( './config' );
    const database = new Sequelize(
        databaseName,
        databaseConfig.username,
        databaseConfig.password,
        {
            host: databaseConfig.host,
            dialect: 'mysql',
            operatorsAliases: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        }
    );

    database.authenticate()
        .then( () => {
            console.log( 'Connection has been established successfully.' );
        } )
        .catch( err => {
            console.error( 'Unable to connect to the database: ', err );
            throw Error( 'database need to be checked.' );
        } );

    return database;
};
