import express from 'express';
import cors from 'cors';

import getAnnouncementsByOrTags from 'models/announcement/operations/get-announcements-by-or-tags.js';
import getPagesByOrTags from 'models/announcement/operations/get-pages-by-or-tags.js';
import getAnnouncement from 'models/announcement/operations/get-announcement.js';
import getPinnedAnnouncementsByOrTags from 'models/announcement/operations/get-pinned-announcements-by-or-tags.js';
import getAnnouncementsByAndTags from 'models/announcement/operations/get-announcements-by-and-tags.js';
import getHotAnnouncements from 'models/announcement/operations/get-hot-announcements.js';
import getPagesByAndTags from '../models/announcement/operations/get-pages-by-and-tags';
import getPinnedAnnouncementsByAndTags from 'models/announcement/operations/get-pinned-announcements-by-and-tags.js';
import getTvAnnouncements from 'models/announcement/operations/get-tv-announcements.js';

const apis = express.Router();

apis.get( '/get-announcements-by-or-tags', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getAnnouncementsByOrTags( {
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

apis.get( '/get-pages-by-or-tags', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getPagesByOrTags( {
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

apis.get( '/get-pinned-announcements-by-or-tags', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getPinnedAnnouncementsByOrTags( {
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

apis.get( '/get-announcements-by-and-tags', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getAnnouncementsByAndTags( {
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

apis.get( '/get-pages-by-and-tags', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getPagesByAndTags( {
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

apis.get( '/get-pinned-announcements-by-and-tags', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getPinnedAnnouncementsByAndTags( {
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

apis.get( '/get-tv-announcements', cors(), async ( req, res, next ) => {
    try {
        let tags = req.query.tags || [];
        if ( !Array.isArray( tags ) )
            tags = [ tags, ];
        tags = tags.map( Number );

        res.json( await getTvAnnouncements( {
            amount:     Number( req.query.amount ),
            languageId: Number( req.query.languageId ),
            tags,
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
