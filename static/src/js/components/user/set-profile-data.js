import { renderEditPage, } from 'static/src/js/components/user/edit-page.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';
import nationUtils from 'models/faculty/utils/nation.js';
import { dataI18n, dataEditPageConfig, } from 'static/src/js/components/user/data-config.js';
import { arrayExpression, } from 'babel-types';

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

        textDOM.innerHTML = res[ this.config.languageId ].profile[ dbTableItem ];
        if ( dbTableItem === 'nation' )
            textDOM.innerHTML = nationUtils.i18n[ this.config.languageId ][ nationUtils.map[ res[ this.config.languageId ].profile.nation ] ];


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
        const editPageDOM = await renderEditPage( {
            blockDOM:       this.DOM.editPage,
            dbTable:        'profile',
            editPageConfig: this.editPageConfig[ dbTableItem ],
            languageId:     this.config.languageId,
            dataI18n:       tempDataI18n,
            data:           {
                [ LanguageUtils.getLanguageId( 'en-US' ) ]: res[ LanguageUtils.getLanguageId( 'en-US' ) ].profile,
                [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: res[ LanguageUtils.getLanguageId( 'zh-TW' ) ].profile,
            },
            buttonMethod: 'update',
        } );

        editPageDOM.cancel.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            this.closeEditPageWindow();
        } );
        editPageDOM.check.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            this.uploadProfileData( dbTableItem );
        } );
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
        .then( async ( res ) => {
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
        console.log( this.fetchData( this.config.languageId ) );
        await this.setData();
    }
}
