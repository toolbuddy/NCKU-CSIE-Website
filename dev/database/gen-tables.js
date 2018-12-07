const path = require( 'path' );
const SequelizeAuto = require( 'sequelize-auto' );
const projectRoot = path.dirname( path.dirname( __dirname ) );

module.exports = ( database, databaseSettings ) => new SequelizeAuto(
    database,
    databaseSettings.username,
    databaseSettings.password,
    {
        host:       databaseSettings.domainName,
        camelCase:  true,
        dialect:    databaseSettings.protocol,
        directory:  path.join( projectRoot, `models/${ database }/tables` ),
        port:       databaseSettings.port,
        additional: {
            timestamps: false,
        },
    }
)
.run( ( err ) => {
    if ( err )
        throw err;
} );
