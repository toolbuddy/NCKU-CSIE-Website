const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const config = require( './settings/server/config' );
const routes = require( './routes/urls' );
const apis = require( './apis/urls' );

const server = express();

server.use( bodyParser.json() );
server.use( bodyParser.urlencoded( { extended: true } ) );

server.listen( config.port );

server.set( 'view engine', 'pug' );
server.use( config.root, routes );
server.use( config.static, express.static( 'static/dist' ) );
