import express from 'express';

import getFaculty from 'models/faculty/operation/get-faculty.js';
import getFacultyDetail from 'models/faculty/operation/get-faculty-detail.js';

const apis = express.Router();

apis.get( /^\/$/, async ( req, res ) => {
    res.json( await getFaculty( req.query.language ) );
} );

apis.get( /^\/(\d+)$/, async ( req, res ) => {
    res.json( await getFacultyDetail( { profileId: req.params[ 0 ], language: req.query.language, } ) );
} );

export default apis;
