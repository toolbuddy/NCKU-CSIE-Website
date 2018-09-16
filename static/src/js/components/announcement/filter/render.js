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

/* Making sure there is no `className` class on the element before adding the `className` class to the classlist.*/

function classAdd ( element, className ) {
    if ( !element.classList.contains( className ) )
        element.classList.add( className );
}

/* Making sure there is `className` class on the element before removing the `className` class from the classlist.*/

function classRemove ( element, className ) {
    if ( element.classList.contains( className ) )
        element.classList.remove( className );
}

export function renderFilter ( defaultTagName = 'all' ) {
    const defaultTag = document.getElementById( `tags__tag--${ defaultTagName }` );
    const currentTags = new URLSearchParams( window.location.search ).getAll( 'tags' );
    let activeTagCount = 0;

    Reflect.ownKeys( allTags ).forEach( ( tag ) => {
        if ( currentTags.indexOf( tag ) !== -1 ) {
            activeTagCount += 1;
            classAdd( allTags[ tag ], 'tags__tag--active' );
        }
        else
            classRemove( allTags[ tag ], 'tags__tag--active' );
    } );

    if ( activeTagCount === 0 || defaultTagName !== 'all' )
        classAdd( defaultTag, 'tags__tag--active' );
    else
        classRemove( defaultTag, 'tags__tag--active' );
}

const pages = document.getElementById( 'pages' );
export function renderPages ( totalPages = 1 ) {
    pages.innerHTML = page( { totalPages, } );

    /* Add eventListener to all the `pages__page` element,when rendering pages. */

    Array.from( pages.getElementsByClassName( 'pages__page' ) ).forEach( ( page ) => {
        page.addEventListener( 'click', pageOnClick );
    } );

    /* Add eventListener to all the `pages__control` element,when rendering pages. */

    Array.from( pages.getElementsByClassName( 'pages__control' ) ).forEach( ( control ) => {
        control.addEventListener( 'click', controlOnClick );
    } );
}

export function renderPagesError () {
    pages.innerHTML = '';
}

export function renderPage () {
    const query = new URLSearchParams( window.location.search );
    const pagesPage = pages.getElementsByClassName( 'pages__page' );
    let currentPage = query.get( 'page' );
    const totalPageNumber = pagesPage.length;
    if ( !Number.parseInt( currentPage, 10 ) )
        currentPage = 1;
    currentPage = Number.parseInt( currentPage, 10 );

    /* If total page number is bigger than 1, doing th followong. */

    if ( totalPageNumber > 1 ) {
        /* If current page is the first page or the last page, adding the `pages__control--hidden` tag. */

        const pagesControlForward = pages.getElementsByClassName( 'pages__control--forward' )[ 0 ];
        const pagesControlBackward = pages.getElementsByClassName( 'pages__control--backward' )[ 0 ];
        if ( currentPage === 1 )
            classAdd( pagesControlForward, 'pages__control--hidden' );
        else
            classRemove( pagesControlForward, 'pages__control--hidden' );
        if ( currentPage === totalPageNumber )
            classAdd( pagesControlBackward, 'pages__control--hidden' );
        else
            classRemove( pagesControlBackward, 'pages__control--hidden' );
    }
    Array.from( pagesPage ).forEach( ( page ) => {
        /* Active the page which is clicked. */

        if ( Number.parseInt( page.innerHTML, 10 ) === currentPage )
            classAdd( page, 'pages__page--active' );

        /* Hidden the page which is |currentPage - page|  > 2. */

        else if ( Number.parseInt( page.innerHTML, 10 ) < currentPage - 2 || Number.parseInt( page.innerHTML, 10 ) > currentPage + 2 ) {
            classAdd( page, 'pages__page--hidden' );
            classRemove( page, 'pages__page--active' );
        }

        /* Let the page show without 'pages__page--active' tag. */

        else {
            classRemove( page, 'pages__page--active' );
            classRemove( page, 'pages__page--hidden' );
        }
    } );


    /* Make the first and the last page show up. */

    if ( pagesPage.length ) {
        classRemove( pagesPage[ 0 ], 'pages__page--hidden' );
        classRemove( pagesPage[ totalPageNumber - 1 ], 'pages__page--hidden' );
    }

    /* If total page larger than 1, determining whether text `...` showing up or not. */

    if ( totalPageNumber > 1 ) {
        const pagesExtraBefore = document.getElementById( 'pages__extra--before' );
        const pagesExtraAfter = document.getElementById( 'pages__extra--after' );

        /* If page number 2 is hidden, making text `...` show up. */
        /* Else hidden the text `...`. */

        if ( pagesPage[ 1 ].classList.contains( 'pages__page--hidden' ) )
            classRemove( pagesExtraBefore, 'pages__extra--hidden' );
        else
            classAdd( pagesExtraBefore, 'pages__extra--hidden' );

        /* If the second-lat page is hidden, making text `...` show up. */
        /* Else hidden the text `...`. */

        if ( pagesPage[ totalPageNumber - 2 ].classList.contains( 'pages__page--hidden' ) )
            classRemove( pagesExtraAfter, 'pages__extra--hidden' );
        else
            classAdd( pagesExtraAfter, 'pages__extra--hidden' );
    }
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
