/**
 * Router module for route `/user`.
 *
 * Including following sub-routes:
 * - `/user`
 * - `/user/profile`
 * - `/user/award`
 * - `/user/publication`
 * - `/user/announcement`
 * - `/user/announcement/add`
 * - `/user/announcement/edit/[id]`
 */

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import * as fs from 'fs';
import path from 'path';

import { urlEncoded, jsonParser, } from 'routes/utils/body-parser.js';

import postAnnouncement from 'models/announcement/operations/post-announcement.js';
import updateAnnouncement from 'models/announcement/operations/update-announcement.js';
import pinAnnouncement from 'models/announcement/operations/pin-announcement.js';
import deleteAnnouncements from 'models/announcement/operations/delete-announcements.js';
import addFacultyDetail from 'models/faculty/operations/add-faculty-detail.js';
import updateFacultyDetail from 'models/faculty/operations/update-faculty-detail.js';
import deleteFacultyDetail from 'models/faculty/operations/delete-faculty-detail.js';
import addStaffDetail from 'models/staff/operations/add-staff-detail.js';
import updateStaffDetail from 'models/staff/operations/update-staff-detail.js';
import deleteStaffDetail from 'models/staff/operations/delete-staff-detail.js';

import cookieParser from 'cookie-parser';
import getSession from 'models/auth/operations/get-session.js';
import saveSession from 'models/auth/operations/save-session.js';
import getAdminByUserId from 'models/auth/operations/get-admin-by-userId.js';
import { secret, host, projectRoot, } from 'settings/server/config.js';
import staticHtml from 'routes/utils/static-html.js';
import noCache from 'routes/utils/no-cache.js';
import allowUserOnly from 'routes/utils/allow-user-only.js';
import getAnnouncement from 'models/announcement/operations/get-announcement.js';

import tagUtils from 'models/announcement/utils/tag.js';
import roleUtils from 'models/auth/utils/role.js';
import degreeUtils from 'models/faculty/utils/degree.js';
import nationUtils from 'models/faculty/utils/nation.js';
import projectCategoryUtils from 'models/faculty/utils/project-category.js';
import publicationCategoryUtils from 'models/faculty/utils/publication-category.js';
import departmentUtils from 'models/faculty/utils/department.js';
import researchGroupUtils from 'models/faculty/utils/research-group.js';

import getStaffDetailWithId from 'models/staff/operations/get-staff-detail-with-id.js';
import getFacultyDetailWithId from 'models/faculty/operations/get-faculty-detail-with-id.js';

const upload = multer( {
    storage: multer.memoryStorage(),
} );

const hasOwnProperty = Object.prototype.hasOwnProperty;
function isEmpty ( obj ) {
    if ( obj == null )
        return true;
    if ( obj.length ) {
        if ( obj.length > 0 )
            return false;
        if ( obj.length === 0 )
            return true;
    }
    if ( typeof obj !== 'object' )
        return true;
    for ( const key in obj ) {
        if ( hasOwnProperty.call( obj, key ) )
            return false;
    }

    return true;
}

const router = express.Router( {
    caseSensitive: true,
    mergeParams:   false,
    strict:        false,
} );

/**
 * Resolve URL `/user`.
 */

router
.route( '/' )
.get( staticHtml( 'user/index' ) );

/**
 * Resolve URL `/user/id`.
 */

router
.route( '/id' )
.post( urlEncoded, jsonParser, cors(), async ( req, res ) => {
    try {
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
                res.status( error.status ).send( error.message );
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

                    if ( result.sid === data.sid ) {
                        res.json( {
                            userId: result.userId,
                            role:   result.role,
                            roleId: result.roleId,
                        } );
                    }
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
                else {
                    console.error( error );
                    res.status( error.status ).send( error.message );
                }
            }
        }
    }
    catch ( err ) {
        throw err;
    }
} );

/**
 * Resolve URL `/user/.`.
 * If sid not found or invalid, redirect to /index.
 */

router
.route( '/profile' )
.get( allowUserOnly, cors(), noCache, async ( req, res ) => {
    const result = await getAdminByUserId( {
        userId: Number( res.locals.userId ),
    } );
    if ( result.role === roleUtils.getIdByOption( 'faculty' ) )
        res.redirect( '/user/faculty/profile' );
    else if ( result.role === roleUtils.getIdByOption( 'staff' ) )
        res.redirect( '/user/staff/profile' );
    else
        res.redirect( '/index' );
} );

