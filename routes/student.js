/**
 * Router module for route `/student`.
 *
 * Including following sub-routes:
 * - `/student`
 * - `/student/college`
 * - `/student/master`
 * - `/student/phd`
 */

import express from 'express';

import staticHtml from 'routes/utils/static-html.js';

const router = express.Router( {
    caseSensitive: true,
    mergeParams:   false,
    strict:        false,
} );

/**
 * Resolve URL `/student`.
 */

router
.route( '/' )
.get( staticHtml( 'student/index' ) );

/**
 * Resolve URL `/student/college`.
 */

router
.route( '/college' )
.get( staticHtml( 'student/college' ) );

/**
 * Resolve URL `/student/master`.
 */

router
.route( '/master' )
.get( staticHtml( 'student/master' ) );

/**
 * Resolve URL `/student/phd`.
 */

router
.route( '/phd' )
.get( staticHtml( 'student/phd' ) );

export default router;
