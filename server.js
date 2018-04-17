// including public module
const express = require( 'express' );

const config = require( './settings/server/config' );
const routes = require( './routes/urls' );

// start server
const server = express();
server.listen( config.port );

// set render engine
server.set( 'view engine', 'pug' );
server.use( express.static( 'static/dist' ) );
server.use( '/', routes );
