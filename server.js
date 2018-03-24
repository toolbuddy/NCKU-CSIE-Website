const express = require( 'express' );
const pug = require( 'pug' );

const config = require( './settings/server/config' );
const routes = require( './routes/urls' );

const server = express();

server.use(express.static(__dirname + '/static/dist'))

server.listen( config.port );

server.set( 'view engine', 'pug' );
server.use( '/', routes );
