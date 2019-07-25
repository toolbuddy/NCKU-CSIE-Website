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
import addFacultyDetail from 'models/faculty/operations/add-faculty-detail.js';
import updateFacultyDetail from 'models/faculty/operations/update-faculty-detail.js';
import deleteFacultyDetail from 'models/faculty/operations/delete-faculty-detail.js';

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

/**
 * Resolve URL `/api/user/updateProfile/`.
 */

apis.get( '/updateProfile/', cors(), async ( req, res ) => {
    try {
        console.log( 'todo - valid user & corresponding data (if data id belongs to profile id)' );

        // Get userId from session
        console.log( 'todo - get (faculty/staff) profileId from session' );

        // Get profileId from user
        const userData = await getAdminByUserId( {
            userId: 0,
        } );

        if ( userData.role === roleUtils.getIdByOption( 'faculty' ) ) {
            console.log( 'in api user/updateProfile' );

            const data = {
                profileId: 3,
                add:       {
                    department: [
                        2,
                    ],
                    education: [
                        {
                            nation: 1,
                            degree: 0,
                            from:   2018,
                            to:     2019,
                            i18n:   [
                                {
                                    language: 0,
                                    school:   '測試school',
                                    major:    '測試major',
                                },
                                {
                                    language: 1,
                                    school:   'test school',
                                    major:    'test major',
                                },
                            ],
                        },
                        {
                            nation: 2,
                            degree: 1,
                            from:   2017,
                            to:     2019,
                            i18n:   [
                                {
                                    language: 0,
                                    school:   '測試school2',
                                    major:    '測試major2',
                                },
                                {
                                    language: 1,
                                    school:   'test school2',
                                    major:    'test major2',
                                },
                            ],
                        },
                    ],
                    experience: [
                        {
                            from: 2018,
                            to:   2019,
                            i18n: [
                                {
                                    language:     0,
                                    organization: '測試organization',
                                    department:   '測試department',
                                    title:        '測試title',
                                },
                                {
                                    language:     1,
                                    organization: 'test organization',
                                    department:   'test department',
                                    title:        'test title',
                                },
                            ],
                        },
                        {
                            from: 2017,
                            to:   2019,
                            i18n: [
                                {
                                    language:     0,
                                    organization: '測試organization2',
                                    department:   '測試department2',
                                    title:        '測試title2',
                                },
                                {
                                    language:     1,
                                    organization: 'test organization2',
                                    department:   'test department2',
                                    title:        'test title2',
                                },
                            ],
                        },
                    ],
                    researchGroup: [
                        6,
                    ],
                    specialtyI18n: [
                        [
                            {
                                language:  0,
                                specialty: '測試的specialty',
                            },
                            {
                                language:  1,
                                specialty: 'test specialty',
                            },
                        ],
                        [
                            {
                                language:  0,
                                specialty: '測試的specialty2',
                            },
                            {
                                language:  1,
                                specialty: 'test specialty2',
                            },
                        ],
                    ],
                    title: [
                        {
                            from: 2018, // Should be unix time
                            to:   2019,
                            i18n: [
                                {
                                    language: 0,
                                    title:    '測試的title',
                                },
                                {
                                    language: 1,
                                    title:    'test title',
                                },
                            ],
                        },
                        {
                            from: 2018, // Should be unix time
                            to:   2019,
                            i18n: [
                                {
                                    language: 0,
                                    title:    '測試的title2',
                                },
                                {
                                    language: 1,
                                    title:    'test title2',
                                },
                            ],
                        },
                    ],
                },
                update:    {
                    education: [
                        {
                            educationId: 7,
                            nation:      0,
                            degree:      0,
                            from:        1974,
                            to:          1978,
                            i18n:        [
                                {
                                    language:    1,
                                    school:      'National Chiao Tung University',
                                    major:       'Control Engineering',
                                },
                            ],
                        },
                    ],
                    experience: [
                        {
                            experienceId: 9,
                            from:         1993,
                            to:           null,
                            i18n:         [
                                {
                                    language:     1,
                                    organization: 'National Cheng Kung University',
                                    department:   'Depart. Of Comp. Science & Inform Engr.',
                                    title:        'Professor',
                                },
                            ],
                        },
                    ],
                    profile: {
                        // Fax:       '2747076',
                        // email:     'ynsun@mail.ncku.edu.tw',
                        // nation:    0,
                        // photo:     '3.jpg',
                        // officeTel: '06-2757575,62526',
                        labTel:    '06-2757575,62526',
                        labWeb:    'https://sites.google.com/view/ncku-csie-vslab',
                        order:     8,
                        i18n:      [
                            {
                                // Name:          'Yung-Nien Sun',
                                labName:       'Visual System Lab',
                                language:      1,
                            },
                        ],
                    },
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
                            to:      null,
                            i18n:    [
                                {
                                    language: 1,
                                    title:    'Distinguished Professor',
                                },
                            ],
                        },
                    ],
                },
                delete: {
                    department: [
                        2,
                    ],
                    education: [
                        124,
                        125,
                    ],
                    experience: [
                        250,
                        251,
                    ],
                    researchGroup: [
                        6,
                    ],
                    specialtyI18n: [
                        228,
                        229,
                    ],
                    title: [
                        100,
                        101,
                    ],
                },
            };

            // Add faculty data
            // const addData = await addFacultyDetail( {
            // profileId:     data.profileId,
            // Department:    data.add.department,
            // education:     data.add.education,
            // Experience:    data.add.experience,
            // ResearchGroup: data.add.researchGroup,
            // specialtyI18n: data.add.specialtyI18n,
            // title:         data.add.title,
            // } );

            // Update faculty data
            const updateData = await updateFacultyDetail( {
                profileId:      data.profileId, // UserData.roleId
                education:      data.update.education,
                experience:     data.update.experience,
                profile:        data.update.profile,
                specialtyI18n:  data.update.specialtyI18n,
                title:          data.update.title,
            } );

            // Delete faculty data
            // const deleteData = await deleteFacultyDetail( {
            //     profileId:     data.profileId,
            //     department:    data.delete.department,
            //     education:     data.delete.education,
            //     experience:    data.delete.experience,
            //     researchGroup: data.delete.researchGroup,
            //     specialtyI18n: data.delete.specialtyI18n,
            //     title:         data.delete.title,
            // } );

            res.json( 200 );
        }
        else if ( userData.role === roleUtils.getIdByOption( 'staff' ) ) {
            // Update staff data - show user data now
            res.json( userData );
        }
        else {
            const error = new Error( 'Invalid role' );
            error.status = 400;
            throw error;
        }
    }
    catch ( error ) {
        throw error;
    }
} );

export default apis;
