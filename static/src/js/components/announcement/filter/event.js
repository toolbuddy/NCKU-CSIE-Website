import { dateFormating, }  from 'jsUtil/format.js';

/**
 * Update URL with new query string.
 *
 * @param {string} queryString
 */

function updateURL ( query ) {
    const newUrl = `${ window.location.protocol }//${ window.location.host }${ window.location.pathname }?${ query.toString() }`;
    window.history.pushState( { path: newUrl, }, '', newUrl );
}

/**
 * When `tags__tag--all` is clicked, do the following things:
 *     1. Clear all tags and page in `window.location.search`.
 *     2. Update URL.
 *     3. Count total pages number and render pages.
 *     4. Get and render announcements.
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
 *     1. Append or clear tag in `window.loaction.search`.
 *     2. Clear page in `window.loaction.search`.
 *     2. Update URL.
 *     3. Count total pages number and render pages.
 *     4. Get and render announcements.
 *
 * @param {function} getAllAnnouncements
 * @param {function} getAllPageNumber
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

function dateOnChange ( getAllAnnouncements, getAllPageNumber, getAnnouncementsByTags, getPageNumberByTags ) {
    // It is a closure because `singleDefaultTagFilter` and `multipleDefaultTagsFilter`
    // use different `getAllAnnouncements` and `getAllPageNumber`.
    return function ( event ) {
        const queryString = new URLSearchParams( window.location.search );

        // Element.value will get 2018-07-18 format
        const newTime = document.getElementById( event.target.id ).value;
        if ( queryString.get( event.target.id ) === newTime ) {
            // If already at this day
            return;
        }
        else if ( newTime === '' ) {
            queryString.delete( event.target.id );
            queryString.delete( 'page' );
            updateURL( queryString );
            if ( queryString.getAll( 'tags' ).length === 0 ) {
                getAllPageNumber();
                getAllAnnouncements();
            }
            else {
                getPageNumberByTags();
                getAnnouncementsByTags();
            }
        }
        else {
            queryString.set( event.target.id, dateFormating( new Date( newTime ) ) );
            queryString.delete( 'page' );

            updateURL( queryString );
            if ( event.target.id === 'startTime' ) {
                if ( queryString.getAll( 'tags' ).length === 0 ) {
                    getAllPageNumber( { startTime: new Date( newTime ), } );
                    getAllAnnouncements( { startTime: new Date( newTime ), } );
                }
                else {
                    getPageNumberByTags( { startTime: new Date( newTime ), } );
                    getAnnouncementsByTags( { startTime: new Date( newTime ), } );
                }
            }
            if ( event.target.id === 'endTime' ) {
                if ( queryString.getAll( 'tags' ).length === 0 ) {
                    getAllPageNumber( { endTime: new Date( newTime ), } );
                    getAllAnnouncements( { endTime: new Date( newTime ), } );
                }
                else {
                    getPageNumberByTags( { endTime: new Date( newTime ), } );
                    getAnnouncementsByTags( { endTime: new Date( newTime ), } );
                }
            }
        }
    };
}

export function pageOnClick ( getAllAnnouncements, getAnnouncementsByTags ) {
    // It is a closure because `singleDefaultTagFilter` and `multipleDefaultTagsFilter`
    // use different `getAllAnnouncements` and `getAllPageNumber`.
    return function ( event ) {
        const page = event.target.innerHTML;
        const queryString = new URLSearchParams( window.location.search );
        if ( queryString.get( 'page' ) === page ) {
            // If already at this page
            return;
        }

        queryString.set( 'page', page );

        updateURL( queryString );
        if ( queryString.getAll( 'tags' ).length === 0 )
            getAllAnnouncements( { page, } );
        else
            getAnnouncementsByTags( { page, } );
    };
}

export function filterEvent ( getAllAnnouncements, getAnnouncementsByTags, getAllPageNumber, getPageNumberByTags, defaulttargetTag = 'all' ) {
    const onclick = tagOnClick( getAllAnnouncements, getAllPageNumber, getAnnouncementsByTags, getPageNumberByTags );
    Array.from( document.getElementsByClassName( 'tags__tag' ) ).forEach( ( tag ) => {
        tag.addEventListener( 'click', onclick );
    } );

    const defaultTag = document.getElementById( `tags__tag--${ defaulttargetTag }` );
    defaultTag.removeEventListener( 'click', onclick );
    defaultTag.addEventListener( 'click', defaultTagOnClick( getAllAnnouncements, getAllPageNumber ) );

    const onchange = dateOnChange( getAllAnnouncements, getAllPageNumber, getAnnouncementsByTags, getPageNumberByTags );
    Array.from( document.getElementsByClassName( 'time__date' ) ).forEach( ( dateInput ) => {
        dateInput.addEventListener( 'change', onchange );
    } );
}
