/**
 * Router module for route `/announcement`.
 *
 * Including following sub-routes:
 * - `/announcement/`
 * - `/announcement/activity`
 * - `/announcement/all`
 * - `/announcement/recruitment`
 * - `/announcement/[id]`
 * - `/announcement/staff`
 */

import express from 'express';
import MarkdownIt from 'markdown-it';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import getAnnouncement from 'models/announcement/operations/get-announcement.js';
import getSession from 'models/auth/operations/get-session.js';
import getFileInfo from 'models/announcement/operations/get-file-info.js';
import saveSession from 'models/auth/operations/save-session.js';
import getAdminByUserId from 'models/auth/operations/get-admin-by-userId.js';
import postAnnouncement from 'models/announcement/operations/post-announcement.js';
import tagUtils from 'models/announcement/utils/tag.js';
import staticHtml from 'routes/utils/static-html.js';
import { projectRoot, secret, } from 'settings/server/config.js';

const router = express.Router( {
    caseSensitive: true,
    mergeParams:   false,
    strict:        false,
} );

/**
 * Resolve URL `/announcement`.
 */

router
.route( [
    '/',
    '/index',
] )
.get( staticHtml( 'announcement/index' ) );

/**
 * Resolve URL `/announcement/activity`.
 */

router
.route( '/activity' )
.get( staticHtml( 'announcement/activity' ) );

/**
 * Resolve URL `/announcement/all`.
 */

router
.route( '/all' )
.get( staticHtml( 'announcement/all' ) );

/**
 * Resolve URL `/announcement/recruitment`.
 */

router
.route( '/recruitment' )
.get( staticHtml( 'announcement/recruitment' ) );

/**
 * Resolve URL `/announcement/add`.
 */

router
.route( '/add' )

// .post( cors(), async ( req, res ) => {
.get( async ( req, res, next ) => {
    try {
        console.log( 'in route announcement/add' );

        // Get id
        const cookie = req.cookies.sessionId;
        res.locals.unparsedId = cookie;

        if ( typeof ( cookie ) !== 'undefined' ) {
            // Got a cookie from the user.
            const sid = cookieParser.signedCookies( req.cookies, secret ).sessionId;
            if ( sid !== cookie ) {
                // Get session data in the database.
                try {
                    const data = await getSession( {
                        sid,
                    } );

                    // Check `expires`
                    if ( data.expires >= Date.now() && data.userId !== null ) {
                        const result = await getAdminByUserId( {
                            userId: Number( data.userId ),
                        } );

                        if ( result.sid !== data.sid ) {
                            res.send( {
                                redirect: '/index',
                            } );
                        }
                    }
                    else {
                        res.send( {
                            redirect: '/index',
                        } );
                    }
                }
                catch ( error ) {
                    if ( error.status === 404 ) {
                        res.send( {
                            redirect: '/error/404',
                        } );
                    }
                    else
                        console.error( error );
                }
            }
        }

        // Check proper user

        await postAnnouncement( {
            publishTime:      1355644555,
            updateTime:       1355644555,
            author:           1,
            isPinned:         0,
            isPublished:      1,
            imageUrl:         null,
            views:            0,
            tag:              [
                {
                    typeId: 1,
                },
                {
                    typeId: 2,
                },
                {
                    typeId: 3,
                },
            ],
            announcementI18n: [
                {
                    languageId: 0,
                    title:      'test title tw',
                    content:    'test content tw',
                },
                {
                    languageId: 1,
                    title:      'test title eng',
                    content:    'test content eng',
                },
            ],
            fileI18n: [
                [
                    {
                        languageId: 0,
                        name:       'test file 1 tw',
                    },
                    {
                        languageId: 1,
                        name:       'test file 1 eng',
                    },
                ],
                [
                    {
                        languageId: 0,
                        name:       'test file 2 tw',
                    },
                    {
                        languageId: 1,
                        name:       'test file 2 eng',
                    },
                ],
            ],
        } );
        res.send( { 'message': 'success', } );
    }
    catch ( error ) {
        console.error( error );
    }
} );

/**
 * Resolve URL `/announcement/[id]`.
 */

router
.route( '/:announcementId' )
.get( async ( req, res, next ) => {
    try {
        const data = await getAnnouncement( {
            announcementId: Number( req.params.announcementId ),
            languageId:     req.query.languageId,
        } );
        res.locals.UTILS.announcement = {
            tagUtils,
        };
        res.locals.UTILS.md = new MarkdownIt( {
            breaks:  true,
            linkify: true,
        } );

        await new Promise( ( resolve, reject ) => {
            res.render( 'announcement/detail.pug', {
                data,
            }, ( err, html ) => {
                if ( err ) {
                    reject( err );
                    return;
                }
                res.send( html );
                resolve();
            } );
        } );
    }
    catch ( err ) {
        if ( err.status === 404 )
            next();
        else
            next( err );
    }
} );

router
.route( '/:announcementId/file/:fileId' )
.get( async ( req, res, next ) => {
    try {
        const announcementId = Number( req.params.announcementId );
        const fileId = Number( req.params.fileId );
        const languageId = req.query.languageId;
        const data = await getFileInfo( {
            announcementId,
            fileId,
            languageId,
        } );

        await new Promise( ( resolve, reject ) => {
            res.download( `${ projectRoot }/static/dist/file/${ data.announcementId }/${ data.name }`, data.name, ( err ) => {
                if ( err ) {
                    reject( err );
                    return;
                }
                resolve();
            } );
        } );
    }
    catch ( err ) {
        if ( err.status === 404 )
            next();
        else
            next( err );
    }
} );


export default router;
