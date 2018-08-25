const path = require( 'path' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );

const apis = express.Router();
const projectRoot = path.dirname( __dirname );
const opRoot = path.resolve( projectRoot, 'models/announcement/operation/' );
const getAllAnnouncements = require( path.resolve( opRoot, 'get-all-announcements' ) );
const getAnnouncementsByTags = require( path.resolve( opRoot, 'get-announcements-by-tags' ) );
const getAllPinnedAnnouncements = require( path.resolve( opRoot, 'get-all-pinned-announcements' ) );
const getPinnedAnnouncementsByTags = require( path.resolve( opRoot, 'get-pinned-announcements-by-tags' ) );
const getAllPages = require( path.resolve( opRoot, 'get-all-pages' ) );
const getPagesByTags = require( path.resolve( opRoot, 'get-pages-by-tags' ) );
const getAnnouncement = require( path.resolve( opRoot, 'get-announcement' ) );

const postAnnouncement = require( path.resolve( opRoot, 'post-announcement' ) );
const postAnnouncementTags = require( path.resolve( opRoot, 'post-announcementTags' ) );
const postAnnouncementFile = require( path.resolve( opRoot, 'post-announcementFile' ) );

const patchAnnouncement = require( path.resolve( opRoot, 'patch-announcement' ) );

const deleteAnnouncement = require( path.resolve( opRoot, 'delete-announcements' ) );
const deleteAnnouncementTags = require( path.resolve( opRoot, 'delete-announcementTags' ) );
const deleteAnnouncementFiles = require( path.resolve( opRoot, 'delete-announcementFiles' ) );

apis.use( bodyParser.json() );

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

    if ( !result.length )
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

    if ( !result.length )
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

    if ( !result.pageNumber )
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

    if ( !result.pageNumber )
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

    if ( !result.length )
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

    if ( !result.length )
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

apis.post( '/', async ( req, res ) => {
    try {
        res.json( await postAnnouncement( { announcementData: req.body, } ) );
    }
    catch ( e ) {
        /* eslint no-magic-numbers: 'off' */
        res.status( 500 ).end();
    }
} );

apis.patch( '/:id', async ( req, res ) => {
    try {
        res.json( await patchAnnouncement( { announcementId: req.params.id, announcementData: req.body, } ) );
    }
    catch ( e ) {
        /* eslint no-magic-numbers: 'off' */
        res.status( 500 ).end();
    }
} );

apis.delete( '/:id', async ( req, res ) => {
    try {
        res.json( await deleteAnnouncement( { announcementId: req.params.id, } ) );
    }
    catch ( e ) {
        /* eslint no-magic-numbers: 'off' */
        res.status( 500 ).end();
    }
} );

// TODO: Not yet finished
apis.post( '/:id/file', async ( req, res ) => {
    try {
        res.json( await postAnnouncementFile( { announcementFileData: req.body, } ) );
    }
    catch ( e ) {
        /* eslint no-magic-numbers: 'off' */
        res.status( 500 ).end();
    }
} );

// TODO: Not yet finished
apis.delete( '/:id/file/:id', async ( req, res ) => {
    try {
        res.json( await deleteAnnouncementFiles( { announcementFileData: req.body, } ) );
    }
    catch ( e ) {
        /* eslint no-magic-numbers: 'off' */
        res.status( 500 ).end();
    }
} );

apis.post( '/:id/tags', async ( req, res ) => {
    try {
        res.json( await postAnnouncementTags( { announcementId: req.params.id, tagId: req.body, } ) );
    }
    catch ( e ) {
        /* eslint no-magic-numbers: 'off' */
        res.status( 500 ).end();
    }
} );

apis.delete( '/:id/tags', async ( req, res ) => {
    const tagId = req.query.tagId.split( ',' ).map( s => Number.parseInt( s, 10 ) );
    try {
        res.json( await deleteAnnouncementTags( { announcementId: req.params.id, tagId, } ) );
    }
    catch ( e ) {
        /* eslint no-magic-numbers: 'off' */
        res.status( 500 ).end();
    }
} );

module.exports = apis;
