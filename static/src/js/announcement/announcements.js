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

function dateFormating ( date ) {
    return date.toISOString().substring( 0, date.toISOString().indexOf( 'T' ) );
}

function updateURL ( queryString ) {
    if ( history.pushState ) {
        const newUrl = `${ window.location.protocol }//${ window.location.host }${ window.location.pathname }?${ queryString }`;
        window.history.pushState( { path: newUrl, }, '', newUrl );
    }
}

function getPageNumber ( { tags = getTags(), startTime = getStartTime(), endTime = getEndTime(), } = { } ) {
    /* eslint no-console: 'off' */
    console.log('get page number enter');
    // Need injection protection
    const queryString = new URLSearchParams();

    // Append tags
    tags.forEach( tag => queryString.append( 'tags', tag ) );
    if ( getMainTag() )
        queryString.append( 'tags', getMainTag() );

    // Append time, which format to use?
    queryString.append( 'startTime', dateFormating( startTime ) );
    queryString.append( 'endTime', dateFormating( endTime ) );

    const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/pagenumber?${ queryString.toString() }`;
    let pageNumber = 0;
    fetch( reqURL ).then( res => res.json() ).then( ( data ) => {
        pageNumber = data.pageNumber;
    } );
    /* eslint no-console: 'off' */
    console.log( pageNumber );
}

function getAnnouncementByFilters ( { tags = getTags(), startTime = getStartTime(), endTime = getEndTime(), page = getPage(), language = 'zh-TW', } = { } ) {
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
    let announcements;
    fetch( reqURL ).then( res => res.json() ).then( ( data ) => {
        announcements = data;
    } );
    /* eslint no-console: 'off' */
    console.log( announcements );
}

/* eslint no-unused-vars: 'off' */
function tagButtonOnClick ( event ) {
    // Should use id
    const tagName = event.target.innerHTML;
    const queryString = new URLSearchParams( window.location.search );
    let usedTags = queryString.getAll( 'tags' );
    if ( tagName === '全部' || tagName === 'All' ) {
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
    console.log('get page number');
    getPageNumber( { tags: usedTags, } );
    getAnnouncementByFilters( { tags: usedTags, } );
}

/* eslint no-unused-vars: 'off' */
function pageButtonOnClick ( event ) {
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

/* eslint no-unused-vars: 'off' */
function dateOnChange ( event ) {
    const queryString = new URLSearchParams( window.location.search );

    // Element.value will get 2018-07-18 format
    const newTime = document.getElementById( event.target.id ).value;
    if ( queryString.get( event.target.id ) === newTime ) {
        // If already at this day
        return;
    }

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

getPageNumber();
getAnnouncementByFilters();
