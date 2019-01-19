/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - `/api/faculty`
 * - `/api/faculty/[id]`
 */

import express from 'express';

import getFaculty from 'models/faculty/operation/get-faculty.js';
import getFacultyDetail from 'models/faculty/operation/get-faculty-detail.js';

const apis = express.Router();

/**
 * Resolve URL `/api/faculty`.
 */

apis.get( /^\/$/, async ( req, res ) => {
    res.json( await getFaculty( req.query.languageId ) );
} );

/**
 * Resolve URL `/api/faculty/[id]`.
 */

apis.get( /^\/(\d+)$/, async ( req, res ) => {
    res.json( await getFacultyDetail( { profileId: req.params[ 0 ], language: req.query.languageId, } ) );
} );

export default apis;
