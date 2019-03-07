import GetHeaderBase from 'static/src/js/components/common/headerBase.js';
import GetHeaderSmall from 'static/src/js/components/common/headerSmall.js';
import GetHeaderMedium from 'static/src/js/components/common/headerMedium.js';
import GetHeaderLarge from 'static/src/js/components/common/headerLarge.js';
import map from 'static/src/js/components/common/google-map.js';

window.addEventListener( 'load', () => {
    const headerBase = new GetHeaderBase( {
        headerDOM:     document.querySelector( '.body__header.header.header--base' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    const headerSmall = new GetHeaderSmall( {
        headerDOM:     document.querySelector( '.body__header.header.header--small' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    const headerMedium = new GetHeaderMedium( {
        headerDOM:     document.querySelector( '.body__header.header.header--medium' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    const headerLarge = new GetHeaderLarge( {
        headerDOM:     document.querySelector( '.body__header.header.header--large' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );

    const nckucsie = { lat: 22.997134, lng: 120.2210986, };

    map( document.getElementById( 'map' ), nckucsie );
} );
