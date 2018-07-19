const express = require( 'express' );
const path = require( 'path' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const getAnnouncements = require( `${ projectRoot }/models/announcement/operation/get-announcements` );
const getAnnouncement = require( `${ projectRoot }/models/announcement/operation/get-announcement` );

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
    try {
        res.json( await getAnnouncements( {
            tags:      tag,
            startTime: req.query.startTime,
            endTime:   req.query.endTime,
            page:      req.query.page,
            language:  req.query.language,
        } ) );
    }
    catch ( e ) {
        res.status( 404 ).send( { error: 'Not found!', } );
    }
} );

apis.get( '/:id', async ( req, res ) => {
    try {
        res.json( await getAnnouncement( { announcementId: req.params.id, language: req.query.language, } ) );
    }
    catch ( e ) {
        res.status( 404 ).send( { error: 'Not found!', } );
    }
} );

module.exports = apis;
