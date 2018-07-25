const express = require( 'express' );
const path = require( 'path' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const getAnnouncements = require( `${ projectRoot }/models/announcement/operation/get-announcements` );
const getPinnedAnnouncements = require( `${ projectRoot }/models/announcement/operation/get-pinned-announcements` );
const getAnnouncement = require( `${ projectRoot }/models/announcement/operation/get-announcement` );
const getPageNumber = require( `${ projectRoot }/models/announcement/operation/get-page-number` );

apis.get( '/pages', async ( req, res ) => {
    let tag = [];
    if ( typeof ( req.query.tags ) === 'string' )
        tag = Array.of( req.query.tags );

    else if ( req.query.tags instanceof Array )
        tag = [ ...req.query.tags, ];

    try {
        res.json( await getPageNumber( {
            tags:      tag,
            startTime: req.query.startTime,
            endTime:   req.query.endTime,
        } ) );
    }
    catch ( e ) {
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).send( { error: 'Not found!', } );
    }
} );

apis.get( '/pinned', async ( req, res ) => {
    let tag = [];

    if ( typeof ( req.query.tags ) === 'string' )
        tag = Array.of( req.query.tags );

    else if ( req.query.tags instanceof Array )
        tag = [ ...req.query.tags, ];

    try {
        res.json( await getPinnedAnnouncements( {
            tags:      tag,
            startTime: req.query.startTime,
            endTime:   req.query.endTime,
            language:  req.query.language,
        } ) );
    }
    catch ( e ) {
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).send( { error: 'Not found!', } );
    }
} );

apis.get( '/filter', async ( req, res ) => {
    let tag = [];

    if ( typeof ( req.query.tags ) === 'string' )
        tag = Array.of( req.query.tags );

    else if ( req.query.tags instanceof Array )
        tag = [ ...req.query.tags, ];

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
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).send( { error: 'Not found!', } );
    }
} );

apis.get( '/:id', async ( req, res ) => {
    try {
        res.json( await getAnnouncement( { announcementId: req.params.id, language: req.query.language, } ) );
    }
    catch ( e ) {
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).send( { error: 'Not found!', } );
    }
} );

module.exports = apis;
