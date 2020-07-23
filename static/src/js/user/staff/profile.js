import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import ProfileDataManagement from 'static/src/js/components/user/staff/profile-data-managament.js';
import DefaultDataManagement from 'static/src/js/components/user/staff/default-data-management.js';
import businessI18nErrorMessageUtils from 'models/staff/utils/businessI18n-error-message.js';
import titleI18nErrorMessageUtils from 'models/staff/utils/titleI18n-error-message.js';
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
    const titleI18nDataManagement = new DefaultDataManagement( {
        bodyFormDOM:      document.getElementById( 'form' ),
        refreshDOM:       document.querySelector( '.content__titleI18n > .titleI18n__refresh' ),
        loadingDOM:       document.querySelector( '.content__titleI18n > .titleI18n__loading' ),
        cardsDOM:         document.getElementById( 'titleI18n__cards' ),
        patchButtonsDOM:  document.getElementsByClassName( 'titleI18n-card__patch' ),
        deleteButtonsDOM: document.getElementsByClassName( 'titleI18n-card__delete' ),
        postButtonsDOM:   document.getElementsByClassName( 'local-topic__post-button--titleI18n' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        table:            'titleI18n',
        idColumn:         'titleId',
        constraints:      {
            'titleTW': {
                presence: {
                    allowEmpty: false,
                    message:    titleI18nErrorMessageUtils.getValueByOption( {
                        option:     'titleTWBlank',
                        languageId: WebLanguageUtils.currentLanguageId,
                    } ),
                },
            },
            'titleEN': {
                presence: {
                    allowEmpty: false,
                    message:    titleI18nErrorMessageUtils.getValueByOption( {
                        option:     'titleENBlank',
                        languageId: WebLanguageUtils.currentLanguageId,
                    } ),
                },
            },
            'deletePreview':    data => `${ data.title }`,
        },
        deletePreview:    data => `${ data.title }`,
    } );
    if ( !( titleI18nDataManagement instanceof DefaultDataManagement ) )
        throw new Error( 'award data management error' );
    titleI18nDataManagement.exec();
}
catch ( err ) {
    console.error( err );
}

try {
    const businessI18nDataManagement = new DefaultDataManagement( {
        bodyFormDOM:      document.getElementById( 'form' ),
        refreshDOM:       document.querySelector( '.content__businessI18n > .businessI18n__refresh' ),
        loadingDOM:       document.querySelector( '.content__businessI18n > .businessI18n__loading' ),
        cardsDOM:         document.getElementById( 'businessI18n__cards' ),
        patchButtonsDOM:  document.getElementsByClassName( 'businessI18n-card__patch' ),
        deleteButtonsDOM: document.getElementsByClassName( 'businessI18n-card__delete' ),
        postButtonsDOM:   document.getElementsByClassName( 'local-topic__post-button--businessI18n' ),
        languageId:       WebLanguageUtils.currentLanguageId,
        table:            'businessI18n',
        idColumn:         'businessId',
        constraints:      {
            'businessTW': {
                presence: {
                    allowEmpty: false,
                    message:    businessI18nErrorMessageUtils.getValueByOption( {
                        option:     'businessTWBlank',
                        languageId: WebLanguageUtils.currentLanguageId,
                    } ),
                },
            },
            'businessEN': {
                presence: {
                    allowEmpty: false,
                    message:    businessI18nErrorMessageUtils.getValueByOption( {
                        option:     'businessENBlank',
                        languageId: WebLanguageUtils.currentLanguageId,
                    } ),
                },
            },
        },
        deletePreview:    data => `${ data.business }`,
    } );
    if ( !( businessI18nDataManagement instanceof DefaultDataManagement ) )
        throw new Error( 'award data management error' );
    businessI18nDataManagement.exec();
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
