/**
 * CSS of the file
 */
/* eslint no-unused-vars: 'off' */
import style from 'cssComponent/announcement/announcement.min.css';

let id = /announcement\/(\d+)/.exec( window.location.pathname );

if ( id === null )
    id = 1;
else
    id = id[ 1 ];

const reqURL = `${ window.location.protocol }//${ window.location.host }/api/announcement/${ id }${ location.search }`;

/* eslint no-console: 'off' */
fetch( reqURL ).then( res => res.json() ).then( data => console.log( data ) );
