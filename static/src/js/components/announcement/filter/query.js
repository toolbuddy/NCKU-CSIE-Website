import QueryString from 'jsComponent/announcement/filter/query-string.js';
import { renderBriefings, renderPages, } from 'jsComponent/announcement/filter/render.js';
import { dateFormating, }  from 'jsUtil/format.js';

// Announcement api URL prefix.
const apiURL = `${ window.location.protocol }//${ window.location.host }/api/announcement`;

/**
 * Construct single default tag.
 * @type {string} defaultTag
 * @type {function} getAllAnnouncements
 * @type {function} getAnnouncementsByTags
 * @type {function} getAllPageNumber
 * @type {function} getPageNumberByTags
 */

export const singleDefaultTag = {
    // `defaultTag` is used as default tag to get announcement ( OR operation ),
    // its type must be 'string' and cannot be null.
    defaultTag: null,

    /**
     * Get all announcement with queried tags equals to `defaultTag` when:
     *     * Page is loaded.
     *     * `tags__tag--all` is clicked ( because it means query with default tag ).
     *     * `tags__tag--*` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *     * `time__date` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *
     * @param {Date}   startTime
     * @param {Date}   endTime
     * @param {string} page
     * @param {string} language
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in files [ ./index.js ] and [ ./event.js ] for more information.
     */

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

    /**
     * Get all announcement with queried tags when:
     *     * `tags__tag--*` is clicked and tag is appended to query string.
     *     * `time__date` is clicked and tag(s) other than `defaultTag` is in query string.
     *
     * @param {string[]} tags
     * @param {Date}     startTime
     * @param {Date}     endTime
     * @param {string}   page
     * @param {string}   language
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in file [ ./event.js ] for more information.
     */

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

    /**
     * Get minimum page number needed to contain all announcements when:
     *     * Page is loaded.
     *     * `tags__tag--all` is clicked ( because it means query with default tag ).
     *     * `tags__tag--*` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *     * `time__date` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *
     * @param {Date} startTime
     * @param {Date} endTime
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in files [ ./index.js ] and [ ./event.js ] for more information.
     */

    getAllPageNumber ( { startTime = QueryString.getStartTime(), endTime = QueryString.getEndTime(), } = { } ) {
        const query = QueryString.generate( {
            'tags':      [ singleDefaultTag.defaultTag, ],
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
        } );

        fetch( `${ apiURL }/all-pages?${ query }` )
        .then( res => res.json() )
        .then( data => renderPages(
            singleDefaultTag.getAllAnnouncements,
            singleDefaultTag.getAnnouncementsByTags,
            data.pageNumber
        ) );
    },

    /**
     * Get minimum page number needed to contain all announcements when:
     *     * `tags__tag--*` is clicked and tag is appended to query string.
     *     * `time__date` is clicked and tag(s) other than `defaultTag` is in query string.
     *
     * @param {string[]} tags
     * @param {Date}     startTime
     * @param {Date}     endTime
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in file [ ./event.js ] for more information.
     */

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
        .then( data => renderPages(
            singleDefaultTag.getAllAnnouncements,
            singleDefaultTag.getAnnouncementsByTags,
            data.pageNumber
        ) );
    },
};

/**
 * Construct multiple default tags.
 * @type {string[]} defaultTags
 * @type {function} getAllAnnouncements
 * @type {function} getAnnouncementsByTags
 * @type {function} getAllPageNumber
 * @type {function} getPageNumberByTags
 */

export const multipleDefaultTags = {
    // If default tags is empty array, then it is used by route `announcement/all`.
    // Otherwise it is used as multiple default tags to get announcement ( OR operation ).
    defaultTags:         [],

    /**
     * Get all announcement with queried tags equals to `defaultTags` when:
     *     * Page is loaded.
     *     * `tags__tag--all` is clicked ( because it means query with default tags ).
     *     * `tags__tag--*` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *     * `time__date` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *
     * @param {Date}   startTime
     * @param {Date}   endTime
     * @param {string} page
     * @param {string} language
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in files [ ./index.js ] and [ ./event.js ] for more information.
     */

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

    /**
     * Get all announcement with queried tags when:
     *     * `tags__tag--*` is clicked and tag is appended to query string.
     *     * `time__date` is clicked and tag(s) other than `defaultTags` is in query string.
     *
     * @param {string[]} tags
     * @param {Date}     startTime
     * @param {Date}     endTime
     * @param {string}   page
     * @param {string}   language
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in file [ ./event.js ] for more information.
     */

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

    /**
     * Get minimum page number needed to contain all announcements when:
     *     * Page is loaded.
     *     * `tags__tag--all` is clicked ( because it means query with default tags ).
     *     * `tags__tag--*` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *     * `time__date` is clicked and no tag in query string ( which is equivalent to click on `tags__tag--all` ).
     *
     * @param {Date} startTime
     * @param {Date} endTime
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in files [ ./index.js ] and [ ./event.js ] for more information.
     */

    getAllPageNumber ( { startTime = QueryString.getStartTime(), endTime = QueryString.getEndTime(), } = { } ) {
        const query = QueryString.generate( {
            'tags':      multipleDefaultTags.defaultTags,
            'startTime': dateFormating( startTime ),
            'endTime':   dateFormating( endTime ),
        } );

        fetch( `${ apiURL }/all-pages?${ query }` )
        .then( res => res.json() )
        .then( data => renderPages(
            multipleDefaultTags.getAllAnnouncements,
            multipleDefaultTags.getAnnouncementsByTags,
            data.pageNumber
        ) );
    },

    /**
     * Get minimum page number needed to contain all announcements when:
     *     * `tags__tag--*` is clicked and tag is appended to query string.
     *     * `time__date` is clicked and tag(s) other than `defaultTags` is in query string.
     *
     * @param {string[]} tags
     * @param {Date}     startTime
     * @param {Date}     endTime
     *
     * See `defaultTagOnClick`, `tagOnClick`, `dateOnChange`, `pageOnClick` and `filterEvent`
     * in file [ ./event.js ] for more information.
     */

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
        .then( res => res.json() ).then( data => renderPages(
            multipleDefaultTags.getAllAnnouncements,
            multipleDefaultTags.getAnnouncementsByTags,
            data.pageNumber
        ) );
    },
};
