/**
 * Router module for route `/`.
 *
 * Including following sub-routes:
 * - `/`
 * - `/search`
 */

import express from 'express';

import staticHtml from 'routes/utils/static-html.js';
import { urlEncoded, jsonParser, } from 'routes/utils/body-parser.js';

const router = express.Router( {
    caseSensitive: true,
    mergeParams:   false,
    strict:        false,
} );

/**
 * Resolve URL `/`.
 */

router
.route( [
    '/',
    '/index',
] )
.get( urlEncoded, jsonParser, staticHtml( 'home/index' ) );

/**
 * Resolve URL `/search`.
 */

router
.route( '/search' )
.get( urlEncoded, jsonParser, staticHtml( 'home/search' ) )
.post( urlEncoded, jsonParser, staticHtml( 'home/search' ) );

export default router;
