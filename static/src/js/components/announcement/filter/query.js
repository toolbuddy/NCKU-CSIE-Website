import QueryString from 'jsComponent/announcement/filter/query-string.js';
import { renderBriefings, renderPageButtons, } from 'jsComponent/announcement/filter/render.js';
import { dateFormating, }  from 'jsUtil/format.js';

const apiURL = `${ window.location.protocol }//${ window.location.host }/api/announcement`;

export const singleDefaultTag = {
    defaultTag:          null,
    async getAllAnnouncements ( {
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

        const [
            pinnedAnnouncements,
            announcements,
        ] = await Promise.all( [
            fetch( `${ apiURL }/all-pinned?${ query }` ),
            fetch( `${ apiURL }/all-announcement?${ query }` ),
        ] )
        .then( headers => Promise.all( headers.map( bodies => bodies.json() ) ) );

        renderBriefings( pinnedAnnouncements, announcements );
    },

    async getAnnouncementsByTags ( {
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


        const [
            pinnedAnnouncements,
            announcements,
        ] = await Promise.all( [
            fetch( `${ apiURL }/tags-pinned?${ query }` ),
            fetch( `${ apiURL }/tags-announcement?${ query }` ),
        ] )
        .then( headers => Promise.all( headers.map( bodies => bodies.json() ) ) );

        renderBriefings( pinnedAnnouncements, announcements );
    },

    async getAllPageNumber ( { startTime = QueryString.getStartTime(), endTime = QueryString.getEndTime(), } = { } ) {
        const query = QueryString.generate( {
            'tags':      [ singleDefaultTag.defaultTag, ],
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
        } );

        const pageNumber = await fetch( `${ apiURL }/all-pages?${ query }` )
        .then( res => res.json() ).then( data => data.pageNumber );

        renderPageButtons( singleDefaultTag.getAllAnnouncements, singleDefaultTag.getAnnouncementsByTags, pageNumber );
    },

    async getPageNumberByTags ( {
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

        const pageNumber = await fetch( `${ apiURL }/tags-pages?${ query }` )
        .then( res => res.json() ).then( data => data.pageNumber );

        renderPageButtons( singleDefaultTag.getAllAnnouncements, singleDefaultTag.getAnnouncementsByTags, pageNumber );
    },
};

export const multipleDefaultTags = {
    defaultTags:         [],
    async getAllAnnouncements ( {
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

        const [
            pinnedAnnouncements,
            announcements,
        ] = await Promise.all( [
            fetch( `${ apiURL }/all-pinned?${ query }` ),
            fetch( `${ apiURL }/all-announcement?${ query }` ),
        ] )
        .then( headers => Promise.all( headers.map( bodies => bodies.json() ) ) );

        renderBriefings( pinnedAnnouncements, announcements );
    },

    async getAnnouncementsByTags ( {
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

        const [
            pinnedAnnouncements,
            announcements,
        ] = await Promise.all( [
            fetch( `${ apiURL }/tags-pinned?${ query }` ),
            fetch( `${ apiURL }/tags-announcement?${ query }` ),
        ] )
        .then( headers => Promise.all( headers.map( bodies => bodies.json() ) ) );

        renderBriefings( pinnedAnnouncements, announcements );
    },

    async getAllPageNumber ( { startTime = QueryString.getStartTime(), endTime = QueryString.getEndTime(), } = { } ) {
        const query = QueryString.generate( {
            'tags':      multipleDefaultTags.defaultTags,
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
        } );

        const pageNumber = await fetch( `${ apiURL }/all-pages?${ query }` )
        .then( res => res.json() ).then( data => data.pageNumber );

        renderPageButtons( multipleDefaultTags.getAllAnnouncements, multipleDefaultTags.getAnnouncementsByTags, pageNumber );
    },

    async getPageNumberByTags ( {
        tags = QueryString.getTags( multipleDefaultTags.defaultTags ),
        startTime = QueryString.getStartTime(),
        endTime = QueryString.getEndTime(),
    } = { } ) {
        const query = QueryString.generate( {
            tags,
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
        } );

        const pageNumber = await fetch( `${ apiURL }/tags-pages?${ query }` )
        .then( res => res.json() ).then( data => data.pageNumber );

        renderPageButtons( multipleDefaultTags.getAllAnnouncements, multipleDefaultTags.getAnnouncementsByTags, pageNumber );
    },
};
