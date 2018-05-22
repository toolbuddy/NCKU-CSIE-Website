global.projectRoot = __dirname;

const express = require( 'express' );

const config = require( `${ global.projectRoot }/settings/server/config` );
const apis = require( `${ global.projectRoot }/apis/urls` );
const routes = require( `${ global.projectRoot }/routes/urls` );

// Start server
const server = express();
server.listen( config.port );

// Set static files routes
server.use( '/css', express.static( `${ global.projectRoot }/static/dist/css` ) );
server.use( '/js', express.static( `${ global.projectRoot }/static/dist/js` ) );

// Set HTML files routes
server.use( '/', routes );

// Set web api routes
server.use( '/api', apis );
