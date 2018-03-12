// including public module
const express = require( 'express' );
const pug = require( 'pug' );
const path = require( 'path' );

// including configs
const config = require( './settings/server/config' );
const routes = require( './routes/urls' );

// start server
const server = express();
server.listen( config.port );

// set render engine
server.set( 'view engine', 'pug' );

// set static path
server.use( express.static( path.join( __dirname, 'public' ) ) );

// routing
server.use( '/', routes );