router
.route( '/faculty/profile' )
.get( allowUserOnly, cors(), noCache, async ( req, res ) => {
    const result = await getAdminByUserId( {
        userId: Number( res.locals.userId ),
    } );

    const data = await getFacultyDetailWithId( {
        profileId:  result.roleId,
        languageId: req.query.languageId,
    } );

    res.locals.UTILS.faculty = {
        departmentUtils,
        researchGroupUtils,
        degreeUtils,
        nationUtils,
    };

    await new Promise( ( resolve, reject ) => {
        res.render( 'user/faculty/profile.pug', {
            data,
        }, ( err, html ) => {
            if ( err )
                reject( err );
            else {
                res.send( html );
                resolve();
            }
        } );
    } );
} )
.post( allowUserOnly, urlEncoded, jsonParser, async ( req, res ) => {
    try {
        res.send( await addFacultyDetail( req.body ) );
    }
    catch ( err ) {
        console.error( err );
        res.status( 500 ).send( { err, } );
    }
} )
.patch( allowUserOnly, urlEncoded, jsonParser, async ( req, res ) => {
    try {
        res.send( await updateFacultyDetail( req.body ) );
    }
    catch ( err ) {
        console.error( err );
        res.status( 500 ).send( { err, } );
    }
} )
.delete( urlEncoded, jsonParser, allowUserOnly, async ( req, res ) => {
    try {
        res.send( await deleteFacultyDetail( req.body ) );
    }
    catch ( err ) {
        console.error( err );
        res.status( 500 ).send( { err, } );
    }
} );

router
.route( '/staff/profile' )
.get( allowUserOnly, cors(), noCache, async ( req, res ) => {
    const result = await getAdminByUserId( {
        userId: Number( res.locals.userId ),
    } );

    const data = await getStaffDetailWithId( {
        profileId:  result.roleId,
        languageId: req.query.languageId,
    } );

    await new Promise( ( resolve, reject ) => {
        res.render( 'user/staff/profile.pug', {
            data,
        }, ( err, html ) => {
            if ( err )
                reject( err );
            else {
                res.send( html );
                resolve();
            }
        } );
    } );
} )
.post( allowUserOnly, urlEncoded, jsonParser, async ( req, res ) => {
    try {
        res.send( await addStaffDetail( req.body ) );
    }
    catch ( err ) {
        console.error( err );
        res.status( 500 ).send( { err, } );
    }
} )
.patch( allowUserOnly, urlEncoded, jsonParser, async ( req, res ) => {
    try {
        res.send( await updateStaffDetail( req.body ) );
    }
    catch ( err ) {
        console.error( err );
        res.status( 500 ).send( { err, } );
    }
} )
.delete( urlEncoded, jsonParser, allowUserOnly, async ( req, res ) => {
    try {
        res.send( await deleteStaffDetail( req.body ) );
    }
    catch ( err ) {
        console.error( err );
        res.status( 500 ).send( { err, } );
    }
} );

/**
 * Resolve URL `/user/faculty/award`.
 */

