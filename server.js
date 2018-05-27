global.projectRoot = __dirname;

const express = require( 'express' );

const config = require( `${ global.projectRoot }/settings/server/config` );
const apis = require( `${ global.projectRoot }/apis/urls` );
const routes = require( `${ global.projectRoot }/routes/urls` );

function language ( req, res, next ) {
    if ( !req.query.language )
        req.query.language = config.language;

    next();
}

// Start server
const server = express();
server.listen( config.port );

// Set static files routes
server.use( '/css', express.static( `${ global.projectRoot }/static/dist/css` ) );
server.use( '/js', express.static( `${ global.projectRoot }/static/dist/js` ) );

// Set HTML files routes
server.use( '/', language, routes );

// Set web api routes
server.use( '/api', apis );
