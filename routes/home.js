/**
 * Router module for route `/`.
 *
 * Including following sub-routes:
 * - `/`
 * - `/search`
 */

import express from 'express';

import staticHtml from 'routes/utils/static-html.js';

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
.get( staticHtml( 'home/index' ) );

/**
 * Resolve URL `/search`.
 */

router
.route( '/search' )
.get( staticHtml( 'home/search' ) )
.post( staticHtml( 'home/search' ) );

export default router;