router
.route( '/faculty/award' )
.get( allowUserOnly, cors(), noCache, async ( req, res, next ) => {
    try {
        // Get id
        const result = await getAdminByUserId( {
            userId: Number( res.locals.userId ),
        } );
        const profileId = result.roleId;
        const languageId = req.query.languageId;

        const data = await getFacultyDetailWithId( {
            profileId,
            languageId,
        } );

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/award.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
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
 * Resolve URL `/user/faculty/project`.
 */

router
.route( '/faculty/project' )
.get( allowUserOnly, cors(), noCache, async ( req, res, next ) => {
    try {
        // Get id
        const result = await getAdminByUserId( {
            userId: Number( res.locals.userId ),
        } );
        const profileId = result.roleId;
        const languageId = req.query.languageId;

        const data = await getFacultyDetailWithId( {
            profileId,
            languageId,
        } );

        res.locals.UTILS.faculty = {
            projectCategoryUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/project.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
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
 * Resolve URL `/user/faculty/patent`.
 */

router
.route( '/faculty/patent' )
.get( allowUserOnly, cors(), noCache, async ( req, res, next ) => {
    try {
        // Get id
        const result = await getAdminByUserId( {
            userId: Number( res.locals.userId ),
        } );
        const profileId = result.roleId;
        const languageId = req.query.languageId;

        const data = await getFacultyDetailWithId( {
            profileId,
            languageId,
        } );

        res.locals.UTILS.faculty = {
            nationUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/patent.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
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
 * Resolve URL `/user/faculty/conference`.
 */

router
.route( '/faculty/conference' )
.get( allowUserOnly, cors(), noCache, async ( req, res, next ) => {
    try {
        // Get id
        const result = await getAdminByUserId( {
            userId: Number( res.locals.userId ),
        } );
        const profileId = result.roleId;
        const languageId = req.query.languageId;

        const data = await getFacultyDetailWithId( {
            profileId,
            languageId,
        } );

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/conference.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
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
 * Resolve URL `/user/faculty/student-award`.
 */

router
.route( '/faculty/student-award' )
.get( allowUserOnly, cors(), noCache, async ( req, res, next ) => {
    try {
        // Get id
        const result = await getAdminByUserId( {
            userId: Number( res.locals.userId ),
        } );
        const profileId = result.roleId;
        const languageId = req.query.languageId;

        const data = await getFacultyDetailWithId( {
            profileId,
            languageId,
        } );

        res.locals.UTILS.faculty = {
            degreeUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/student-award.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
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
 * Resolve URL `/user/uploadPhoto`.
 */

router
.route( '/uploadPhoto' )
.post( cors(), multer( {
    dest:     `${ projectRoot }/static/src/image/`,
    storage: multer.diskStorage( {
        destination: `${ projectRoot }/static/src/image/`,
    } ),
} ).single( 'file' ), async ( req, res ) => {
    try {
        // Get id
        const cookie = req.cookies.sessionId;
        res.locals.unparsedId = cookie;

        // Got a cookie from the user.
        const sid = cookieParser.signedCookies( req.cookies, secret ).sessionId;

        // Get session data in the database.
        try {
            const data = await getSession( {
                sid,
            } );

            // Check `expires`

            const result = await getAdminByUserId( {
                userId: Number( data.userId ),
            } );

            if ( result.sid !== data.sid ) {
                res.send( {
                    redirect: '/index',
                } );
            }

            // Save file & rename
            if ( result.role === roleUtils.getIdByOption( 'faculty' ) ) {
                fs.rename( req.file.path, `${ req.file.destination }faculty/${ result.roleId }${ path.extname( req.file.originalname ) }`, ( err ) => {
                    if ( err )
                        throw err;
                } );
            }
            else if ( result.role === roleUtils.getIdByOption( 'staff' ) ) {
                fs.rename( req.file.path, `${ req.file.destination }staff/${ result.roleId }${ path.extname( req.file.originalname ) }`, ( err ) => {
                    if ( err )
                        throw err;
                } );
            }
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
                    res.send( {
                        redirect: '/index',
                    } );
                } );
            }
            else {
                console.error( error );
                res.status( error.status ).send( error.message );
            }
        }
        return res.end();
    }
    catch ( error ) {
        console.error( error );
        res.status( error.status ).send( error.message );
    }
} );

/**
 * Resolve URL `/user/faculty/publication`.
 */

router
.route( '/faculty/publication' )
.get( allowUserOnly, cors(), noCache, async ( req, res, next ) => {
    try {
        // Get id
        const result = await getAdminByUserId( {
            userId: Number( res.locals.userId ),
        } );
        const profileId = result.roleId;
        const languageId = req.query.languageId;

        const data = await getFacultyDetailWithId( {
            profileId,
            languageId,
        } );

        res.locals.UTILS.faculty = {
            publicationCategoryUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/publication.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
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
 * Resolve URL `/user/faculty/technology-transfer`.
 */

router
.route( '/faculty/technology-transfer' )
.get( allowUserOnly, cors(), noCache, async ( req, res, next ) => {
    try {
        // Get id
        const result = await getAdminByUserId( {
            userId: Number( res.locals.userId ),
        } );
        const profileId = result.roleId;
        const languageId = req.query.languageId;

        const data = await getFacultyDetailWithId( {
            profileId,
            languageId,
        } );

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/technology-transfer.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
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
 * Resolve URL `/user/resetPassword`.
 */

router
.route( '/resetPassword' )
.get( allowUserOnly, staticHtml( 'user/resetPassword' ) );

/**
 * Resolve URL `/user/announcement`.
 */

router
.route( '/announcement' )
.get( allowUserOnly, staticHtml( 'user/announcement/index' ) )
.post( allowUserOnly, cors(), upload.array( 'files' ), async ( req, res ) => {
    try {
        req.body.files = req.files.map( file => ( {
            name:    file.originalname,
            content: file.buffer,
        } ) );
        res.send( await postAnnouncement( req.body ) );
    }
    catch ( error ) {
        console.error( error );
        res.status( error.status ).send( error.message );
    }
} )
.put( allowUserOnly, cors(), upload.array( 'addedFiles' ), async ( req, res ) => {
    try {
        req.body.addedFiles = req.files.map( file => ( {
            name:    file.originalname,
            content: file.buffer,
        } ) );
        res.send( await updateAnnouncement( req.body ) );
    }
    catch ( error ) {
        console.error( error );
        res.status( error.status ).send( error.message );
    }
} )
.patch( allowUserOnly, urlEncoded, jsonParser, async ( req, res ) => {
    try {
        res.send( await pinAnnouncement( req.body ) );
    }
    catch ( error ) {
        console.error( error );
        res.status( error.status ).send( error.message );
    }
} )
.delete( urlEncoded, jsonParser, allowUserOnly, async ( req, res ) => {
    try {
        res.send( await deleteAnnouncements( req.body ) );
    }
    catch ( error ) {
        console.error( error );
        res.status( error.status ).send( error.message );
    }
} );


/**
 * Resolve URL `/user/announcement/add`.
 */

router
.route( '/announcement/add' )
.get( allowUserOnly, staticHtml( 'user/announcement/add' ) );

/**
 * Resolve URL `/user/announcement/edit/[id]`.
 */

router
.route( '/announcement/edit/:announcementId' )
.get( allowUserOnly, async ( req, res, next ) => {
    try {
        const data = await getAnnouncement( {
            announcementId: Number( req.params.announcementId ),
            languageId:     req.query.languageId,
        } );
        res.locals.UTILS.announcement = {
            tagUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/announcement/edit.pug', {
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

export default router;
