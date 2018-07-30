import qS from 'jsComponent/announcement/filter/query-string.js';
import { renderBriefings, renderPageButtons, } from 'jsComponent/announcement/filter/render.js';
import { dateFormating, }  from 'jsUtil/format.js';

export const singleDefaultTag = {
    defaultTag:          [],
    async getAllAnnouncements ( {
        startTime = qS.getStartTime(),
        endTime = qS.getEndTime(),
        page = qS.getPage(),
        language = 'zh-TW',
    } = { } ) {
        // Need injection protection
        const queryString = new URLSearchParams();

        // Append tags
        queryString.append( 'tags', singleDefaultTag.defaultTag[ 0 ] );

        // Append time
        queryString.append( 'startTime', dateFormating( startTime ) );
        queryString.append( 'endTime', dateFormating( endTime ) );

        // Append page
        queryString.append( 'page', page );

        // Append language
        queryString.append( 'language', language );

        const pinnedURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/all-pinned?${ queryString.toString() }`;
        const announcementURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/all-announcement?${ queryString.toString() }`;
        const pinnedAnnouncements = await fetch( pinnedURL ).then( res => res.json() );
        const announcements = await fetch( announcementURL ).then( res => res.json() );

        renderBriefings( pinnedAnnouncements, announcements );
    },

    async getAnnouncementsByTags ( {
        tags = qS.getTags( singleDefaultTag.defaultTag ),
        startTime = qS.getStartTime(),
        endTime = qS.getEndTime(),
        page = qS.getPage(),
        language = 'zh-TW',
    } = { } ) {
        // Need injection protection
        const queryString = new URLSearchParams();

        // Append tags
        tags.forEach( tag => queryString.append( 'tags', tag ) );
        queryString.append( 'tags', singleDefaultTag.defaultTag[ 0 ] );

        // Append time
        queryString.append( 'startTime', dateFormating( startTime ) );
        queryString.append( 'endTime', dateFormating( endTime ) );

        // Append page
        queryString.append( 'page', page );

        // Append language
        queryString.append( 'language', language );

        const pinnedURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/tags-pinned?${ queryString.toString() }`;
        const announcementURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/tags-announcement?${ queryString.toString() }`;
        const pinnedAnnouncements = await fetch( pinnedURL ).then( res => res.json() );
        const announcements = await fetch( announcementURL ).then( res => res.json() );

        renderBriefings( pinnedAnnouncements, announcements );
    },

    async getAllPageNumber ( { startTime = qS.getStartTime(), endTime = qS.getEndTime(), } = { } ) {
        // Need injection protection
        const queryString = new URLSearchParams();

        // Append tags
        queryString.append( 'tags', singleDefaultTag.defaultTag[ 0 ] );

        // Append time
        queryString.append( 'startTime', dateFormating( startTime ) );
        queryString.append( 'endTime', dateFormating( endTime ) );

        const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/all-pages?${ queryString.toString() }`;
        const pageNumber = await fetch( reqURL ).then( res => res.json() ).then( data => data.pageNumber );

        renderPageButtons( singleDefaultTag.getAllAnnouncements, singleDefaultTag.getAnnouncementsByTags, pageNumber );
    },

    async getPageNumberByTags ( { tags = qS.getTags( singleDefaultTag.defaultTag ), startTime = qS.getStartTime(), endTime = qS.getEndTime(), } = { } ) {
        // Need injection protection
        const queryString = new URLSearchParams();

        // Append tags
        tags.forEach( tag => queryString.append( 'tags', tag ) );
        queryString.append( 'tags', singleDefaultTag.defaultTag[ 0 ] );

        // Append time
        queryString.append( 'startTime', dateFormating( startTime ) );
        queryString.append( 'endTime', dateFormating( endTime ) );

        const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/tags-pages?${ queryString.toString() }`;
        const pageNumber = await fetch( reqURL ).then( res => res.json() ).then( data => data.pageNumber );

        renderPageButtons( singleDefaultTag.getAllAnnouncements, singleDefaultTag.getAnnouncementsByTags, pageNumber );
    },
};

