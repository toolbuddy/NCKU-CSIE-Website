global.projectRoot = __dirname;

// Including public module
const express = require( 'express' );

const config = require( `${ global.projectRoot }/settings/server/config` );
const routes = require( `${ global.projectRoot }/routes/urls` );

// Start server
const server = express();
server.listen( config.port );

// Set static route
server.use( '/css', express.static( `${ global.projectRoot }/static/dist/css` ) );
server.use( '/js', express.static( `${ global.projectRoot }/static/dist/js` ) );

// Set dynamic route
server.use( '/', routes );
