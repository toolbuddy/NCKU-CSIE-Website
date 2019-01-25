import header from 'static/src/js/components/common/header/index.js';
import announcement from 'static/src/pug/components/announcement/announcement.pug';
import { timeFormating, }  from 'static/src/js/components/announcement/filter/format.js';

header( document.getElementById( 'header' ) );

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
            title:       data.announcementI18n[0].title,
            tags:        data.tag.map( tag => tag.typeId ),
            author:      data.author,
            time:        timeFormating( data.updateTime ),
            content:     data.announcementI18n[0].content,
            attachments: data.file.map(file => file.fileI18n[0].name),
        }
    );
} )();
