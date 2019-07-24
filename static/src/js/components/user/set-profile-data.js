import { editPageType, EditPage, } from 'static/src/js/components/user/edit-page.js';
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

export default class SetProfileData {
    constructor ( opt ) {
        opt = opt || {};

        if (
            !opt.profileDOM ||
            !ValidateUtils.isDomElement( opt.profileDOM ) ||
            !ValidateUtils.isDomElement( opt.editPageDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId ) ||
            !ValidateUtils.isValidId( opt.profileId )
        )
            throw new TypeError( 'invalid arguments' );

        this.DOM = {
            profile:  opt.profileDOM,
            editPage: opt.editPageDOM,
        };

        this.config = {
            dbTable:    'profile',
            languageId: opt.languageId,
            profileId:  opt.profileId,
        };

        this.selector = {
            node:   block => `.profile__${ block }`,
            text:   block => `.profile__input-block--${ block } > .input-block__block > .block__content > .content__word`,
            update: block => `.profile__input-block--${ block } > .input-block__block > .block__content > .content__modify`,
        };

        this.editPageConfig = Object.freeze( {
            name: [
                editPageType( {
                    type:        'text',
                    dbTableItem: 'name',
                    i18n:        true,
                } ),
            ],
            officeAddress: [
                editPageType( {
                    type:        'text',
                    dbTableItem: 'officeAddress',
                    i18n:        true,
                } ),
            ],
            labName: [
                editPageType( {
                    type:        'text',
                    dbTableItem: 'labName',
                    i18n:        true,
                } ),
            ],
            labAddress:  [
                editPageType( {
                    type:        'text',
                    dbTableItem: 'labAddress',
                    i18n:        true,
                } ),
            ],
            labTel:  [
                editPageType( {
                    type:        'text',
                    dbTableItem: 'labTel',
                    i18n:        false,
                } ),
            ],
            labWeb:  [
                editPageType( {
                    type:        'text',
                    dbTableItem: 'labWeb',
                    i18n:        false,
                } ),
            ],
            officeTel: [
                editPageType( {
                    type:        'text',
                    dbTableItem: 'officeTel',
                    i18n:        false,
                } ),
            ],
            email:    [
                editPageType( {
                    type:        'text',
                    dbTableItem: 'email',
                    i18n:        false,
                } ),
            ],
            fax:    [
                editPageType( {
                    type:        'text',
                    dbTableItem: 'fax',
                    i18n:        false,
                } ),
            ],
            personalWeb:  [
                editPageType( {
                    type:        'text',
                    dbTableItem: 'personalWeb',
                    i18n:        false,
                } ),
            ],
            nation: [
                editPageType( {
                    type:         'dropdown',
                    dbTableItem:  'nation',
                    dropdownItem: nationUtils.i18n[ opt.languageId ],
                } ),
            ],
        } );

        this.classModifier = Object.freeze( {
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
        } );

        this.i18n = Object.freeze( {
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                topic: {
                    name:          'name',
                    nation:        'naiton',
                    officeAddress: 'office address',
                    officeTel:     'office tel',
                    labName:       'lab name',
                    labAddress:    'lab address',
                    labTel:        'lab tel',
                    labWeb:        'lab web',
                    email:         'email',
                    personalWeb:   'personal web',
                    fax:           'fax',
                },
                default: {
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
            },
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                topic: {
                    name:          '姓名',
                    nation:        '國籍',
                    officeAddress: '辦公室位置',
                    officeTel:     '辦公室電話',
                    labName:       '實驗室名稱',
                    labAddress:    '實驗室位置',
                    labTel:        '實驗室電話',
                    labWeb:        '實驗室網站',
                    email:         'email',
                    personalWeb:   '個人網站',
                    fax:           '傳真',
                },
                default: {
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
            },
        } );

        this.imageDOM = {
            block:   opt.profileDOM.querySelector( '.profile__image' ),
            button:  opt.profileDOM.querySelector( '.profile__image > .image__frame > .frame__upload' ),
            preview: opt.profileDOM.querySelector( '.profile__image > .image__frame' ),
        };

        this.department = Array
        .from( opt.profileDOM.querySelectorAll( `.input-block > .input-block__block > .block__content > .content__tag--department` ) )
        .map( node => ( {
            node,
            classModifier: 'department',
            selected:      false,
            id:            node.getAttribute( 'data-department-id' ),
        } ) );

        this.researchGroup = Array
        .from( opt.profileDOM.querySelectorAll( `.input-block > .input-block__block > .block__content > .content__tag--research` ) )
        .map( node => ( {
            node,
            classModifier: 'research',
            selected:      false,
            id:            node.getAttribute( 'data-research-id' ),
        } ) );
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
        const res = {
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: await this.fetchData( LanguageUtils.getLanguageId( 'en-US' ) ),
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: await this.fetchData( LanguageUtils.getLanguageId( 'zh-TW' ) ),
        };

        for ( const [ key,
            value, ] of Object.entries( this.classModifier ) ) {
            const textDOM = this.DOM.profile.querySelector( this.selector.text( value ) );

            textDOM.innerHTML = res[ this.config.languageId ].profile[ key ];
            if ( key === 'nation' )
                textDOM.innerHTML = nationUtils.i18n[ this.config.languageId ][ nationUtils.map[ res[ this.config.languageId ].profile.nation ] ];

            /*
            This.DOM.profile[ key ].modifier.addEventListener( 'click', async () => {
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
            */
        }

        this.setTags( res[ this.config.languageId ] );
        this.setImage( res[ this.config.languageId ].profile );
    }

