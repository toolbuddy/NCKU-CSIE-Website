/**
 * Router module for route `/auth`.
 *
 * Including following sub-routes:
 * - `/auth/login`
 * - `/auth/logout`
 * - `/auth/report`
 */

import express from 'express';

import staticHtml from 'routes/utils/static-html.js';

const router = express.Router( {
    caseSensitive: true,
    mergeParams:   false,
    strict:        false,
} );

/**
 * Resolve URL `/auth/login`.
 */

router
.route( '/login' )
.get( staticHtml( 'resource/fix' ) );

/**
 * Resolve URL `/auth/logout`.
 */

router
.route( '/logout' )
.get( staticHtml( 'resource/fix' ) );

/**
 * Resolve URL `/auth/report`.
 */

router
.route( '/report' )
.all( ( {}, {}, next ) => {
    console.error( 'here' );
    next();
} )
.post( ( req, res ) => {
    console.error( req.body );
    res.sendStatus( 204 );
} );

export default router;
