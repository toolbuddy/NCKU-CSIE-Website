import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { host, } from 'settings/server/config.js';
import DropdownControl from 'static/src/js/components/user/dropdown.js';
import GetUserDetail from 'static/src/js/components/user/get-user-detail';
import cookieParser from 'cookie-parser';

try {
    const headerBase = new GetHeaderBase( {
        headerDOM:     document.querySelector( '.body__header.header.header--base' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    if ( !( headerBase instanceof GetHeaderBase ) )
        throw new Error( '.header.header--base not found.' );
}
catch ( err ) {
    console.error( err );
}

try {
    const headerMedium = new GetHeaderMedium( {
        headerDOM:     document.querySelector( '.body__header.header.header--medium' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    if ( !( headerMedium instanceof GetHeaderMedium ) )
        throw new Error( '.header.header--medium not found.' );
}
catch ( err ) {
    console.error( err );
}

try {
    const headerLarge = new GetHeaderLarge( {
        headerDOM:     document.querySelector( '.body__header.header.header--large' ),
    } );
    if ( !( headerLarge instanceof GetHeaderLarge ) )
        throw new Error( '.header.header--medium not found.' );
}
catch ( err ) {
    console.error( err );
}

console.log( '(Assume this is header) get profile data:' );

try {
    const getUserDetail = new GetUserDetail( {
        profileDOM:    document.getElementById( 'profile' ),
        educationDOM:  document.getElementById( 'education' ),
        experienceDOM: document.getElementById( 'experience' ),
        languageId:    WebLanguageUtils.currentLanguageId,
        profileId:     24,
    } );

    getUserDetail.exec();
}
catch ( err ) {
    console.error( err );
}

console.log( 'get profile data:' );

( async () => {
    const queryString = [
        `languageId=${ WebLanguageUtils.currentLanguageId }`,
    ].join( '&' );

    let res = null;
    res = await window.fetch( `${ host }/api/user/miniProfile?${ queryString }` );
    if ( !res.ok )
        throw new Error( 'failed to get user mini profile' );
    const data = await res.json();
    console.log( data );
} )();
