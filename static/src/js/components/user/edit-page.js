import editPageHTML from 'static/src/pug/components/user/edit-page.pug';
import editPageContentHTML from 'static/src/pug/components/user/edit-page-content.pug';
import { dataI18n, dataEditPageConfig, } from 'static/src/js/components/user/data-config.js';
import LanguageUtils from 'models/common/utils/language.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import { host, } from 'settings/server/config.js';


/**
 * @param {object} opt
 * @return {Promise}
 */

async function renderEditPageWindow ( info ) {
    const i18n = dataI18n.editPage;
    console.log( i18n );
    classRemove( info.blockDOM, 'content__edit-page--hidden' );
    info.blockDOM.innerHTML = '';
    info.blockDOM.innerHTML += editPageHTML( {
        url:    `${ host }/user/profile`,
        cancel: i18n[ info.languageId ].button.cancel,
        check:  i18n[ info.languageId ].button.check,
        topic:  `${ i18n[ info.languageId ].topic[ info.buttonMethod ] }${ info.topic }`,
    } );
    return {
        info:   info.blockDOM.querySelector( '.edit-page__window > .window__form > .form__content > .content__info' ),
        check:   info.blockDOM.querySelector( '.edit-page__window > .window__form > .form__button > .button__item--check' ),
        cancel:  info.blockDOM.querySelector( '.edit-page__window > .window__form > .form__button > .button__item--cancel' ),
    };
}

function closeEditPageWindow ( blockDOM ) {
    classAdd( blockDOM, 'content__edit-page--hidden' );
}

function setLocalTopic ( info ) {
    info.editPageInfoDOM.innerHTML += editPageContentHTML( {
        localTopic:  info.topic,
        type:        'local-topic',
    } );
}

function setTextInput ( info ) {
    const flag = {
        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: `${ host }/static/image/icon/tw.png`,
        [ LanguageUtils.getLanguageId( 'en-US' ) ]: `${ host }/static/image/icon/us.png`,
    };
    const languageIds = ( info.editPageConfig.i18n ) ? LanguageUtils.supportedLanguageId : [ info.languageId, ];
    languageIds.forEach( ( languageId ) => {
        const placeholder = info.contentI18n[ languageId ].default[ info.editPageConfig.dbTableItem ];
        info.editPageInfoDOM.innerHTML += editPageContentHTML( {
            flag:       ( info.editPageConfig.i18n ) ? flag[ languageId ] : null,
            value:      ( info.buttonMethod === 'update' ) ? info.data[ languageId ][ info.editPageConfig.dbTableItem ] : '',
            placeholder,
            name:       ( info.editPageConfig.i18n ) ? `${ info.editPageConfig.dbTableItem }_${ languageId }` : info.editPageConfig.dbTableItem,
            dataType:   info.editPageConfig.dataType,
            type:       info.editPageConfig.type,
            required:   info.editPageConfig.required,
        } );
    } );
}

function setTimeInput ( info ) {
    const timeI18n = dataI18n.time[ info.languageId ];
    const valueFrom = ( info.buttonMethod === 'update' ) ? info.data.from : null;
    const valueTo = ( info.buttonMethod === 'update' ) ? info.data.to : null;

    info.editPageInfoDOM.innerHTML += editPageContentHTML( {
        from:       timeI18n.from,
        to:         timeI18n.to,
        valueFrom,
        valueTo,
        nameFrom:   'from',
        nameTo:     'to',
        type:       'time',
    } );
}

function setDropdownInput ( info ) {
    const util = info.editPageConfig.util;
    const value = ( info.buttonMethod === 'update' ) ? info.data[ info.editPageConfig.dbTableItem ] : util.map.indexOf( util.defaultOption );
    const top = util.i18n[ info.languageId ][ util.map[ value ] ];

    info.editPageInfoDOM.innerHTML += editPageContentHTML( {
        top,
        value,
        data:    info.editPageConfig.dropdownItem,
        name:    info.editPageConfig.dbTableItem,
        type:    'dropdown',
    } );

    const dropdownTop = info.editPageInfoDOM.querySelector( '.input__dropdown > .dropdown__top' );
    const dropdownItems = info.editPageInfoDOM.querySelectorAll( '.input__dropdown > .dropdown__button > .button__content > .content__item' );
    const dropdownSubmit = info.editPageInfoDOM.querySelector( '.input__dropdown > .dropdown__button > .button__submit' );
    dropdownTop.addEventListener( 'click', () => {
        classAdd( info.editPageInfoDOM.querySelector( '.input__dropdown > .dropdown__button' ), 'dropdown__button--active' );
    } );
    dropdownItems.forEach( ( item ) => {
        item.addEventListener( 'click', ( element ) => {
            const newValue = element.target.getAttribute( 'value' );
            dropdownTop.innerHTML = util.i18n[ info.languageId ][ newValue ];
            dropdownSubmit.value = util.map.indexOf( newValue );
            classRemove( info.editPageInfoDOM.querySelector( '.input__dropdown > .dropdown__button' ), 'dropdown__button--active' );
        } );
    } );
}


