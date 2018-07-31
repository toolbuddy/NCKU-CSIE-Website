import QueryString from 'jsComponent/announcement/filter/query-string.js';
import { renderBriefings, renderPageButtons, } from 'jsComponent/announcement/filter/render.js';
import { dateFormating, }  from 'jsUtil/format.js';

// Announcement api URL prefix.
const apiURL = `${ window.location.protocol }//${ window.location.host }/api/announcement`;

/**
 * Construct single default tag.
 * @type {string} defaultTag
 */

export const singleDefaultTag = {
    defaultTag: null,
    getAllAnnouncements ( {
        startTime = QueryString.getStartTime(),
        endTime = QueryString.getEndTime(),
        page = QueryString.getPage(),
        language = 'zh-TW',
    } = { } ) {
        const query = QueryString.generate( {
            'tags':      [ singleDefaultTag.defaultTag, ],
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
            page,
            language,
        } );

        Promise.all( [
            fetch( `${ apiURL }/all-pinned?${ query }` ),
            fetch( `${ apiURL }/all-announcement?${ query }` ),
        ] )
        .then( headers => Promise.all( headers.map( bodies => bodies.json() ) ) )
        .then( data => renderBriefings( ...data ) );
    },

    getAnnouncementsByTags ( {
        tags = QueryString.getTags( singleDefaultTag.defaultTag ),
        startTime = QueryString.getStartTime(),
        endTime = QueryString.getEndTime(),
        page = QueryString.getPage(),
        language = 'zh-TW',
    } = { } ) {
        const query = QueryString.generate( {
            'tags':      [ singleDefaultTag.defaultTag,
                ...tags, ],
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
            page,
            language,
        } );

        Promise.all( [
            fetch( `${ apiURL }/tags-pinned?${ query }` ),
            fetch( `${ apiURL }/tags-announcement?${ query }` ),
        ] )
        .then( headers => Promise.all( headers.map( bodies => bodies.json() ) ) )
        .then( data => renderBriefings( ...data ) );
    },

    getAllPageNumber ( { startTime = QueryString.getStartTime(), endTime = QueryString.getEndTime(), } = { } ) {
        const query = QueryString.generate( {
            'tags':      [ singleDefaultTag.defaultTag, ],
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
        } );

        fetch( `${ apiURL }/all-pages?${ query }` )
        .then( res => res.json() )
        .then( data => renderPageButtons(
            singleDefaultTag.getAllAnnouncements,
            singleDefaultTag.getAnnouncementsByTags,
            data.pageNumber
        ) );
    },

    getPageNumberByTags ( {
        tags = QueryString.getTags( singleDefaultTag.defaultTag ),
        startTime = QueryString.getStartTime(),
        endTime = QueryString.getEndTime(),
    } = { } ) {
        const query = QueryString.generate( {
            'tags':      [ singleDefaultTag.defaultTag,
                ...tags, ],
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
        } );

        fetch( `${ apiURL }/tags-pages?${ query }` )
        .then( res => res.json() )
        .then( data => renderPageButtons(
            singleDefaultTag.getAllAnnouncements,
            singleDefaultTag.getAnnouncementsByTags,
            data.pageNumber
        ) );
    },
};

/**
 * Construct multiple default tags.
 * @type {string[]} defaultTags
 */

export const multipleDefaultTags = {
    defaultTags:         [],
    getAllAnnouncements ( {
        startTime = QueryString.getStartTime(),
        endTime = QueryString.getEndTime(),
        page = QueryString.getPage(),
        language = 'zh-TW',
    } = { } ) {
        const query = QueryString.generate( {
            'tags':      multipleDefaultTags.defaultTags,
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
            page,
            language,
        } );

        Promise.all( [
            fetch( `${ apiURL }/all-pinned?${ query }` ),
            fetch( `${ apiURL }/all-announcement?${ query }` ),
        ] )
        .then( headers => Promise.all( headers.map( bodies => bodies.json() ) ) )
        .then( data => renderBriefings( ...data ) );
    },

    getAnnouncementsByTags ( {
        tags = QueryString.getTags( multipleDefaultTags.defaultTags ),
        startTime = QueryString.getStartTime(),
        endTime = QueryString.getEndTime(),
        page = QueryString.getPage(),
        language = 'zh-TW',
    } = { } ) {
        const query = QueryString.generate( {
            tags,
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
            page,
            language,
        } );

        Promise.all( [
            fetch( `${ apiURL }/tags-pinned?${ query }` ),
            fetch( `${ apiURL }/tags-announcement?${ query }` ),
        ] )
        .then( headers => Promise.all( headers.map( bodies => bodies.json() ) ) )
        .then( data => renderBriefings( ...data ) );
    },

    getAllPageNumber ( { startTime = QueryString.getStartTime(), endTime = QueryString.getEndTime(), } = { } ) {
        const query = QueryString.generate( {
            'tags':      multipleDefaultTags.defaultTags,
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
        } );

        fetch( `${ apiURL }/all-pages?${ query }` )
        .then( res => res.json() )
        .then( data => renderPageButtons(
            multipleDefaultTags.getAllAnnouncements,
            multipleDefaultTags.getAnnouncementsByTags,
            data.pageNumber
        ) );
    },

    getPageNumberByTags ( {
        tags = QueryString.getTags( multipleDefaultTags.defaultTags ),
        startTime = QueryString.getStartTime(),
        endTime = QueryString.getEndTime(),
    } = { } ) {
        const query = QueryString.generate( {
            tags,
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
        } );

        fetch( `${ apiURL }/tags-pages?${ query }` )
        .then( res => res.json() ).then( data => renderPageButtons(
            multipleDefaultTags.getAllAnnouncements,
            multipleDefaultTags.getAnnouncementsByTags,
            data.pageNumber
        ) );
    },
};
