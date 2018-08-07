import briefing from 'static/src/pug/components/announcement/briefing.pug';
import { pageOnClick, } from 'static/src/js/components/announcement/filter/event.js';
import { timeFormating, }  from 'static/src/js/components/announcement/filter/format.js';

// Construct filter's UI
export function renderFilter ( defaultTagName = 'all' ) {
    let toggle = true;
    const buttonIcon = document.getElementById( 'button__icon' );
    const filterTags = document.getElementById( 'filter__tags' );
    const filterTime = document.getElementById( 'filter__time' );
    const defaultTag = document.getElementById( `tags__tag--${ defaultTagName }` );

    /**
     * When `filter__button` is clicked, `filter__tags` and `filter__time` will be in either state:
     *     * hidden, add class `tags--hidden` and `time--hidden` on `filter__tags` and `filter__time` respectively.
     *     * show, remove class `tags--hidden` and `time--hidden` on `filter__tags` and `filter__time` respectively.
     */

    document.getElementById( 'filter__button' ).addEventListener( 'click', () => {
        if ( toggle ) {
            // TODO: change `tags--hidden` and `time--hidden` to `filter__tags--hidden` and `filter__time--hidden`
            filterTags.classList.remove( 'tags--hidden' );
            filterTime.classList.remove( 'time--hidden' );
            buttonIcon.classList.add( 'button__icon--active' );
        }
        else {
            filterTags.classList.add( 'tags--hidden' );
            filterTime.classList.add( 'time--hidden' );
            buttonIcon.classList.remove( 'button__icon--active' );
        }
        toggle = !toggle;
    } );

    /**
     * Activate `tags__tag--{ defaultTagName }` if:
     *     * it is in a single default tag filter
     *     * there is no tags in URL.
     *     * there is no valid tags in URL.
     *
     * Tags can be validated through `document.getElementById()` if:
     *     * tag is exist, it will return DOM object
     *     * tag is not exist, it will return `undefined`
     */

    defaultTag.classList.add( 'tags__tag--active' );

    const query = new URLSearchParams( window.location.search );
    const currentTags = query.getAll( 'tags' );
    let validTagCount = 0;
    if ( currentTags.length ) {
        currentTags.forEach( ( tag ) => {
            const tagObj = document.getElementById( `tags__tag--${ tag }` );

            // Tag validation
            if ( tagObj ) {
                tagObj.classList.add( 'tags__tag--active' );
                validTagCount += 1;
            }
        } );
    }
    if ( validTagCount && defaultTagName === 'all' )
        defaultTag.classList.remove( 'tags__tag--active' );

    const tagOnClick = defaultTagName === 'all' ?
        ( event ) => {
            if ( event.target.classList.contains( 'tags__tag--active' ) )
                event.target.classList.remove( 'tags__tag--active' );
            else
                event.target.classList.add( 'tags__tag--active' );

            if ( defaultTag.classList.contains( 'tags__tag--active' ) )
                defaultTag.classList.remove( 'tags__tag--active' );
        } :
        ( event ) => {
            if ( event.target.classList.contains( 'tags__tag--active' ) )
                event.target.classList.remove( 'tags__tag--active' );
            else
                event.target.classList.add( 'tags__tag--active' );
        };

    const defaultTagOnClick = () => {
        filterTags.childNodes.forEach( ( tag ) => {
            if ( tag.classList.contains( 'tags__tag--active' ) )
                tag.classList.remove( 'tags__tag--active' );
        } );

        if ( !defaultTag.classList.contains( 'tags__tag--active' ) )
            defaultTag.classList.add( 'tags__tag--active' );
    };

    filterTags.childNodes.forEach( tag => tag.addEventListener( 'click', tagOnClick ) );
    defaultTag.removeEventListener( 'click', tagOnClick );
    defaultTag.addEventListener( 'click', defaultTagOnClick );
}

const pages = document.getElementById( 'pages' );

export function renderPages ( totalPages = 1 ) {
    pages.innerHTML = '';
    for ( let i = 1; i <= totalPages; ++i )
        pages.innerHTML += `<button class="pages__page" id="pages__page--${ i }">${ i }</button>`;
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
