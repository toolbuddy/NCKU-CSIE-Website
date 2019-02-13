import express from 'express';
import cors from 'cors';

import getAllAnnouncements from 'models/announcement/operations/get-all-announcements.js';
import getAllPages from 'models/announcement/operations/get-all-pages.js';
import getAnnouncement from 'models/announcement/operations/get-announcement.js';
import getAllPinnedAnnouncements from 'models/announcement/operations/get-all-pinned-announcements.js';
import getAnnouncementsByTags from 'models/announcement/operations/get-announcements-by-tags.js';
import getHotAnnouncements from 'models/announcement/operations/get-hot-announcements.js';
import getPagesByTags from '../models/announcement/operations/get-pages-by-tags';
import getPinnedAnnouncementsByTags from 'models/announcement/operations/get-pinned-announcements-by-tags.js';

const apis = express.Router();

apis.get( '/get-announcements-by-or-tag', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getAllAnnouncements( {
            amount:     Number( req.query.amount ),
            from:       new Date( Number( req.query.from ) ),
            languageId: Number( req.query.languageId ),
            page:       Number( req.query.page ),
            tags,
            to:         new Date( Number( req.query.to ) ),
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} );

apis.get( '/get-pages-by-or-tag', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getAllPages( {
            amount: Number( req.query.amount ),
            from:   new Date( Number( req.query.from ) ),
            tags,
            to:     new Date( Number( req.query.to ) ),
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} );

apis.get( '/get-pinned-announcements-by-or-tag', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getAllPinnedAnnouncements( {
            from:       new Date( Number( req.query.from ) ),
            languageId: Number( req.query.languageId ),
            tags,
            to:         new Date( Number( req.query.to ) ),
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} );

apis.get( '/get-announcements-by-and-tag', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getAnnouncementsByTags( {
            amount:     Number( req.query.amount ),
            from:       new Date( Number( req.query.from ) ),
            languageId: Number( req.query.languageId ),
            page:       Number( req.query.page ),
            tags,
            to:         new Date( Number( req.query.to ) ),
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} );

apis.get( '/get-pages-by-and-tag', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getPagesByTags( {
            amount: Number( req.query.amount ),
            from:   new Date( Number( req.query.from ) ),
            tags,
            to:     new Date( Number( req.query.to ) ),
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} );

apis.get( '/get-pinned-announcements-by-and-tag', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getPinnedAnnouncementsByTags( {
            from:       new Date( Number( req.query.from ) ),
            languageId: Number( req.query.languageId ),
            tags,
            to:         new Date( Number( req.query.to ) ),
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} );

apis.get( '/get-hot-announcements', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getHotAnnouncements( {
            amount:     Number( req.query.amount ),
            from:       new Date( Number( req.query.from ) ),
            languageId: Number( req.query.languageId ),
            page:       Number( req.query.page ),
            tags,
            to:         new Date( Number( req.query.to ) ),
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} );

apis.get( '/:announcementId', cors(), async ( req, res, next ) => {
    try {
        res.json( await getAnnouncement( {
            announcementId: Number( req.params.announcementId ),
            languageId:     Number( req.query.languageId ),
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} );

export default apis;
