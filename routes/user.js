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
import deleteAnnouncements from 'models/announcement/operations/delete-announcements.js';
import addFacultyDetail from 'models/faculty/operations/add-faculty-detail.js';
import updateFacultyDetail from 'models/faculty/operations/update-faculty-detail.js';
import deleteFacultyDetail from 'models/faculty/operations/delete-faculty-detail.js';
import updateStaffDetail from 'models/staff/operations/update-staff-detail.js';
import deleteStaffDetail from 'models/staff/operations/delete-staff-detail.js';

import cookieParser from 'cookie-parser';
import getSession from 'models/auth/operations/get-session.js';
import saveSession from 'models/auth/operations/save-session.js';
import getAdminByUserId from 'models/auth/operations/get-admin-by-userId.js';
import { secret, host, projectRoot, maxAge, } from 'settings/server/config.js';
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

import getStaffDetailWithId from 'models/staff/operations/get-staff-detail-with-id.js';
import getFacultyDetailWithId from 'models/faculty/operations/get-faculty-detail-with-id.js';

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
.get( allowUserOnly, cors(), noCache, async ( req, res, next ) => {
    res.sendFile(
        `static/dist/html/user/faculty/profile.${ req.query.languageId }.html`,
        {
            root:         projectRoot,
            maxAge,
            dotfiles:     'deny',
            cacheControl: true,
        },
        ( err ) => {
            if ( err )
                next( err );
        }
    );
} )
.post( urlEncoded, jsonParser, allowUserOnly, async ( req, res ) => {
    const data = JSON.parse( Object.keys( req.body )[ 0 ] );
    let uploadData = '';
    try {
        if ( data.dbTable === 'specialty' ) {
            uploadData = {
                profileId:    data.profileId,
                add:       {
                    specialtyI18n: [
                        Object.keys( data.i18n ).map( ( languageId ) => {
                            const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                            dbTableItem.language = Number( languageId );
                            return dbTableItem;
                        } ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'department' || data.dbTable === 'researchGroup' ) {
            uploadData = {
                profileId:    data.profileId,
                add:       {
                    [ data.dbTable ]: [
                        Number( data.dbTableItemId ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'title' ) {
            const item = {
                from:    data.item.from === '' ? null : Number( data.item.from ),
                to:      data.item.to === '' ? null : Number( data.item.to ),
            };
            item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                dbTableItem.language = Number( languageId );
                return dbTableItem;
            } );
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'project' ) {
            const item = {
                from:     data.item.from === '' ? null : Number( data.item.from ),
                to:       data.item.to === '' ? null : Number( data.item.to ),
                category: Number( data.item.category ),
            };
            item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                dbTableItem.language = Number( languageId );
                return dbTableItem;
            } );
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'patent' ) {
            const date = {
                applicationDate: {
                    day:   ( data.item.applicationDateDay === '' ) ? 1 : Number( data.item.applicationDateDay ),
                    month: ( data.item.applicationDateMonth === '' ) ? 0 : Number( data.item.applicationDateMonth ) - 1,
                    year:  ( data.item.applicationDateYear === '' ) ? null : Number( data.item.applicationDateYear ),
                },
                expireDate: {
                    day:   ( data.item.expireDateDay === '' ) ? 1 : Number( data.item.expireDateDay ),
                    month: ( data.item.expireDateMonth === '' ) ? 0 : Number( data.item.expireDateMonth ) - 1,
                    year:  ( data.item.expireDateYear === '' ) ? null : Number( data.item.expireDateYear ),
                },
                issueDate: {
                    day:   ( data.item.issueDateDay === '' ) ? 1 : Number( data.item.issueDateDay ),
                    month: ( data.item.issueDateMonth === '' ) ? 0 : Number( data.item.issueDateMonth ) - 1,
                    year:  ( data.item.issueDateYear === '' ) ? null : Number( data.item.issueDateYear ),
                },
            };
            const item = {
                certificationNumber: data.item.certificationNumber,
                nation:              Number( data.item.nation ),
            };
            Object.keys( date ).forEach( ( element ) => {
                const temp = date[ element ];
                item[ element ] = ( temp.year === null ) ? null : new Date( temp.year, temp.month, temp.day );
            } );
            item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                dbTableItem.language = Number( languageId );
                return dbTableItem;
            } );
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'publication' ) {
            const item = {
                category:      Number( data.item.category ),
                international: data.item.international,
                refereed:      data.item.refereed,
                issueYear:     data.item.issueYear === '' ? null : Number( data.item.issueYear ),
                issueMonth:    1,
            };
            item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                dbTableItem.language = Number( languageId );
                return dbTableItem;
            } );
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'conference' ) {
            const item = {
                hostYear:    data.item.hostYear === '' ? null : Number( data.item.hostYear ),
            };
            item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                dbTableItem.language = Number( languageId );
                return dbTableItem;
            } );
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'experience' ) {
            const item = {
                from:         data.item.from === '' ? null : Number( data.item.from ),
                to:           data.item.to === '' ? null : Number( data.item.to ),
            };
            item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                dbTableItem.language = Number( languageId );
                return dbTableItem;
            } );
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'technologyTransfer' ) {
            const item = {
                from:         data.item.from === '' ? null : Number( data.item.from ),
                to:           data.item.to === '' ? null : Number( data.item.to ),
            };
            item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                dbTableItem.language = Number( languageId );
                return dbTableItem;
            } );
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'education' ) {
            const item = {
                from:         data.item.from === '' ? null : Number( data.item.from ),
                to:           data.item.to === '' ? null : Number( data.item.to ),
                nation:       Number( data.item.nation ),
                degree:       Number( data.item.degree ),
            };
            item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                dbTableItem.language = Number( languageId );
                return dbTableItem;
            } );
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'technologyTransferPatent' ) {
            const item = {
                technologyTransferId: Number( data.dbTableId ),
            };
            item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                dbTableItem.language = Number( languageId );
                return dbTableItem;
            } );
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'student' ) {
            const item = {
                studentAwardId:    Number( data.dbTableId ),
                degree:            Number( data.item.degree ),
            };
            item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                dbTableItem.language = Number( languageId );
                return dbTableItem;
            } );
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'studentAward' ) {
            const item = {
                receivedYear:  data.item.receivedYear === '' ? null : Number( data.item.receivedYear ),
            };
            item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                dbTableItem.language = Number( languageId );
                return dbTableItem;
            } );
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'award' ) {
            const item = {
                receivedYear:  data.item.receivedYear === '' ? null : Number( data.item.receivedYear ),
            };
            item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                dbTableItem.language = Number( languageId );
                return dbTableItem;
            } );
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }

        await addFacultyDetail( {
            profileId:                uploadData.profileId,
            department:               uploadData.add.department,
            education:                uploadData.add.education,
            experience:               uploadData.add.experience,
            technologyTransfer:       uploadData.add.technologyTransfer,
            researchGroup:            uploadData.add.researchGroup,
            specialtyI18n:            uploadData.add.specialtyI18n,
            title:                    uploadData.add.title,
            award:                    uploadData.add.award,
            conference:               uploadData.add.conference,
            publication:              uploadData.add.publication,
            patent:                   uploadData.add.patent,
            project:                  uploadData.add.project,
            studentAward:             uploadData.add.studentAward,
            student:                  uploadData.add.student,
            technologyTransferPatent: uploadData.add.technologyTransferPatent,
        } );
        res.send( { message: 'success', } );
    }
    catch ( err ) {
        console.error( err );
        res.status( 500 ).send( { err, } );
    }
} )
.patch( urlEncoded, jsonParser, allowUserOnly, async ( req, res ) => {
    const data = JSON.parse( Object.keys( req.body )[ 0 ] );
    let uploadData = '';
    try {
        if ( data.dbTable === 'title' ) {
            const item = {
                from:    data.item.from === '' ? null : Number( data.item.from ),
                to:      data.item.to === '' ? null : Number( data.item.to ),
                titleId: Number( data.dbTableItemId ),
            };
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'publication' ) {
            const item = {
                category:      Number( data.item.category ),
                international: data.item.international,
                refereed:      data.item.refereed,
                issueYear:     data.item.issueYear === '' ? null : Number( data.item.issueYear ),
                issueMonth:    1,
                publicationId: Number( data.dbTableItemId ),
            };
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'patent' ) {
            const date = {
                applicationDate: {
                    day:   ( data.item.applicationDateDay === '' ) ? 1 : Number( data.item.applicationDateDay ),
                    month: ( data.item.applicationDateMonth === '' ) ? 0 : Number( data.item.applicationDateMonth ) - 1,
                    year:  ( data.item.applicationDateYear === '' ) ? null : Number( data.item.applicationDateYear ),
                },
                expireDate: {
                    day:   ( data.item.expireDateDay === '' ) ? 1 : Number( data.item.expireDateDay ),
                    month: ( data.item.expireDateMonth === '' ) ? 0 : Number( data.item.expireDateMonth ) - 1,
                    year:  ( data.item.expireDateYear === '' ) ? null : Number( data.item.expireDateYear ),
                },
                issueDate: {
                    day:   ( data.item.issueDateDay === '' ) ? 1 : Number( data.item.issueDateDay ),
                    month: ( data.item.issueDateMonth === '' ) ? 0 : Number( data.item.issueDateMonth ) - 1,
                    year:  ( data.item.issueDateYear === '' ) ? null : Number( data.item.issueDateYear ),
                },
            };
            const item = {
                certificationNumber: data.item.certificationNumber,
                nation:              Number( data.item.nation ),
                patentId:            Number( data.dbTableItemId ),
            };
            Object.keys( date ).forEach( ( element ) => {
                const temp = date[ element ];
                item[ element ] = ( temp.year === null ) ? null : new Date( temp.year, temp.month, temp.day );
            } );
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'conference' ) {
            const item = {
                hostYear:     data.item.hostYear === '' ? null : Number( data.item.hostYear ),
                conferenceId: Number( data.dbTableItemId ),
            };
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'award' ) {
            const item = {
                receivedYear:  data.item.receivedYear === '' ? null : Number( data.item.receivedYear ),
                awardId:       Number( data.dbTableItemId ),
            };
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'studentAward' ) {
            const item = {
                receivedYear:   data.item.receivedYear === '' ? null : Number( data.item.receivedYear ),
                studentAwardId:        Number( data.dbTableItemId ),
            };
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'technologyTransferPatent' ) {
            const item = {
                technologyTransferPatentId:    Number( data.dbTableItemId ),
            };
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'student' ) {
            const item = {
                degree:       Number( data.item.degree ),
                studentId:    Number( data.dbTableItemId ),
            };
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'education' ) {
            const item = {
                from:         data.item.from === '' ? null : Number( data.item.from ),
                to:           data.item.to === '' ? null : Number( data.item.to ),
                nation:       Number( data.item.nation ),
                degree:       Number( data.item.degree ),
                educationId: Number( data.dbTableItemId ),
            };
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'project' ) {
            const item = {
                from:         data.item.from === '' ? null : Number( data.item.from ),
                to:           data.item.to === '' ? null : Number( data.item.to ),
                category:       Number( data.item.category ),
                projectId: Number( data.dbTableItemId ),
            };
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'experience' ) {
            const item = {
                from:         data.item.from === '' ? null : Number( data.item.from ),
                to:           data.item.to === '' ? null : Number( data.item.to ),
                experienceId: Number( data.dbTableItemId ),
            };
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'technologyTransfer' ) {
            const item = {
                from:                 data.item.from === '' ? null : Number( data.item.from ),
                to:                   data.item.to === '' ? null : Number( data.item.to ),
                technologyTransferId: Number( data.dbTableItemId ),
            };
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: [
                        Object.assign( {}, item ),
                    ],
                },
            };
        }
        else if ( data.dbTable === 'specialty' ) {
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    newData.specialtyId = Number( data.dbTableItemId );
                    i18nData.push( newData );
                }
            } );
            uploadData = {
                profileId:    data.profileId,
                update:       {
                    specialtyI18n: i18nData,
                },
            };
        }
        else if ( data.dbTable === 'profile' ) {
            const item = {
                fax:         data.item.fax,
                email:       data.item.email,
                personalWeb: data.item.personalWeb,
                nation:      Number( data.item.nation ),
                photo:       data.item.photo,
                officeTel:   data.item.officeTel,
                labTel:      data.item.labTel,
                labWeb:      data.item.labWeb,
            };
            Object.keys( item ).forEach( ( key ) => {
                if ( typeof ( item[ key ] ) === 'undefined' || Number.isNaN( item[ key ] ) || item[ key ] === null )
                    delete item[ key ];
            } );
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: Object.assign( {}, item ),
                },
            };
        }
        await updateFacultyDetail( {
            profileId:                uploadData.profileId,
            education:                uploadData.update.education,
            experience:               uploadData.update.experience,
            profile:                  uploadData.update.profile,
            specialtyI18n:            uploadData.update.specialtyI18n,
            title:                    uploadData.update.title,
            award:                    uploadData.update.award,
            conference:               uploadData.update.conference,
            publication:              uploadData.update.publication,
            patent:                   uploadData.update.patent,
            project:                  uploadData.update.project,
            studentAward:             uploadData.update.studentAward,
            technologyTransfer:       uploadData.update.technologyTransfer,
            technologyTransferPatent: uploadData.update.technologyTransferPatent,
            student:                  uploadData.update.student,
        } );
        res.send( { message: 'success', } );
    }
    catch ( err ) {
        console.error( err );
        res.status( 500 ).send( { err, } );
    }
} )
.delete( urlEncoded, jsonParser, allowUserOnly, async ( req, res ) => {
    const data = JSON.parse( Object.keys( req.body )[ 0 ] );
    let uploadData = '';

    try {
        const dbTable = ( data.dbTable === 'specialty' ) ? 'specialtyI18n' : data.dbTable;
        uploadData = {
            profileId:            data.profileId,
            [ data.method ]: {
                [ dbTable ]: [
                    Number( data.dbTableItemId ),
                ],
            },
        };
        await deleteFacultyDetail( {
            profileId:                uploadData.profileId,
            department:               uploadData.delete.department,
            education:                uploadData.delete.education,
            experience:               uploadData.delete.experience,
            researchGroup:            uploadData.delete.researchGroup,
            specialtyI18n:            uploadData.delete.specialtyI18n,
            title:                    uploadData.delete.title,
            award:                    uploadData.delete.award,
            conference:               uploadData.delete.conference,
            publication:              uploadData.delete.publication,
            patent:                   uploadData.delete.patent,
            project:                  uploadData.delete.project,
            studentAward:             uploadData.delete.studentAward,
            technologyTransfer:       uploadData.delete.technologyTransfer,
            student:                  uploadData.delete.student,
            technologyTransferPatent: uploadData.delete.technologyTransferPatent,
        } );
        res.send( { message: 'success', } );
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
.patch( urlEncoded, jsonParser, allowUserOnly, cors(), async ( req, res ) => {
    const data = JSON.parse( Object.keys( req.body )[ 0 ] );
    let uploadData = '';

    try {
        if ( data.dbTable === 'title' ) {
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    newData.titleId = Number( data.dbTableItemId );
                    i18nData.push( newData );
                }
            } );
            uploadData = {
                profileId:    data.profileId,
                update:       {
                    titleI18n: i18nData,
                },
            };
        }
        if ( data.dbTable === 'business' ) {
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    newData.businessId = Number( data.dbTableItemId );
                    i18nData.push( newData );
                }
            } );
            uploadData = {
                profileId:    data.profileId,
                update:       {
                    businessI18n: i18nData,
                },
            };
        }
        else if ( data.dbTable === 'profile' ) {
            const item = {
                email:       data.item.email,
                photo:       data.item.photo,
                officeTel:   data.item.officeTel,
            };
            Object.keys( item ).forEach( ( key ) => {
                if ( typeof ( item[ key ] ) === 'undefined' || Number.isNaN( item[ key ] ) || item[ key ] === null )
                    delete item[ key ];
            } );
            const i18nData = [];
            Object.keys( data.i18n ).forEach( ( languageId ) => {
                if ( !isEmpty( data.i18n[ languageId ] ) ) {
                    const newData = Object.assign( {}, data.i18n[ languageId ] );
                    newData.language = Number( languageId );
                    i18nData.push( newData );
                }
            } );
            item.i18n = i18nData;
            uploadData = {
                profileId:       data.profileId,
                [ data.method ]: {
                    [ data.dbTable ]: Object.assign( {}, item ),
                },
            };
        }
        await updateStaffDetail( {
            profileId:    uploadData.profileId,
            profile:      uploadData.update.profile,
            titleI18n:    uploadData.update.title,
            businessI18n: uploadData.update.business,
        } );
        res.send( { message: 'success', } );
    }
    catch ( err ) {
        console.error( err );
        res.status( 500 ).send( { err, } );
    }
} )
.delete( urlEncoded, jsonParser, allowUserOnly, cors(), async ( req, res ) => {
    const data = JSON.parse( Object.keys( req.body )[ 0 ] );
    let uploadData = '';

    try {
        uploadData = {
            profileId:       data.profileId,
            [ data.method ]: {
                [ data.dbTable ]: [
                    Number( data.dbTableItemId ),
                ],
            },
        };
        await deleteStaffDetail( {
            profileId:    uploadData.profileId,
            businessI18n: uploadData.delete.business,
            titleI18n:    uploadData.delete.title,
        } );
        res.send( { message: 'success', } );
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
.get( allowUserOnly, staticHtml( 'user/announcement/index' ) );

/**
 * Resolve URL `/user/announcement/add`.
 */

router
.route( '/announcement/add' )
.get( allowUserOnly, staticHtml( 'user/announcement/add' ) )
.post( urlEncoded, jsonParser, allowUserOnly, cors(), multer( {
    dest:     `${ projectRoot }/static/src/image/`,
    storage: multer.diskStorage( {
        destination: `${ projectRoot }/static/src/image/`,
    } ),
} ).single( 'file' ), async ( req, res ) => {
    // Const result = await getAdminByUserId( {
    //     userId: Number( res.locals.userId ),
    // } );

    // Try {
    //     // Save file & rename
    //     if ( result.role === roleUtils.getIdByOption( 'faculty' ) ) {
    //         fs.rename( req.file.path, `${ req.file.destination }faculty/${ result.roleId }${ path.extname( req.file.originalname ) }`, ( err ) => {
    //             if ( err )
    //                 throw err;
    //         } );
    //     }
    //     else if ( result.role === roleUtils.getIdByOption( 'staff' ) ) {
    //         fs.rename( req.file.path, `${ req.file.destination }staff/${ result.roleId }${ path.extname( req.file.originalname ) }`, ( err ) => {
    //             if ( err )
    //                 throw err;
    //         } );
    //     }
    // }
    // catch ( error ) {
    //     console.error( error );
    // }

    try {
        res.send( await postAnnouncement( req.body ) );
    }
    catch ( error ) {
        console.error( error );
        res.status( error.status ).send( error.message );
    }
} );

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
} )
.put( urlEncoded, jsonParser, allowUserOnly, async ( req, res ) => {
    try {
        res.send( await updateAnnouncement( req.body ) );
    }
    catch ( error ) {
        console.error( error );
        res.status( error.status ).send( error.message );
    }
} );

/**
 * Resolve URL `/user/announcement/pin`.
 */

router
.route( '/announcement/pin' )
.post( urlEncoded, jsonParser, allowUserOnly, async ( req, res ) => {
    try {
        const data = JSON.parse( Object.keys( req.body )[ 0 ] );

        await updateAnnouncement( {
            announcementId:   data.announcementId,
            author:           Number( data.author ),
            isPinned:         Number( data.isPinned ),
            i18n:             [],
            fileI18n:       [],
        } );

        res.send( { message: 'success', } );
    }
    catch ( error ) {
        console.error( error );
        res.status( error.status ).send( error.message );
    }
} );

router
.route( '/announcement/delete' )
.post( urlEncoded, jsonParser, allowUserOnly, async ( req, res ) => {
    try {
        await deleteAnnouncements( req.body );

        res.send( { message: 'success', } );
    }
    catch ( error ) {
        console.error( error );
        res.status( error.status ).send( error.message );
    }
} );

export default router;