    setImage ( res ) {
        try {
            if ( ValidateUtils.isValidString( res.photo ) ) {
                const photoUrl = `${ host }/static/image/faculty/${ res.photo }`;
                this.imageDOM.preview.style.backgroundImage = `url('${ photoUrl }')`;
                this.imageDOM.button.name = `modify_profile_photo_0_${ this.config.profileId }`;
                this.imageDOM.button.setAttribute( 'method', 'update' );
                this.imageDOM.button.setAttribute( 'dbTable', 'profile' );
                this.imageDOM.button.setAttribute( 'dbTableItem', 'photo' );
                this.imageDOM.button.setAttribute( 'languageId', this.config.languageId );
                this.imageDOM.button.setAttribute( 'id', this.config.profileId );
                this.imageDOM.block.action = `${ host }/user/profile`;
            }

            this.imageDOM.button.addEventListener( 'change', () => {
                const input = this.imageDOM.button;
                if ( input.files && input.files[ 0 ] ) {
                    const reader = new FileReader();

                    reader.onload = ( e ) => {
                        this.imageDOM.preview.style.backgroundImage = `url('${ e.target.result }')`;
                    };
                    reader.readAsDataURL( input.files[ 0 ] );
                }
            } );
        }
        catch ( err ) {
            console.error( err );
        }
    }

    setTags ( res ) {
        [ 'department',
            'researchGroup', ].forEach( ( dbTable ) => {
            res[ dbTable ].forEach( ( element ) => {
                classAdd( this[ dbTable ][ element.type ].node, `content__tag--${ this[ dbTable ][ element.type ].classModifier }--active` );
                this[ dbTable ][ element.type ].selected = true;
            } );
            this[ dbTable ].forEach( ( element ) => {
                element.node.addEventListener( 'click', () => {
                    const data = {};
                    const method = ( element.selected ) ? 'delete' : 'add';
                    fetch( `${ host }/user/profile`, {
                        method:   'POST',
                        mode:     'cors',
                        body:   JSON.stringify( {
                            method,
                            dbTable,
                            type: element.id,
                            id:   this.config.profileId,
                        } ),
                    } )
                    .then( ( res ) => {
                        if ( element.selected ) {
                            classRemove( element.node, `content__tag--${ this[ dbTable ][ element.id ].classModifier }--active` );
                            element.selected = false;
                        }
                        else {
                            classAdd( element.node, `content__tag--${ this[ dbTable ][ element.id ].classModifier }--active` );
                            element.selected = true;
                        }
                    } )
                    .catch( ( err ) => {
                        console.error( err );
                    } );
                } );
            } );
        } );
    }

    async exec () {
        console.log( this.fetchData( this.config.languageId ) );
        await this.setData();
    }
}
