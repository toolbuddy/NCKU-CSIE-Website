import EditPage from 'static/src/js/components/user/edit-page.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';
import nationUtils from 'models/faculty/utils/nation.js';
import { dataI18n, dataEditPageConfig, } from 'static/src/js/components/user/data-config.js';
import validate from 'validate.js';

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

        this.editPageConfig = dataEditPageConfig.profile;

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

        this.i18n = dataI18n.profile;

        this.imageDOM = {
            block:   opt.profileDOM.querySelector( '.profile__image' ),
            button:  opt.profileDOM.querySelector( '.profile__image > .image__frame > .frame__upload' ),
            preview: opt.profileDOM.querySelector( '.profile__image > .image__frame' ),
        };

        this.department = Array
        .from( opt.profileDOM.querySelectorAll( '.input-block > .input-block__block > .block__content > .content__tag--department' ) )
        .map( node => ( {
            node,
            classModifier: 'department',
            selected:      false,
            id:            node.getAttribute( 'data-department-id' ),
        } ) );

        this.researchGroup = Array
        .from( opt.profileDOM.querySelectorAll( '.input-block > .input-block__block > .block__content > .content__tag--research' ) )
        .map( node => ( {
            node,
            classModifier: 'research',
            selected:      false,
            id:            node.getAttribute( 'data-research-id' ),
        } ) );
    }

    queryApi ( languageId ) {
        return `${ host }/api/faculty/facultyWithId/${ this.config.profileId }?languageId=${ languageId }`;
    }

    async fetchData ( languageId ) {
        try {
            const res = await fetch( this.queryApi( languageId ) );

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

        console.log( res );

        Object.keys( this.classModifier ).forEach( ( key ) => {
            this.setProfileBlock( key, res );
        } );

        this.setTags( res[ this.config.languageId ] );
        this.setImage( res[ this.config.languageId ].profile );
    }

    closeEditPageWindow () {
        classAdd( this.DOM.editPage, 'content__edit-page--hidden' );
    }

    setProfileBlock ( dbTableItem, res ) {
        const textDOM         = this.DOM.profile.querySelector( this.selector.text( this.classModifier[ dbTableItem ] ) );
        const updateButtonDOM = this.DOM.profile.querySelector( this.selector.update( this.classModifier[ dbTableItem ] ) );

        textDOM.textContent = res[ this.config.languageId ].profile[ dbTableItem ];
        if ( dbTableItem === 'nation' )
            textDOM.textContent = nationUtils.i18n[ this.config.languageId ][ nationUtils.map[ res[ this.config.languageId ].profile.nation ] ];


        updateButtonDOM.addEventListener( 'click', async () => {
            await this.setUpdateButtonEvent( dbTableItem, res );
        } );
    }

    async setUpdateButtonEvent ( dbTableItem, res ) {
        const tempDataI18n = {
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                default: {
                    [ dbTableItem ]: this.i18n[ LanguageUtils.getLanguageId( 'en-US' ) ].default[ dbTableItem ],
                },
                topic:   this.i18n[ LanguageUtils.getLanguageId( 'en-US' ) ].topic[ dbTableItem ],
            },
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]:  {
                default: {
                    [ dbTableItem ]: this.i18n[ LanguageUtils.getLanguageId( 'zh-TW' ) ].default[ dbTableItem ],
                },
                topic:   this.i18n[ LanguageUtils.getLanguageId( 'zh-TW' ) ].topic[ dbTableItem ],
            },
        };
        const editPage = new EditPage( {
            editPageDOM:    this.DOM.editPage,
            dbTable:        'profile',
            editPageConfig: this.editPageConfig[ dbTableItem ],
            languageId:     this.config.languageId,
            dataI18n:       tempDataI18n,
            dbData:           {
                [ LanguageUtils.getLanguageId( 'en-US' ) ]: res[ LanguageUtils.getLanguageId( 'en-US' ) ].profile,
                [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: res[ LanguageUtils.getLanguageId( 'zh-TW' ) ].profile,
            },
            buttonMethod: 'update',
        } );
        const editPageDOM = await editPage.renderEditPage();

        editPageDOM.cancel.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            this.closeEditPageWindow();
        } );
        editPageDOM.check.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            const isValid = this.checkSubmitData( editPageDOM.error );
            if ( isValid )
                this.uploadProfileData( dbTableItem );
        } );
    }

    checkSubmitData ( errorDOM ) {
        let isValid = true;
        const input = this.DOM.editPage.getElementsByTagName( 'input' );

        const constraints = {
            [ `name_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
                presence: {
                    allowEmpty: false,
                    message:    '中文姓名是必填欄位',
                },
            },
            [ `name_${ LanguageUtils.getLanguageId( 'en-US' ) }` ]: {
                presence: {
                    allowEmpty: false,
                    message:    '英文姓名是必填欄位',
                },
            },
            email: {
                presence: {
                    allowEmpty: false,
                    message:    'email是必填欄位',
                },
                email: {
                    message: 'email格式錯誤',
                },
            },
            fax: {
                format: {
                    pattern: '[0-9-()]+',
                    message: '傳真格式錯誤',
                },
            },
            personalWeb: {
                url: {
                    message:    '網址格式錯誤',
                },
            },
            [ `officeAddress_${ LanguageUtils.getLanguageId( 'zh-TW' ) }` ]: {
                presence: {
                    allowEmpty: false,
                    message:    '中文辦公室位置是必填欄位',
                },
            },
            officeTel: {
                format: {
                    pattern: '[0-9-(),]+',
                    message: '電話格式錯誤',
                },
            },
            labTel: {
                format: {
                    pattern: '[0-9-(),]+',
                    message: '電話格式錯誤',
                },
            },
            labWeb: {
                url: {
                    message: '網址格式錯誤',
                },
            },
        };

        Array.from( input ).forEach( ( element ) => {
            if ( constraints[ element.name ].presence !== null && element.value !== '' ) {
                const errors = validate.single( element.value, constraints[ element.name ] );
                if ( errors ) {
                    this.setErrorMessage( element, errors[ 0 ], errorDOM );
                    isValid = false;
                }
            }
        } );

        return isValid;
    }

    setErrorMessage ( inputDOM, errorMessage, errorDOM ) {
        inputDOM.focus();
        errorDOM.textContent = errorMessage;
    }

    async uploadProfileData ( dbTableItem ) {
        const input = this.DOM.editPage.getElementsByTagName( 'input' );
        const item = {};
        const i18n = {
            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {},
            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {},
        };
        Array.from( input ).forEach( ( element ) => {
            if ( element.getAttribute( 'type' ) === 'text' && element.getAttribute( 'i18n' ) !== null )
                i18n[ element.getAttribute( 'languageId' ) ][ element.getAttribute( 'dbTableItem' ) ] = element.value;
            else
                item[ element.getAttribute( 'dbTableItem' ) ] = element.value;
        } );

        fetch( `${ host }/user/profile`, {
            method:   'POST',
            body:   JSON.stringify( {
                'profileId':    this.config.profileId,
                'method':       'update',
                'dbTable':      'profile',
                item,
                i18n,
            } ),
        } )
        .then( async () => {
            const data = {
                [ LanguageUtils.getLanguageId( 'en-US' ) ]: await this.fetchData( LanguageUtils.getLanguageId( 'en-US' ) ),
                [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: await this.fetchData( LanguageUtils.getLanguageId( 'zh-TW' ) ),
            };
            this.setProfileBlock( dbTableItem, data );
            this.closeEditPageWindow();
        } ).catch( ( err ) => {
            this.closeEditPageWindow();
            console.error( err );
        } );
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
                    const method = ( element.selected ) ? 'delete' : 'add';
                    fetch( `${ host }/user/profile`, {
                        method:   'POST',
                        body:   JSON.stringify( {
                            profileId:     this.config.profileId,
                            method,
                            dbTable,
                            dbTableItemId: element.id,
                        } ),
                    } )
                    .then( () => {
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
        await this.setData();
    }
}
