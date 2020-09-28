/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - `/api/staff`
 */

import express from 'express';
import cors from 'cors';

import getStaff from 'models/staff/operations/get-staff.js';

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

export default apis;
