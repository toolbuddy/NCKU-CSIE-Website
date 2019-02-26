import { GetHeaderMin, GetHeaderSmall, GetHeaderMedium, GetHeaderLarge } from 'static/src/js/components/common/header.js';

window.addEventListener( 'load', () => {
    const headerMin = new GetHeaderMin( {
        headerDOM: document.getElementsByClassName( 'header--min' )[0],
    } );
    const headerSmall = new GetHeaderSmall( {
        headerDOM: document.getElementsByClassName( 'header--small' )[0],
    } );
    const headerMedium = new GetHeaderMedium( {
        headerDOM: document.getElementsByClassName( 'header--medium' )[0],
    } );
    const headerLarge = new GetHeaderLarge( {
        headerDOM: document.getElementsByClassName( 'header--large' )[0],
    } );
} );
