const path = require( 'path' );
const express = require( 'express' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const opRoot = path.join( projectRoot, 'models/announcement/operation/' );
const getAllAnnouncements = require( path.join( opRoot, 'get-all-announcements' ) );
const getAnnouncementsByTags = require( path.join( opRoot, 'get-announcements-by-tags' ) );
const getAllPinnedAnnouncements = require( path.join( opRoot, 'get-all-pinned-announcements' ) );
const getPinnedAnnouncementsByTags = require( path.join( opRoot, 'get-pinned-announcements-by-tags' ) );
const getAllPages = require( path.join( opRoot, 'get-all-pages' ) );
const getPagesByTags = require( path.join( opRoot, 'get-pages-by-tags' ) );
const getAnnouncement = require( path.join( opRoot, 'get-announcement' ) );

apis.get( '/all-pinned', async ( req, res ) => {
    let tags = req.query.tags;
    if ( typeof tags === 'string' )
        tags = Array.of( tags );

    const result = await getAllPinnedAnnouncements( {
        tags,
        startTime: req.query.startTime,
        endTime:   req.query.endTime,
        language:  req.query.language,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.length )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.get( '/tags-pinned', async ( req, res ) => {
    let tags = req.query.tags;
    if ( typeof tags === 'string' )
        tags = Array.of( tags );

    const result = await getPinnedAnnouncementsByTags( {
        tags,
        startTime: req.query.startTime,
        endTime:   req.query.endTime,
        language:  req.query.language,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.length )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.get( '/all-pages', async ( req, res ) => {
    let tags = req.query.tags;
    if ( typeof tags === 'string' )
        tags = Array.of( tags );

    const result = await getAllPages( {
        tags,
        startTime: req.query.startTime,
        endTime:   req.query.endTime,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.pageNumber )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.get( '/tags-pages', async ( req, res ) => {
    let tags = req.query.tags;
    if ( typeof tags === 'string' )
        tags = Array.of( tags );

    const result = await getPagesByTags( {
        tags,
        startTime: req.query.startTime,
        endTime:   req.query.endTime,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.pageNumber )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.get( '/all-announcement', async ( req, res ) => {
    let tags = req.query.tags;
    if ( typeof tags === 'string' )
        tags = Array.of( tags );

    const result = await getAllAnnouncements( {
        tags,
        startTime: req.query.startTime,
        endTime:   req.query.endTime,
        page:      req.query.page,
        language:  req.query.language,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.length )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.get( '/tags-announcement', async ( req, res ) => {
    let tags = req.query.tags;
    if ( typeof tags === 'string' )
        tags = Array.of( tags );

    const result = await getAnnouncementsByTags( {
        tags,
        startTime: req.query.startTime,
        endTime:   req.query.endTime,
        page:      req.query.page,
        language:  req.query.language,
    } );

    if ( result.error )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).json( result );
    else if ( !result.length )
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    else
        /* eslint no-magic-numbers: 'off' */
        res.status( 200 ).json( result );
} );

apis.get( '/:id', async ( req, res ) => {
    try {
        res.json( await getAnnouncement( { announcementId: req.params.id, language: req.query.language, } ) );
    }
    catch ( e ) {
        /* eslint no-magic-numbers: 'off' */
        res.status( 404 ).end();
    }
} );

module.exports = apis;
