/**
 * API router middleware module for `/api`.
 *
 * Including following sub-routing modules:
 * - announcement: `/api/announcement`
 * - faculty:      `/api/faculty`
 * - staff:        `/api/staff`
 */

import express from 'express';
import cors from 'cors';

import announcement from 'apis/announcement.js';
import faculty from 'apis/faculty.js';
import staff from 'apis/staff.js';

const apis = express();

/**
 * Make sure HTTP request header `Accept` include JSON related MIME types,
 * because all routes for api should return JSON only.
 */

apis.use( ( req, {}, next ) => {
    if ( !req.accepts( 'json' ) ) {
        const error = new Error( 'Response will be in json format only.' );
        error.status = 406;
        next( error );
        return;
    }
    next();
} );

apis.use( cors() );

/**
 * Resolve URL `/api/announcement`.
 */

apis.use( '/announcement', announcement );

/**
 * Resolve URL `/api/faculty`.
 */

apis.use( '/faculty', faculty );

/**
 * Resolve URL `/api/staff`.
 */

apis.use( '/staff', staff );

apis.use( ( {}, res, {} ) => {
    res.status( 404 ).json( {
        error: 'Request api not found.',
    } );
} );

apis.use( ( error, {}, res, {} ) => {
    console.error( error );
    res.status( error.status || 500 ).json( {
        error: error.message,
    } );
} );

export default apis;
