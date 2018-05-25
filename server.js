global.projectRoot = __dirname;

// including public module
const express = require( 'express' );

<<<<<<< HEAD
const config = require( `${ global.projectRoot }/settings/server/config` );
const routes = require( `${ global.projectRoot }/routes/urls` );
=======
const config = require( './settings/server/config' );
const routes = require( './routes/urls' );
>>>>>>> 3ec0d20f1a804faf1bf670dfb70232276d2df1a0

// start server
const server = express();
server.listen( config.port );

<<<<<<< HEAD
// set static route
server.use( '/css', express.static( `${ global.projectRoot }/static/dist/css` ) );
server.use( '/js', express.static( `${ global.projectRoot }/static/dist/js` ) );

// set dynamic route
=======
server.set( 'view engine', 'pug' );
>>>>>>> 3ec0d20f1a804faf1bf670dfb70232276d2df1a0
server.use( '/', routes );
