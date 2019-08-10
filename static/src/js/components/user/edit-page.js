import editPageHTML from 'static/src/pug/components/user/edit-page.pug';
import editPageContentHTML from 'static/src/pug/components/user/edit-page-content.pug';
import dataI18n from 'static/src/js/components/user/static-data/data-i18n.js';
import LanguageUtils from 'models/common/utils/language.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

/**
 * @param {object} opt
 * @return {Promise}
 */


class EditPage {
    constructor ( opt ) {
        if (
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId ) ||
            !ValidateUtils.isValidString( opt.buttonMethod ) ||
            !ValidateUtils.isValidString( opt.dbTable )
        )
            throw new TypeError( 'invalid arguments' );

        this.DOM = {};

        this.config = {
            languageId:    opt.languageId,
            buttonMethod:  opt.buttonMethod,
            dbTable:       opt.dbTable,
            dbTableItemId: opt.id,
        };
        this.dataI18n = opt.dataI18n;
        this.editPageConfig = opt.editPageConfig;
        this.dbData = ( opt.buttonMethod === 'update' ) ? opt.dbData : {};
        this.content = opt.content;
    }

    async checkEditPageExist () {
        const editPageDOM = document.getElementById( 'edit-page' );

        if ( ValidateUtils.isDomElement( editPageDOM ) )
            this.DOM.editPage = editPageDOM;

        else {
            const newEditPage = document.createElement( 'section' );
            classAdd( newEditPage, 'body__edit-page' );
            newEditPage.id = 'edit-page';
            document.body.appendChild( newEditPage );
            this.DOM.editPage = newEditPage;
        }
    }

    async renderEditPageWindow () {
        await this.checkEditPageExist();

        const i18n = dataI18n.editPage;

        this.DOM.editPage.innerHTML = '';
        this.DOM.editPage.innerHTML += editPageHTML( {
            url:    `${ host }/user/profile`,
            cancel: i18n[ this.config.languageId ].button.cancel,
            check:  i18n[ this.config.languageId ].button.check,
            topic:  `${ i18n[ this.config.languageId ].topic[ this.config.buttonMethod ] }${ this.dataI18n[ this.config.languageId ].topic }`,
        } );
    }

    setTextInput ( editPageConfig ) {
        const flag = {
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: `${ host }/static/image/icon/tw.png`,
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: `${ host }/static/image/icon/us.png`,
        };
        const languageIds = ( editPageConfig.i18n ) ? LanguageUtils.supportedLanguageId : [ this.config.languageId, ];
        languageIds.forEach( ( languageId ) => {
            const placeholder = this.dataI18n[ languageId ].default[ editPageConfig.dbTableItem ];
            let value = '';
            if ( this.config.buttonMethod === 'update' && this.dbData[ languageId ][ editPageConfig.dbTableItem ] !== null )
                value = this.dbData[ languageId ][ editPageConfig.dbTableItem ];


            this.DOM.info.innerHTML += editPageContentHTML( {
                flag:        ( editPageConfig.i18n ) ? flag[ languageId ] : null,
                value,
                placeholder,
                name:        ( editPageConfig.i18n ) ? `${ editPageConfig.dbTableItem }_${ languageId }` : `${ editPageConfig.dbTableItem }`,
                type:        editPageConfig.type,
                dbTableItem: editPageConfig.dbTableItem,
                languageId,
                i18n:        editPageConfig.i18n,
            } );
        } );
    }

    setTimeInput () {
        const timeI18n = dataI18n.time[ this.config.languageId ];
        const valueFrom = ( this.config.buttonMethod === 'update' ) ? this.dbData[ this.config.languageId ].from : null;
        const valueTo = ( this.config.buttonMethod === 'update' ) ? this.dbData[ this.config.languageId ].to : null;

        this.DOM.info.innerHTML += editPageContentHTML( {
            from:       timeI18n.from,
            to:         timeI18n.to,
            valueFrom,
            valueTo,
            nameFrom:   'from',
            nameTo:     'to',
            type:       'time',
        } );
    }

    setLocalTopic ( topic ) {
        this.DOM.info.innerHTML += editPageContentHTML( {
            localTopic:   topic,
            type:        'local-topic',
        } );
    }

    setDropdownInput ( editPageConfig ) {
        try {
            const infoDOM = this.DOM.info;
            const util = editPageConfig.util;

            new Promise( ( res ) => {
                let value = util.map.indexOf( util.defaultOption );
                if ( this.config.buttonMethod === 'update' )
                    value = this.dbData[ this.config.languageId ][ editPageConfig.dbTableItem ];

                const top = util.i18n[ this.config.languageId ][ util.map[ value ] ];

                this.DOM.info.innerHTML += editPageContentHTML( {
                    top,
                    value,
                    data:        editPageConfig.dropdownItem,
                    name:        `${ editPageConfig.dbTableItem }`,
                    dbTableItem: editPageConfig.dbTableItem,
                    type:        'dropdown',
                } );

                res();
            } )
            .then( () => {
                const dropdownTop = infoDOM.querySelector( `.input__dropdown > .dropdown__top--${ editPageConfig.dbTableItem }` );
                const dropdownItems = infoDOM.querySelectorAll( `.dropdown__button > .button__content > .content__item--${ editPageConfig.dbTableItem }` );
                const dropdownSubmit = infoDOM.querySelector( `.dropdown__button > .button__submit--${ editPageConfig.dbTableItem }` );
                dropdownTop.addEventListener( 'click', () => {
                    classAdd( infoDOM.querySelector( `.input__dropdown > .dropdown__button--${ editPageConfig.dbTableItem }` ), 'dropdown__button--active' );
                } );
                dropdownItems.forEach( ( item ) => {
                    item.addEventListener( 'click', ( element ) => {
                        const newValue = element.target.getAttribute( 'value' );
                        dropdownTop.textContent = util.i18n[ this.config.languageId ][ newValue ];
                        dropdownSubmit.value = util.map.indexOf( newValue );
                        classRemove( infoDOM.querySelector( `.dropdown__button--${ editPageConfig.dbTableItem }` ), 'dropdown__button--active' );
                    } );
                } );
            } );
        }
        catch ( err ) {
            console.error( err );
        }
    }

    setTimeDetailInput ( editPageConfig ) {
        const data = {};

        if ( this.config.buttonMethod === 'add' ) {
            [ 'year',
                'month',
                'day', ].forEach( ( element ) => {
                data[ element ] = '';
            } );
        }
        else if ( this.config.dbTable === 'award' ) {
            data.year = this.dbData[ this.config.languageId ].receivedYear;
            data.month = this.dbData[ this.config.languageId ].receivedMonth;
            data.day = this.dbData[ this.config.languageId ].receivedDay;
        }
        else if ( this.config.dbTable === 'patent' ) {
            let tempDate = null;
            const dbData = this.dbData[ this.config.languageId ];
            if ( editPageConfig.dbTableDay.includes( 'application' ) )
                tempDate = ( dbData.applicationDate !== null ) ? dbData.applicationDate.split( '-' ) : null;
            else if ( editPageConfig.dbTableDay.includes( 'issue' ) )
                tempDate = ( dbData.issueDate !== null ) ? dbData.issueDate.split( '-' ) : null;
            else if ( editPageConfig.dbTableDay.includes( 'expire' ) )
                tempDate = ( dbData.expireDate !== null ) ? dbData.expireDate.split( '-' ) : null;
            data.year = ( tempDate !== null ) ? tempDate[ 0 ] : '';
            data.month = ( tempDate !== null ) ? tempDate[ 1 ] : '';
            data.day = ( tempDate !== null ) ? tempDate[ 2 ] : '';
        }

        this.DOM.info.innerHTML += editPageContentHTML( {
            type:         'time-detail',
            year:         data.year,
            month:        data.month,
            day:          data.day,
            dbTableYear:  editPageConfig.dbTableYear,
            dbTableMonth: editPageConfig.dbTableMonth,
            dbTableDay:   editPageConfig.dbTableDay,
        } );
    }

    setCheckboxInput ( editPageConfig ) {
        try {
            const infoDOM = this.DOM.info;
            const content = dataI18n[ this.config.dbTable ][ this.config.languageId ].localTopic[ editPageConfig.dbTableItem ];
            const isChecked = ( this.config.buttonMethod === 'update' ) ? this.dbData[ this.config.languageId ][ editPageConfig.dbTableItem ] : false;

            new Promise( ( res ) => {
                this.DOM.info.innerHTML += editPageContentHTML( {
                    type:         'checkbox',
                    dbTableItem:  editPageConfig.dbTableItem,
                    content,
                    checked:     isChecked,
                } );
                res();
            } )
            .then( () => {
                const chooseDOM = infoDOM.querySelector( `.input__checkbox--${ editPageConfig.dbTableItem } > .checkbox__choose` );
                const textDOM = infoDOM.querySelector( `.input__checkbox--${ editPageConfig.dbTableItem } > .checkbox__text` );

                if ( chooseDOM.checked )
                    classAdd( textDOM, 'checkbox__text--active' );
                else
                    classRemove( textDOM, 'checkbox__text--active' );

                chooseDOM.addEventListener( 'change', () => {
                    if ( chooseDOM.checked )
                        classAdd( textDOM, 'checkbox__text--active' );
                    else
                        classRemove( textDOM, 'checkbox__text--active' );
                } );
            } );
        }
        catch ( err ) {

        }
    }

    async setEditPageInputBlock () {
        this.DOM.info.innerHTML = '';
        this.editPageConfig.forEach( ( element ) => {
            switch ( element.type ) {
                case 'text':
                    this.setTextInput( element );
                    break;
                case 'time':
                    this.setTimeInput();
                    break;
                case 'local-topic':
                    const topic =  this.dataI18n[ this.config.languageId ].localTopic[ element.dbTableItem ];
                    this.setLocalTopic( topic );
                    break;
                case 'dropdown':
                    this.setDropdownInput( element );
                    break;
                case 'time-detail':
                    this.setTimeDetailInput( element );
                    break;
                case 'checkbox':
                    this.setCheckboxInput( element );
                    break;
                default:
                    break;
            }
        } );
    }

    async setEditPageDeleteBlock () {
        this.DOM.info.innerHTML += editPageContentHTML( {
            localTopic:  this.content,
            type:       'local-topic',
        } );
    }

    setFocus () {
        const input = this.DOM.editPage.getElementsByTagName( 'input' );
        const val   = input[ 0 ].value;
        input[ 0 ].focus();
        input[ 0 ].value = '';
        input[ 0 ].value = val;
    }

    async renderEditPage () {
        await this.renderEditPageWindow()
        .then( () => {
            const infoSelector = '.edit-page__window > .window__form > .form__content > .content__info';
            this.DOM.info = this.DOM.editPage.querySelector( infoSelector );
        } );

        if ( this.config.buttonMethod === 'delete' )
            await this.setEditPageDeleteBlock();

        else {
            await this.setEditPageInputBlock();
            this.setFocus();
        }
    }
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
            dbTableItem: info.dbTableItem,
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
        timeDetail: {
            type:         'time-detail',
            dbTableYear:  info.dbTableYear,
            dbTableMonth: info.dbTableMonth,
            dbTableDay:   info.dbTableDay,
        },
        checkbox: {
            type:        'checkbox',
            dbTableItem: info.dbTableItem,
        },
    };

    return typeObj[ info.type ];
}

export default EditPage;

export {
    EditPage,
    editPageType,
};
