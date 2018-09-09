import QueryString from 'static/src/js/components/announcement/filter/query-string.js';
import {
    renderBriefings,
    renderBriefingsError,
    renderPages,
    renderPagesError,
    renderPage,
} from 'static/src/js/components/announcement/filter/render.js';

// Announcement api URL prefix.
const apiURL = `${ window.location.protocol }//${ window.location.host }/api/announcement`;
const announcementBriefingTop = document.getElementById( 'announcement__brefings--top' );
const announcementBriefing = document.getElementById( 'announcement__brefings' );

/**
 * Construct single default tag.
 * @type {string} defaultTag
 * @type {function} getAllPinnedAnnouncements
 * @type {function} getAllAnnouncements
 * @type {function} getPinnedAnnouncementsByTags
 * @type {function} getAnnouncementsByTags
 * @type {function} getAllPageNumber
 * @type {function} getPageNumberByTags
 */

export const singleDefaultTag = {
    // `defaultTag` is used as default tag to get announcement ( OR operation ),
    // its type must be 'string' and cannot be null.
    defaultTag: null,

    getAllPinnedAnnouncements () {
        const { startTime, endTime, } = QueryString.getFilters( null );
        const query = QueryString.generate( {
            tags:     singleDefaultTag.defaultTag,
            startTime,
            endTime,
            language: 'zh-TW',
        } );

        fetch( `${ apiURL }/all-pinned?${ query }` )
        .then( ( res ) => {
            /* eslint no-magic-numbers: 'off' */
            if ( res.status === 400 )
                throw res.status;
            /* eslint no-magic-numbers: 'off' */
            else if ( res.status === 404 )
                throw res.status;
            else
                return res.json();
        } )
        .then( data => renderBriefings( announcementBriefingTop, data ) )
        .catch( err => renderBriefingsError( announcementBriefingTop, err ) );
    },

    /**
     * Get all announcement with queried tags equals to `defaultTag` when:
     *     * Page is loaded.
     *     * `tags__tag--all` is clicked ( because it means query with default tag ).
     *     * `tags__tag--*` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *     * `time__date` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in files [ ./index.js ] and [ ./event.js ] for more information.
     */

    getAllAnnouncements () {
        /* eslint no-console: 'off' */
        console.log( 'get all announcements' );
        const { startTime, endTime, page, } = QueryString.getFilters( null );
        const query = QueryString.generate( {
            tags:     singleDefaultTag.defaultTag,
            startTime,
            endTime,
            page,
            language: 'zh-TW',
        } );

        fetch( `${ apiURL }/all-announcement?${ query }` )
        .then( ( res ) => {
            /* eslint no-magic-numbers: 'off' */
            if ( res.status === 400 )
                throw res.status;
            /* eslint no-magic-numbers: 'off' */
            else if ( res.status === 404 )
                throw res.status;
            else
                return res.json();
        } )
        .then( ( data ) => {
            renderBriefings( announcementBriefing, data );
            renderPage();
        } )
        .catch( err => renderBriefingsError( announcementBriefing, err ) );
    },

    getPinnedAnnouncementsByTags () {
        const { tags, startTime, endTime, } = QueryString.getFilters( [ singleDefaultTag.defaultTag, ] );
        const query = QueryString.generate( {
            tags: [
                singleDefaultTag.defaultTag,
                ...tags,
            ],
            startTime,
            endTime,
            language: 'zh-TW',
        } );

        fetch( `${ apiURL }/tags-pinned?${ query }` )
        .then( ( res ) => {
            /* eslint no-magic-numbers: 'off' */
            if ( res.status === 400 )
                throw res.status;
            /* eslint no-magic-numbers: 'off' */
            else if ( res.status === 404 )
                throw res.status;
            else
                return res.json();
        } )
        .then( data => renderBriefings( announcementBriefingTop, data ) )
        .catch( err => renderBriefingsError( announcementBriefingTop, err ) );
    },

    /**
     * Get all announcement with queried tags when:
     *     * `tags__tag--*` is clicked and tag is appended to query string.
     *     * `time__date` is clicked and tag(s) other than `defaultTag` is in query string.
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in file [ ./event.js ] for more information.
     */

    getAnnouncementsByTags () {
        const { tags, startTime, endTime, page, } = QueryString.getFilters( [ singleDefaultTag.defaultTag, ] );
        const query = QueryString.generate( {
            tags: [
                singleDefaultTag.defaultTag,
                ...tags,
            ],
            startTime,
            endTime,
            page,
            language: 'zh-TW',
        } );

        fetch( `${ apiURL }/tags-announcement?${ query }` )
        .then( ( res ) => {
            /* eslint no-magic-numbers: 'off' */
            if ( res.status === 400 )
                throw res.status;
            /* eslint no-magic-numbers: 'off' */
            else if ( res.status === 404 )
                throw res.status;
            else
                return res.json();
        } )
        .then( ( data ) => {
            renderBriefings( announcementBriefing, data );
            renderPage();
        } )
        .catch( err => renderBriefingsError( announcementBriefing, err ) );
    },

    /**
     * Get minimum page number needed to contain all announcements when:
     *     * Page is loaded.
     *     * `tags__tag--all` is clicked ( because it means query with default tag ).
     *     * `tags__tag--*` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *     * `time__date` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in files [ ./index.js ] and [ ./event.js ] for more information.
     */

    getAllPageNumber () {
        const { startTime, endTime, } = QueryString.getFilters( null );
        const query = QueryString.generate( {
            tags: singleDefaultTag.defaultTag,
            startTime,
            endTime,
        } );

        fetch( `${ apiURL }/all-pages?${ query }` )
        .then( ( res ) => {
            /* eslint no-magic-numbers: 'off' */
            if ( res.status === 400 )
                throw res.status;
            /* eslint no-magic-numbers: 'off' */
            else if ( res.status === 404 )
                throw res.status;
            else
                return res.json();
        } )
        .then( data => renderPages( data.pageNumber ) )
        .catch( err => renderPagesError( err ) );
    },

    /**
     * Get minimum page number needed to contain all announcements when:
     *     * `tags__tag--*` is clicked and tag is appended to query string.
     *     * `time__date` is clicked and tag(s) other than `defaultTag` is in query string.
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in file [ ./event.js ] for more information.
     */

    getPageNumberByTags () {
        const { tags, startTime, endTime, } = QueryString.getFilters( [ singleDefaultTag.defaultTag, ] );
        const query = QueryString.generate( {
            tags: [
                singleDefaultTag.defaultTag,
                ...tags,
            ],
            startTime,
            endTime,
        } );

        fetch( `${ apiURL }/tags-pages?${ query }` )
        .then( ( res ) => {
            /* eslint no-magic-numbers: 'off' */
            if ( res.status === 400 )
                throw res.status;
            /* eslint no-magic-numbers: 'off' */
            else if ( res.status === 404 )
                throw res.status;
            else
                return res.json();
        } )
        .then( data => renderPages( data.pageNumber ) )
        .catch( err => renderPagesError( err ) );
    },
};

