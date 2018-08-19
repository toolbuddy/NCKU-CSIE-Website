import briefing from 'static/src/pug/components/announcement/briefing.pug';
import page from 'static/src/pug/components/announcement/page.pug';
import {
    pageOnClick,
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
    pages.innerHTML = '';
    const currentPage = new URLSearchParams( window.location.search ).get( 'page' );

    pages.innerHTML += page( {
        totalPages,
        currentPage,
    } );

    if ( !currentPage )
        document.getElementById( 'pages__page--1' ).classList.add( 'pages__page--active' );
    else
        document.getElementById( `pages__page--${ currentPage }` ).classList.add( 'pages__page--active' );

    Array.from( document.getElementsByClassName( 'pages__page' ) ).forEach( ( page ) => {
        page.addEventListener( 'click', pageOnClick );
    } );
}

export function renderPagesError () {
    pages.innerHTML = '';
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
