/**
 * Language middleware module for `express`.
 *
 * @typedef {object} Request
 * @typedef {object} Response
 * @typedef {function} Middleware
 */

/**
 * Check language query value in request.
 *
 * If query is not set, use default language id.
 * If query is not supported, response 400.
 * If query is supported, pass request to next middleware.
 * @param {Request}    req  - Request from client.
 * @param {Response}   res  - Response for client.
 * @param {Middleware} next - Next middleware to handle request `req`.
 */

import cookieParser from 'cookie-parser';
import getSession from 'models/auth/operations/get-session.js';
import saveSession from 'models/auth/operations/save-session.js';
import getAdminByUserId from 'models/auth/operations/get-admin-by-userId.js';
import { secret, } from 'settings/server/config.js';

export default async function ( req, res, next ) {
    // Get id
    const cookie = req.cookies.sessionId;
    res.locals.unparsedId = cookie;

    if ( typeof ( cookie ) === 'undefined' ) {
        try {
            // Got no cookie from the user.

            // Store the cookie in the user.
            const newSid = req.session.id;
            req.session.ctrl = newSid;

            // Store new session in database
            await saveSession( {
                sid:     newSid,
                expires: req.session.cookie.maxAge + Date.now(),
            } );

            // Redirect
            res.redirect( '/index' );
        }
        catch ( error ) {
            console.error( error );
        }
    }
    else {
        // Got a cookie from the user.
        const sid = cookieParser.signedCookies( req.cookies, secret ).sessionId;
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

            // Check if session has expired
            if ( data.expires < Date.now() ) {
                req.session.regenerate( async () => {
                    const newSid = req.session.id;
                    req.session.ctrl = newSid;

                    // Store new session in database
                    await saveSession( {
                        sid:     newSid,
                        expires: req.session.cookie.maxAge + Date.now(),
                    } );

                    req.session.save();
                    res.locals.unparsedSid = req.session.id;

                    // Redirect
                    res.redirect( '/index' );
                } );
            }

            // Session is valid, check data
            else if ( data.userId !== null ) {
                const result = await getAdminByUserId( {
                    userId: Number( data.userId ),
                } );

                // If session ???, redirect
                if ( result.sid !== data.sid )
                    res.redirect( '/index' );


                // Is a valid user
                res.locals.userId = data.userId;
                next();
            }
            else
                res.redirect( '/index' );
        }
        catch ( error ) {
            if ( error.status === 404 ) {
                // No corresponding session id in the database
                req.session.regenerate( async () => {
                    const newSid = req.session.id;
                    req.session.ctrl = newSid;

                    // Store new session in database
                    await saveSession( {
                        sid:     newSid,
                        expires: req.session.cookie.maxAge + Date.now(),
                    } );

                    req.session.save();
                    res.locals.unparsedSid = req.session.id;

                    // Redirect
                    res.redirect( '/index' );
                } );
            }
            else
                console.error( error );
        }
    }
}
