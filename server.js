const express = require( 'express' );
const pug = require( 'pug' );

const config = require( './settings/server/config' );
const routes = require( './routes/urls' );

const server = express();

const static_path = config.staticUrl();

const urlSettings = ( req, res, next ) => {
    res.locals.static = static_path;
    next();
};

server.listen( config.port );

server.set( 'view engine', 'pug' );
server.use( '/', urlSettings, routes );
server.use( config.static, express.static( 'static/dist' ) );


