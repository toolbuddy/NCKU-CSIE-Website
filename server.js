global.projectRoot = __dirname;

const express = require( 'express' );

const config = require( `${ global.projectRoot }/settings/server/config` );
const language = require( `${ global.projectRoot }/settings/language/middleware` );
const apis = require( `${ global.projectRoot }/apis/urls` );
const routes = require( `${ global.projectRoot }/routes/urls` );

// Start server.
const server = express();
server.listen( config.port );

// Set static files routes.
server.use( '/css', express.static( `${ global.projectRoot }/static/dist/css` ) );
server.use( '/js', express.static( `${ global.projectRoot }/static/dist/js` ) );

// Set language option.
server.use( language );

// Set web server routes.
server.use( '/', routes );

// Set web server api routes.
server.use( '/api', apis );
