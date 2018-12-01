import path from 'path';

import express from 'express';

import config from 'settings/server/config.js';
import language from 'settings/language/middleware';
import apis from 'apis/urls';
import routes from 'routes/urls';

/**
 * Create HTTP server.
 */

const server = express();

/**
 * Start HTTP server.
 */

server.listen( config.port );

/**
 * Set static files routes.
 */

server.use( '/css', express.static( path.join( config.projectRoot, 'static/dist/css' ) ) );
server.use( '/js', express.static( path.join( config.projectRoot, 'static/dist/js' ) ) );
server.use( '/image', express.static( path.join( config.projectRoot, 'static/src/image' ) ) );

/**
 * Set language option.
 */

server.use( language );

/**
 * Set web page routes.
 */

server.use( '/', routes );

/**
 * Set web api routes.
 */

server.use( '/api', apis );
