import GetHeader from 'static/src/js/components/common/header.js';
import map from 'static/src/js/components/common/google-map.js';

window.addEventListener( 'load', () => {
    const header = new GetHeader( {
        headerDOM: document.getElementById( 'header' ),
    } );

    const nckucsie = { lat: 22.997134, lng: 120.2210986, };

    map( document.getElementById( 'map' ), nckucsie );
} );
