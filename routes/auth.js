/**
 * Router module for route `/auth`.
 *
 * Including following sub-routes:
 * - `/auth/login`
 * - `/auth/logout`
 * - `/auth/report`
 */

import express from 'express';
import bcrypt from 'bcrypt';

import { projectRoot, maxAge, } from 'settings/server/config.js';
import { urlEncoded, jsonParser, } from 'routes/utils/body-parser.js';

import getAdminByAccount from 'models/auth/operations/get-admin-by-account.js';

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
.get( ( req, res, next ) => {
    try {
        // If user is not login, go to login page
        if ( !req.session.user ) {
            res.sendFile(
                `static/dist/html/auth/login.${ req.query.languageId }.html`,
                {
                    root:         projectRoot,
                    maxAge,
                    dotfiles:     'deny',
                    cacheControl: true,
                },
                ( err ) => {
                    if ( err )
                        next( err );
                }
            );
        }

        // Else, redirect user to index page
        else
            res.redirect( '/index' );
    }
    catch ( error ) {
        next( error );
    }
} )
.post( urlEncoded, jsonParser, async ( req, res, next ) => {
    try {
        const user = await getAdminByAccount( req.body.account );
        if ( !await bcrypt.compare( req.body.password, user.password ) ) {
            const error = new Error( 'Wrong account or password.' );
            error.status = 401;
            throw error;
        }
        req.session.user = user;
        delete req.session.user.password;
        res.redirect( '/index' );
    }
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} );

/**
 * Resolve URL `/auth/logout`.
 */

router
.route( '/logout' )
.get( ( req, res, next ) => {
    try {
        req.session.destroy( ( err ) => {
            if ( err ) {
                const error = new Error( 'Session destroy fail.' );
                error.status = 500;
                throw error;
            }
            res.redirect( '/index' );
        } );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/auth/report`.
 */

router
.route( '/report' )
.all( ( { }, { }, next ) => {
    console.error( 'Halmet caught error' );
    next();
} )
.post( ( req, res ) => {
    console.error( req.body );
    res.sendStatus( 204 );
} );

export default router;
