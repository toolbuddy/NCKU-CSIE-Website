/**
 * Router module for route `/developer`.
 *
 * Including following sub-routes:
 * - `/`
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
] )
.get( staticHtml( 'developer/index' ) );


export default router;
