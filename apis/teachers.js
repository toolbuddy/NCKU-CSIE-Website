const express = require( 'express' );
const path = require( 'path' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const getTeachersProfile = require( `${ projectRoot }/models/teacher/operation/get-teachers-profile` );

apis.get( '/', async ( req, res ) => {
    res.json( await getTeachersProfile( req.query.language ) );
} );

module.exports = apis;
