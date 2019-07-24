import editPageHTML from 'static/src/pug/components/user/edit-page.pug';
import editPageContentHTML from 'static/src/pug/components/user/edit-page-content.pug';
import LanguageUtils from 'models/common/utils/language.js';
import { host, } from 'settings/server/config.js';


/**
 * @param {object} opt
 * @return {Promise}
 */

class EditPage {
    constructor ( opt ) {
        this.flag = {
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: `${ host }/static/image/icon/tw.png`,
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: `${ host }/static/image/icon/us.png`,
        };

        this.DOM = {
            block: opt.DOM.editPageBlock,
        };
        this.config = {
            languageId: opt.languageId,
            topic:      opt.data.topic,
        };
        this.i18n = Object.freeze( {
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                button: {
                    add:    'add',
                    remove: 'remove',
                    modify: 'modify',
                    cancel: 'cancel',
                    check:  'check',
                },
                topic: {
                    front: {
                        add:    'add your ',
                        update: 'update your ',
                        delete: 'delete your ',
                    },
                },
            },
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                button: {
                    cancel: '取消',
                    check:  '確定',
                },
                topic: {
                    front: {
                        add:    '新增您的',
                        update: '修改您的',
                        delete: '刪除您的',
                    },
                },
            },
        } );
    }

    async renderWindow ( dbItem, buttonType ) {
        try {
            const i18n = Object.freeze( {
                [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                    button: {
                        cancel: 'cancel',
                        check:  'check',
                    },
                    topic: {
                        add:    'add your ',
                        update: 'update your ',
                        delete: 'delete your ',
                    },
                },
                [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                    button: {
                        cancel: '取消',
                        check:  '確定',
                    },
                    topic: {
                        add:    '新增您的',
                        update: '修改您的',
                        delete: '刪除您的',
                    },
                },
            } );
            classRemove( this.DOM.block, 'content__edit-page--hidden' );
            this.DOM.block.innerHTML = '';
            this.DOM.block.innerHTML += editPageHTML( {
                url:    `${ host }/user/profile`,
                cancel: i18n[ this.config.languageId ].button.cancel,
                check:  i18n[ this.config.languageId ].button.check,
                topic:  `${ i18n[ this.config.languageId ].front[ buttonType ] }${ this.config.topic }`,
            } );
            return {
                content: this.DOM.block.editPage.querySelector( '.edit-page__window > .window__form > .form__content' ),
                check:   this.DOM.block.editPage.querySelector( '.edit-page__window > .window__form > .form__button > .button__item--check' ),
                cancel:  this.DOM.block.editPage.querySelector( '.edit-page__window > .window__form > .form__button > .button__item--cancel' ),
            };
        }
        catch ( err ) {
            console.log( err );
        }
    }

    async remove () {
        const dbTable = this.data.dbTable;
        const content = {
            education:  `${ dbTable.school } ${ dbTable.major } ${ degreeUtils.i18n[ this.config.languageId ][ degreeUtils.map[ dbTable.degree ] ] }`,
            experience: `${ dbTable.organization } ${ dbTable.department } ${ dbTable.title }`,
            title:      `${ dbTable.title }`,
            specialty:  `${ dbTable.specialty }`,
        };
        editPage.content.innerHTML += editPageContentHTML( {
            val:  `${ info.dbTable }_${ info.id }`,
            name: `delete_${ info.dbTable }_${ info.id }`,
            type: 'remove',
        } );
        editPage.content.innerHTML += editPageContentHTML( {
            localTopic: content[ info.dbTable ],
            type:        'local-topic',
        } );
    }

    async setInputBlocks ( info, buttonType ) {
        try {
            const editPage = await this.renderWindow( ( isProfile ) ? info.dbTableItem : info.dbTable, buttonType );
            window.scrollTo( 0, 0 );

            if ( buttonType === 'remove' ) {
                const dbTable = info.res[ this.config.languageId ][ info.dbTable ][ info.index ];
                const content = {
                    education:  `${ dbTable.school } ${ dbTable.major } ${ degreeUtils.i18n[ this.config.languageId ][ degreeUtils.map[ dbTable.degree ] ] }`,
                    experience: `${ dbTable.organization } ${ dbTable.department } ${ dbTable.title }`,
                    title:      `${ dbTable.title }`,
                    specialty:  `${ dbTable.specialty }`,
                };
                editPage.content.innerHTML += editPageContentHTML( {
                    val:  `${ info.dbTable }_${ info.id }`,
                    name: `delete_${ info.dbTable }_${ info.id }`,
                    type: 'remove',
                } );
                editPage.content.innerHTML += editPageContentHTML( {
                    localTopic: content[ info.dbTable ],
                    type:        'local-topic',
                } );
            }

            const name = {
                modify: data => `update_${ data.dbTable }_${ data.dbTableItem }_${ data.languageId }_${ data.id }`,
                add:    data => `add_${ data.dbTable }_${ data.dbTableItem }_${ data.languageId }`,
            };

            let editPageElements = [];
            editPageElements = ( isProfile ) ? this.editPage.profile[ info.dbTableItem ] : this.editPage[ info.dbTable ];
            editPageElements = ( buttonType === 'remove' ) ? [] : editPageElements;

            editPageElements.forEach( ( editPageItem ) => {
                switch ( editPageItem.type ) {
                    case 'text':
                        editPageItem.languageId.forEach( ( languageId ) => {
                            const placeholder = this.i18n[ languageId ].default[ info.dbTable ][ editPageItem.dbTableItem ];
                            let elementContent;
                            if ( buttonType === 'modify' ) {
                                let data;
                                if ( isProfile )
                                    data = info.res[ languageId ].profile[ editPageItem.dbTableItem ];
                                else
                                    data = info.res[ languageId ][ info.dbTable ][ info.index ][ editPageItem.dbTableItem ];
                                elementContent = ( !ValidateUtils.isValidString( data ) ) ? '' : data;
                            }

                            const elementName = name[ buttonType ]( {
                                dbTable:     info.dbTable,
                                dbTableItem: editPageItem.dbTableItem,
                                languageId,
                                id:          ( buttonType === 'modify' ) ? info.id : null,
                            } );

                            editPage.content.innerHTML += editPageContentHTML( {
                                flag:       ( editPageItem.flag ) ? this.flag[ languageId ] : null,
                                value:    elementContent,
                                placeholder,
                                name:       elementName,
                                type:       editPageItem.type,
                            } );
                        } );
                        break;
                    case 'time':
                        let elementFrom = '';
                        if ( buttonType === 'modify' ) {
                            const data = info.res[ this.config.languageId ][ info.dbTable ][ info.index ].from;
                            elementFrom = ( ValidateUtils.isPositiveInteger( data ) ) ? elementFrom : data;
                        }

                        const elementTo = '';
                        if ( buttonType === 'modify' ) {
                            const data = info.res[ this.config.languageId ][ info.dbTable ][ info.index ].to;
                            elementFrom = ( ValidateUtils.isPositiveInteger( data ) ) ? elementTo : data;
                        }

                        const elementNameFrom = name[ buttonType ]( {
                            dbTable:     info.dbTable,
                            dbTableItem: 'from',
                            languageId:  this.config.languageId,
                            id:          ( buttonType === 'modify' ) ? info.id : null,
                        } );

                        const elementNameTo = name[ buttonType ]( {
                            dbTable:     info.dbTable,
                            dbTableItem: 'from',
                            languageId:  this.config.languageId,
                            id:          ( buttonType === 'modify' ) ? info.id : null,
                        } );

                        editPage.content.innerHTML += editPageContentHTML( {
                            from:       this.i18n[ this.config.languageId ].time.from,
                            to:         this.i18n[ this.config.languageId ].time.to,
                            fromValue:  elementFrom,
                            toValue:    elementTo,
                            nameFrom:   elementNameFrom,
                            nameTo:     elementNameTo,
                            type:        editPageItem.type,
                        } );
                        break;
                    case 'local-topic':
                        editPage.content.innerHTML += editPageContentHTML( {
                            localTopic: this.i18n[ this.config.languageId ][ info.dbTable ][ editPageItem.dbTableItem ],
                            type:        editPageItem.type,
                        } );
                        break;
                    case 'dropdown':
                        let top;
                        if ( buttonType === 'modify' ) {
                            if ( isProfile )
                                top = nationUtils.i18n[ this.config.languageId ][ nationUtils.map[ info.res[ this.config.languageId ].profile.nation ] ];
                            else {
                                const degree = info.res[ this.config.languageId ][ info.dbTable ][ info.index ].degree;
                                top = degreeUtils.i18n[ this.config.languageId ][ degreeUtils.map[ degree ] ];
                            }
                        }
                        else if ( isProfile )
                            top = nationUtils.i18n[ this.config.languageId ][ nationUtils.map[ 0 ] ];
                        else
                            top = degreeUtils.i18n[ this.config.languageId ][ degreeUtils.map[ 0 ] ];

                        const elementName = name[ buttonType ]( {
                            dbTable:     info.dbTable,
                            dbTableItem: editPageItem.dbTableItem,
                            languageId:  this.config.languageId,
                            id:          ( buttonType === 'modify' ) ? info.id : null,
                        } );

                        let value = 0;
                        if ( buttonType === 'modify' ) {
                            if ( isProfile )
                                value = info.res[ this.config.languageId ].profile.nation;
                            else
                                value = info.res[ this.config.languageId ][ info.dbTable ][ info.index ][ editPageItem.dbTableItem ];
                        }

                        editPage.content.innerHTML += editPageContentHTML( {
                            top,
                            data:    editPageItem.dropdownItem,
                            name:    elementName,
                            value,
                            type:    'dropdown',
                        } );
                        const dropdownTop = editPage.content.querySelector( '.input__dropdown > .dropdown__top' );
                        const dropdownItems = editPage.content.querySelectorAll( '.input__dropdown > .dropdown__button > .button__content > .content__item' );
                        const dropdownSubmit = editPage.content.querySelector( '.input__dropdown > .dropdown__button > .button__submit' );
                        dropdownTop.addEventListener( 'click', () => {
                            classAdd( editPage.content.querySelector( '.input__dropdown > .dropdown__button' ), 'dropdown__button--active' );
                        } );
                        dropdownItems.forEach( ( item ) => {
                            item.addEventListener( 'click', ( element ) => {
                                const newValue = element.target.getAttribute( 'value' );
                                if ( isProfile ) {
                                    dropdownTop.innerHTML = nationUtils.i18n[ this.config.languageId ][ newValue ];
                                    dropdownSubmit.value = nationUtils.map.indexOf( newValue );
                                }
                                else {
                                    dropdownTop.innerHTML = degreeUtils.i18n[ this.config.languageId ][ newValue ];
                                    dropdownSubmit.value = degreeUtils.map.indexOf( newValue );
                                }
                                classRemove( editPage.content.querySelector( '.input__dropdown > .dropdown__button' ), 'dropdown__button--active' );
                            } );
                        } );
                        break;
                    default:
                        break;
                }
            } );
            editPage.cancel.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                this.closeEditPageWindow();
            } );
            editPage.check.addEventListener( 'click', async () => {
                await this.setData();
                this.closeEditPageWindow();
            } );
        }
        catch ( err ) {
            console.log( err );
        }
    }

    async render ( info ) {
        this.renderWindow( info );
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
            dbTableItem:  info.dbTableItem,
            dropdownItem: info.dropdownItem,
        },
    };

    return typeObj[ info.type ];
}

export default EditPage;
export {
    EditPage,
    editPageType,
};

