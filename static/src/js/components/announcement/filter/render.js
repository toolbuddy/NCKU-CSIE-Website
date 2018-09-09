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

    Array.from( document.getElementsByClassName( 'pages__page' ) ).forEach( ( page ) => {
        page.addEventListener( 'click', pageOnClick );
    } );
    Array.from( document.getElementsByClassName( 'pages__control' ) ).forEach( ( control ) => {
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
        currentPage = '1';

    Array.from( document.getElementsByClassName( 'pages__page' ) ).forEach( ( page, index, array ) => {
        page.classList.remove( 'pages__page--active' );
        page.removeAttribute( 'style', 'display: none;' );

        if ( page.innerHTML === currentPage )
            page.classList.add( 'pages__page--active' );
        if ( page.innerHTML < currentPage - 2 || page.innerHTML > Number.parseInt( currentPage, 10 ) + 2 )
            page.setAttribute( 'style', 'display: none;' );

        const extraItem1 = document.createElement( 'button' );
        extraItem1.className = 'pages__extra';
        extraItem1.id = 'pages__extra1';
        extraItem1.innerHTML = '...';
        const extraItem2 = document.createElement( 'button' );
        extraItem2.className = 'pages__extra';
        extraItem2.id = 'pages__extra2';
        extraItem2.innerHTML = '...';
        if ( index === 0 )
            page.removeAttribute( 'style', 'display: none;' );

        if ( index === array.length - 1 ) {
            page.removeAttribute( 'style', 'display: none;' );
            if ( document.getElementById( 'pages__extra2' ) )
                document.getElementById( 'pages__extra2' ).parentNode.removeChild( document.getElementById( 'pages__extra2' ) );
            if ( document.getElementById( 'pages__extra1' ) )
                document.getElementById( 'pages__extra1' ).parentNode.removeChild( document.getElementById( 'pages__extra1' ) );
            if ( Array.from( document.getElementsByClassName( 'pages__page' ) )[ index - 1 ].hasAttribute( 'style' ) )
                pages.insertBefore( extraItem2, pages.childNodes[ index + 1 ] );
            if ( Array.from( document.getElementsByClassName( 'pages__page' ) )[ 1 ].hasAttribute( 'style' ) )
                pages.insertBefore( extraItem1, pages.childNodes[ 2 ] );
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
