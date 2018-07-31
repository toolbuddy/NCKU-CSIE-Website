import briefing from 'pugComponent/announcement/briefing.pug';
import { pageButtonOnClick, } from 'jsComponent/announcement/filter/event.js';
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
export function filterTags ( defaultTag = null ) {
    document.getElementById( 'filter__tags' ).childNodes.forEach( ( tag ) => {
        tag.onclick = () => {
            if ( tag.classList.contains( 'tags__tag--active' ) )
                tag.classList.remove( 'tags__tag--active' );
            else
                tag.classList.add( 'tags__tag--active' );
        };
    } );

    if ( defaultTag )
        document.getElementById( `tags__tag--${ defaultTag }` ).classList.add( 'tags__tag--active' );
}

export function renderPageButtons ( getAllAnnouncements, getAnnouncementsByTags, totalPages = 1 ) {
    const pageButtonsContainer = document.getElementById( 'pageButtons' );
    pageButtonsContainer.innerHTML = '';
    for ( let i = 1; i <= totalPages; ++i )
        pageButtonsContainer.innerHTML += `<button type="button" class="pageButton">${ i }</button>`;
    Array.from( document.getElementsByClassName( 'pageButton' ) ).forEach( ( pageButton ) => {
        pageButton.addEventListener( 'click', pageButtonOnClick( getAllAnnouncements, getAnnouncementsByTags ) );
    } );
}

export function renderBriefings ( pinnedAnnouncements, announcements ) {
    const announcementBriefingTop = document.getElementById( 'announcement__brefings--top' );
    const announcementBriefing = document.getElementById( 'announcement__brefings' );

    announcementBriefingTop.innerHTML = '';
    announcementBriefing.innerHTML = '';
    pinnedAnnouncements.forEach( ( announcement ) => {
        announcementBriefingTop.innerHTML += briefing( {
            id:      announcement.id,
            title:   announcement.title,
            time:    timeFormating( announcement.updateTime ),
            content: announcement.content,
            tags:    announcement.tags.map( tag => tag.name ),
        } );
    } );
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
