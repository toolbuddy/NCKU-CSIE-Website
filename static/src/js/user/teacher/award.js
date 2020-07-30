import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import awardErrorMessageUtils from 'models/faculty/utils/award-error-message.js';
import DefaultDataManagement from 'static/src/js/components/user/faculty/default-data-management.js';
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
    const awardDataManagement = new DefaultDataManagement( {
        bodyFormDOM:      document.getElementById( 'form' ),
        refreshDOM:       document.querySelector( '.content__award > .award__refresh' ),
        loadingDOM:       document.querySelector( '.content__award > .award__loading' ),
        cardsDOM:         document.getElementById( 'award__cards' ),
        patchButtonsDOM:  document.getElementsByClassName( 'award-card__patch' ),
        deleteButtonsDOM: document.getElementsByClassName( 'award-card__delete' ),
        postButtonsDOM:   document.getElementsByClassName( 'local-topic__post-button--award' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        table:            'award',
        idColumn:         'awardId',
        constraints:      {
            'receivedYear': {
                presence:   {
                    allowEmpty: false,
                    message:    awardErrorMessageUtils.getValueByOption( {
                        option:     'receieveYearEmpty',
                        languageId: WebLanguageUtils.currentLanguageId,
                    } ),
                },
                numericality: {
                    greaterThanOrEqualTo: 1970,
                    message:              awardErrorMessageUtils.getValueByOption( {
                        option:     'receieveYearRangeError',
                        languageId: WebLanguageUtils.currentLanguageId,
                    } ),
                },
            },
            'awardTW': {
                presence: {
                    allowEmpty: false,
                    message:    awardErrorMessageUtils.getValueByOption( {
                        option:     'awardTWEmpty',
                        languageId: WebLanguageUtils.currentLanguageId,
                    } ),
                },
            },
            'awardEN': {
                presence: {
                    allowEmpty: false,
                    message:    awardErrorMessageUtils.getValueByOption( {
                        option:     'awardENEmpty',
                        languageId: WebLanguageUtils.currentLanguageId,
                    } ),
                },
            },
        },
        deletePreview:    data => `${ data.receivedYear } ${ data.award }`,
    } );
    if ( !( awardDataManagement instanceof DefaultDataManagement ) )
        throw new Error( 'award data management error' );
    awardDataManagement.exec();
}
catch ( err ) {
    console.error( err );
}
