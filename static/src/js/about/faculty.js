import header from 'static/src/js/components/common/header/index.js';
import getFactuly from 'static/src/js/components/about/faculty/get-faculty.js';

window.addEventListener( 'load', () => {
    header( document.getElementById( 'header' ) );
    getFactuly(
        document.getElementById( 'cards' ),
        document.getElementById( 'filters' ),
        document.getElementById( 'no-result' )
    );
} );
