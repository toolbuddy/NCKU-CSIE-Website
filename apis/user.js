/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - `/api/staff`
 */

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { secret, } from 'settings/server/config.js';
import expressSession from 'express-session';

import getSession from 'models/auth/operations/get-session.js';
import saveSession from 'models/auth/operations/save-session.js';
import getStaffMiniProfile from 'models/staff/operations/get-staff-mini-profile.js';
import getFacultyMiniProfile from 'models/faculty/operations/get-faculty-mini-profile.js';
import getAdminByUserId from 'models/auth/operations/get-admin-by-userId.js';
import roleUtils from 'models/auth/utils/role.js';
import getFacultyDetailWithId from 'models/faculty/operations/get-faculty-detail-with-id.js';
import updateFacultyDetail from 'models/faculty/operations/update-faculty-detail.js';

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

    // Console.log( req.session.id ); // New sid

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

            res.json( { 'userId': -1, } );
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

                    res.json( { 'userId': -1, } );
                } );
            }
            else if ( data.userId !== null ) {
                const result = await getAdminByUserId( {
                    userId: Number( data.userId ),
                } );

                if ( result.sid === data.sid )
                    res.json( result );
                else
                    res.json( { 'userId': -1, } );
            }
            else
                res.json( { 'userId': -1, } );
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
                    res.json( { 'userId': -1, } );
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

apis.get( '/miniProfile/:userId', cors(), async ( req, res, next ) => {
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
        else
            console.error( 'Invalid role.' );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/user/updateProfile/[id]`.
 */

apis.get( '/updateProfile/:userId', cors(), async ( req, res, next ) => {
    try {
        const userData = await getAdminByUserId( {
            userId: Number( req.params.userId ),
        } );

        if ( userData.role === roleUtils.getIdByOption( 'faculty' ) ) {
            // Update faculty data
            console.log( 'in api user/updateProfile' );
            const data = await getFacultyDetailWithId( {
                languageId: Number( req.query.languageId ),
                profileId:  userData.roleId,
            } );

            const updateData = await updateFacultyDetail( {
                profileId: 3, // UserData.roleId
                education: [ {
                    educationId: 7,
                    nation:      0,
                    degree:      0,
                    from:        1974,
                    to:          1978,
                }, ],
                educationI18n: [
                    {
                        educationId: 7,
                        language:    1,
                        school:      'National Chiao Tung University',
                        major:       'Control Engineering',
                    },
                ],
                experience: [
                    {
                        experienceId: 9,
                        from:         1993,
                        to:           null,
                    },
                ],
                experienceI18n: [
                    {
                        experienceId: 9,
                        language:     1,
                        organization: 'National Cheng Kung University',
                        department:   'Depart. Of Comp. Science & Inform Engr.',
                        title:        'Professor',
                    },
                ],
                profile: {
                    fax:       '2747076',
                    email:     'ynsun@mail.ncku.edu.tw',
                    nation:    0,
                    photo:     '3.jpg',
                    officeTel: '06-2757575,62526',
                    labTel:    '06-2757575,62526',
                    labWeb:    'https://sites.google.com/view/ncku-csie-vslab',
                    order:     8,
                },

                // ProfileI18n: {
                //     name:          'Yung-Nien Sun',
                //     language:      1,
                //     officeAddress: '4213, 1F, CSIE building',
                //     labName:       'Visual System Lab',
                //     labAddress:    '65702, 7F, CSIE new building',
                // },
                specialtyI18n: [
                    {
                        specialtyId: 15,
                        language:    1,
                        specialty:   'Medical Imaging',
                    },
                ],
                title:     [
                    {
                        titleId: 3,
                        from:    null,
                        to:      null, // 11946684800
                    },
                ],
                titleI18n: [
                    {
                        titleId:  10,
                        language: 1,
                        title:    'Distinguished Professor',
                    },
                    {
                        titleId:  11,
                        language: 1,
                        title:    '',
                    },
                ],
            } );
            res.json( 200 );
        }
        else if ( userData.role === roleUtils.getIdByOption( 'staff' ) ) {
            // Update staff data - show user data now
            res.json( userData );
        }
        else
            console.error( 'Invalid role.' );
    }
    catch ( error ) {
        next( error );
    }
} );

export default apis;
