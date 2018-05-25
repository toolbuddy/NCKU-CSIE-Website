const express = require( 'express' );
const path = require( 'path' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const getTeacherProfile = require( `${ projectRoot }/models/teacher/operation/get-teacher-profile` );

apis.get( '/:id', async ( req, res ) => {
    res.json( { id: req.params.id, query: req.query, data: await getTeacherProfile( { profileId: req.params.id, } ), } );
} );

module.exports = apis;
