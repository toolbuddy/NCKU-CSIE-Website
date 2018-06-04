const express = require( 'express' );
const path = require( 'path' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const getTeacherProfile = require( `${ projectRoot }/models/teacher/operation/get-teacher-profile` );

apis.get( '/:id', async ( req, res ) => {
<<<<<<< HEAD
    res.json( { id: req.params.id, query: req.query, data: await getTeacherProfile( { profileId: req.params.id, } ), } );
=======
    res.json( await getTeacherProfile( { profileId: req.params.id, language: req.query.language, } ) );
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
} );

module.exports = apis;
