/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - `/api/staff`
 */

import express from 'express';
import cors from 'cors';

import getStaff from 'models/staff/operations/get-staff.js';
import getStaffMiniProfile from 'models/staff/operations/get-staff-mini-profile.js';

const apis = express.Router();

/**
 * Resolve URL `/api/staff`.
 */

apis.get( '/', cors(), async ( req, res, next ) => {
    try {
        const data = await getStaff( Number( req.query.languageId ) );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/staff/miniProfile`.
 */

apis.get( '/miniProfile', cors(), async ( req, res, next ) => {
    try {
        const data = await getStaffMiniProfile( {
            languageId: 0,
            profileId:  1,
        } );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

export default apis;