/**
 * Construct multiple default tags.
 * @type {string[]} defaultTags
 * @type {function} getAllPinnedAnnouncements
 * @type {function} getAllAnnouncements
 * @type {function} getPinnedAnnouncementsByTags
 * @type {function} getAnnouncementsByTags
 * @type {function} getAllPageNumber
 * @type {function} getPageNumberByTags
 */

export const multipleDefaultTags = {
    // If default tags is empty array, then it is used by route `announcement/all`.
    // Otherwise it is used as multiple default tags to get announcement ( OR operation ).
    defaultTags: [],

    getAllPinnedAnnouncements () {
        const { startTime, endTime, } = QueryString.getFilters( null );
        const query = QueryString.generate( {
            tags:     multipleDefaultTags.defaultTags,
            startTime,
            endTime,
            language: 'zh-TW',
        } );

        fetch( `${ apiURL }/all-pinned?${ query }` )
        .then( ( res ) => {
            /* eslint no-magic-numbers: 'off' */
            if ( res.status === 400 )
                throw res.status;
            /* eslint no-magic-numbers: 'off' */
            else if ( res.status === 404 )
                throw res.status;
            else
                return res.json();
        } )
        .then( data => renderBriefings( announcementBriefingTop, data ) )
        .catch( err => renderBriefingsError( announcementBriefingTop, err ) );
    },

    /**
     * Get all announcement with queried tags equals to `defaultTags` when:
     *     * Page is loaded.
     *     * `tags__tag--all` is clicked ( because it means query with default tags ).
     *     * `tags__tag--*` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *     * `time__date` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in files [ ./index.js ] and [ ./event.js ] for more information.
     */

    getAllAnnouncements () {
        const { startTime, endTime, page, } = QueryString.getFilters( null );
        const query = QueryString.generate( {
            tags:     multipleDefaultTags.defaultTags,
            startTime,
            endTime,
            page,
            language: 'zh-TW',
        } );

        fetch( `${ apiURL }/all-announcement?${ query }` )
        .then( ( res ) => {
            /* eslint no-magic-numbers: 'off' */
            if ( res.status === 400 )
                throw res.status;
            /* eslint no-magic-numbers: 'off' */
            else if ( res.status === 404 )
                throw res.status;
            else
                return res.json();
        } )
        .then( ( data ) => {
            renderBriefings( announcementBriefing, data );
            renderPage();
        } )
        .catch( err => renderBriefingsError( announcementBriefing, err ) );
    },

    getPinnedAnnouncementsByTags () {
        const { tags, startTime, endTime, } = QueryString.getFilters( multipleDefaultTags.defaultTags );
        const query = QueryString.generate( {
            tags,
            startTime,
            endTime,
            language: 'zh-TW',
        } );

        fetch( `${ apiURL }/tags-pinned?${ query }` )
        .then( ( res ) => {
            /* eslint no-magic-numbers: 'off' */
            if ( res.status === 400 )
                throw res.status;
            /* eslint no-magic-numbers: 'off' */
            else if ( res.status === 404 )
                throw res.status;
            return res.json();
        } )
        .then( data => renderBriefings( announcementBriefing, data ) )
        .catch( err => renderBriefingsError( announcementBriefingTop, err ) );
    },

    /**
     * Get all announcement with queried tags when:
     *     * `tags__tag--*` is clicked and tag is appended to query string.
     *     * `time__date` is clicked and tag(s) other than `defaultTags` is in query string.
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in file [ ./event.js ] for more information.
     */

    getAnnouncementsByTags () {
        const { tags, startTime, endTime, page, } = QueryString.getFilters( multipleDefaultTags.defaultTags );
        const query = QueryString.generate( {
            tags,
            startTime,
            endTime,
            page,
            language: 'zh-TW',
        } );

        fetch( `${ apiURL }/tags-announcement?${ query }` )
        .then( ( res ) => {
            /* eslint no-magic-numbers: 'off' */
            if ( res.status === 400 )
                throw res.status;
            /* eslint no-magic-numbers: 'off' */
            else if ( res.status === 404 )
                throw res.status;
            else
                return res.json();
        } )
        .then( ( data ) => {
            renderBriefings( announcementBriefing, data );
            renderPage();
        } )
        .catch( err => renderBriefingsError( announcementBriefing, err ) );
    },

    /**
     * Get minimum page number needed to contain all announcements when:
     *     * Page is loaded.
     *     * `tags__tag--all` is clicked ( because it means query with default tags ).
     *     * `tags__tag--*` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *     * `time__date` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in files [ ./index.js ] and [ ./event.js ] for more information.
     */

    getAllPageNumber () {
        const { startTime, endTime, } = QueryString.getFilters( null );
        const query = QueryString.generate( {
            tags: multipleDefaultTags.defaultTags,
            startTime,
            endTime,
        } );

        fetch( `${ apiURL }/all-pages?${ query }` )
        .then( ( res ) => {
            /* eslint no-magic-numbers: 'off' */
            if ( res.status === 400 )
                throw res.status;
            /* eslint no-magic-numbers: 'off' */
            else if ( res.status === 404 )
                throw res.status;
            else
                return res.json();
        } )
        .then( data => renderPages( data.pageNumber ) )
        .catch( err => renderPagesError( err ) );
    },

    /**
     * Get minimum page number needed to contain all announcements when:
     *     * `tags__tag--*` is clicked and tag is appended to query string.
     *     * `time__date` is clicked and tag(s) other than `defaultTags` is in query string.
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in file [ ./event.js ] for more information.
     */

    getPageNumberByTags () {
        const { tags, startTime, endTime, } = QueryString.getFilters( multipleDefaultTags.defaultTags );
        const query = QueryString.generate( {
            tags,
            startTime,
            endTime,
        } );

        fetch( `${ apiURL }/tags-pages?${ query }` )
        .then( ( res ) => {
            /* eslint no-magic-numbers: 'off' */
            if ( res.status === 400 )
                throw res.status;
            /* eslint no-magic-numbers: 'off' */
            else if ( res.status === 404 )
                throw res.status;
            else
                return res.json();
        } )
        .then( data => renderPages( data.pageNumber ) )
        .catch( err => renderPagesError( err ) );
    },
};
