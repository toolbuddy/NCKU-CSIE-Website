import WebLanguageUtils from 'static/src/js/utils/language.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';
import dynamicInputBlock from 'static/src/pug/components/user/dynamic-input-block.pug';
import LanguageUtils from 'models/common/utils/language.js';
import editPageHTML from 'static/src/pug/components/user/edit-page.pug';
import editPageContentHTML from 'static/src/pug/components/user/edit-page-content.pug';
import degreeUtils from 'models/faculty/utils/degree.js';
import nationUtils from 'models/faculty/utils/nation.js';

export default class GetUserDetail_NEW {
    constructor ( opt ) {
        opt = opt || {};

        if (
            !opt.profileDOM ||
            !ValidateUtils.isDomElement( opt.profileDOM ) ||
            !ValidateUtils.isDomElement( opt.educationDOM ) ||
            !ValidateUtils.isDomElement( opt.experienceDOM ) ||
            !ValidateUtils.isDomElement( opt.editPageDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId )
        )
            throw new TypeError( 'invalid arguments' );

        this.config = {
            profileId:  opt.profileId,
            languageId: opt.languageId,
        };

        this.status = {
            isAddEventListener: false,
        };

        const profileQuerySelector = block => `.profile__${ block }`;
        const profileTextQuerySelector = block => `.profile__input-block--${ block } > .input-block__block > .block__content > .content__word`;
        const profileModifyQuerySelector = block => `.profile__input-block--${ block } > .input-block__block > .block__content > .content__modify`;
        this.modifyButtonQuerySelector = ( block, id ) => `.input-block__block > .block__content > .content__modify--${ block }-${ id }`;
        this.removeButtonQuerySelector = ( block, id ) => `.input-block__block > .block__content > .content__remove--${ block }-${ id }`;

        this.flag = {
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: `${ host }/static/image/icon/tw.png`,
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: `${ host }/static/image/icon/us.png`,
        };

        this.editPageType = {
            text:  ( i18n, dbTableItem ) => {
                if ( i18n ) {
                    return {
                        type:       'text',
                        languageId: LanguageUtils.supportedLanguageId,
                        dbTableItem,
                        flag:       true,
                    };
                }
                return {
                    type:       'text',
                    languageId: [ this.config.languageId, ],
                    dbTableItem,
                    flag:       false,
                };
            },
            time: {
                type: 'time',
            },
            localTopic: dbTableItem => ( {
                dbTableItem,
                type:    'local-topic',
            } ),
            dropdown: ( dbTableItem, dropdownItem ) => ( {
                dbTableItem,
                dropdownItem,
                type: 'dropdown',
            } ),
        };

        this.classModifier = {
            name:          'name',
            officeAddress:  'office-location',
            labName:       'lab-name',
            labAddress:    'lab-location',
            labTel:        'lab-tel',
            labWeb:        'lab-web',
            officeTel:     'office-tel',
            email:         'email',
            fax:           'fax',
            personalWeb:   'personal-web',
            nation:        'nation',
        };

        this.editPage = {
            profile: {
                name: [
                    this.editPageType.text( true, 'name' ),
                ],
                officeAddress: [
                    this.editPageType.text( true, 'officeAddress' ),
                ],
                labName:       [
                    this.editPageType.text( true, 'labName' ),
                ],
                labAddress:  [
                    this.editPageType.text( true, 'labAddress' ),
                ],
                labTel:  [
                    this.editPageType.text( false, 'labTel' ),
                ],
                labWeb:  [
                    this.editPageType.text( false, 'labWeb' ),
                ],
                officeTel: [
                    this.editPageType.text( false, 'officeTel' ),
                ],
                email:    [
                    this.editPageType.text( false, 'email' ),
                ],
                fax:    [
                    this.editPageType.text( false, 'fax' ),
                ],
                personalWeb:  [
                    this.editPageType.text( false, 'personalWeb' ),
                ],
                nation: [
                    this.editPageType.dropdown( 'nation', nationUtils.i18n[ this.config.languageId ] ),
                ],
            },
            title: [
                this.editPageType.text( true, 'title' ),
            ],
            specialty: [
                this.editPageType.text( true, 'specialty' ),
            ],
            education: [
                this.editPageType.time,
                this.editPageType.localTopic( 'school' ),
                this.editPageType.text( true, 'school' ),
                this.editPageType.localTopic( 'major' ),
                this.editPageType.text( true, 'major' ),
                this.editPageType.localTopic( 'degree' ),
                this.editPageType.dropdown( 'degree', degreeUtils.i18n[ this.config.languageId ] ),
            ],
            experience: [
                this.editPageType.time,
                this.editPageType.localTopic( 'organization' ),
                this.editPageType.text( true, 'organization' ),
                this.editPageType.localTopic( 'department' ),
                this.editPageType.text( true, 'department' ),
                this.editPageType.localTopic( 'title' ),
                this.editPageType.text( true, 'title' ),
            ],
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
                    name:          'name',
                    nation:        'naiton',
                    title:         'title',
                    specialty:     'specialty',
                    officeAddress: 'office address',
                    officeTel:     'office tel',
                    labName:       'lab name',
                    labAddress:    'lab address',
                    labTel:        'lab tel',
                    labWeb:        'lab web',
                    email:         'email',
                    personalWeb:   'personal web',
                    fax:           'fax',
                    education:     'education',
                    experience:    'experience',
                },
                education: {
                    degree: 'degree',
                    school: 'school',
                    major:  'major',
                },
                experience: {
                    organization: 'organization',
                    department:   'department',
                    title:        'title',
                },
                default: {
                    profile: {
                        name:          'ex. Sam Wang',
                        officeAddress: 'ex. 65xxx, 12F, CSIE new building',
                        officeTel:     'ex. 06-xxxxxxx',
                        labName:       'please input your lab name',
                        labAddress:    'ex. 65xxx, 5F, CSIE new building',
                        labTel:        'ex. 06-xxxxxxx',
                        labWeb:        'ex. https//xxxxxxxxx',
                        email:         'ex. example@xxxxxxxx',
                        personalWeb:   'ex. https//xxxxxxxxx',
                        fax:           'please input your fax number',
                        nation:        0,
                    },
                    title: {
                        title:        'ex. Professor',
                    },
                    specialty: {
                        specialty:    'ex. Machine Learning',
                    },
                    experience: {
                        degree:       0,
                        organization: 'ex. Nation Cheng Kung University',
                        department:   'ex. CSIE',
                        title:        'ex. Professor',
                    },
                    education: {
                        school:       'ex. Nation Cheng Kung University',
                        major:        'ex. CSIE',
                    },
                },
                time: {
                    from: 'from',
                    to:   'to',
                },
                modify: 'update your ',
                add:    'add your ',
                remove: 'delete your ',
            },
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                button: {
                    add:    '新增',
                    remove: '刪除',
                    modify: '編輯',
                    cancel: '取消',
                    check:  '確認',
                },
                topic: {
                    name:          '姓名',
                    nation:        '國籍',
                    title:         '職稱',
                    specialty:     '專長領域',
                    officeAddress: '辦公室位置',
                    officeTel:     '辦公室電話',
                    labName:       '實驗室名稱',
                    labAddress:    '實驗室位置',
                    labTel:        '實驗室電話',
                    labWeb:        '實驗室網站',
                    email:         'email',
                    personalWeb:   '個人網站',
                    fax:           '傳真',
                    education:     '學歷',
                    experience:    '經歷',
                },
                education: {
                    degree: '學位',
                    school: '學校',
                    major:  '主修',
                },
                experience: {
                    organization: '任職單位',
                    department:   '任職部門',
                    title:        '職位',
                },
                default: {
                    profile: {
                        name:          'ex. 王小明',
                        officeAddress: 'ex. 資訊系新館 65xxx',
                        officeTel:     'ex. 06-xxxxxxx',
                        labName:       'ex. xxx實驗室',
                        labAddress:    'ex. 資訊系新館 65xxx',
                        labTel:        'ex. 06-xxxxxxx',
                        labWeb:        'ex. https//xxxxxxxxx',
                        email:         'ex. example@xxxxxxxx',
                        personalWeb:   'ex. https//xxxxxxxxx',
                        fax:           '請輸入您的傳真號碼',
                    },
                    title:  {
                        title:      'ex. 教授',
                    },
                    specialty:  {
                        specialty: 'ex. 機器學習',
                    },
                    experience: {
                        organization: 'ex. 國立成功大學',
                        department:   'ex. 資訊工程學系',
                        title:        'ex. 教授',
                    },
                    education: {
                        school:       'ex. 國立成功大學',
                        major:        'ex. 資訊工程學系',
                    },
                },
                time: {
                    from: '從',
                    to:   '到',
                },
                modify: '變更您的',
                add:    '新增您的',
                remove: '刪除您的',
            },
        } );

        this.DOM = {
            block: {
                title:      opt.profileDOM.querySelector( profileQuerySelector( 'title' ) ),
                specialty:  opt.profileDOM.querySelector( profileQuerySelector( 'specialty' ), ),
                education:  opt.educationDOM,
                experience: opt.experienceDOM,
                editPage:   opt.editPageDOM,
            },
            add: {
                title:      opt.profileDOM.querySelector( '.title__local-topic > .local-topic__add > .add__button' ),
                specialty:  opt.profileDOM.querySelector( '.specialty__local-topic > .local-topic__add > .add__button' ),
                education:  opt.educationAddDOM,
                experience: opt.experienceAddDOM,
            },
            profile:      {},
            nation:       opt.profileDOM.querySelector( profileQuerySelector( 'nation' ) ),
            nationText:   opt.profileDOM.querySelector( profileTextQuerySelector( 'nation' ) ),
            nationModify: opt.profileDOM.querySelector( profileModifyQuerySelector( 'nation' ) ),
        };

        Object.keys( this.classModifier ).forEach( ( key ) => {
            this.DOM.profile[ key ] = {},
            this.DOM.profile[ key ].text = opt.profileDOM.querySelector( profileTextQuerySelector( this.classModifier[ key ] ) );
            this.DOM.profile[ key ].modifier = opt.profileDOM.querySelector( profileModifyQuerySelector( this.classModifier[ key ] ) );
        } );

        this.DOM.profile.image = {
            block:   opt.profileDOM.querySelector( '.profile__image' ),
            button:  opt.profileDOM.querySelector( '.profile__image > .image__frame > .frame__upload' ),
            preview: opt.profileDOM.querySelector( '.profile__image > .image__frame' ),
        };

        this.DOM.department = Array
        .from( opt.profileDOM.querySelectorAll( `.input-block > .input-block__block > .block__content > .content__tag--department` ) )
        .map( node => ( {
            node,
            classModifier: 'department',
            selected:      false,
            id:            node.getAttribute( 'data-department-id' ),
        } ) );

        this.DOM.researchGroup = Array
        .from( opt.profileDOM.querySelectorAll( `.input-block > .input-block__block > .block__content > .content__tag--research` ) )
        .map( node => ( {
            node,
            classModifier: 'research',
            selected:      false,
            id:            node.getAttribute( 'data-research-id' ),
        } ) );
    }

    async setEditPageWindow ( dbItem, buttonType ) {
        try {
            classRemove( this.DOM.block.editPage, 'content__edit-page--hidden' );
            this.DOM.block.editPage.innerHTML = '';
            this.DOM.block.editPage.innerHTML += editPageHTML( {
                url:    `${ host }/user/profile`,
                cancel: this.i18n[ this.config.languageId ].button.cancel,
                check:  this.i18n[ this.config.languageId ].button.check,
                topic:  `${ this.i18n[ this.config.languageId ][ buttonType ] }${ this.i18n[ this.config.languageId ].topic[ dbItem ] }`,
            } );
            return {
                content: this.DOM.block.editPage.querySelector( '.edit-page__window > .window__form > .form__content > .content__info' ),
                check:   this.DOM.block.editPage.querySelector( '.edit-page__window > .window__form > .form__button > .button__item--check' ),
                cancel:  this.DOM.block.editPage.querySelector( '.edit-page__window > .window__form > .form__button > .button__item--cancel' ),
            };
        }
        catch ( err ) {
            console.log( err );
        }
    }

    closeEditPageWindow () {
        classAdd( this.DOM.block.editPage, 'content__edit-page--hidden' );
    }

    setImage ( res ) {
        try {
            if ( ValidateUtils.isValidString( res.profile.photo ) ) {
                const photoUrl = `${ host }/static/image/faculty/${ res.profile.photo }`;
                this.DOM.profile.image.preview.style.backgroundImage = `url('${ photoUrl }')`;
                this.DOM.profile.image.button.name = `modify_profile_photo_0_${ this.config.profileId }`;
                this.DOM.profile.image.block.action = `${ host }/user/profile`;
            }

            this.DOM.profile.image.button.addEventListener( 'change', () => {
                const input = this.DOM.profile.image.button;
                if ( input.files && input.files[ 0 ] ) {
                    const reader = new FileReader();

                    reader.onload = ( e ) => {
                        this.DOM.profile.image.preview.style.backgroundImage = `url('${ e.target.result }')`;
                    };
                    reader.readAsDataURL( input.files[ 0 ] );
                }
            } );
        }
        catch ( err ) {
            console.log( err );
        }
    }

    setTags ( res ) {
        [ 'department',
            'researchGroup', ].forEach( ( dbTable ) => {
            res[ dbTable ].forEach( ( element ) => {
                classAdd( this.DOM[ dbTable ][ element.type ].node, `content__tag--${ this.DOM[ dbTable ][ element.type ].classModifier }--active` );
                this.DOM[ dbTable ][ element.type ].selected = true;
            } );
            this.DOM[ dbTable ].forEach( ( element ) => {
                element.node.addEventListener( 'click', () => {
                    const data = {};
                    if ( element.selected ) {
                        classRemove( element.node, `content__tag--${ this.DOM[ dbTable ][ element.id ].classModifier }--active` );
                        element.selected = false;
                        const name = `delete_${ dbTable }_${ this.config.profileId }`;
                        Object.defineProperty( data, name, {
                            value: element.id,
                        } );
                        fetch( `${ host }/user/profile`, {
                            method:   'POST',
                            mode:     'cors',
                            body:   JSON.stringify( {
                                test: 'haha',
                                haha: 'test',
                            } ),
                        } );
                    }
                    else {
                        classAdd( element.node, `content__tag--${ this.DOM[ dbTable ][ element.id ].classModifier }--active` );
                        element.selected = true;
                        const name = `add_${ dbTable }_${ this.config.profileId }`;
                        Object.defineProperty( data, name, {
                            value: element.id,
                        } );
                    }
                } );
            } );
        } );
    }

    renderInputBlock ( info ) {
        try {
            const data = {
                info,
                button:   {
                    remove: this.i18n[ this.config.languageId ].button.remove,
                    modify: this.i18n[ this.config.languageId ].button.modify,
                    add:    this.i18n[ this.config.languageId ].button.add,
                },
            };
            data.info.DOM.innerHTML += dynamicInputBlock( {
                data,
            } );
        }
        catch ( err ) {
            console.error( err );
        }
    }

    async setEditPageItems ( info, buttonType ) {
        try {
            const isProfile = ( info.dbTable === 'profile' ) ? true : false;
            const editPage = await this.setEditPageWindow( ( isProfile ) ? info.dbTableItem : info.dbTable, buttonType );
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

    async setEditPageInput ( dbTable, id ) {
        try {
            const res = {
                [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: await this.fetchData( LanguageUtils.getLanguageId( 'zh-TW' ) ),
                [ LanguageUtils.getLanguageId( 'en-US' ) ]: await this.fetchData( LanguageUtils.getLanguageId( 'en-US' ) ),
            };

            this.DOM.add[ dbTable ].addEventListener( 'click', async () => {
                this.setEditPageItems( {
                    dbTable,
                }, 'add' );
            } );

            res[ this.config.languageId ][ dbTable ].forEach( ( dbTableElement, index ) => {
                const modifyButtonDOM = this.DOM.block[ dbTable ].querySelector( this.modifyButtonQuerySelector( dbTable, dbTableElement[ id ] ) );
                const removeButtonDOM = this.DOM.block[ dbTable ].querySelector( this.removeButtonQuerySelector( dbTable, dbTableElement[ id ] ) );

                modifyButtonDOM.addEventListener( 'click', async () => {
                    this.setEditPageItems( {
                        index,
                        dbTable,
                        id: dbTableElement[ id ],
                        res,
                    }, 'modify' );
                } );

                removeButtonDOM.addEventListener( 'click', async () => {
                    this.setEditPageItems( {
                        index,
                        dbTable,
                        id: dbTableElement[ id ],
                        res,
                    }, 'remove' );
                } );
            } );
        }
        catch ( err ) {
            console.log( err );
        }
    }

    queryApi ( lang ) {
        return `${ host }/api/faculty/facultyWithId/${ this.config.profileId }?languageId=${ lang }`;
    }

    async fetchData ( lang ) {
        try {
            const res = await fetch( this.queryApi( lang ) );

            if ( !res.ok )
                throw new Error( 'No faculty found' );

            return res.json();
        }
        catch ( err ) {
            throw err;
        }
    }

    async setData () {
        const res = await this.fetchData( this.config.languageId );

        Object.keys( this.classModifier ).forEach( ( key ) => {
            this.DOM.profile[ key ].text.innerHTML = res.profile[ key ];
            if ( key === 'nation' )
                this.DOM.profile[ key ].text.innerHTML = nationUtils.i18n[ this.config.languageId ][ nationUtils.map[ res.profile.nation ] ];
            if ( !this.status.isAddEventListener ) {
                this.DOM.profile[ key ].modifier.addEventListener( 'click', async () => {
                    const data = {
                        [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: await this.fetchData( LanguageUtils.getLanguageId( 'zh-TW' ) ),
                        [ LanguageUtils.getLanguageId( 'en-US' ) ]: await this.fetchData( LanguageUtils.getLanguageId( 'en-US' ) ),
                    };
                    this.setEditPageItems( {
                        dbTable:     'profile',
                        dbTableItem: key,
                        id:          this.config.profileId,
                        res:         data,
                    }, 'modify' );
                } );
            }
        } );

        this.setTags( res );
        this.setImage( res );

        await this.renderTitleInputBlock( res.title );
        await this.renderSpecialtyInputBlock( res.specialty );
        await this.renderEducationInputBlock( res.education );
        await this.renderExperienceInputBlock( res.experience );

        await this.setEditPageInput( 'title', 'titleId' );
        await this.setEditPageInput( 'specialty', 'specialtyId' );
        await this.setEditPageInput( 'education', 'educationId' );
        await this.setEditPageInput( 'experience', 'experienceId' );

        this.status.isAddEventListener = true;
    }

    async renderTitleInputBlock ( res ) {
        try {
            this.DOM.block.title.innerHTML = '';
            res.forEach( ( res, index ) => {
                this.renderInputBlock( {
                    modifier: 'title',
                    id:       res.titleId,
                    index,
                    content:  res.title,
                    topic:    this.i18n[ this.config.languageId ].topic.title,
                    DOM:      this.DOM.block.title,
                } );
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    async renderSpecialtyInputBlock ( res ) {
        try {
            this.DOM.block.specialty.innerHTML = '';
            res.forEach( ( res, index ) => {
                this.renderInputBlock( {
                    modifier: 'specialty',
                    id:       res.specialtyId,
                    index,
                    content:  res.specialty,
                    topic:    this.i18n[ this.config.languageId ].topic.specialty,
                    DOM:      this.DOM.block.specialty,
                } );
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    async renderEducationInputBlock ( res ) {
        try {
            this.DOM.block.education.innerHTML = '';
            res.forEach( ( res, index ) => {
                this.renderInputBlock( {
                    modifier: 'education',
                    id:       res.educationId,
                    index,
                    content:  `${ res.school } ${ res.major } ${ degreeUtils.i18n[ this.config.languageId ][ degreeUtils.map[ res.degree ] ] }`,
                    topic:    '',
                    DOM:      this.DOM.block.education,
                } );
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    async renderExperienceInputBlock ( res ) {
        try {
            this.DOM.block.experience.innerHTML = '';
            res.forEach( ( res, index ) => {
                this.renderInputBlock( {
                    modifier: 'experience',
                    id:       res.experienceId,
                    index,
                    content:  `${ res.organization } ${ res.department } ${ res.title }`,
                    topic:    '',
                    DOM:      this.DOM.block.experience,
                } );
            } );
        }
        catch ( err ) {
            throw err;
        }
    }

    async exec () {
        console.log( this.fetchData( this.config.languageId ) );
        await this.setData();
    }
}
