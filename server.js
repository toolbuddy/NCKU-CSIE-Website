import http from 'http';

import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import { port, } from 'settings/server/config.js';
import contentSecurityPolicy from 'settings/server/content-security-policy.js';
import csie from 'routes/urls.js';
import apis from 'apis/urls.js';

/**
 * Create HTTP server instance.
 */

const server = express();
const httpServer = http.createServer( server );

/**
 * Start HTTP server.
 */

httpServer.listen( port );

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
 * Setup web api routes.
 */

server.use( '/api', apis );

/**
 * Setup web page routes.
 */

server.use( '/', csie );

/**
 * Setup error handler.
 */

server.use(
    ( err, {}, res, {} ) => {
        const status = err.status || 500;
        res.sendStatus( status );
        console.error( 'still get fuck' );
    }
);
