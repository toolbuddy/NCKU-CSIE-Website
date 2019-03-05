import { GetHeaderMin, GetHeaderSmall, GetHeaderMedium, GetHeaderLarge, } from 'static/src/js/components/common/header.js';
import GetStaff from 'static/src/js/components/about/staff/get-staff.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

window.addEventListener( 'load', () => {
    const headerMin = new GetHeaderMin( {
        headerDOM:     document.querySelector( '.body__header.header.header--min' ),
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

    const getStaff = new GetStaff( {
        staffDOM:   document.getElementById( 'staff' ),
        languageId: WebLanguageUtils.currentLanguageId,
    } );

    getStaff.exec();
} );
