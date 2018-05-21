const path = require( 'path' );
const SequelizeAuto = require( 'sequelize-auto' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/database/config` );

module.exports = ( database ) => {
    return new SequelizeAuto(
        database,
        config.username,
        config.password,
        {
            host:       config.host,
            camelCase:  true,
            dialect:    config.protocol,
            directory:  `${ projectRoot }/models/${ database }/tables`,
            port:       config.port,
            additional: {
                timestamps: false,
            },
        }
    )
    .run( ( err ) => {
        if( err )
            throw err;
    } );
};
