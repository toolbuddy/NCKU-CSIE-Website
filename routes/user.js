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

import staticHtml from 'routes/utils/static-html.js';
import LanguageUtils from 'models/common/utils/language.js';
import { resolve, } from 'q';

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
    console.log( 'in route user/profile post' );
    try {
        const data = JSON.parse( Object.keys( req.body )[ 0 ] );
        let uploadData = '';

        if ( data.method === 'add' ) {
            if ( data.dbTable === 'specialty' ) {
                uploadData = {
                    profileId:    data.profileId,
                    add:       {
                        specialtyI18n:
                            Object.keys( data.i18n ).map( ( languageId ) => {
                                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                                dbTableItem.languageId = languageId;
                                return dbTableItem;
                            } ),
                    },
                };
            }
            else if ( data.dbTable === 'department' || data.dbTable === 'researchGroup' ) {
                uploadData = {
                    profileId:    data.profileId,
                    add:       {
                        [ data.dbTable ]: [
                            data.dbTableItemId,
                        ],
                    },
                };
            }
            else {
                const item = Object.assign( {}, data.item );
                item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                    const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                    dbTableItem.languageId = languageId;
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
        }

        if ( data.method === 'delete' ) {
            const dbTable = ( data.dbTable === 'specialty' ) ? 'specialtyI18n' : data.dbTable;
            uploadData = {
                profileId:            data.profileId,
                [ data.method ]: {
                    [ dbTable ]: [
                        data.dbTableItemId,
                    ],
                },
            };
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
            else if ( data.dbTable === 'education' ) {
                const item = {
                    from:         data.item.from === '' ? null : Number( data.item.from ),
                    to:           data.item.to === '' ? null : Number( data.item.to ),

                    // Nation:       Number( data.item.nation ),
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
                console.log( 'in profile format' );
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
                console.log( item );
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
        }

        console.log( uploadData );
        for ( const a of uploadData.update.education )
            console.log( a );


        // Add faculty data
        // const addData = await addFacultyDetail( {
        // profileId:     uploadData.profileId,
        // Department:    uploadData.add.department,
        // education:     uploadData.add.education,
        // Experience:    uploadData.add.experience,
        // ResearchGroup: uploadData.add.researchGroup,
        // specialtyI18n: uploadData.add.specialtyI18n,
        // title:         uploadData.add.title,
        // } );

        // Update faculty data
        const updateData = await updateFacultyDetail( {
            profileId:      uploadData.profileId, // UserData.roleId
            education:      uploadData.update.education,
            experience:     uploadData.update.experience,
            profile:        uploadData.update.profile,
            specialtyI18n:  uploadData.update.specialtyI18n,
            title:          uploadData.update.title,
        } );

        // Delete faculty data
        // const deleteData = await deleteFacultyDetail( {
        //     profileId:     uploadData.profileId,
        //     department:    uploadData.delete.department,
        //     education:     uploadData.delete.education,
        //     experience:    uploadData.delete.experience,
        //     researchGroup: uploadData.delete.researchGroup,
        //     specialtyI18n: uploadData.delete.specialtyI18n,
        //     title:         uploadData.delete.title,
        // } );


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
