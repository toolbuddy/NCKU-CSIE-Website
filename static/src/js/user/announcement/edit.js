/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import style from 'static/dist/css/user/index.min.css';
import header from 'static/src/js/components/common/header/index.js';
import { getAnnouncement, } from 'static/src/js/components/user/announcement/operation.js';
import { Announcement, } from 'static/src/js/components/user/announcement/request.js';
import { fillData, } from 'static/src/js/components/user/announcement/render.js';

let id = /edit\/(\d+)/.exec( window.location.pathname );

if ( id === null )
    id = 0;
else
    id = id[ 1 ];

const announcement = new Announcement( id, 'kinoe', Date.now() );
( async () => {
    await getAnnouncement( announcement );
    fillData( announcement, 'zhTW' );
} )();
