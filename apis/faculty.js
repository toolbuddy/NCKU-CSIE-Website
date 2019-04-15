/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - `/api/faculty`
 * - `/api/faculty/lab`
 * - `/api/faculty/[id]`
 */

import express from 'express';
import cors from 'cors';

import getFaculty from 'models/faculty/operations/get-faculty.js';
import getFacultyDetail from 'models/faculty/operations/get-faculty-detail.js';
import getLabs from 'models/faculty/operations/get-labs.js';
import getPublications from 'models/faculty/operations/get-publication.js';

const apis = express.Router();

/**
 * Resolve URL `/api/faculty`.
 */

apis.get( '/', cors(), async ( req, res, next ) => {
    try {
        const data = await getFaculty( Number( req.query.languageId ) );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/faculty/lab`.
 */

apis.get( '/lab', cors(), async ( req, res, next ) => {
    try {
        const data = await getLabs( Number( req.query.languageId ) );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/faculty/publication`.
 */

apis.get( '/publication', cors(), async ( req, res, next ) => {
    try {
        const data = await getPublications( {
            languageId: Number( req.query.languageId ),
            from:       Number( req.query.from ),
            to:         Number( req.query.to ),
        } );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/faculty/[id]`.
 */

apis.get( '/:profileId', cors(), async ( req, res, next ) => {
    try {
        const data = await getFacultyDetail( {
            profileId:  Number( req.params.profileId ),
            languageId: Number( req.query.languageId ),
        } );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

export default apis;
