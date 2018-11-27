/**
 * CSS of the file
 */
/* eslint no-unused-vars: 'off' */
import style from 'static/dist/css/announcement/announcement.min.css';
import header from 'static/src/js/components/common/header/index.js';
import announcement from 'static/src/pug/components/announcement/announcement.pug';
import { timeFormating, }  from 'static/src/js/components/announcement/filter/format.js';

let id = /announcement\/(\d+)/.exec( window.location.pathname );

if ( id === null )
    id = 1;
else
    id = id[ 1 ];

const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/${ id }${ location.search }`;
( async () => {
    const data = await fetch( reqURL ).then( res => res.json() );
    const content = document.getElementById( 'content' );
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
