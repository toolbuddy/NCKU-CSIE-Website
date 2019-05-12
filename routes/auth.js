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

import getAdminByAccount from 'models/auth/operations/get-admin-by-account.js';
import updateAdmin from 'models/auth/operations/update-admin.js';
import saveSession from 'models/auth/operations/save-session.js';

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
.post( async ( req, res ) => {
    console.log( 'in route auth/login' );

    try {
        const data = await getAdminByAccount( {
            account: req.body.account,
        } );
        if ( data.password === req.body.password ) {
            // Store the new cookie in the user.
            req.session.ctrl = '';

            // Store new session in database
            const result = await saveSession( {
                sid:     req.session.id,
                expires: req.session.cookie.maxAge + Date.now(),
                userId:  Number( data.userId ),
            } );

            // Update user session id in database
            await updateAdmin( {
                userId:   Number( data.userId ),
                account:  data.account,
                password: data.password,
                role:     data.role,
                sid:      result.sid,
                isValid:  data.isValid,
                name:     data.name,
            } );

            console.log( 'log in successfully' );

            res.redirect( '/index' );
        }
        else {
            // Wrong account or password, should show warning message
            console.log( 'wrong account or password' );
        }
    }
    catch ( error ) {
        if ( error.status === 404 )
            console.log( 'wrong account or password' );

        else
            console.error( error );
    }
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
