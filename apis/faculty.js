/**
 * API router middleware module for `/api/faculty`.
 *
 * Including following sub-routing modules:
 * - `/api/faculty`
 * - `/api/faculty/lab`
 * - `/api/faculty/publication`
 * - `/api/faculty/[id]`
 */

import express from 'express';

import getFaculty from 'models/faculty/operations/get-faculty.js';
import getLabs from 'models/faculty/operations/get-labs.js';
import getPublications from 'models/faculty/operations/get-publication.js';
import getFacultyDetail from 'models/faculty/operations/get-faculty-detail.js';

const apis = express.Router();

/**
 * Resolve URL `/api/faculty`.
 */

apis.get( '/', async ( req, res, next ) => {
    try {
        res.json( await getFaculty( Number( req.query.languageId ) ) );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/faculty/lab`.
 */

apis.get( '/lab', async ( req, res, next ) => {
    try {
        res.json( await getLabs( Number( req.query.languageId ) ) );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/faculty/publication`.
 */

apis.get( '/publication', async ( req, res, next ) => {
    try {
        res.json( await getPublications( {
            language: Number( req.query.languageId ),
            from:     Number( req.query.from ),
            to:       Number( req.query.to ),
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/faculty/[id]`.
 */

apis.get( '/:profileId', async ( req, res, next ) => {
    try {
        res.json( await getFacultyDetail( {
            profileId: Number( req.params.profileId ),
            language:  Number( req.query.languageId ),
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} );

export default apis;