export const multipleDefaultTags = {
    defaultTags:         [],
    async getAllAnnouncements ( {
        startTime = qS.getStartTime(),
        endTime = qS.getEndTime(),
        page = qS.getPage(),
        language = 'zh-TW',
    } = { } ) {
        // Need injection protection
        const queryString = new URLSearchParams();

        // Append tags
        multipleDefaultTags.defaultTags.forEach( tag => queryString.append( 'tags', tag ) );

        // Append time
        queryString.append( 'startTime', dateFormating( startTime ) );
        queryString.append( 'endTime', dateFormating( endTime ) );

        // Append page
        queryString.append( 'page', page );

        // Append language
        queryString.append( 'language', language );

        const pinnedURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/all-pinned?${ queryString.toString() }`;
        const announcementURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/all-announcement?${ queryString.toString() }`;
        const pinnedAnnouncements = await fetch( pinnedURL ).then( res => res.json() );
        const announcements = await fetch( announcementURL ).then( res => res.json() );

        renderBriefings( pinnedAnnouncements, announcements );
    },

    async getAnnouncementsByTags ( {
        tags = qS.getTags( multipleDefaultTags.defaultTags ),
        startTime = qS.getStartTime(),
        endTime = qS.getEndTime(),
        page = qS.getPage(),
        language = 'zh-TW',
    } = { } ) {
        // Need injection protection
        const queryString = new URLSearchParams();

        // Append tags
        tags.forEach( tag => queryString.append( 'tags', tag ) );

        // Append time
        queryString.append( 'startTime', dateFormating( startTime ) );
        queryString.append( 'endTime', dateFormating( endTime ) );

        // Append page
        queryString.append( 'page', page );

        // Append language
        queryString.append( 'language', language );

        const pinnedURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/tags-pinned?${ queryString.toString() }`;
        const announcementURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/tags-announcement?${ queryString.toString() }`;
        const pinnedAnnouncements = await fetch( pinnedURL ).then( res => res.json() );
        const announcements = await fetch( announcementURL ).then( res => res.json() );

        renderBriefings( pinnedAnnouncements, announcements );
    },

    async getAllPageNumber ( { startTime = qS.getStartTime(), endTime = qS.getEndTime(), } = { } ) {
        // Need injection protection
        const queryString = new URLSearchParams();

        // Append tags
        multipleDefaultTags.defaultTags.forEach( tag => queryString.append( 'tags', tag ) );

        // Append time
        queryString.append( 'startTime', dateFormating( startTime ) );
        queryString.append( 'endTime', dateFormating( endTime ) );

        const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/all-pages?${ queryString.toString() }`;
        const pageNumber = await fetch( reqURL ).then( res => res.json() ).then( data => data.pageNumber );

        renderPageButtons( multipleDefaultTags.getAllAnnouncements, multipleDefaultTags.getAnnouncementsByTags, pageNumber );
    },

    async getPageNumberByTags ( { tags = qS.getTags( multipleDefaultTags.defaultTags ), startTime = qS.getStartTime(), endTime = qS.getEndTime(), } = { } ) {
        // Need injection protection
        const queryString = new URLSearchParams();

        // Append tags
        tags.forEach( tag => queryString.append( 'tags', tag ) );

        // Append time
        queryString.append( 'startTime', dateFormating( startTime ) );
        queryString.append( 'endTime', dateFormating( endTime ) );

        const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/tags-pages?${ queryString.toString() }`;
        const pageNumber = await fetch( reqURL ).then( res => res.json() ).then( data => data.pageNumber );

        renderPageButtons( multipleDefaultTags.getAllAnnouncements, multipleDefaultTags.getAnnouncementsByTags, pageNumber );
    },
};
