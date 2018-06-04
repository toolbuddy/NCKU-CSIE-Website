const express = require( 'express' );
const path = require( 'path' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const getTeacherProfile = require( `${ projectRoot }/models/teacher/operation/get-teacher-profile` );

apis.get( '/:id', async ( req, res ) => {
    res.json( await getTeacherProfile( { profileId: req.params.id, language: req.query.language, } ) );
} );

module.exports = apis;
