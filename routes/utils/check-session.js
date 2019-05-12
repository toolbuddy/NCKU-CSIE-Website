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
    console.log( 'get query:' );
    const cookie = req.cookies.sessionId;

    // Console.log( req.session.id ); // New sid

    if ( typeof ( cookie ) === 'undefined' ) {
        // Got no cookie from the user.
        console.log( 'No session id - is a visitor' );

        // Store the cookie in the user.
        req.session.ctrl = '';

        // Store new session in database
        await saveSession( {
            sid:     req.session.id,
            expires: req.session.cookie.maxAge + Date.now(),
        } );
        next();
    }
    else {
        // Got a cookie from the user.
        console.log( 'Got session id' );
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

            // Check `expires`
            if ( data.expires < Date.now() ) {
                console.log( 'is a expire X user' );
                req.session.ctrl = '';

                // Store new session in database
                await saveSession( {
                    sid:     req.session.id,
                    expires: req.session.cookie.maxAge + Date.now(),
                } );
            }
            else if ( data.userId !== null ) {
                const result = await getAdminByUserId( {
                    userId: Number( data.userId ),
                } );

                if ( result.sid === data.sid )
                    console.log( 'is a logged-in user(should send user data)' );
                else
                    console.log( 'is a visitor' );

                // Send user data
            }

            next();
        }
        catch ( error ) {
            if ( error.status === 404 ) {
                console.log( 'is a strange user(got cookie, but cookie is not in the database)' );

                // No corresponding session id in the database
                req.session.ctrl = '';

                // Store new session in database
                await saveSession( {
                    sid:     req.session.id,
                    expires: req.session.cookie.maxAge + Date.now(),
                } );
            }
            else
                console.error( error );

            next();
        }
    }
}
