/**
 * Router module for route `/resource`.
 *
 * Including following sub-routes:
 * - `/resource`
 * - `/resource/rule`
 * - `/resource/rent`
 * - `/resource/fix`
 * - `/resource/ieet`
 * - `/resource/sitemap`
 * - `/resource/alumni`
 */


import express from 'express';

import staticHtml from 'routes/utils/static-html.js';

const router = express.Router( {
    caseSensitive: true,
    mergeParams:   false,
    strict:        false,
} );

/**
 * Resolve URL `/resource`.
 */

router
.route( [
    '/',
    '/index',
] )
.get( staticHtml( 'resource/index' ) );

/**
 * Resolve URL `/resource/rule`.
 */

router
.route( '/rule' )
.get( staticHtml( 'resource/rule' ) );

/**
 * Resolve URL `/resource/rent`.
 */

router
.route( '/rent' )
.get( staticHtml( 'resource/rent' ) );

/**
 * Resolve URL `/resource/fix`.
 */

router
.route( '/fix' )
.get( staticHtml( 'resource/fix' ) );

/**
 * Resolve URL `/resource/ieet`.
 */

router
.route( '/ieet' )
.get( staticHtml( 'resource/ieet' ) );

/**
 * Resolve URL `/resource/sitemap`.
 */

router
.route( '/sitemap' )
.get( staticHtml( 'resource/sitemap' ) );

/**
 * Resolve URL `/resource/alumni`.
 */

router
.route( '/alumni' )
.get( staticHtml( 'resource/alumni' ) );

export default router;
