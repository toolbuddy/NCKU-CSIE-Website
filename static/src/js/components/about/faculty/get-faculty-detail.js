let id = /about\/faculty\/(\d+)/.exec( window.location.pathname );

if ( id === null )
    id = 1;
else
    id = id[ 1 ];

const reqURL = `${ window.location.protocol }//${ window.location.host }/api/faculty/${ id }${ location.search }`;

fetch( reqURL ).then( res => res.json() ).then( data => data );
