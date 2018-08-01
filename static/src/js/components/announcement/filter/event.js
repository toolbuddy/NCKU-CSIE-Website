import { dateFormating, }  from 'jsUtil/format.js';

/**
 * Update URL with new query string.
 *
 * @param {string} query
 */

function updateURL ( query ) {
    const newUrl = `${ window.location.protocol }//${ window.location.host }${ window.location.pathname }?${ query.toString() }`;
    window.history.pushState( { path: newUrl, }, '', newUrl );
}

/**
 * When `tags__tag--all` is clicked, do the following things:
 *     1. Clear all tags and page in `window.location.search`.
 *     2. Update URL.
 *     3. Count total pages number and render `pages__page`.
 *
 * @param {function} getAllAnnouncements
 * @param {function} getAllPageNumber
 */

function defaultTagOnClick ( getAllAnnouncements, getAllPageNumber ) {
    // It is a closure because `singleDefaultTagFilter` and `multipleDefaultTagsFilter`
    // use different `getAllAnnouncements` and `getAllPageNumber`.
    return function () {
        const query = new URLSearchParams( window.location.search );
        query.delete( 'tags' );
        query.delete( 'page' );
        updateURL( query );
        getAllPageNumber();
        getAllAnnouncements();
    };
}

/**
 * When `tags__tag--*` is clicked, do the following things:
 *     1. Update tag in `window.loaction.search`.
 *     2. Clear page in `window.loaction.search`.
 *     3. Update URL.
 *     4. Count total pages number and render `pages__page`.
 *     5. Get announcements and render `briefings__briefing`.
 *
 * @param {function} getAllAnnouncements
 * @param {function} getAllPageNumber
 * @param {function} getAnnouncementsByTags
 * @param {function} getPageNumberByTags
 */

function tagOnClick ( getAllAnnouncements, getAllPageNumber, getAnnouncementsByTags, getPageNumberByTags ) {
    // It is a closure because `singleDefaultTagFilter` and `multipleDefaultTagsFilter`
    // use different `getAllAnnouncements` and `getAllPageNumber`.
    return function ( event ) {
        // Get event triggered tag's name.
        const targetTag = /tags__tag--([a-zA-Z0-9]+)/.exec( event.target.id )[ 1 ];
        const query = new URLSearchParams( window.location.search );
        const currentTags = query.getAll( 'tags' );

        // If `tags__tag--${ targetTag }` has not been selected,
        // append current tags with `tags__tag--${ targetTag }` to make a new query.
        if ( currentTags.indexOf( targetTag ) === -1 ) {
            query.append( 'tags', targetTag );
            currentTags.push( targetTag );
        }

        // If `tags__tag--${ targetTag }` has not been selected,
        // remove all tags from query and recreate without `tags__tag--${ targetTag }`.
        else {
            query.delete( 'tags' );
            currentTags.filter( tag => tag !== targetTag )
            .forEach( tag => query.append( 'tags', tag ) );
        }

        query.delete( 'page' );
        updateURL( query );

        // If no tags in query, use default tag(s) to count page number and get announcements.
        if ( query.getAll( 'tags' ).length === 0 ) {
            getAllPageNumber();
            getAllAnnouncements();
        }

        // If query with selected tags, use default tag(s) and selected tags to count page number and get announcements.
        else {
            getPageNumberByTags( { tags: currentTags, } );
            getAnnouncementsByTags( { tags: currentTags, } );
        }
    };
}

/**
 * When `time__date`'s value is changed, do the following things:
 *     1. Update `startTime` or `endTime` in `window.loaction.search`.
 *     2. Clear page in `window.loaction.search`.
 *     3. Update URL.
 *     4. Count total pages number and render `pages__page`.
 *     5. Get announcements and render `briefings__briefing`.
 *
 * @param {function} getAllAnnouncements
 * @param {function} getAllPageNumber
 * @param {function} getAnnouncementsByTags
 * @param {function} getPageNumberByTags
 */

