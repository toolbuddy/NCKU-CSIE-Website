const express = require( 'express' );
const path = require( 'path' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const getAnnouncementByTags = require( `${ projectRoot }/models/announcement/operation/get-announcements` );

apis.get( '/filter', async ( req, res ) => {
    let tag = [];
    if ( !Array.isArray( req.query.tags ) ) {
        // If req.query.tags is not an array
        if ( req.query.tags !== undefined )
            tag = Array.of( req.query.tags );
    }
    else {
        // If req.query.tags is an array
        tag = [ ...req.query.tags, ];
    }
    console.log( req.query );
    res.json( await getAnnouncementByTags(
        tag,
        req.query.startTime,
        req.query.endTime,
        req.query.page,
        req.query.language,
    ) );
} );

apis.get( '/id', async ( req, res ) => {
    // Get announcement by id
} );

module.exports = apis;
