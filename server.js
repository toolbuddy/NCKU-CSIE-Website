global.projectRoot = __dirname;

// including public module
const express = require( 'express' );

const config = require( `${ global.projectRoot }/settings/server/config` );
const routes = require( `${ global.projectRoot }/routes/urls` );

// start server
const server = express();
server.listen( config.port );

// set static route
server.use( '/css', express.static( `${ global.projectRoot }/static/dist/css` ) );
server.use( '/js', express.static( `${ global.projectRoot }/static/dist/js` ) );

// set dynamic route
server.use( '/', routes );
