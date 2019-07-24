import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { host, } from 'settings/server/config.js';
import GetUserDetail from 'static/src/js/components/user/get-user-detail';
import SetProfileData from 'static/src/js/components/user/set-profile-data.js';
import SetData from 'static/src/js/components/user/set-data.js';

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

/*
Try {
    const getUserDetail = new GetUserDetail( {
        profileDOM:       document.getElementById( 'profile' ),
        educationDOM:     document.getElementById( 'education' ),
        experienceDOM:    document.getElementById( 'experience' ),
        editPageDOM:      document.getElementById( 'edit-page' ),
        educationAddDOM:  document.getElementById( 'add__button--education-block' ),
        experienceAddDOM: document.getElementById( 'add__button--experience-block' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        profileId:        24,
    } );

    getUserDetail.exec();
}
catch ( err ) {
    console.error( err );
}
*/

try {
    const setProfileData = new SetProfileData( {
        profileDOM:       document.getElementById( 'profile' ),
        editPageDOM:      document.getElementById( 'edit-page' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        profileId:        24,
    } );

    setProfileData.exec();
}
catch ( err ) {
    console.error( err );
}
