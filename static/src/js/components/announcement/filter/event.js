import { dateFormating, }  from 'static/src/js/components/announcement/filter/format.js';
import {
    renderFilter,
    renderLoading,
} from 'static/src/js/components/announcement/filter/render.js';

let filterOnChange = null;
let pageOnChange = null;

export function setURLOnChange (
        defaultTagName,
        getAllPinnedAnnouncements,
        getAllAnnouncements,
        getAllPageNumber,
        getPinnedAnnouncementsByTags,
        getAnnouncementsByTags,
        getPageNumberByTags,
        filterObj,
) {
    pageOnChange = () => {
        if ( !new URLSearchParams( window.location.search ).getAll( 'tags' ).length )
            getAllAnnouncements();

        else
            getAnnouncementsByTags();
    };
    filterOnChange = () => {
        renderLoading();
        renderFilter( defaultTagName, filterObj );

        if ( !new URLSearchParams( window.location.search ).getAll( 'tags' ).length ) {
            new Promise( ( res, rej ) => {
                try {
                    getAllPageNumber();
                    res();
                }
                catch ( err ) {
                    rej();
                }
            } )
            .then( () => {
                getAllPinnedAnnouncements();
            } )
            .then( () => {
                getAllAnnouncements();
            } );
        }

        // If query with selected tags, use default tag(s) and selected tags to count page number and get announcements.
        else {
            new Promise( ( res, rej ) => {
                try {
                    getPageNumberByTags();
                    res();
                }
                catch ( err ) {
                    rej();
                }
            } )
            .then( () => {
                getPinnedAnnouncementsByTags();
            } )
            .then( () => {
                getAnnouncementsByTags();
            } );
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
    const targetTagNum = event.target.id.split( '--' ).pop();
    const query = new URLSearchParams( window.location.search );
    const currentTags = query.getAll( 'tags' );

    // If `tags__tag--${ targetTag }` has not been selected,
    // append current tags with `tags__tag--${ targetTag }` to make a new query.
    if ( currentTags.indexOf( targetTagNum ) === -1 )
        query.append( 'tags', targetTagNum );

    // If `tags__tag--${ targetTag }` has not been selected,
    // remove all tags from query and recreate without `tags__tag--${ targetTag }`.
    else {
        query.delete( 'tags' );
        currentTags.filter( tag => tag !== targetTagNum )
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
    const query = new URLSearchParams( window.location.search );
    const page = event.target.innerHTML;

    // If page is same, do nothing
    if ( query.get( 'page' ) === page )
        return;
    query.set( 'page', page );
    updateURL( query );
}

/**
 * When `pages__control` is clicked, do the following things:
 *     1. set new page number and if necessary
 *     2. Update URL if necessary.
 *
 * @param {MouseEvent} event
 */

export function controlOnClick ( event ) {
    const query = new URLSearchParams( window.location.search );

    /* If URL has no page, setting the current page to 1   */

    const currentPage = Number( query.get( 'page' ) ) ? Number( query.get( 'page' ) ) : 1;
    let page = event.target.innerHTML;

    /* If the `pages__control--forward` button is clicked, changing the `page` to the previous page(= page - 1). */

    if ( event.target.classList.contains( 'pages__control--forward' ) )
        page = query.get( 'page' ) - 1;

    /* If the `pages__control--backward` button is clicked, changing the `page` to the next page(= page + 1). */

    else if ( event.target.classList.contains( 'pages__control--backward' ) )
        page = currentPage + 1;

    /* If currnet page is the first page or the last page, doing nothing */

    else
        return;

    query.set( 'page', page );
    updateURL( query );
}

/**
 * Construct filter's event
 * `tags__tag--*`:                  on click event `tagOnClick`
 * `tags__tag--{ defaultTagName }`: on click event `defaultTagOnClick`
 * `time__date`:                    on cheange event `dateOnChange`
 * @param {string} defaultTagName
 */

export function filterEvent ( defaultTagName = 'all' ) {
    let toggle = true;
    const buttonIcon = document.getElementById( 'button__icon' );
    const filterTime = document.getElementById( 'filter__time' );
    const filterTags = document.getElementById( 'filter__tags' );
    const defaultTag = filterTags.querySelector( `#tags__tag--${ defaultTagName }` );

    /**
     * When `filter__button` is clicked, `filter__tags` and `filter__time` will be in either state:
     *     * hidden, add class `filter__tags--hidden` and `filter__time--hidden` on `filter__tags` and `filter__time` respectively.
     *     * show, remove class `filter__tags--hidden` and `filter__time--hidden` on `filter__tags` and `filter__time` respectively.
     */

    document.getElementById( 'filter__button' ).addEventListener( 'click', () => {
        if ( toggle ) {
            filterTags.classList.remove( 'filter__tags--hidden' );
            filterTime.classList.remove( 'filter__time--hidden' );
            buttonIcon.classList.add( 'button__icon--active' );
        }
        else {
            filterTags.classList.add( 'filter__tags--hidden' );
            filterTime.classList.add( 'filter__time--hidden' );
            buttonIcon.classList.remove( 'button__icon--active' );
        }
        toggle = !toggle;
    } );

    Array.from( filterTags.getElementsByClassName( 'tags__tag' ) ).forEach( ( tag ) => {
        tag.addEventListener( 'click', tagOnClick );
    } );

    defaultTag.removeEventListener( 'click', tagOnClick );
    defaultTag.addEventListener( 'click', defaultTagOnClick );

    Array.from( document.getElementById( 'filter__time' ).getElementsByClassName( 'time__date' ) ).forEach( ( dateInput ) => {
        dateInput.addEventListener( 'change', dateOnChange );
    } );
}
