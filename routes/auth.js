/**
 * Router module for route `/auth`.
 *
 * Including following sub-routes:
 * - `/auth/login`
 * - `/auth/logout`
 * - `/auth/report`
 */

import express from 'express';
import md5 from 'md5';
import staticHtml from 'routes/utils/static-html.js';
import cookieParser from 'cookie-parser';

import getAdminByAccount from 'models/auth/operations/get-admin-by-account.js';
import updateAdmin from 'models/auth/operations/update-admin.js';
import getSession from 'models/auth/operations/get-session.js';
import saveSession from 'models/auth/operations/save-session.js';
import getAdminByUserId from 'models/auth/operations/get-admin-by-userId.js';
import { secret, } from 'settings/server/config.js';

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
        if ( data.password === md5( req.body.password + data.salt ) ) {
            // Store the new cookie in the user.
            console.log( 'old sid:' );
            console.log( res.locals.unparsedId );
            console.log( req.session.id );
            console.log( req.session.ctrl );

            req.session.regenerate( async () => {
                try {
                    const newSid = req.session.id;
                    req.session.ctrl = newSid;
                    console.log( 'in generate: new sid:' );
                    console.log( newSid );
                    console.log( req.session.id );
                    console.log( req.session.ctrl );

                    // Store new session in database
                    const result = await saveSession( {
                        sid:     newSid,
                        expires: req.session.cookie.maxAge + Date.now(),
                        userId:  Number( data.userId ),
                    } );

                    // Update user session id in database
                    await updateAdmin( {
                        userId:   Number( result.userId ),
                        account:  data.account,
                        password: data.password,
                        role:     data.role,
                        sid:      result.sid,
                        isValid:  data.isValid,
                        name:     data.name,
                        salt:     data.salt,
                        roleId:   data.roleId,
                    } );

                    req.session.save();
                    console.log( 'log in successfully' );
                    res.redirect( '/index' );
                }
                catch ( err ) {
                    console.error( err );
                }
            } );
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
.get( async ( req, res ) => {
    // Get sid in the cookie
    const cookie = res.locals.unparsedId;
    const sid = cookieParser.signedCookie( cookie, secret );
    console.log( 'in route /auth/logout' );
    console.log( cookie );
    console.log( sid );
    if ( sid === cookie ) {
        const error = new Error( 'Invalid cookie.' );
        error.status = 400;
        throw error;
    }

    // Get session data in the database.
    try {
        const data = await getSession( {
            sid,
        } );

        const result = await getAdminByUserId( {
            userId: Number( data.userId ),
        } );

        // Update user session id in database
        await updateAdmin( {
            userId:   Number( result.userId ),
            account:  result.account,
            password: result.password,
            role:     result.role,
            sid:      null,
            isValid:  result.isValid,
            name:     result.name,
            roleId:   result.roleId,
        } );

        // Give a new sid cookie
        console.log( 'old sid:' );
        console.log( sid );
        console.log( req.session.ctrl );
        req.session.regenerate( async () => {
            try {
                const newSid = req.session.id;
                req.session.ctrl = newSid;

                console.log( 'in generate, new sid:' );
                console.log( newSid );
                console.log( req.session.id );
                console.log( req.session.ctrl );

                // Store new session in database
                await saveSession( {
                    sid:     newSid,
                    expires: req.session.cookie.maxAge + Date.now(),
                } );

                req.session.save();
                console.log( 'log out successfully' );
                res.redirect( '/index' );
            }
            catch ( err ) {
                console.error( err );
            }
        } );
    }
    catch ( error ) {
        console.error( error );
    }
} );

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
