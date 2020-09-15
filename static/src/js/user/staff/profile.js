import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import ProfileDataManagement from 'static/src/js/components/user/staff/profile-data-managament.js';
import DefaultDataManagement from 'static/src/js/components/user/staff/default-data-management.js';
import businessUtils from 'models/staff/utils/business.js';
import titleUtils from 'models/staff/utils/title.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

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
    headerLarge.renderLogin();
}
catch ( err ) {
    console.error( err );
}

try {
    const titleDataManagement = new DefaultDataManagement( {
        bodyFormDOM:      document.getElementById( 'form' ),
        refreshDOM:       document.querySelector( '.content__title > .title__refresh' ),
        loadingDOM:       document.querySelector( '.content__title > .title__loading' ),
        cardsDOM:         document.getElementById( 'title__cards' ),
        patchButtonsDOM:  document.getElementsByClassName( 'title-card__patch' ),
        deleteButtonsDOM: document.getElementsByClassName( 'title-card__delete' ),
        postButtonsDOM:   document.getElementsByClassName( 'local-topic__post-button--title' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        table:            'title',
        idColumn:         'titleId',
        columnUnits:      titleUtils,
        deletePreview:    data => `${ data.title }`,
    } );
    if ( !( titleDataManagement instanceof DefaultDataManagement ) )
        throw new Error( 'title data management error' );
    titleDataManagement.exec();
}
catch ( err ) {
    console.error( err );
}

try {
    const businessDataManagement = new DefaultDataManagement( {
        bodyFormDOM:      document.getElementById( 'form' ),
        refreshDOM:       document.querySelector( '.content__business > .business__refresh' ),
        loadingDOM:       document.querySelector( '.content__business > .business__loading' ),
        cardsDOM:         document.getElementById( 'business__cards' ),
        patchButtonsDOM:  document.getElementsByClassName( 'business-card__patch' ),
        deleteButtonsDOM: document.getElementsByClassName( 'business-card__delete' ),
        postButtonsDOM:   document.getElementsByClassName( 'local-topic__post-button--business' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        table:            'business',
        idColumn:         'businessId',
        columnUnits:      businessUtils,
        deletePreview:    data => `${ data.business }`,
    } );
    if ( !( businessDataManagement instanceof DefaultDataManagement ) )
        throw new Error( 'award data management error' );
    businessDataManagement.exec();
}
catch ( err ) {
    console.error( err );
}

try {
    const profileDataManagement = new ProfileDataManagement( {
        bodyFormDOM:       document.getElementById( 'form' ),
        porfileContentDOM: document.getElementById( 'content__profile' ),
        patchButtonsDOM:   document.getElementsByClassName( 'profile-card__patch' ),
        languageId:        WebLanguageUtils.currentLanguageId,
    } );
    if ( !( profileDataManagement instanceof ProfileDataManagement ) )
        throw new Error( 'award data management error' );
    profileDataManagement.exec();
}
catch ( err ) {
    console.error( err );
}
