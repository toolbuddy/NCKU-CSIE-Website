import { dateFormating, }  from 'jsUtil/format.js';

function updateURL ( queryString ) {
    if ( history.pushState ) {
        const newUrl = `${ window.location.protocol }//${ window.location.host }${ window.location.pathname }?${ queryString }`;
        window.history.pushState( { path: newUrl, }, '', newUrl );
    }
}

function defaultTagButtonOnClick ( getAllAnnouncements, getAllPageNumber ) {
    return function () {
        // Should use id
        const queryString = new URLSearchParams( window.location.search );
        queryString.delete( 'tags' );
        queryString.delete( 'page' );
        updateURL( queryString );
        getAllPageNumber();
        getAllAnnouncements();
    };
}

function tagButtonOnClick ( getAllAnnouncements, getAllPageNumber, getAnnouncementsByTags, getPageNumberByTags ) {
    return function ( event ) {
        // Should use id
        const tagName = /tags__tag--([a-zA-Z0-9]+)/.exec( event.target.id )[ 1 ];
        const queryString = new URLSearchParams( window.location.search );
        const usedTags = queryString.getAll( 'tags' );
        if ( usedTags.indexOf( tagName ) === -1 ) {
            // If this filter hasn't been used, need to append it to query string
            queryString.append( 'tags', tagName );
            usedTags.push( tagName );
        }
        else {
            // If this filter has been used, need to remove it from query string
            usedTags.splice( usedTags.indexOf( tagName ), 1 );
            queryString.delete( 'tags' );
            usedTags.forEach( tag => queryString.append( 'tags', tag ) );
        }

        queryString.delete( 'page' );
        updateURL( queryString );
        if ( queryString.getAll( 'tags' ).length === 0 ) {
            getAllPageNumber();
            getAllAnnouncements();
        }
        else {
            getPageNumberByTags( { tags: usedTags, } );
            getAnnouncementsByTags( { tags: usedTags, } );
        }
    };
}

function dateOnChange ( getAllAnnouncements, getAllPageNumber, getAnnouncementsByTags, getPageNumberByTags ) {
    return function ( event ) {
        const queryString = new URLSearchParams( window.location.search );

        // Element.value will get 2018-07-18 format
        const newTime = document.getElementById( event.target.id ).value;
        if ( queryString.get( event.target.id ) === newTime ) {
            // If already at this day
            return;
        }
        else if ( newTime === '' ) {
            queryString.delete( event.target.id );
            queryString.delete( 'page' );
            updateURL( queryString );
            if ( queryString.getAll( 'tags' ).length === 0 ) {
                getAllPageNumber();
                getAllAnnouncements();
            }
            else {
                getPageNumberByTags();
                getAnnouncementsByTags();
            }
        }
        else {
            queryString.set( event.target.id, dateFormating( new Date( newTime ) ) );
            queryString.delete( 'page' );

            updateURL( queryString );
            if ( event.target.id === 'startTime' ) {
                if ( queryString.getAll( 'tags' ).length === 0 ) {
                    getAllPageNumber( { startTime: new Date( newTime ), } );
                    getAllAnnouncements( { startTime: new Date( newTime ), } );
                }
                else {
                    getPageNumberByTags( { startTime: new Date( newTime ), } );
                    getAnnouncementsByTags( { startTime: new Date( newTime ), } );
                }
            }
            if ( event.target.id === 'endTime' ) {
                if ( queryString.getAll( 'tags' ).length === 0 ) {
                    getAllPageNumber( { endTime: new Date( newTime ), } );
                    getAllAnnouncements( { endTime: new Date( newTime ), } );
                }
                else {
                    getPageNumberByTags( { endTime: new Date( newTime ), } );
                    getAnnouncementsByTags( { endTime: new Date( newTime ), } );
                }
            }
        }
    };
}

export function pageButtonOnClick ( getAllAnnouncements, getAnnouncementsByTags ) {
    return function ( event ) {
        const page = event.target.innerHTML;
        const queryString = new URLSearchParams( window.location.search );
        if ( queryString.get( 'page' ) === page ) {
            // If already at this page
            return;
        }

        queryString.set( 'page', page );

        updateURL( queryString );
        if ( queryString.getAll( 'tags' ).length === 0 )
            getAllAnnouncements( { page, } );
        else
            getAnnouncementsByTags( { page, } );
    };
}

export function registEvent ( getAllAnnouncements, getAnnouncementsByTags, getAllPageNumber, getPageNumberByTags, defaultTag = 'all' ) {
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
