/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - `/api/staff`
 */

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { secret, host, } from 'settings/server/config.js';
import expressSession from 'express-session';

import getSession from 'models/auth/operations/get-session.js';
import saveSession from 'models/auth/operations/save-session.js';
import getStaffMiniProfile from 'models/staff/operations/get-staff-mini-profile.js';
import getFacultyMiniProfile from 'models/faculty/operations/get-faculty-mini-profile.js';
import getAdminByUserId from 'models/auth/operations/get-admin-by-userId.js';
import roleUtils from 'models/auth/utils/role.js';

const apis = express.Router();
apis.use( cookieParser() );

apis.use( expressSession( {
    cookie: {
        maxAge:   7 * 24 * 60 * 60 * 1000,
        path:     '/',
        httpOnly: true,
        sameSite: 'lax',
        secure:   false,
    },
    name:              'sessionId',
    secret,
    saveUninitialized: false,
    resave:            false,
    unset:             'destroy',
    rolling:           false,
    proxy:             false,
} ) );

/**
 * Resolve URL `/api/user/id`.
 */

apis.get( '/id', cors(), async ( req, res ) => {
    const cookie = req.cookies.sessionId;
    res.locals.unparsedId = cookie;
    res.header( 'Access-Control-Allow-Origin', host );

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

            res.json( { userId: -1, } );
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

            // Check `expires`
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

                    res.json( { userId: -1, } );
                } );
            }
            else if ( data.userId !== null ) {
                const result = await getAdminByUserId( {
                    userId: Number( data.userId ),
                } );

                if ( result.sid === data.sid )
                    res.json( result );


                else
                    res.json( { userId: -1, } );
            }
            else
                res.json( { userId: -1, } );
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

                    // Send new session & user id
                    res.json( { userId: -1, } );
                } );
            }
            else
                console.error( error );
        }
    }
} );

/**
 * Resolve URL `/api/user/miniProfile/[id]`.
 */

apis.get( '/miniProfile/:userId', cors(), async ( req, res ) => {
    try {
        const userData = await getAdminByUserId( {
            userId: Number( req.params.userId ),
        } );

        if ( userData.role === roleUtils.getIdByOption( 'faculty' ) ) {
            const data = await getFacultyMiniProfile( {
                languageId: Number( req.query.languageId ),
                profileId:  userData.roleId,
            } );
            res.json( data );
        }
        else if ( userData.role === roleUtils.getIdByOption( 'staff' ) ) {
            const data = await getStaffMiniProfile( {
                languageId: Number( req.query.languageId ),
                profileId:  userData.roleId,
            } );
            res.json( data );
        }
        else {
            const error = new Error( 'Invalid role' );
            error.status = 400;
            throw error;
        }
    }
    catch ( error ) {
        console.error( error );
    }
} );

export default apis;
