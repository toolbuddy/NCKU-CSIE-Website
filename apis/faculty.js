const express = require( 'express' );
const path = require( 'path' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const getFaculty = require( `${ projectRoot }/models/faculty/operation/get-faculty` );
const getFacultyDetail = require( `${ projectRoot }/models/faculty/operation/get-faculty-detail` );

apis.get( /^\/$/, async ( req, res ) => {
    res.json( await getFaculty( req.query.language ) );
} );

apis.get( /^\/(\d+)$/, async ( req, res ) => {
    res.json( await getFacultyDetail( { profileId: req.params[ 0 ], language: req.query.language, } ) );
} );

module.exports = apis;
