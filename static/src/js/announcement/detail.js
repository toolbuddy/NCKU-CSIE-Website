import header from 'static/src/js/components/common/header/index.js';
import announcement from 'static/src/pug/components/announcement/announcement.pug';
import TagUtils from 'models/announcement/utils/tag.js';
import DefaultTagFilter from 'static/src/js/components/announcement/default-tag.js';

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
            title:       data.title,
            tags:        data.tags.map( tag => ( {
                id:   tag,
                name: TagUtils.getTagById( {
                    tagId:      Number( tag ),
                    languageId: Number( new URLSearchParams( window.location.search ).get( 'languageId' ) ),
                } ),
                color:  TagUtils.getTagColorById(Number(tag)),
            }
            ) ),
            author:      data.author,
            time:        DefaultTagFilter.formatUpdateTime( new Date( data.updateTime ) ),
            content:     data.content,
            attachments: data.files.map( file => file.name ),
        }
    );
} )();
