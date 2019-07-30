import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import SetProfileData from 'static/src/js/components/user/set-profile-data.js';
import { SetData, } from 'static/src/js/components/user/set-data.js';

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

try {
    const setProfileData = new SetProfileData( {
        profileDOM:       document.getElementById( 'profile' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        profileId:        24,
    } );

    setProfileData.exec();
}
catch ( err ) {
    console.error( err );
}

try {
    const setEducationData = new SetData( {
        blockDOM:       document.getElementById( 'education' ),
        addButtonDOM:     document.getElementById( 'add__button--education-block' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        dbTable:          'education',
        profileId:        24,
    } );

    setEducationData.exec();
}
catch ( err ) {
    console.error( err );
}

try {
    const setExperienceData = new SetData( {
        blockDOM:       document.getElementById( 'experience' ),
        addButtonDOM:     document.getElementById( 'add__button--experience-block' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        dbTable:          'experience',
        profileId:        24,
    } );
    if ( !( setExperienceData instanceof SetData ) )
        throw new Error( 'setExperienceData inVaild' );

    setExperienceData.exec();
}
catch ( err ) {
    console.error( err );
}

try {
    const setTitleData = new SetData( {
        blockDOM:         document.getElementById( 'title' ),
        addButtonDOM:     document.getElementById( 'add__button--title' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        dbTable:          'title',
        profileId:        24,
    } );
    if ( !( setTitleData instanceof SetData ) )
        throw new Error( 'setTitleData inVaild' );

    setTitleData.exec();
}
catch ( err ) {
    console.error( err );
}

try {
    const setSpecialtyData = new SetData( {
        blockDOM:         document.getElementById( 'specialty' ),
        addButtonDOM:     document.getElementById( 'add__button--specialty' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        dbTable:          'specialty',
        profileId:        24,
    } );
    if ( !( setSpecialtyData instanceof SetData ) )
        throw new Error( 'setSpecialtyData inVaild' );

    setSpecialtyData.exec();
}
catch ( err ) {
    console.error( err );
}
