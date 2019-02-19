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

const apis = express();

/**
 * Make sure HTTP request header `Accept` include JSON related MIME types,
 * because all routes for api should return JSON only.
 */

apis.use( ( req, {}, next ) => {
    if ( !req.accepts( 'json' ) ) {
        const error = new Error();
        error.status = 406;
        next( error );
        return;
    }
    next();
} );

/**
 * Resolve URL `/api/announcement`.
 */

apis.use( '/announcement', announcement );

/**
 * Resolve URL `/api/faculty`.
 */

apis.use( '/faculty', faculty );

apis.use( ( {}, res, {} ) => {
    res.status( 404 ).json( {
        error: 'request api not found',
    } );
} );

apis.use( ( err, {}, res, {} ) => {
    const status = err.status || 500;
    if ( err.message !== '' )
        res.status( status ).json( { error: err.message, } );
    else
        res.sendStatus( status );
} );

export default apis;
