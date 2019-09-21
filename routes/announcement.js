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
import patchAnnouncement from 'models/announcement/operations/patch-announcement.js';
import deleteAnnouncements from 'models/announcement/operations/delete-announcements.js';
import deleteAnnouncementFiles from 'models/announcement/operations/delete-announcementFiles.js';
import tagUtils from 'models/announcement/utils/tag.js';
import staticHtml from 'routes/utils/static-html.js';
import { projectRoot, secret, } from 'settings/server/config.js';
import BodyParser from 'body-parser';

const router = express.Router( {
    caseSensitive: true,
    mergeParams:   false,
    strict:        false,
} );

const jsonParser = BodyParser.json();

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

// .get( staticHtml( 'announcement/all' ) );

.get( async ( req, res, next ) => {
    try {
        const data =  {};

        res.locals.UTILS.announcement = {
            tagUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'announcement/all.pug', {
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
.post( async ( req, res, next ) => {
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
                    else {
                        // Console.log( error );
                        console.error( error );
                    }
                }
            }
        }

        /**
         * Data format
         */

        const dataString = Object.keys( req.body )[ 0 ];
        const dataFormat = dataString.replace( /\n/g, '\\\\n' ).replace( /\r/g, '\\\\r' ).replace( /\t/g, '\\\\t' );
        console.log( JSON.parse( dataFormat ) );
        const data = JSON.parse( dataFormat );
        const dataTagsString = data.tags.substring( 0, data.tags.length - 1 );
        const dataTags = dataTagsString.split( ' ' ).map( tag => ( { 'typeId': Number( tag ), } ) );
        const dataFiles = Object.keys( data.fileI18n ).map( key => [
            {
                languageId: 0,
                name:       data.fileI18n[ key ],
            },
            {
                languageId: 1,
                name:       data.fileI18n[ key ],
            },
        ] );

        /**
         * Post new data
         */

        if ( data.method === 'post' ) {
            await postAnnouncement( {
                publishTime:      new Date(),
                updateTime:       new Date(),
                author:           Number( data.author ),
                isPinned:         Number( data.isPinned ),
                isPublished:      Number( data.isPublished ),
                imageUrl:         null,
                views:            0,
                tag:              dataTags,
                announcementI18n:        [
                    {
                        languageId: 0,
                        title:      data.i18n[ 0 ].title,
                        content:    data.i18n[ 0 ].content,
                    },
                    {
                        languageId: 1,
                        title:      data.i18n[ 1 ].title,
                        content:    data.i18n[ 1 ].title,
                    },
                ],
                fileI18n: dataFiles,
            } );
        }

        /**
         * Edit exist data
         */

        else if ( data.method === 'patch' ) {
            await patchAnnouncement( {
                announcementId:   data.announcementId,
                updateTime:       new Date(),
                author:           Number( data.author ),
                isPinned:         Number( data.isPinned ),
                isPublished:      Number( data.isPublished ),
                imageUrl:         null,
                views:            0,
                i18n:             [
                    {
                        languageId: 0,
                        title:      data.i18n[ 0 ].title,
                        content:    data.i18n[ 0 ].content,
                    },
                    {
                        languageId: 1,
                        title:      data.i18n[ 1 ].title,
                        content:    data.i18n[ 1 ].title,
                    },
                ],
                tags:     dataTags,
                fileI18n: [],
            } );
        }

        // // post ann
        // await postAnnouncement( {
        //     publishTime:      new Date( 2000, 1, 2, 3, 4, 5 ),
        //     updateTime:       new Date( 2000, 1, 2, 3, 4, 6 ),
        //     author:           1,
        //     isPinned:         0,
        //     isPublished:      1,
        //     imageUrl:         null,
        //     views:            0,
        //     tag:              [
        //         {
        //             typeId: 1,
        //         },
        //         {
        //             typeId: 2,
        //         },
        //         {
        //             typeId: 3,
        //         },
        //     ],
        //     announcementI18n: [
        //         {
        //             languageId: 0,
        //             title:      'test title tw',
        //             content:    'test content tw',
        //         },
        //         {
        //             languageId: 1,
        //             title:      'test title eng',
        //             content:    'test content eng',
        //         },
        //     ],
        //     fileI18n: [
        //         [
        //             {
        //                 languageId: 0,
        //                 name:       'test file 1 tw',
        //             },
        //             {
        //                 languageId: 1,
        //                 name:       'test file 1 eng',
        //             },
        //         ],
        //         [
        //             {
        //                 languageId: 0,
        //                 name:       'test file 2 tw',
        //             },
        //             {
        //                 languageId: 1,
        //                 name:       'test file 2 eng',
        //             },
        //         ],
        //     ],
        // } );

        // // delete(hide) ann
        // await deleteAnnouncements( {
        //     announcementIds: [
        //         1151,
        //         1152,
        //     ],
        // } );

        // // delete ann files
        // await deleteAnnouncementFiles( {
        //     announcementId: 1153,
        //     fileId:         [
        //         950,
        //     ],
        // } );

        // // patch ann
        // await patchAnnouncement( {
        //     announcementId:   1151,
        //     publishTime:      new Date( 2000, 7, 7, 7, 7, 7 ),
        //     updateTime:       new Date( 2000, 7, 7, 7, 7, 7 ),
        //     author:           2,
        //     isPinned:         1,
        //     isPublished:      1,
        //     imageUrl:         null,
        //     views:            1,
        //     i18n:             [
        //         {
        //             languageId: 0,
        //             title:      'test title tw update',
        //             content:    'test content tw update',
        //         },
        //         {
        //             languageId: 1,
        //             title:      'test title eng update',
        //             content:    'test content eng update',
        //         },
        //     ],
        //     tags:              [
        //         {
        //             typeId: 3,
        //         },
        //         {
        //             typeId: 4,
        //         },
        //         {
        //             typeId: 5,
        //         },
        //     ],
        //     fileI18n: [
        //         {
        //             fileId:     947,
        //             languageId: 0,
        //             name:       'test file 1 tw update',
        //         },
        //     ],
        // } );

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