async function setEditPageInputBlock ( info ) {
    const config = info.editPageConfig;
    const contentI18n = info.dataI18n;
    config.forEach( ( element ) => {
        switch ( element.type ) {
            case 'text':
                setTextInput( {
                    contentI18n,
                    editPageConfig:     element,
                    languageId:         info.languageId,
                    buttonMethod:       info.buttonMethod,
                    editPageInfoDOM:    info.editPageInfoDOM,
                    data:               info.data,
                } );
                break;
            case 'time':
                setTimeInput( {
                    contentI18n,
                    data:            info.data[ info.languageId ],
                    buttonMethod:    info.buttonMethod,
                    editPageInfoDOM: info.editPageInfoDOM,
                    languageId:      info.languageId,
                } );
                break;
            case 'local-topic':
                setLocalTopic( {
                    topic:           contentI18n[ info.languageId ].localTopic[ element.dbTableItem ],
                    editPageInfoDOM: info.editPageInfoDOM,
                } );
                break;
            case 'dropdown':
                setDropdownInput( {
                    buttonMethod:    info.buttonMethod,
                    editPageInfoDOM: info.editPageInfoDOM,
                    editPageConfig:  element,
                    languageId:      info.languageId,
                    data:            info.data[ info.languageId ],
                } );
                break;
        }
    } );
}

async function setEditPageDeleteBlock ( info ) {
    info.editPageInfoDOM.innerHTML += editPageContentHTML( {
        val:  `${ info.dbTable }_${ info.id }`,
        name: `delete_${ info.dbTable }_${ info.id }`,
        type: 'remove',
    } );
    info.editPageInfoDOM.innerHTML += editPageContentHTML( {
        localTopic:  info.content,
        type:        'local-topic',
    } );
}

async function renderEditPage ( info ) {
    const contentI18n = info.dataI18n;
    console.log( info.dataI18n );
    const editPageContentDOM = await renderEditPageWindow( {
        blockDOM:     info.blockDOM,
        topic:        contentI18n[ info.languageId ].topic,
        languageId:   info.languageId,
        buttonMethod: info.buttonMethod,
    } );

    if ( info.buttonMethod === 'delete' ) {
        await setEditPageDeleteBlock( {
            dataI18n:           info.dataI18n,
            dbTable:            info.dbTable,
            id:                 info.id,
            blockDOM:           info.blockDOM,
            editPageInfoDOM: editPageContentDOM.info,
            languageId:         info.languageId,
            content:            info.content,
        } );
    }
    else {
        await setEditPageInputBlock( {
            editPageConfig:     info.editPageConfig,
            dataI18n:           info.dataI18n,
            buttonMethod:       info.buttonMethod,
            dbTable:            info.dbTable,
            languageId:         info.languageId,
            editPageInfoDOM:    editPageContentDOM.info,
            data:            ( info.buttonMethod === 'update' ) ? info.data : {},
        } );
    }

    return editPageContentDOM;
}

/**
 * Return a object about editPage info
 * @param {object} info
 * @return {object}
 */

function editPageType ( info ) {
    const typeObj = {
        text: {
            type:        'text',
            dataType:    info.dataType,
            dbTableItem: info.dbTableItem,
            required:    info.required,
            i18n:        info.i18n,
        },
        time: {
            type: 'time',
        },
        localTopic: {
            type:        'local-topic',
            dbTableItem: info.dbTableItem,
        },
        dropdown: {
            type:         'dropdown',
            util:         info.util,
            dbTableItem:  info.dbTableItem,
            dropdownItem: info.dropdownItem,
        },
    };

    return typeObj[ info.type ];
}

export {
    editPageType,
    renderEditPage,
};

