import path from 'path';

import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import {
    port,
    projectRoot,
} from 'settings/server/config.js';
import contentSecurityPolicy from 'settings/server/content-security-policy.js';
import staticFile from 'routes/static.js';
import language from 'routes/utils/language.js';
import routes from 'routes/urls.js';
import apis from 'apis/urls.js';

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
 * Remove default express HTTP response header `x-powered-by`.
 */

server.set( 'x-powered-by', false );

/**
 * Put easter egg in HTTP response header.
 */

server.use( ( {}, res, next ) => {
    res.set( 'x-powered-by', 'toolbuddy' );
    next();
} );

/**
 * Set `Content-Security-Policy-Report-Only` header.
 * Settings can be found at `settings/server/content-security-policy`.
 * Don't change this unless you know what you are doing.
 * @todo reportOnly: false.
 */

server.use( helmet.contentSecurityPolicy( {
    directives: contentSecurityPolicy(),
    loose:      false,
    reportOnly: true,
} ) );

/**
 * Compress all HTTP response body using gzip.
 * Use this to minimize transmit data.
 */

server.use( compression() );

/**
 * Setup static files routes.
 */

server.use( '/static', staticFile );

/**
 * Url-encoded parser for HTTP request body.
 * Request header `Content-Type` can only be one of the supported types.
 * Mainly used by `<form method='POST' enctype='x-www-form-urlencoded'>`.
 */

server.use( express.urlencoded( {
    extended: true,
    limit:    '5GB',
    type:     [
        'application/x-www-form-urlencoded',
        'multipart/form-data',
        'text/*',
        '*/json',
        'application/xhtml+xml',
        'application/xml',
    ],
} ) );

/**
 * JSON parser for HTTP request body.
 * Request header `Content-Type` can only be JSON related MIME types.
 * Maximum supported JSON size is 5GB.
 */

server.use( express.json( {
    limit: '5GB',
    type:  '*/json',
} ) );

/**
 * Setup language option.
 */

server.use( language );

/**
 * Setup web api routes.
 */

server.use( '/api', apis );

/**
 * Setup web page routes.
 */

server.use( '/', routes );
