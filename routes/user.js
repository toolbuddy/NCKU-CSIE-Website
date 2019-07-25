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
import updateFacultyDetail from 'models/faculty/operations/update-faculty-detail.js';

import staticHtml from 'routes/utils/static-html.js';
import LanguageUtils from 'models/common/utils/language.js';
import { resolve, } from 'q';

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
        console.log( 'should fix!' );

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
            if ( data.dbTable === 'title' || data.dbTable === 'education' || data.dbTable === 'experience' ) {
                const item = Object.assign( {}, data.item );
                item[ `${ data.dbTable }Id` ] = data.dbTableItemId;
                item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                    const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                    dbTableItem.languageId = languageId;
                    return dbTableItem;
                } );
                uploadData = {
                    profileId:       data.profileId,
                    [ data.method ]: {
                        [ data.dbTable ]: [
                            Object.assign( {}, item ),
                        ],
                    },
                };
            }
            if ( data.dbTable === 'specialty' ) {
                uploadData = {
                    profileId:    data.profileId,
                    add:       {
                        specialtyI18n:
                            Object.keys( data.i18n ).map( ( languageId ) => {
                                const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                                dbTableItem.languageId = languageId;
                                dbTableItem.specialtyId = data.dbTableItemId;
                                return dbTableItem;
                            } ),
                    },
                };
            }
            if ( data.dbTable === 'profile' ) {
                const item = Object.assign( {}, data.item );
                item.i18n = Object.keys( data.i18n ).map( ( languageId ) => {
                    const dbTableItem = Object.assign( {}, data.i18n[ languageId ] );
                    return dbTableItem;
                } );
                uploadData = {
                    profileId:       data.profileId,
                    [ data.method ]: {
                        [ data.dbTable ]: [
                            Object.assign( {}, item ),
                        ],
                    },
                };
            }
        }

        console.log( uploadData );


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
