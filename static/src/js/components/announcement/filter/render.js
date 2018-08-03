import briefing from 'pugComponent/announcement/briefing.pug';
import { pageOnClick, } from 'jsComponent/announcement/filter/event.js';
import { timeFormating, }  from 'jsUtil/format.js';

// Construct filter's UI
( () => {
    let flip = 0;
    const filterButton = document.getElementById( 'filter__button' );
    const buttonIcon = document.getElementById( 'button__icon' );
    const filterTags = document.getElementById( 'filter__tags' );
    const filterTime = document.getElementById( 'filter__time' );
    filterButton.onclick = () => {
        flip = ( flip + 1 ) % 2;
        if ( flip ) {
            filterTags.classList.remove( 'tags--hidden' );
            filterTime.classList.remove( 'time--hidden' );
            buttonIcon.classList.add( 'button__icon--active' );
        }
        else {
            filterTags.classList.add( 'tags--hidden' );
            filterTime.classList.add( 'time--hidden' );
            buttonIcon.classList.remove( 'button__icon--active' );
        }
    };
} )();

// Construct filter tags' UI
export function filterTags ( defaultTagName = null ) {
    document.getElementById( 'filter__tags' ).childNodes.forEach( ( tag ) => {
        tag.onclick = () => {
            if ( tag.classList.contains( 'tags__tag--active' ) )
                tag.classList.remove( 'tags__tag--active' );
            else
                tag.classList.add( 'tags__tag--active' );
        };
    } );

    if ( defaultTagName )
        document.getElementById( `tags__tag--${ defaultTagName }` ).classList.add( 'tags__tag--active' );
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

const announcementBriefingTop = document.getElementById( 'announcement__brefings--top' );

export function renderBriefingsTop ( pinnedAnnouncements ) {
    announcementBriefingTop.innerHTML = '';
    pinnedAnnouncements.forEach( ( announcement ) => {
        announcementBriefingTop.innerHTML += briefing( {
            id:      announcement.id,
            title:   announcement.title,
            time:    timeFormating( announcement.updateTime ),
            content: announcement.content,
            tags:    announcement.tags.map( tag => tag.name ),
        } );
    } );
}

const announcementBriefing = document.getElementById( 'announcement__brefings' );

export function renderBriefings ( announcements ) {
    announcementBriefing.innerHTML = '';
    announcements.forEach( ( announcement ) => {
        announcementBriefing.innerHTML += briefing( {
            id:      announcement.id,
            title:   announcement.title,
            time:    timeFormating( announcement.updateTime ),
            content: announcement.content,
            tags:    announcement.tags.map( tag => tag.name ),
        } );
    } );
}
