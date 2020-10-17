/**
 * API router middleware module for `/api/staff`.
 *
 * Including following sub-routing modules:
 * - `/api/staff`
 */

const express = require('express');

const getStaff = require('../models/staff/operations/get-staff.js');

const apis = express.Router();

/**
 * Resolve URL `/api/staff`.
 */

apis.get( '/', async ( req, res, next ) => {
    try {
        res.json( await getStaff( Number( req.query.languageId ) ) );
    }
    catch ( error ) {
        next( error );
    }
} );

module.exports = apis;
