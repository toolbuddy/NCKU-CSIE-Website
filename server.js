import path from 'path';

import express from 'express';

import { port, projectRoot, } from 'settings/server/config.js';
import language from 'settings/language/middleware';
import apis from 'apis/urls';
import routes from 'routes/urls';

/**
 * Create HTTP server instance.
 */

const server = express();

/**
 * Start HTTP server.
 */

server.listen( port );

/**
 * Set HTML template engine.
 */

server.locals.basedir = path.join( projectRoot, '/static/src/pug' );
server.set( 'view engine', 'pug' );
server.set( 'views', path.join( projectRoot, '/static/src/pug' ) );

/**
 * Setup static files routes.
 */

server.use( '/css', express.static( path.join( projectRoot, '/static/dist/css' ) ) );
server.use( '/js', express.static( path.join( projectRoot, '/static/dist/js' ) ) );

/**
 * @todo solve webpack conflict, server side render did not provide data url conversion.
 */

server.use( '/static/src/image', express.static( path.join( projectRoot, '/static/src/image' ) ) );

/**
 * Setup language option.
 */

server.use( language );

/**
 * Setup web page routes.
 */

server.use( '/', routes );

/**
 * Setup web api routes.
 */

server.use( '/api', apis );
