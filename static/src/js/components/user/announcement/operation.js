const apiURL = `${ window.location.protocol }//${ window.location.host }/api/announcement`;

// Here we want to get all language versions, but old api only supply one language query
export async function getAnnouncement ( announcement ) {
    if ( announcement.id === 0 )
        return;
    const data = await fetch( `${ apiURL }/${ announcement.id }` ).then( res => res.json() );
    announcement.setZhTW( { title: data.title, content: data.content, } );
    announcement.isPinned = data.isPinned;
    announcement.files = data.files;
    data.tags.forEach( ( tag ) => {
        announcement.appendTag( tag.name );
    } );
}

export async function updateAnnouncement ( id, data ) {
    fetch( `${ apiURL }/${ id }`, {
        method:  'POST',
        body:    JSON.stringify( data ),
        headers: new Headers( {
            'Content-Type': 'application/json',
        } ),
    } )
    .then( res => res.json() );
}
