const express = require( 'express' );

const apis = express.Router();

apis.get( '/teacher', async ( req, res ) => {
    res.json( { a: 123, } );
} );

module.exports = apis;
