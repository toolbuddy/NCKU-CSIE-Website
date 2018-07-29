const express = require( 'express' );
const path = require( 'path' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const getAllAnnouncements = require( `${ projectRoot }/models/announcement/operation/get-all-announcements` );
const getAnnouncementsByTags = require( `${ projectRoot }/models/announcement/operation/get-announcements-by-tags` );
const getAllPinnedAnnouncements = require( `${ projectRoot }/models/announcement/operation/get-all-pinned-announcements` );
const getPinnedAnnouncementsByTags = require( `${ projectRoot }/models/announcement/operation/get-pinned-announcements-by-tags` );
const getAllPages = require( `${ projectRoot }/models/announcement/operation/get-all-pages` );
const getPagesByTags = require( `${ projectRoot }/models/announcement/operation/get-pages-by-tags` );
const getAnnouncement = require( `${ projectRoot }/models/announcement/operation/get-announcement` );

apis.get( '/all-pinned', async ( req, res ) => {
    let tag = [];
    if ( typeof ( req.query.tags ) === 'string' )
        tag = Array.of( req.query.tags );

    else if ( req.query.tags instanceof Array )
        tag = [ ...req.query.tags, ];

    try {
        res.json( await getAllPinnedAnnouncements( {
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

apis.get( '/tags-pinned', async ( req, res ) => {
    let tag = [];
    if ( typeof ( req.query.tags ) === 'string' )
        tag = Array.of( req.query.tags );

    else if ( req.query.tags instanceof Array )
        tag = [ ...req.query.tags, ];

    try {
        res.json( await getPinnedAnnouncementsByTags( {
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

apis.get( '/all-pages', async ( req, res ) => {
    let tag = [];
    if ( typeof ( req.query.tags ) === 'string' )
        tag = Array.of( req.query.tags );

    else if ( req.query.tags instanceof Array )
        tag = [ ...req.query.tags, ];

    try {
        res.json( await getAllPages( {
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

apis.get( '/tags-pages', async ( req, res ) => {
    let tag = [];
    if ( typeof ( req.query.tags ) === 'string' )
        tag = Array.of( req.query.tags );

    else if ( req.query.tags instanceof Array )
        tag = [ ...req.query.tags, ];

    try {
        res.json( await getPagesByTags( {
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

apis.get( '/all-announcement', async ( req, res ) => {
    let tag = [];

    if ( typeof ( req.query.tags ) === 'string' )
        tag = Array.of( req.query.tags );

    else if ( req.query.tags instanceof Array )
        tag = [ ...req.query.tags, ];

    try {
        res.json( await getAllAnnouncements( {
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

apis.get( '/tags-announcement', async ( req, res ) => {
    let tag = [];

    if ( typeof ( req.query.tags ) === 'string' )
        tag = Array.of( req.query.tags );

    else if ( req.query.tags instanceof Array )
        tag = [ ...req.query.tags, ];

    try {
        res.json( await getAnnouncementsByTags( {
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
