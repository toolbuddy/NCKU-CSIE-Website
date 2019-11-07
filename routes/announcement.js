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
import multer from 'multer';
import * as fs from 'fs';
import path from 'path';

import getAnnouncement from 'models/announcement/operations/get-announcement.js';
import getFileInfo from 'models/announcement/operations/get-file-info.js';
import postAnnouncement from 'models/announcement/operations/post-announcement.js';
import patchAnnouncement from 'models/announcement/operations/patch-announcement.js';
import deleteAnnouncements from 'models/announcement/operations/delete-announcements.js';
import deleteAnnouncementFiles from 'models/announcement/operations/delete-announcementFiles.js';
import tagUtils from 'models/announcement/utils/tag.js';
import staticHtml from 'routes/utils/static-html.js';
import { projectRoot, secret, } from 'settings/server/config.js';
import roleUtils from 'models/auth/utils/role.js';
import { urlEncoded, jsonParser, } from 'routes/utils/body-parser.js';
import allowUserOnly from 'routes/utils/allow-user-only.js';

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
.get( urlEncoded, jsonParser, staticHtml( 'announcement/activity' ) );

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
.get( urlEncoded, jsonParser, staticHtml( 'announcement/recruitment' ) );

/**
 * Resolve URL `/announcement/add`.
 */

router
.route( '/add' )
.post( urlEncoded, jsonParser, allowUserOnly, async ( req, res, next ) => {
    try {
        console.log( 'in route announcement/add' );

        // // Get id
        // const cookie = req.cookies.sessionId;
        // res.locals.unparsedId = cookie;

        // if ( typeof ( cookie ) !== 'undefined' ) {
        //     // Got a cookie from the user.
        //     const sid = cookieParser.signedCookies( req.cookies, secret ).sessionId;
        //     if ( sid !== cookie ) {
        //         // Get session data in the database.
        //         try {
        //             const data = await getSession( {
        //                 sid,
        //             } );

        //             // Check `expires`
        //             if ( data.expires >= Date.now() && data.userId !== null ) {
        //                 const result = await getAdminByUserId( {
        //                     userId: Number( data.userId ),
        //                 } );

        //                 if ( result.sid !== data.sid ) {
        //                     res.send( {
        //                         redirect: '/index',
        //                     } );
        //                 }
        //             }
        //             else {
        //                 res.send( {
        //                     redirect: '/index',
        //                 } );
        //             }
        //         }
        //         catch ( error ) {
        //             if ( error.status === 404 ) {
        //                 res.send( {
        //                     redirect: '/error/404',
        //                 } );
        //             }
        //             else {
        //                 // Console.log( error );
        //                 console.error( error );
        //             }
        //         }
        //     }
        // }

        /**
         * Data format
         */

        console.log( req.body );
        let tempString = '';
        Object.keys( req.body ).forEach( ( key ) => {
            if ( key.length !== 0 )
                tempString += key;
            if ( req.body[ key ].length !== 0 )
                tempString += `=${ req.body[ key ] }`;
        } );

        const dataString = tempString;
        const dataFormat = dataString.replace( /\n/g, '\\\\n' ).replace( /\r/g, '\\\\r' ).replace( /\t/g, '\\\\t' );
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
            const resu = await postAnnouncement( {
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

            // Move files from tmp/ to corresponding announcement-file folder
            dataFiles.forEach( ( fileData ) => {
                fileData.forEach( ( fileI18nObj ) => {
                    const existFile = `${ projectRoot }/tmp/${ fileI18nObj.path }`;
                    if ( fs.existsSync( existFile ) ) {
                        if ( !fs.existsSync( `${ projectRoot }/static/dist/file/${ resu[ 0 ].announcementId }/` ) )
                            fs.mkdirSync( `${ projectRoot }/static/dist/file/${ resu[ 0 ].announcementId }/` );

                        fs.rename(
                            `${ projectRoot }/tmp/${ fileI18nObj.path }`,
                            `${ projectRoot }/static/dist/file/${ resu[ 0 ].announcementId }/${ fileI18nObj.path }`,
                            ( err ) => {
                                if ( err )
                                    throw err;
                            }
                        );
                    }
                    else
                        throw new Error( 'No files exist.' );
                } );
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
                        content:    data.i18n[ 1 ].content,
                    },
                ],
                tags:     dataTags,
                fileI18n: [],
            } );
        }

        res.send( { 'message': 'success', } );
    }
    catch ( error ) {
        console.error( error );
    }
} );

/**
 * Resolve URL `/announcement/uploadFile`.
 */

