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
.get( staticHtml( 'auth/login' ) )
.post( ( req, res ) => {
    console.log( 'in route auth/login' );

    res.cookie( 'sessionId', 'm_cookie_123456', { path: '/', maxAge: 600000, } );
    console.log( 'set cookie done' );

    console.log( req.cookies );
    console.log( req.cookies.sessionId );

    /*
    Console.log( req.session );
    console.log( req.sessionId );
    console.log( req.session.cookie );
    */

    console.log( req.body );
    console.log( req.body.account );
    console.log( req.body.password );

    res.redirect( '/index' );
} );

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
