import { defaultTagButtonOnClick, tagButtonOnClick, dateOnChange, } from 'jsComponent/announcement/event-listener.js';

// Event handlers
export function buildEventListener ( getAllAnnouncements, getAnnouncementsByTags, getAllPageNumber, getPageNumberByTags, defaultTag = 'all' ) {
    Array.from( document.getElementsByClassName( 'tags__tag' ) ).forEach( ( tagButton ) => {
        if ( tagButton.id === `tags__tag--${ defaultTag }` )
            return;
        tagButton.addEventListener( 'click', tagButtonOnClick( getAllAnnouncements, getAllPageNumber, getAnnouncementsByTags, getPageNumberByTags ) );
    } );
    document.getElementById( `tags__tag--${ defaultTag }` )
    .addEventListener( 'click', defaultTagButtonOnClick( getAllAnnouncements, getAllPageNumber ) );
    Array.from( document.getElementsByClassName( 'time__date' ) ).forEach( ( dateInput ) => {
        dateInput.addEventListener( 'change', dateOnChange( getAllAnnouncements, getAllPageNumber, getAnnouncementsByTags, getPageNumberByTags ) );
    } );
}

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