router
.route( '/uploadFile' )
.post( cors(), allowUserOnly, multer( {
    dest:     `${ projectRoot }/tmp/`,
    storage: multer.diskStorage( {
        destination: `${ projectRoot }/tmp/`,
    } ),
} ).any(), async ( req, res ) => {
    // Try {
    //     // Get id
    //     const cookie = req.cookies.sessionId;
    //     res.locals.unparsedId = cookie;

    //     if ( typeof ( cookie ) === 'undefined' ) {
    //         // Got no cookie from the user.

    //         // Store the cookie in the user.
    //         const newSid = req.session.id;
    //         req.session.ctrl = newSid;

    //         // Store new session in database
    //         await saveSession( {
    //             sid:     newSid,
    //             expires: req.session.cookie.maxAge + Date.now(),
    //         } );

    //         res.send( {
    //             redirect: '/index',
    //         } );
    //     }
    //     else {
    //         // Got a cookie from the user.
    //         const sid = cookieParser.signedCookies( req.cookies, secret ).sessionId;
    //         if ( sid === cookie ) {
    //             const error = new Error( 'Invalid cookie.' );
    //             error.status = 400;
    //             throw error;
    //         }

    //         // Get session data in the database.
    //         try {
    //             const data = await getSession( {
    //                 sid,
    //             } );

    //             // Check `expires`
    //             if ( data.expires < Date.now() ) {
    //                 req.session.regenerate( async () => {
    //                     const newSid = req.session.id;
    //                     req.session.ctrl = newSid;

    //                     // Store new session in database
    //                     await saveSession( {
    //                         sid:     newSid,
    //                         expires: req.session.cookie.maxAge + Date.now(),
    //                     } );

    //                     req.session.save();
    //                     res.locals.unparsedSid = req.session.id;
    //                     res.send( {
    //                         redirect: '/index',
    //                     } );
    //                 } );
    //             }
    //             else if ( data.userId !== null ) {
    //                 const result = await getAdminByUserId( {
    //                     userId: Number( data.userId ),
    //                 } );

    //                 if ( result.sid !== data.sid ) {
    //                     res.send( {
    //                         redirect: '/index',
    //                     } );
    //                 }

    //                 const resNames = [];

    //                 // Should check permission
    //                 req.files.forEach( ( fileObj ) => {
    //                     fs.rename(
    //                         fileObj.path,
    //                         `${ fileObj.destination }${ fileObj.filename }${ path.extname( fileObj.originalname ) }`,
    //                         ( err ) => {
    //                             if ( err )
    //                                 throw err;
    //                         },
    //                     );
    //                     resNames.push( `${ fileObj.destination }${ fileObj.filename }${ path.extname( fileObj.originalname ) }` );
    //                 } );
    //                 res.send( resNames );
    //             }
    //             else {
    //                 res.send( {
    //                     redirect: '/index',
    //                 } );
    //             }
    //         }
    //         catch ( error ) {
    //             if ( error.status === 404 ) {
    //                 // No corresponding session id in the database
    //                 req.session.regenerate( async () => {
    //                     const newSid = req.session.id;
    //                     req.session.ctrl = newSid;

    //                     // Store new session in database
    //                     await saveSession( {
    //                         sid:     newSid,
    //                         expires: req.session.cookie.maxAge + Date.now(),
    //                     } );

    //                     req.session.save();
    //                     res.locals.unparsedSid = req.session.id;

    //                     // Send new session & user id
    //                     res.send( {
    //                         redirect: '/index',
    //                     } );
    //                 } );
    //             }
    //             else
    //                 console.error( error );
    //         }
    //     }
    //     return res.end();
    // }
    // catch ( error ) {
    //     console.error( error );
    // }

    const resNames = [];

    // Should check permission
    req.files.forEach( ( fileObj ) => {
        fs.rename(
            fileObj.path,
            `${ fileObj.destination }${ fileObj.filename }${ path.extname( fileObj.originalname ) }`,
            ( err ) => {
                if ( err )
                    throw err;
            },
        );
        resNames.push( `${ fileObj.destination }${ fileObj.filename }${ path.extname( fileObj.originalname ) }` );
    } );
    res.send( resNames );
} );

/**
 * Resolve URL `/announcement/delete`.
 */

router
.route( '/delete' )
.post( allowUserOnly, async ( req, res, next ) => {
    try {
        console.log( 'in route announcement/delete' );

        // // Get id
        // const cookie = req.cookies.sessionId;
        // res.locals.unparsedId = cookie;

        // if ( typeof ( cookie ) !== 'undefined' ) {
        //     // Got a cookie from the user.
        //     const sid = cookieParser.signedCookies( req.cookies, secret ).sessionId;
        //     if ( sid !== cookie ) {
        //         // Get session data in the database.
        //         try {
        //             const data = await getSession( {
        //                 sid,
        //             } );

        //             // Check `expires`
        //             if ( data.expires >= Date.now() && data.userId !== null ) {
        //                 const result = await getAdminByUserId( {
        //                     userId: Number( data.userId ),
        //                 } );

        //                 if ( result.sid !== data.sid ) {
        //                     res.send( {
        //                         redirect: '/index',
        //                     } );
        //                 }
        //             }
        //             else {
        //                 res.send( {
        //                     redirect: '/index',
        //                 } );
        //             }
        //         }
        //         catch ( error ) {
        //             if ( error.status === 404 ) {
        //                 res.send( {
        //                     redirect: '/error/404',
        //                 } );
        //             }
        //             else {
        //                 // Console.log( error );
        //                 console.error( error );
        //             }
        //         }
        //     }
        // }

        const data = JSON.parse( Object.keys( req.body )[ 0 ] );

        await deleteAnnouncements( {
            announcementIds: [
                data.announcementId,
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
.get( urlEncoded, jsonParser, async ( req, res, next ) => {
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
.get( urlEncoded, jsonParser, async ( req, res, next ) => {
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
