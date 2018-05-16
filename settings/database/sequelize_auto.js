const path = require( 'path' );
const SequelizeAuto = require( 'sequelize-auto' );
const projectRoot = path.dirname( path.dirname( __dirname ) );
const config = require( `${ projectRoot }/settings/database/config` );

const auto = new SequelizeAuto(
    'teacher',
    config.username,
    config.password,
    {
        host: config.host,
        dialect: 'mysql',
        directory: `${ projectRoot }/models/teacher/tables`,
        port: config.port,
        additional: {
            timestamps: false,
        },
    } );

auto.run( ( err ) => {
    if ( err ) throw err;
} );