function dateOnChange ( getAllAnnouncements, getAllPageNumber, getAnnouncementsByTags, getPageNumberByTags ) {
    // It is a closure because `singleDefaultTagFilter` and `multipleDefaultTagsFilter`
    // use different `getAllAnnouncements` and `getAllPageNumber`.
    return function ( event ) {
        const query = new URLSearchParams( window.location.search );

        // TODO: validate newDate

        // Input `time__date`'s value should in `yyyy-mm-dd` format.
        const newDate = event.target.value;
        const targetDate = event.target.id;

        // If input value is the same day, do nothing.
        if ( query.get( targetDate ) === newDate )
            return;

        // If input value is cleaned, query with default date value.
        else if ( newDate === '' ) {
            query.delete( targetDate );
            query.delete( 'page' );
            updateURL( query );

            // Query with default tag(s).
            if ( query.getAll( 'tags' ).length === 0 ) {
                getAllPageNumber();
                getAllAnnouncements();
            }

            // Query with default tag(s) and selected tag(s).
            else {
                getPageNumberByTags();
                getAnnouncementsByTags();
            }
        }

        // Query with new input date value.
        else {
            const argument = {
                [ targetDate ]: new Date( newDate ),
            };
            query.set( targetDate, dateFormating( argument[ targetDate ] ) );
            query.delete( 'page' );

            updateURL( query );

            // Query with default tag(s).
            if ( query.getAll( 'tags' ).length === 0 ) {
                getAllPageNumber( argument );
                getAllAnnouncements( argument );
            }

            // Query with default tag(s) and selected tag(s).
            else {
                getPageNumberByTags( argument );
                getAnnouncementsByTags( argument );
            }
        }
    };
}

/**
 * When `pages__page` is clicked, do the following things:
 *     1. Update URL.
 *     2. Get announcements on the page.
 *
 * @param {function} getAllAnnouncements
 * @param {function} getAllPageNumber
 */

export function pageOnClick ( getAllAnnouncements, getAnnouncementsByTags ) {
    // It is a closure because `singleDefaultTagFilter` and `multipleDefaultTagsFilter`
    // use different `getAllAnnouncements` and `getAllPageNumber`.
    return function ( event ) {
        const page = /pages__page--([1-9][0-9]*)/.exec( event.target.id )[ 1 ];
        const query = new URLSearchParams( window.location.search );

        // If page is same, do nothing
        if ( query.get( 'page' ) === page )
            return;

        query.set( 'page', page );

        updateURL( query );

        // Query with default tag(s).
        if ( query.getAll( 'tags' ).length === 0 )
            getAllAnnouncements( { page, } );

        // Query with default tag(s) and selected tag(s).
        else
            getAnnouncementsByTags( { page, } );
    };
}

/**
 * Construct filter's event
 *     * `tags__tag--*`:                  on click event `tagOnClick`
 *     * `tags__tag--{ defaultTagName }`: on click event `defaultTagOnClick`
 *     * `time__date`:                    on cheange event `dateOnChange`
 *
 * @param {function} getAllAnnouncements
 * @param {function} getAllPageNumber
 * @param {function} getAnnouncementsByTags
 * @param {function} getPageNumberByTags
 */

export function filterEvent ( getAllAnnouncements, getAnnouncementsByTags, getAllPageNumber, getPageNumberByTags, defaultTagName = 'all' ) {
    // Create function from closure.
    const onclick = tagOnClick( getAllAnnouncements, getAllPageNumber, getAnnouncementsByTags, getPageNumberByTags );
    Array.from( document.getElementsByClassName( 'tags__tag' ) ).forEach( ( tag ) => {
        tag.addEventListener( 'click', onclick );
    } );

    const defaultTag = document.getElementById( `tags__tag--${ defaultTagName }` );
    defaultTag.removeEventListener( 'click', onclick );

    // Create function from closure.
    defaultTag.addEventListener( 'click', defaultTagOnClick( getAllAnnouncements, getAllPageNumber ) );

    // Create function from closure.
    const onchange = dateOnChange( getAllAnnouncements, getAllPageNumber, getAnnouncementsByTags, getPageNumberByTags );
    Array.from( document.getElementsByClassName( 'time__date' ) ).forEach( ( dateInput ) => {
        dateInput.addEventListener( 'change', onchange );
    } );
}
