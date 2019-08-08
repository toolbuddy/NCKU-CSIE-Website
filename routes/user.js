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
import addFacultyDetail from 'models/faculty/operations/add-faculty-detail.js';
import updateFacultyDetail from 'models/faculty/operations/update-faculty-detail.js';
import deleteFacultyDetail from 'models/faculty/operations/delete-faculty-detail.js';
import cookieParser from 'cookie-parser';
import getSession from 'models/auth/operations/get-session.js';
import saveSession from 'models/auth/operations/save-session.js';
import getAdminByUserId from 'models/auth/operations/get-admin-by-userId.js';
import { secret, host, } from 'settings/server/config.js';
import staticHtml from 'routes/utils/static-html.js';
import { numberTypeAnnotation, } from 'babel-types';

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
 * Resolve URL `/user/profile`.
 */

router
.route( '/profile' )
.get( staticHtml( 'user/profile' ) )
.post( cors(), async ( req, res ) => {
    try {
        console.log( 'in route user/profile' );

        // Get id
        const cookie = req.cookies.sessionId;
        res.locals.unparsedId = cookie;

        let userData = -1;
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

                        res.redirect( '/index' );
                    } );
                }
                else if ( data.userId !== null ) {
                    const result = await getAdminByUserId( {
                        userId: Number( data.userId ),
                    } );

                    if ( result.sid === data.sid )
                        userData = result;
                    else
                        res.redirect( '/index' );
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

                        // Send new session & user id
                        res.redirect( '/index' );
                    } );
                }
                else
                    console.error( error );
            }
        }

        console.log( userData );

        // Get data
        const data = JSON.parse( Object.keys( req.body )[ 0 ] );
        let uploadData = '';

        if ( data.method === 'add' ) {
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
            else if ( data.dbTable === 'patent' ) {
                const date = {
                    applicationDate: {
                        day:   ( data.item.applicationDay === '' ) ? 1 : Number( data.item.applicationDay ),
                        month: ( data.item.applicationMonth === '' ) ? 0 : Number( data.item.applicationMonth ) - 1,
                        year:  ( data.item.applicationYear === '' ) ? null : Number( data.item.applicationYear ),
                    },
                    expireDate: {
                        day:   ( data.item.expireDay === '' ) ? 1 : Number( data.item.expireDay ),
                        month: ( data.item.expireMonth === '' ) ? 0 : Number( data.item.expireMonth ) - 1,
                        year:  ( data.item.expireYear === '' ) ? null : Number( data.item.expireYear ),
                    },
                    issueDate: {
                        day:   ( data.item.issueDay === '' ) ? 1 : Number( data.item.issueDay ),
                        month: ( data.item.issueMonth === '' ) ? 0 : Number( data.item.issueMonth ) - 1,
                        year:  ( data.item.issueYear === '' ) ? null : Number( data.item.issueYear ),
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
                console.log( item );
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
            else if ( data.dbTable === 'award' ) {
                const item = {
                    receivedDay:   data.item.receivedDay === '' ? null : Number( data.item.receivedDay ),
                    receivedMonth:  data.item.receivedMonth === '' ? null : Number( data.item.receivedMonth ),
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
                profileId:     uploadData.profileId,
                department:    uploadData.add.department,
                education:     uploadData.add.education,
                experience:    uploadData.add.experience,
                researchGroup: uploadData.add.researchGroup,
                specialtyI18n: uploadData.add.specialtyI18n,
                title:         uploadData.add.title,
                award:         uploadData.add.award,
                conference:    uploadData.add.conference,
                publication:   uploadData.add.publication,
                patent:        uploadData.add.patent,
            } );
        }

        if ( data.method === 'delete' ) {
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
                profileId:     uploadData.profileId,
                department:    uploadData.delete.department,
                education:     uploadData.delete.education,
                experience:    uploadData.delete.experience,
                researchGroup: uploadData.delete.researchGroup,
                specialtyI18n: uploadData.delete.specialtyI18n,
                title:         uploadData.delete.title,
                award:         uploadData.delete.award,
                conference:    uploadData.delete.conference,
                publication:   uploadData.delete.publication,
                patent:        uploadData.delete.patent,
            } );
        }

        if ( data.method === 'update' ) {
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
                        day:   ( data.item.applicationDay === '' ) ? 1 : Number( data.item.applicationDay ),
                        month: ( data.item.applicationMonth === '' ) ? 0 : Number( data.item.applicationMonth ) - 1,
                        year:  ( data.item.applicationYear === '' ) ? null : Number( data.item.applicationYear ),
                    },
                    expireDate: {
                        day:   ( data.item.expireDay === '' ) ? 1 : Number( data.item.expireDay ),
                        month: ( data.item.expireMonth === '' ) ? 0 : Number( data.item.expireMonth ) - 1,
                        year:  ( data.item.expireYear === '' ) ? null : Number( data.item.expireYear ),
                    },
                    issueDate: {
                        day:   ( data.item.issueDay === '' ) ? 1 : Number( data.item.issueDay ),
                        month: ( data.item.issueMonth === '' ) ? 0 : Number( data.item.issueMonth ) - 1,
                        year:  ( data.item.issueYear === '' ) ? null : Number( data.item.issueYear ),
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
                    receivedMonth:    data.item.receivedMonth === '' ? null : Number( data.item.receivedMonth ),
                    receivedDay:    data.item.receivedDay === '' ? null : Number( data.item.receivedDay ),
                    receivedYear:    data.item.receivedYear === '' ? null : Number( data.item.receivedYear ),
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
                profileId:      uploadData.profileId, // UserData.roleId
                education:      uploadData.update.education,
                experience:     uploadData.update.experience,
                profile:        uploadData.update.profile,
                specialtyI18n:  uploadData.update.specialtyI18n,
                title:          uploadData.update.title,
                award:          uploadData.update.award,
                conference:     uploadData.update.conference,
                publication:    uploadData.update.publication,
                patent:         uploadData.update.patent,
            } );
        }

        res.json();

        // Check updating faculty or staff -> call the corresponding model operation
    }
    catch ( error ) {
        console.error( error );
    }
} );

/**
 * Resolve URL `/user/award`.
 */

router
.route( '/award' )
.get( staticHtml( 'user/award' ) );

/**
 * Resolve URL `/user/project`.
 */

router
.route( '/project' )
.get( staticHtml( 'user/project' ) );

/**
 * Resolve URL `/user/patent`.
 */

router
.route( '/patent' )
.get( staticHtml( 'user/patent' ) );

/**
 * Resolve URL `/user/conference`.
 */

router
.route( '/conference' )
.get( staticHtml( 'user/conference' ) );

/**
 * Resolve URL `/user/publication`.
 */

router
.route( '/publication' )
.get( staticHtml( 'user/publication' ) );

/**
 * Resolve URL `/user/resetPassword`.
 */

router
.route( '/resetPassword' )
.get( staticHtml( 'user/resetPassword' ) );

/**
 * Resolve URL `/user/announcement`.
 */

router
.route( '/announcement' )
.get( staticHtml( 'user/announcement/index' ) );

/**
 * Resolve URL `/user/announcement/add`.
 */

router
.route( '/announcement/add' )
.get( staticHtml( 'user/announcement/add' ) );

/**
 * Resolve URL `/user/announcement/edit/[id]`.
 */

router
.route( '/announcement/edit/:announcementId' )
.get( staticHtml( 'user/announcement/edit' ) );

export default router;
