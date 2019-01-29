import QueryString from 'static/src/js/components/announcement/filter/query-string.js';
import TagUtils from 'models/announcement/utils/tag.js';
import { host, protocol, } from 'settings/server/config.js';
import {
    renderBriefings,
    renderBriefingsError,
    renderPages,
    renderPagesError,
    renderPage,
} from 'static/src/js/components/announcement/filter/render.js';

// Announcement api URL prefix.
const apiURL = `${ protocol }//${ host }/api/announcement`;

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
    defaultTag:              null,
    announcementBriefingTop: null,
    announcementBriefing:    null,
    briefingNum:             null,

    getAllPinnedAnnouncements () {
        const { from, to, languageId, } = QueryString.getFilters( null );

        let tagsToSend = singleDefaultTag.defaultTag;
        if ( singleDefaultTag.defaultTag.length === 0 )
            tagsToSend = TagUtils.supportedTagId;

        const query = QueryString.generate( {
            tags:     tagsToSend,
            from,
            to,
            languageId,
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
        .then( ( data ) => {
            if ( data.length === 0 )
                renderBriefingsError( singleDefaultTag.announcementBriefingTop, data );
            else
                renderBriefings( singleDefaultTag.announcementBriefingTop, data );
        } )
        .catch( err => renderBriefingsError( singleDefaultTag.announcementBriefingTop, err ) );
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
        const { from, to, page, languageId, } = QueryString.getFilters( null );

        let tagsToSend = singleDefaultTag.defaultTag;
        if ( singleDefaultTag.defaultTag.length === 0 )
            tagsToSend = TagUtils.supportedTagId;

        const query = QueryString.generate( {
            tags:     tagsToSend,
            from,
            to,
            page,
            languageId,
            amount: singleDefaultTag.briefingNum,
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
            if ( data.length === 0 )
                renderBriefingsError( singleDefaultTag.announcementBriefing, data );
            else
                renderBriefings( singleDefaultTag.announcementBriefing, data );
        } )
        .then( () => {
            renderPage();
        } )
        .catch( err => renderBriefingsError( singleDefaultTag.announcementBriefing, err ) );
    },

    getPinnedAnnouncementsByTags () {
        const { tags, from, to, languageId, } = QueryString.getFilters( [ singleDefaultTag.defaultTag, ] );
        const query = QueryString.generate( {
            tags: [
                singleDefaultTag.defaultTag,
                ...tags,
            ],
            from,
            to,
            languageId,
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
        .then( ( data ) => {
            if ( data.length === 0 )
                renderBriefingsError( singleDefaultTag.announcementBriefingTop, data );
            else
                renderBriefings( singleDefaultTag.announcementBriefingTop, data );
        } )
        .catch( err => renderBriefingsError( singleDefaultTag.announcementBriefingTop, err ) );
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
        const { tags, from, to, page, languageId, } = QueryString.getFilters( [ singleDefaultTag.defaultTag, ] );
        const query = QueryString.generate( {
            tags: [
                singleDefaultTag.defaultTag,
                ...tags,
            ],
            from,
            to,
            page,
            languageId,
            amount: singleDefaultTag.briefingNum,
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
            if ( data.length === 0 )
                renderBriefingsError( singleDefaultTag.announcementBriefing, data );
            else
                renderBriefings( singleDefaultTag.announcementBriefing, data );
        } )
        .then( () => {
            renderPage();
        } )
        .catch( err => renderBriefingsError( singleDefaultTag.announcementBriefing, err ) );
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
        const { from, to, } = QueryString.getFilters( null );

        let tagsToSend = singleDefaultTag.defaultTag;
        if ( singleDefaultTag.defaultTag.length === 0 )
            tagsToSend = TagUtils.supportedTagId;

        const query = QueryString.generate( {
            tags:   tagsToSend,
            from,
            to,
            amount: singleDefaultTag.briefingNum,
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
        const { tags, from, to, } = QueryString.getFilters( [ singleDefaultTag.defaultTag, ] );
        const query = QueryString.generate( {
            tags: [
                singleDefaultTag.defaultTag,
                ...tags,
            ],
            from,
            to,
            amount: singleDefaultTag.briefingNum,
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
    defaultTags:             [],
    announcementBriefingTop: null,
    announcementBriefing:    null,
    briefingNum:             null,

    getAllPinnedAnnouncements () {
        const { from, to, languageId, } = QueryString.getFilters( null );

        let tagsToSend = multipleDefaultTags.defaultTags;
        if ( multipleDefaultTags.defaultTags.length === 0 )
            tagsToSend = TagUtils.supportedTagId;

        const query = QueryString.generate( {
            tags:     tagsToSend,
            from,
            to,
            languageId,
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
        .then( ( data ) => {
            if ( data.length === 0 )
                renderBriefingsError( multipleDefaultTags.announcementBriefingTop, data );
            else
                renderBriefings( multipleDefaultTags.announcementBriefingTop, data );
        } )
        .catch( err => renderBriefingsError( multipleDefaultTags.announcementBriefingTop, err ) );
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
        const { from, to, page, languageId, } = QueryString.getFilters( null );

        let tagsToSend = multipleDefaultTags.defaultTags;
        if ( multipleDefaultTags.defaultTags.length === 0 )
            tagsToSend = TagUtils.supportedTagId;

        const query = QueryString.generate( {
            tags:     tagsToSend,
            from,
            to,
            page,
            languageId,
            amount: multipleDefaultTags.briefingNum,
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
            if ( data.length === 0 )
                renderBriefingsError( multipleDefaultTags.announcementBriefing, data );
            else
                renderBriefings( multipleDefaultTags.announcementBriefing, data );
        } )
        .then( () => {
            renderPage();
        } )
        .catch( err => renderBriefingsError( multipleDefaultTags.announcementBriefing, err ) );
    },

    getPinnedAnnouncementsByTags () {
        const { tags, from, to, languageId, } = QueryString.getFilters( multipleDefaultTags.defaultTags );
        const query = QueryString.generate( {
            tags,
            from,
            to,
            languageId,
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
        .then( ( data ) => {
            if ( data.length === 0 )
                renderBriefingsError( multipleDefaultTags.announcementBriefingTop, data );
            else
                renderBriefings( multipleDefaultTags.announcementBriefingTop, data );
        } )
        .catch( err => renderBriefingsError( multipleDefaultTags.announcementBriefingTop, err ) );
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
        const { tags, from, to, page, languageId, } = QueryString.getFilters( multipleDefaultTags.defaultTags );
        const query = QueryString.generate( {
            tags,
            from,
            to,
            page,
            languageId,
            amount: multipleDefaultTags.briefingNum,
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
            if ( data.length === 0 )
                renderBriefingsError( multipleDefaultTags.announcementBriefing, data );
            else
                renderBriefings( multipleDefaultTags.announcementBriefing, data );
        } )
        .then( () => {
            renderPage();
        } )
        .catch( err => renderBriefingsError( multipleDefaultTags.announcementBriefing, err ) );
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
        const { from, to, } = QueryString.getFilters( null );

        let tagsToSend = multipleDefaultTags.defaultTags;
        if ( multipleDefaultTags.defaultTags.length === 0 )
            tagsToSend = TagUtils.supportedTagId;

        const query = QueryString.generate( {
            tags:   tagsToSend,
            from,
            to,
            amount: multipleDefaultTags.briefingNum,
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
        .then( data => renderPages( data ) )
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
        const { tags, from, to, } = QueryString.getFilters( multipleDefaultTags.defaultTags );
        const query = QueryString.generate( {
            tags,
            from,
            to,
            amount: multipleDefaultTags.briefingNum,
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
