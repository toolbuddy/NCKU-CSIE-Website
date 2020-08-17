import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import NavigationBar from 'static/src/js/components/user/navigation-bar.js';
import conferenceColumnsUnits from 'models/faculty/utils/conference-columns.js';
import DefaultDataManagement from 'static/src/js/components/user/faculty/default-data-management.js';

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
    const nevagationBar = new NavigationBar( {
        navigationDOM: document.getElementById( 'navigation' ),
        languageId:       WebLanguageUtils.currentLanguageId,
    } );

    nevagationBar.exec();
}
catch ( err ) {
    console.error( err );
}

try {
    const conferenceDataManagement = new DefaultDataManagement( {
        bodyFormDOM:      document.getElementById( 'form' ),
        refreshDOM:       document.querySelector( '.content__conference > .conference__refresh' ),
        loadingDOM:       document.querySelector( '.content__conference > .conference__loading' ),
        cardsDOM:         document.getElementById( 'conference__cards' ),
        patchButtonsDOM:  document.getElementsByClassName( 'conference-card__patch' ),
        deleteButtonsDOM: document.getElementsByClassName( 'conference-card__delete' ),
        postButtonsDOM:   document.getElementsByClassName( 'local-topic__post-button--conference' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        columnUnits:      conferenceColumnsUnits,
        table:            'conference',
        dbTable:          'conference',
        idColumn:         'conferenceId',
        deletePreview:    data => `${ data.conference }`,
    } );
    if ( !( conferenceDataManagement instanceof DefaultDataManagement ) )
        throw new Error( 'award data management error' );
    conferenceDataManagement.exec();
}
catch ( err ) {
    console.error( err );
}
