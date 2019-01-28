import express from 'express';

import getAllAnnouncements from 'models/announcement/operations/get-all-announcements.js';
import getAllPages from 'models/announcement/operations/get-all-pages.js';
import getAnnouncement from 'models/announcement/operations/get-announcement.js';
import getAllPinnedAnnouncements from 'models/announcement/operations/get-all-pinned-announcements.js';
import getAnnouncementsByTags from 'models/announcement/operations/get-announcements-by-tags.js';
import getPagesByTags from '../models/announcement/operations/get-pages-by-tags';
import getPinnedAnnouncementsByTags from 'models/announcement/operations/get-pinned-announcements-by-tags.js';

// Import getAnnouncementAllLanguages from 'models/announcement/operations/get-announcement-all-languages.js';

// import postAnnouncement from 'models/announcement/operations/post-announcement.js';
// import postAnnouncementTags from 'models/announcement/operations/post-announcementTags.js';
// import postAnnouncementFile from 'models/announcement/operations/post-announcementFile.js';

// import patchAnnouncement from 'models/announcement/operations/patch-announcement.js';

// import deleteAnnouncement from 'models/announcement/operations/delete-announcements.js';
// import deleteAnnouncementTags from 'models/announcement/operations/delete-announcementTags.js';
// import deleteAnnouncementFiles from 'models/announcement/operations/delete-announcementFiles.js';

const apis = express.Router();

apis.get( '/all-announcement', async ( req, res ) => {
    const tags = req.query.tags || [];
    let tagsToSend = [];
    if ( Array.isArray( tags ) )
        tagsToSend = [ ...tags, ];
    else
        tagsToSend = [ tags, ];
    tagsToSend = tagsToSend.map( Number );

    res.json( await getAllAnnouncements( {
        languageId: Number( req.query.languageId ),
        amount:     Number( req.query.amount ),
        tags:       tagsToSend,
        from:       req.query.from,
        to:         req.query.to,
        page:       Number( req.query.page ),
    } ) );
} );

apis.get( '/all-pages', async ( req, res ) => {
    const tags = req.query.tags || [];
    let tagsToSend = [];
    if ( Array.isArray( tags ) )
        tagsToSend = [ ...tags, ];
    else
        tagsToSend = [ tags, ];
    tagsToSend = tagsToSend.map( Number );

    res.json( await getAllPages( {
        amount: Number( req.query.amount ),
        tags:   tagsToSend,
        from:   req.query.from,
        to:     req.query.to,
    } ) );
} );

apis.get( '/all-pinned', async ( req, res ) => {
    const tags = req.query.tags || [];
    let tagsToSend = [];
    if ( Array.isArray( tags ) )
        tagsToSend = [ ...tags, ];
    else
        tagsToSend = [ tags, ];
    tagsToSend = tagsToSend.map( Number );

    res.json( await getAllPinnedAnnouncements( {
        tags:       tagsToSend,
        from:       req.query.from,
        to:         req.query.to,
        languageId:  Number( req.query.languageId ),
    } ) );
} );

apis.get( '/tags-announcement', async ( req, res ) => {
    const tags = req.query.tags || [];
    let tagsToSend = [];
    if ( Array.isArray( tags ) )
        tagsToSend = [ ...tags, ];
    else
        tagsToSend = [ tags, ];
    tagsToSend = tagsToSend.map( Number );

    res.json( await getAnnouncementsByTags( {
        languageId: Number( req.query.languageId ),
        amount:     Number( req.query.amount ),
        tags:       tagsToSend,
        from:       req.query.from,
        to:         req.query.to,
        page:       Number( req.query.page ),
    } ) );
} );

apis.get( '/tags-pages', async ( req, res ) => {
    const tags = req.query.tags || [];
    let tagsToSend = [];
    if ( Array.isArray( tags ) )
        tagsToSend = [ ...tags, ];
    else
        tagsToSend = [ tags, ];
    tagsToSend = tagsToSend.map( Number );

    res.json( await getPagesByTags( {
        amount: Number( req.query.amount ),
        tags:   tagsToSend,
        from:   req.query.from,
        to:     req.query.to,
    } ) );
} );

apis.get( '/tags-pinned', async ( req, res ) => {
    const tags = req.query.tags || [];
    let tagsToSend = [];
    if ( Array.isArray( tags ) )
        tagsToSend = [ ...tags, ];
    else
        tagsToSend = [ tags, ];
    tagsToSend = tagsToSend.map( Number );

    res.json( await getPinnedAnnouncementsByTags( {
        tags:       tagsToSend,
        from:       req.query.from,
        to:         req.query.to,
        languageId:  Number( req.query.languageId ),
    } ) );
} );

apis.get( '/:id', async ( req, res ) => {
    res.json( await getAnnouncement( {
        announcementId: Number( req.params.id ),
        languageId:     Number( req.query.languageId ),
    } ) );
} );

// Apis.get( /^\/all-languages\/(\d+)$/, async ( req, res ) => {
//     try {
//         res.json( await getAnnouncementAllLanguages( { announcementId: req.params[ 0 ], } ) );
//     }
//     catch ( e ) {
//         res.status( 404 ).end();
//     }
// } );

// apis.post( '/', async ( req, res ) => {
//     try {
//         res.json( await postAnnouncement( { announcementData: req.body, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

// apis.patch( '/:id', async ( req, res ) => {
//     try {
//         res.json( await patchAnnouncement( { announcementId: req.params.id, announcementData: req.body, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

// apis.delete( '/:id', async ( req, res ) => {
//     try {
//         res.json( await deleteAnnouncement( { announcementId: req.params.id, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

// /**
//  * @todo Not yet finished
//  */

// apis.post( '/:id/file', async ( req, res ) => {
//     try {
//         res.json( await postAnnouncementFile( { announcementFileData: req.body, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

// // TODO: Not yet finished
// apis.delete( '/:id/file/:id', async ( req, res ) => {
//     try {
//         res.json( await deleteAnnouncementFiles( { announcementFileData: req.body, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

// apis.post( '/:id/tags', async ( req, res ) => {
//     try {
//         res.json( await postAnnouncementTags( { announcementId: req.params.id, tagId: req.body, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

// apis.delete( '/:id/tags', async ( req, res ) => {
//     const tagId = req.query.tagId.split( ',' ).map( s => Number.parseInt( s, 10 ) );
//     try {
//         res.json( await deleteAnnouncementTags( { announcementId: req.params.id, tagId, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

export default apis;
