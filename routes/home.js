/**
 * Router module for route `/`.
 *
 * Including following sub-routes:
 * - `/`
 * - `/search`
 * - `/calendar`
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
.route( '/' )
.get( staticHtml( 'home/index' ) );

/**
 * Resolve URL `/search`.
 */

router
.route( '/search' )
.get( staticHtml( 'home/index' ) );

/**
 * Resolve URL `/calender`.
 */

router
.route( '/calendar' )
.get( staticHtml( 'home/index' ) );

export default router;
