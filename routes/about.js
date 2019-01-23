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

import path from 'path';

import express from 'express';

import { projectRoot, } from 'settings/server/config.js';
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

router.get( '/', ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/about/index.${ req.query.languageId }.html` ) );
} );

/**
 * Resolve URL `/about/award`.
 */

router.get( '/award', ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/about/award.${ req.query.languageId }.html` ) );
} );

/**
 * Resolve URL `/about/contact`.
 */

router.get( '/contact', ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/about/contact.${ req.query.languageId }.html` ) );
} );

/**
 * Resolve URL `/about/intro`.
 */

router.get( '/intro', ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/about/intro.${ req.query.languageId }.html` ) );
} );

/**
 * Resolve URL `/about/faculty`.
 */

router.get( '/faculty', ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/about/faculty.${ req.query.languageId }.html` ) );
} );

/**
 * Resolve URL `/about/faculty/[id]`.
 */

router.get( '/faculty/:profileId', async ( req, res, next ) => {
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

router.get( '/staff', ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/about/staff.${ req.query.languageId }.html` ) );
} );

export default router;
