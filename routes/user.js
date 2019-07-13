/**
 * Router module for route `/user`.
 *
 * Including following sub-routes:
 * - `/user`
 * - `/user/profile`
 * - `/user/announcement`
 * - `/user/announcement/add`
 * - `/user/announcement/edit/[id]`
 */

import express from 'express';

import staticHtml from 'routes/utils/static-html.js';

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
.post( async ( req, res ) => {
    console.log( 'in route user/profile post' );
    try {
        console.log( 'should fix!' );

        // Check updating faculty or staff -> call the corresponding model operation
    }
    catch ( error ) {
        console.error( error );
    }
} );

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
