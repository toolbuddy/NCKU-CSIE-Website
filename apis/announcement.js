const express = require( 'express' );
const path = require( 'path' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const getAnnouncementByTags = require( `${ projectRoot }/models/announcement/operation/get-announcements` );

apis.get( '/tags', async ( req, res ) => {
    console.log( `array from frontend: ${ req.query.tags }` );
    let tags = [];
    if ( !Array.isArray( req.query.tags ) ) {
        // If req.query.tags is not an array
        if ( req.query.tags !== undefined )
            tags = Array.of( req.query.tags );
    }
    else {
        // If req.query.tags is an array
        tags = [ ...req.query.tags, ];
    }
    console.log( tags );
    res.json( await getAnnouncementByTags( tags ) );
} );

apis.get( '/id', async ( req, res ) => {
    // Get announcement by id
} );

module.exports = apis;
