import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import AwardDataManagement from 'static/src/js/components/user/faculty/award-data-management.js';
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
    const awardDataManagement = new AwardDataManagement( {
        bodyFormDOM:     document.getElementById( 'form' ),
        refreshDOM:      document.querySelector( '.content__award > .award__refresh' ),
        loadingDOM:      document.querySelector( '.content__award > .award__loading' ),
        cardsDOM:        document.getElementById( 'award__cards' ),
        patchButtonsDOM: document.getElementsByClassName( 'award-card__patch' ),
        postButtonsDOM:   document.getElementsByClassName( 'local-topic__post-button--award' ),
        languageId:      WebLanguageUtils.currentLanguageId,
        dbTable:         'award',
    } );
    if ( !( awardDataManagement instanceof AwardDataManagement ) )
        throw new Error( 'award data management error' );
    awardDataManagement.exec();
}
catch ( err ) {
    console.error( err );
}
