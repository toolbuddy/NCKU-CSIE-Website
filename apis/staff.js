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
import getStaffDetailWithId from 'models/staff/operations/get-staff-detail-with-id.js';

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
 * Resolve URL `/api/staff/miniProfile/[id]`.
 */

apis.get( '/miniProfile/:profileId', cors(), async ( req, res, next ) => {
    try {
        const data = await getStaffMiniProfile( {
            language:  Number( req.query.languageId ),
            profileId: Number( req.params.profileId ),
        } );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/staff/staffWithId/[id]`.
 */

apis.get( '/staffWithId/:profileId', cors(), async ( req, res, next ) => {
    try {
        const data = await getStaffDetailWithId( {
            profileId:  Number( req.params.profileId ),
            language:  Number( req.query.languageId ),
        } );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

export default apis;
