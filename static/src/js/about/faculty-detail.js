import GetHeader from 'static/src/js/components/common/header.js';

window.addEventListener( 'load', () => {
    const header = new GetHeader( {
        headerDOM: document.getElementById( 'header' ),
    } );
} );
