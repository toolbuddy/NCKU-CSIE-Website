import { dateFormating, }  from 'static/src/js/components/announcement/filter/format.js';

let filterOnChange = null;
let pageOnChange = null;

export function setURLOnChange ( getAllAnnouncements, getAllPageNumber, getAnnouncementsByTags, getPageNumberByTags ) {
    pageOnChange = () => {
        if ( !new URLSearchParams( window.location.search ).getAll( 'tags' ).length )
            getAllAnnouncements();
        else
            getAnnouncementsByTags();
    };
    filterOnChange = () => {
        if ( !new URLSearchParams( window.location.search ).getAll( 'tags' ).length ) {
            getAllPageNumber();
            getAllAnnouncements();
        }

        // If query with selected tags, use default tag(s) and selected tags to count page number and get announcements.
        else {
            getPageNumberByTags();
            getAnnouncementsByTags();
        }
    };
    return filterOnChange;
}

/**
 * Update URL with new query string.
 * If new query string contains page number, which means page number changed,
 * it only need to get new announcements, no need to get total page number again.
 * If new query string dosen't contains page number, which means filter changed,
 * it will need to get new page number and new announcements.
 *
 * @param {URLSearchParams} query
 */

function updateURL ( query ) {
    window.history.pushState( null, '', `?${ query.toString() }` );
    if ( !query.get( 'page' ) )
        filterOnChange();
    else
        pageOnChange();
}

/**
 * When `tags__tag--all` is clicked, do the following things:
 *     1. Clear all tags and page in `window.location.search`.
 *     2. Update URL.
 */

function defaultTagOnClick () {
    const query = new URLSearchParams( window.location.search );
    query.delete( 'tags' );
    query.delete( 'page' );
    updateURL( query );
}

/**
 * When `tags__tag--*` is clicked, do the following things:
 *     1. Update tag in `window.loaction.search`.
 *     2. Clear page in `window.loaction.search`.
 *     3. Update URL.
 *
 * @param {MouseEvent} event
 */

function tagOnClick ( event ) {
    // Get event triggered tag's name.
    const targetTag = /tags__tag--([a-zA-Z0-9]+)/.exec( event.target.id )[ 1 ];
    const query = new URLSearchParams( window.location.search );
    const currentTags = query.getAll( 'tags' );

    // If `tags__tag--${ targetTag }` has not been selected,
    // append current tags with `tags__tag--${ targetTag }` to make a new query.
    if ( currentTags.indexOf( targetTag ) === -1 )
        query.append( 'tags', targetTag );

    // If `tags__tag--${ targetTag }` has not been selected,
    // remove all tags from query and recreate without `tags__tag--${ targetTag }`.
    else {
        query.delete( 'tags' );
        currentTags.filter( tag => tag !== targetTag )
        .forEach( tag => query.append( 'tags', tag ) );
    }

    query.delete( 'page' );
    updateURL( query );
}

/**
 * When `time__date`'s value is changed, do the following things:
 *     1. Update `startTime` or `endTime` in `window.loaction.search`.
 *     2. Clear page in `window.loaction.search`.
 *     3. Update URL.
 *
 * @param {Event} event
 */

function dateOnChange ( event ) {
    const query = new URLSearchParams( window.location.search );

    // TODO: validate newDate

    // Input `time__date`'s value should in `yyyy-mm-dd` format.
    const newDate = event.target.value;
    const targetDate = event.target.id;

    // If input value is the same day, do nothing.
    if ( query.get( targetDate ) === newDate )
        return;

    // If input value is cleaned, query with default date value.
    if ( newDate === '' )
        query.delete( targetDate );

    // Query with new input date value.
    else {
        const argument = {
            [ targetDate ]: new Date( newDate ),
        };
        query.set( targetDate, dateFormating( argument[ targetDate ] ) );
    }

    query.delete( 'page' );
    updateURL( query );
}

/**
 * When `pages__page` is clicked, do the following things:
 *     1. set new page number if necessary
 *     2. Update URL.
 *
 * @param {MouseEvent} event
 */

export function pageOnClick ( event ) {
    const page = /pages__page--([1-9][0-9]*)/.exec( event.target.id )[ 1 ];
    const query = new URLSearchParams( window.location.search );

    // If page is same, do nothing
    if ( query.get( 'page' ) === page )
        return;

    query.set( 'page', page );

    updateURL( query );
}

/**
 * Construct filter's event
 *     * `tags__tag--*`:                  on click event `tagOnClick`
 *     * `tags__tag--{ defaultTagName }`: on click event `defaultTagOnClick`
 *     * `time__date`:                    on cheange event `dateOnChange`
 *
 * @param {string} defaultTagName
 */

export function filterEvent ( defaultTagName = 'all' ) {
    const filterTags = document.getElementById( 'filter__tags' );
    Array.from( filterTags.getElementsByClassName( 'tags__tag' ) ).forEach( ( tag ) => {
        tag.addEventListener( 'click', tagOnClick );
    } );

    const defaultTag = filterTags.querySelector( `#tags__tag--${ defaultTagName }` );
    defaultTag.removeEventListener( 'click', tagOnClick );
    defaultTag.addEventListener( 'click', defaultTagOnClick );

    Array.from( document.getElementById( 'filter__time' ).getElementsByClassName( 'time__date' ) ).forEach( ( dateInput ) => {
        dateInput.addEventListener( 'change', dateOnChange );
    } );
}
