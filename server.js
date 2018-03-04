const express = require( 'express' );

const pug = require( 'pug' );

const config = require( './settings/server/config.js' );
const routes = require( './routes/urls' );
const announce = require('./routes/announce');
const resource = require('./routes/resource');

const server = express();

server.listen( config.port );

server.set( 'view engine', 'pug' );
server.use( '/', routes );
server.use('/announce', announce);
server.use('/resource', resource);

