global.rootdir = __dirname;

// including public module
const express = require( 'express' );

const config = require( `${ global.rootdir }/settings/server/config` );
const routes = require( `${ global.rootdir }/routes/urls` );

// start server
const server = express();
server.listen( config.port );

// set render engine
server.set( 'views', `${ global.rootdir }/views` );
server.set( 'view engine', 'pug' );
server.locals.basedir = global.rootdir;

// set static route
server.use( express.static( `${ global.rootdir }/static/dist` ) );

// set dynamic route
server.use( '/', routes );
