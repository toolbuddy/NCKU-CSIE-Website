import GetHeaderBase from 'static/src/js/components/common/headerBase.js';
import GetHeaderSmall from 'static/src/js/components/common/headerSmall.js';
import GetHeaderMedium from 'static/src/js/components/common/headerMedium.js';
import GetHeaderLarge from 'static/src/js/components/common/headerLarge.js';
import GetStaff from 'static/src/js/components/about/staff/get-staff.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

window.addEventListener( 'load', () => {
    try {
        const headerBase = new GetHeaderBase( {
            headerDOM:     document.querySelector( '.body__header.header.header--base' ),
            allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
        } );
    }
    catch ( err ) {
        console.error( err );
    }
    try {
        const headerSmall = new GetHeaderSmall( {
            headerDOM:     document.querySelector( '.body__header.header.header--small' ),
            allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
        } );
    }
    catch ( err ) {
        console.error( err );
    }
    try {
        const headerMedium = new GetHeaderMedium( {
            headerDOM:     document.querySelector( '.body__header.header.header--medium' ),
            allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
        } );
    }
    catch ( err ) {
        console.error( err );
    }
    try {
        const headerLarge = new GetHeaderLarge( {
            headerDOM:     document.querySelector( '.body__header.header.header--large' ),
            allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
        } );
    }
    catch ( err ) {
        console.error( err );
    }
    try {
        const getStaff = new GetStaff( {
            staffDOM:   document.getElementById( 'staff' ),
            languageId: WebLanguageUtils.currentLanguageId,
        } );

        getStaff.exec();
    }
    catch ( err ) {
        console.error( err );
    }
} );
