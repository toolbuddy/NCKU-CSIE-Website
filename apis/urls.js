/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - announcement: `/api/announcement`
 * - faculty:      `/api/faculty`
 */

import express from 'express';

import announcement from 'apis/announcement.js';
import faculty from 'apis/faculty.js';

const apis = express.Router();

/**
 * Make sure HTTP request header `Accept` include json,
 * because all routes for api should return json only.
 */

apis.use( ( req, res, next ) => {
    if ( !req.accepts( 'json' ) ) {
        res.sendStatus( 406 );
        return;
    }
    next();
} );

/**
 * Parse HTTP request body into json.
 */

apis.use( express.json() );

/**
 * Resolve URL `/api/announcement`.
 */

apis.use( '/announcement', announcement );

/**
 * Resolve URL `/api/faculty`.
 */

apis.use( '/faculty', faculty );

export default apis;
