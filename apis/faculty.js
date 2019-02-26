/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - `/api/faculty`
 * - `/api/faculty/[id]`
 */

import express from 'express';
import cors from 'cors';

import getFaculty from 'models/faculty/operations/get-faculty.js';
import getFacultyDetail from 'models/faculty/operations/get-faculty-detail.js';

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
