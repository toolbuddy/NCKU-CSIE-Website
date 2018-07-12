function getMainTag () {
    const mainTag = location.pathname.split( '/' ).pop();
    if ( mainTag === 'all' )
        return false;
    return mainTag;
}

function tagButtonOnClick ( tagName ) {
    const queryString = new URLSearchParams( window.location.search );
    let usedTags = queryString.getAll( 'tags' );
    if ( tagName === '全部' ) {
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
    getAnnouncementByTags( usedTags );
}

function announcementButtonOnClick ( id ) {
    // ?
    getAnnouncementById( id );
}

function getAnnouncementByTags ( tags = [] ) {
    // Need injection protection
    const queryString = new URLSearchParams();
    tags.forEach( tag => queryString.append( 'tags', tag ) );
    if ( getMainTag() )
        queryString.append( 'tags', getMainTag() );

    const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/tags?${ queryString.toString() }`;
    fetch( reqURL ).then( res => res.json() ).then( data => console.log( data ) );
}

function getAnnouncementById ( id ) {
    // Url = ?
    const queryString = new URLSearchParams();
    queryString.append( 'id', id );
    const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/id?${ queryString.toString() }`;
    fetch( reqURL ).then( res => res.json() ).then( data => console.log( data ) );
}

function updateURL ( queryString ) {
    if ( history.pushState ) {
        const newUrl = `${ window.location.protocol }//${ window.location.host }${ window.location.pathname }?${ queryString }`;
        window.history.pushState( { path: newUrl, }, '', newUrl );
    }
}

getAnnouncementByTags();
