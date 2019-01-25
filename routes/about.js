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

import contentSecurityPolicy from 'settings/server/content-security-policy';
import staticHtml from 'routes/utils/static-html.js';
import getFacultyDetail from 'models/faculty/operations/get-faculty-detail.js';
import DegreeUtils from 'models/faculty/utils/degree';
import DepartmentUtils from 'models/faculty/utils/department';
import NationUtils from 'models/faculty/utils/nation';
import ProjectUtils from 'models/faculty/utils/project';
import PublicationUtils from 'models/faculty/utils/publication';
import ResearchGroupUtils from 'models/faculty/utils/research-group';

const router = express.Router();

/**
 * Resolve URL `/about`.
 */

router
.route( '/' )
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
        const profileId = Number( req.params.profileId );
        const languageId = req.query.languageId;

        /**
         * Invalid profileId.
         * Handle with 400 bad request.
         *
         * @todo use profile util or validator to check `profileId`.
         */

        if ( !Number.isInteger( profileId ) ) {
            res.status( 400 );
            next();
            return;
        }
        const data = await getFacultyDetail( {
            profileId,
            languageId,
        } );
        if ( data.error ) {
            res.status( data.status );
            next();
            return;
        }

        data.department = data.department.map( departmentId => DepartmentUtils.getDepartmentById( {
            departmentId,
            languageId,
        } ) );
        data.education = data.education.map( ( education ) => {
            education.degree = DegreeUtils.getDegreeById( {
                degreeId: education.degree,
                languageId,
            } );
            education.nation = NationUtils.getNationById( {
                nationId: education.nation,
                languageId,
            } );
            return education;
        } );
        data.project = data.project.map( ( project ) => {
            project.category = ProjectUtils.getProjectCategoryById( {
                projectCategoryId: project.category,
                languageId,
            } );
            return project;
        } );
        data.publication = data.publication.map( ( publication ) => {
            publication.category = PublicationUtils.getPublicationCategoryById( {
                publicationCategoryId: publication.category,
                languageId,
            } );
            return publication;
        } );
        data.researchGroup = data.researchGroup.map( researchGroup => ResearchGroupUtils.getResearchGroupById( {
            researchGroupId: researchGroup,
            languageId,
        } ) );
        data.studentAward = data.studentAward.map( ( studentAward ) => {
            studentAward.student = studentAward.student.map( ( student ) => {
                student.degree = DegreeUtils.getDegreeById( {
                    degreeId: student.degree,
                    languageId,
                } );
                return student;
            } );
            return studentAward;
        } );

        res.render( 'about/faculty-detail.pug', {
            data,
        } );
    }
    catch ( error ) {
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
