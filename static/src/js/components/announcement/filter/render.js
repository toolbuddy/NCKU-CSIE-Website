import briefing from 'static/src/pug/components/announcement/briefing.pug';
import { pageOnClick, } from 'static/src/js/components/announcement/filter/event.js';
import { timeFormating, }  from 'static/src/js/components/announcement/filter/format.js';

// Construct filter's UI
export function renderFilter ( defaultTagName = null ) {
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
     *     * there is no tags in URL.
     *     * there is no valid tags in URL.
     */

    defaultTag.classList.add( 'tags__tag--active' );

    const query = new URLSearchParams( window.location.search );
    const currentTags = query.getAll( 'tags' );
    if ( currentTags.length ) {
        let validTagCount = 0;
        currentTags.forEach( ( tag ) => {
            const tagObj = document.getElementById( `tags__tag--${ tag }` );
            if ( tagObj ) {
                tagObj.classList.add( 'tags__tag--active' );
                validTagCount += 1;
            }
        } );
        if ( validTagCount )
            defaultTag.classList.remove( 'tags__tag--active' );
    }
    if ( defaultTagName === 'all' ) {
        filterTags.childNodes.forEach( ( tag ) => {
            tag.onclick = () => {
                if ( tag.classList.contains( 'tags__tag--active' ) )
                    tag.classList.remove( 'tags__tag--active' );

                else if ( tag.classList.contains( `tags__tag--${ defaultTagName }` ) ) {
                    tag.classList.add( 'tags__tag--active' );
                    filterTags.childNodes.forEach( ( tag ) => {
                        if ( !tag.classList.contains( `tags__tag--${ defaultTagName }` ) )
                            tag.classList.remove( 'tags__tag--active' );
                    } );
                }
                else {
                    defaultTag.classList.remove( 'tags__tag--active' );
                    tag.classList.add( 'tags__tag--active' );
                }
            };
        } );
    }
    else {
        filterTags.childNodes.forEach( ( tag ) => {
            tag.onclick = () => {
                if ( !tag.classList.contains( `tags__tag--${ defaultTagName }` ) ) {
                    if ( tag.classList.contains( 'tags__tag--active' ) )
                        tag.classList.remove( 'tags__tag--active' );
                    else
                        tag.classList.add( 'tags__tag--active' );
                }
                else {
                    filterTags.forEach( ( tag ) => {
                        if ( !tag.classList.contains( `tags__tag--${ defaultTagName }` ) )
                            tag.classList.remove( 'tags__tag--active' );
                    } );
                }
            };
        } );
    }
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
