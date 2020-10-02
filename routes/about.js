/**
 * Router module for route `/about`.
 *
 * Including following sub-routes:
 * - `/about/`
 * - `/about/award`
 * - `/about/contact`
 * - `/about/intro`
 * - `/about/faculty`
 * - `/about/faculty/[id]`
 * - `/about/staff`
 */

import express from 'express';
import helmet from 'helmet';

import staticHtml from 'routes/utils/static-html.js';
import contentSecurityPolicy from 'settings/server/content-security-policy';
import publicationCategoryUtils from 'models/faculty/utils/publication-category.js';
import projectCategoryUtils from 'models/faculty/utils/project-category.js';

import getFacultyDetail from 'models/faculty/operations/get-faculty-detail.js';

const router = express.Router( {
    caseSensitive: true,
    mergeParams:   false,
    strict:        false,
} );

/**
 * Resolve URL `/about`.
 */

router
.route( [
    '/',
    '/index',
] )
.get( staticHtml( 'about/index' ) );

/**
 * Resolve URL `/about/award`.
 */

router
.route( '/award' )
.get( staticHtml( 'about/award' ) );

/**
 * Resolve URL `/about/contact`.
 */

router
.route( '/contact' )
.get(
    helmet.contentSecurityPolicy( {
        directives: contentSecurityPolicy( {
            styleSrc:  [ "'unsafe-inline'", ],
            scriptSrc: [ "'unsafe-inline'", ],
        } ),
        loose:      false,
        reportOnly: true,
    } ),
    staticHtml( 'about/contact' )
);

/**
 * Resolve URL `/about/intro`.
 */

router
.route( '/intro' )
.get( staticHtml( 'about/intro' ) );

/**
 * Resolve URL `/about/faculty`.
 */

router
.route( '/faculty' )
.get( staticHtml( 'about/faculty' ) );

/**
 * Resolve URL `/about/faculty/[id]`.
 */

router
.route( '/faculty/:profileId' )
.get( async ( req, res, next ) => {
    try {
        const data = await getFacultyDetail( {
            profileId: Number( req.params.profileId ),
            language:  Number( req.query.languageId ),
        } );

        res.locals.UTILS.faculty = {
            publicationCategoryUtils,
            projectCategoryUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'about/faculty-detail.pug', {
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
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} );

/**
 * Resolve URL `/about/staff`.
 */

router
.route( '/staff' )
.get( staticHtml( 'about/staff' ) );

export default router;
