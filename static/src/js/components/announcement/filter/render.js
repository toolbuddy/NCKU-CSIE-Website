import briefing from 'static/src/pug/components/announcement/briefing.pug';
import page from 'static/src/pug/components/announcement/page.pug';
import {
    pageOnClick,
    controlOnClick,
} from 'static/src/js/components/announcement/filter/event.js';
import { timeFormating, }  from 'static/src/js/components/announcement/filter/format.js';

/**
 * Activate `tags__tag--{ defaultTagName }` if:
 *     * it is in a single default tag filter, which means `defaultTagName` is not equals to `all`.
 *     * there is no activated tags in filter.
 *
 * Tags can be validated through `allTags`, consisted of existing tag's DOM obj
 */

const allTags = {};
document.getElementById( 'filter__tags' ).childNodes.forEach( ( tag ) => {
    allTags[ /tags__tag--([a-zA-Z0-9]+)/.exec( tag.id )[ 1 ] ] = tag;
} );

export function renderFilter ( defaultTagName = 'all' ) {
    const defaultTag = document.getElementById( `tags__tag--${ defaultTagName }` );
    const currentTags = new URLSearchParams( window.location.search ).getAll( 'tags' );
    let activeTagCount = 0;

    Reflect.ownKeys( allTags ).forEach( ( tag ) => {
        if ( currentTags.indexOf( tag ) !== -1 ) {
            activeTagCount += 1;
            if ( !allTags[ tag ].classList.contains( 'tags__tag--active' ) )
                allTags[ tag ].classList.add( 'tags__tag--active' );
        }
        else if ( allTags[ tag ].classList.contains( 'tags__tag--active' ) )
            allTags[ tag ].classList.remove( 'tags__tag--active' );
    } );

    if ( activeTagCount === 0 || defaultTagName !== 'all' )
        defaultTag.classList.add( 'tags__tag--active' );
    else
        defaultTag.classList.remove( 'tags__tag--active' );
}

const pages = document.getElementById( 'pages' );
export function renderPages ( totalPages = 1 ) {
    pages.innerHTML = page( { totalPages, } );

    Array.from( document.getElementById( 'pages' ).getElementsByClassName( 'pages__page' ) ).forEach( ( page ) => {
        page.addEventListener( 'click', pageOnClick );
    } );
    Array.from( document.getElementById( 'pages' ).getElementsByClassName( 'pages__control' ) ).forEach( ( control ) => {
        control.addEventListener( 'click', controlOnClick );
    } );
}

export function renderPagesError () {
    pages.innerHTML = '';
}

export function renderPage () {
    const query = new URLSearchParams( window.location.search );
    let currentPage = query.get( 'page' );
    if ( !currentPage )
        currentPage = 1;
    currentPage = Number.parseInt( currentPage, 10 );

    Array.from( document.getElementById( 'pages' ).getElementsByClassName( 'pages__page' ) ).forEach( ( page, index, array ) => {
        /* Active the page clicked */

        if ( Number.parseInt( page.innerHTML, 10 ) === currentPage )
            page.classList.add( 'pages__page--active' );

        /* Hidden the page which is |currentPage - page|  > 2  */

        else if ( Number.parseInt( page.innerHTML, 10 ) < currentPage - 2 || Number.parseInt( page.innerHTML, 10 ) > currentPage + 2 ) {
            page.classList.add( 'pages__page--hidden' );
            page.classList.remove( 'pages__page--active' );
        }

        /* Let the page show without 'pages__page--active' tag */

        else {
            page.classList.remove( 'pages__page--active' );
            page.classList.remove( 'pages__page--hidden' );
        }

        /* Let the first and the last page show up */

        if ( index === 0 || index === array.length - 1 )
            page.classList.remove( 'pages__page--hidden' );

        /* If total page larger than 1, determining whether text `...` showing up or not. */

        if ( index === array.length - 1 && array.length > 1 ) {
            const pagesExtraBefore = document.getElementById( 'pages__extra--before' );
            const pagesExtraAfter = document.getElementById( 'pages__extra--after' );
            if ( array[ 1 ].classList.contains( 'pages__page--hidden' ) )
                pagesExtraBefore.classList.remove( 'pages__extra--hidden' );
            else
                pagesExtraBefore.classList.add( 'pages__extra--hidden' );

            if ( array[ index - 1 ].classList.contains( 'pages__page--hidden' ) )
                pagesExtraAfter.classList.remove( 'pages__extra--hidden' );
            else
                pagesExtraAfter.classList.add( 'pages__extra--hidden' );
        }
    } );
}

export function renderBriefings ( container, announcements ) {
    container.innerHTML = '';
    announcements.forEach( ( announcement ) => {
        container.innerHTML += briefing( {
            id:      announcement.id,
            title:   announcement.title,
            time:    timeFormating( announcement.updateTime ),
            content: announcement.content,
            tags:    announcement.tags.map( tag => tag.name ),
        } );
    } );
}

export function renderBriefingsError ( container, errorMessage ) {
    container.innerHTML = errorMessage;
}
