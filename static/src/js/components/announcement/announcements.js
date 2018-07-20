import briefing from 'pugComponent/announcement/briefing.pug';

function getMainTag () {
    const mainTag = location.pathname.split( '/' ).pop();
    if ( mainTag === 'all' )
        return false;
    return mainTag;
}

function getTags () {
    const tags = new URLSearchParams( window.location.search ).getAll( 'tags' );
    if ( tags === null )
        return [];
    return tags;
}

function getStartTime () {
    const startTime = new URLSearchParams( window.location.search ).get( 'startTime' );
    if ( startTime === null )
        return new Date( '2018/7/1' );
    return new Date( startTime );
}

function getEndTime () {
    const endTime = new URLSearchParams( window.location.search ).get( 'endTime' );
    if ( endTime === null )
        return new Date();
    return new Date( endTime );
}

function getPage () {
    const page = new URLSearchParams( window.location.search ).get( 'page' );
    if ( page === null )
        return 1;
    return page;
}

// This format for database
function dateFormating ( date ) {
    return date.toISOString().substring( 0, date.toISOString().indexOf( 'T' ) );
}

// This format for style
function timeFormating ( time ) {
    return `${ time.substring( 0, time.indexOf( 'T' ) ) } | ${ time.substring( time.indexOf( 'T' ) + 1, time.indexOf( '.' ) ) }`;
}

function updateURL ( queryString ) {
    if ( history.pushState ) {
        const newUrl = `${ window.location.protocol }//${ window.location.host }${ window.location.pathname }?${ queryString }`;
        window.history.pushState( { path: newUrl, }, '', newUrl );
    }
}

async function getPageNumber ( { tags = getTags(), startTime = getStartTime(), endTime = getEndTime(), } = { } ) {
    // Need injection protection
    const queryString = new URLSearchParams();

    // Append tags
    tags.forEach( tag => queryString.append( 'tags', tag ) );
    if ( getMainTag() )
        queryString.append( 'tags', getMainTag() );

    // Append time
    queryString.append( 'startTime', dateFormating( startTime ) );
    queryString.append( 'endTime', dateFormating( endTime ) );

    const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/pages?${ queryString.toString() }`;
    const pageNumber = await fetch( reqURL ).then( res => res.json() ).then( data => data.pageNumber );
    /* eslint no-console: 'off' */
    console.log( pageNumber );
}

async function getAnnouncementByFilters ( {
    tags = getTags(),
    startTime = getStartTime(),
    endTime = getEndTime(),
    page = getPage(),
    language = 'zh-TW',
} = { } ) {
    // Need injection protection
    const queryString = new URLSearchParams();

    // Append tags
    tags.forEach( tag => queryString.append( 'tags', tag ) );
    if ( getMainTag() )
        queryString.append( 'tags', getMainTag() );

    // Append time
    queryString.append( 'startTime', dateFormating( startTime ) );
    queryString.append( 'endTime', dateFormating( endTime ) );

    // Append page
    queryString.append( 'page', page );

    // Append language
    queryString.append( 'language', language );

    const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/filter?${ queryString.toString() }`;
    const announcements = await fetch( reqURL ).then( res => res.json() );
    const announcementBriefingTop = document.getElementById( 'announcement__brefings--top' );
    const announcementBriefing = document.getElementById( 'announcement__brefings' );
    announcementBriefingTop.innerHTML = '';
    announcementBriefing.innerHTML = '';
    announcements.forEach( ( announcement ) => {
        if ( announcement.isPinned ) {
            announcementBriefingTop.innerHTML += briefing( {
                id:      announcement.id,
                title:   announcement.title,
                time:    timeFormating( announcement.updateTime ),
                content: announcement.content,
                tags:    announcement.tags.map( tag => tag.name ),
            } );
        }
        announcementBriefing.innerHTML += briefing( {
            id:      announcement.id,
            title:   announcement.title,
            time:    timeFormating( announcement.updateTime ),
            content: announcement.content,
            tags:    announcement.tags.map( tag => tag.name ),
        } );
    } );
}

export function tagButtonOnClick ( event ) {
    // Should use id
    const tagName = /tags__tag--([a-zA-Z0-9]+)/.exec( event.target.id )[ 1 ];
    const queryString = new URLSearchParams( window.location.search );
    let usedTags = queryString.getAll( 'tags' );
    if ( tagName === '全部' || tagName === 'all' ) {
        // If clicked all, which means no filter been used, need to remove all filter
        usedTags = [];
        queryString.delete( 'tags' );
    }
    else if ( usedTags.indexOf( tagName ) === -1 ) {
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
    updateURL( queryString );
    getPageNumber( { tags: usedTags, } );
    getAnnouncementByFilters( { tags: usedTags, } );
}

export function pageButtonOnClick ( event ) {
    const page = event.target.innerHTML;
    const queryString = new URLSearchParams( window.location.search );
    if ( queryString.get( 'page' ) === page ) {
        // If already at this page
        return;
    }

    queryString.set( 'page', page );

    updateURL( queryString );
    getAnnouncementByFilters( { page, } );
}

export function dateOnChange ( event ) {
    const queryString = new URLSearchParams( window.location.search );

    // Element.value will get 2018-07-18 format
    const newTime = document.getElementById( event.target.id ).value;
    if ( queryString.get( event.target.id ) === newTime ) {
        // If already at this day
        return;
    }
    else if ( newTime === '' ) {
        queryString.delete( event.target.id );
        updateURL( queryString );
        getPageNumber();
        getAnnouncementByFilters();
    }
    else {
        queryString.set( event.target.id, dateFormating( new Date( newTime ) ) );

        updateURL( queryString );
        if ( event.target.id === 'startTime' ) {
            getPageNumber( { startTime: new Date( newTime ), } );
            getAnnouncementByFilters( { startTime: new Date( newTime ), } );
        }
        if ( event.target.id === 'endTime' ) {
            getPageNumber( { endTime: new Date( newTime ), } );
            getAnnouncementByFilters( { endTime: new Date( newTime ), } );
        }
    }
}

export function getAnnouncements () {
    getPageNumber();
    getAnnouncementByFilters();
}
