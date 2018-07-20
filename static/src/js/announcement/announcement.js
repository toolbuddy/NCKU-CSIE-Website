/**
 * CSS of the file
 */
/* eslint no-unused-vars: 'off' */
import style from 'cssComponent/announcement/announcement.min.css';
import announcement from 'pugComponent/announcement/announcement.pug';

let id = /announcement\/(\d+)/.exec( window.location.pathname );

if ( id === null )
    id = 1;
else
    id = id[ 1 ];

function timeFormating ( time ) {
    return `${ time.substring( 0, time.indexOf( 'T' ) ) } | ${ time.substring( time.indexOf( 'T' ) + 1, time.indexOf( '.' ) ) }`;
}

const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/${ id }${ location.search }`;
( async () => {
    const data = await fetch( reqURL ).then( res => res.json() );
    const content = document.getElementById( 'content' );
    console.log( data );
    content.innerHTML = announcement(
        {
            title:       data.title,
            tags:        data.tags.map( tag => tag.name ),
            author:      data.author,
            time:        timeFormating( data.updateTime ),
            content:     data.content,
            attachments: data.files,
        }
    );
} )();
