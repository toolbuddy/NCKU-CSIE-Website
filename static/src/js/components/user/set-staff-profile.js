import EditPage from 'static/src/js/components/user/edit-page.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';
import nationUtils from 'models/faculty/utils/nation.js';
import dataI18n from 'static/src/js/components/user/static-data/data-i18n.js';
import dataEditPageConfig from 'static/src/js/components/user/static-data/data-edit-page-config.js';
import validationInfo from 'static/src/js/components/user/static-data/validation-info.js';
import validate from 'validate.js';

export default class SetStaffProfile {
    constructor ( opt ) {
        opt = opt || {};

        /***
         * Data validation
         * require data:
         * profileDOM:   DOM of profile information block
         * languageId:   Id  of languageId
         * profileId:    Id  of profileId
         */

        if (
            !opt.profileDOM ||
            !ValidateUtils.isDomElement( opt.profileDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId ) ||
            !ValidateUtils.isValidId( opt.profileId )
        )
            throw new TypeError( 'invalid arguments' );

        this.DOM = {
            profile:  opt.profileDOM,
        };

        this.config = {
            languageId: opt.languageId,
            profileId:  opt.profileId,
        };

        // Get edit-page config of profile
        this.editPageConfig = dataEditPageConfig.profile;

        this.isAddEventListener = {};

        this.imageDOM = {
            block:   opt.profileDOM.querySelector( '.profile__image' ),
            button:  opt.profileDOM.querySelector( '.profile__image > .image__frame > .frame__upload' ),
            preview: opt.profileDOM.querySelector( '.profile__image > .image__frame' ),
            check:   opt.profileDOM.querySelector( '.profile__image > .image__check' ),
            cancel:  opt.profileDOM.querySelector( '.profile__image > .image__cancel' ),
        };

        const selector = {
            text:     block => `.profile__input-block--${ block } > .input-block__block > .block__content > .content__word`,
            update:   block => `.profile__input-block--${ block } > .input-block__block > .block__content > .content__modify`,
        };
        this.updateButtonDOM = {};
        this.textDOM = {};

        // Store profile information block in this.textDOM[ dbTable ] and this.updateButtonDOM[ dbTable ]
        Object.keys( SetStaffProfile.classModifier() ).forEach( ( dbTableItem ) => {
            this.textDOM[ dbTableItem ] = opt.profileDOM.querySelector( selector.text( SetStaffProfile.classModifier()[ dbTableItem ] ) );
            this.updateButtonDOM[ dbTableItem ] = this.DOM.profile.querySelector( selector.update( SetStaffProfile.classModifier()[ dbTableItem ] ) );
        } );
    }

    queryApi ( languageId ) {
        // Return `${ host }/api/staff/miniProfile/${ this.config.profileId }?languageId=${ languageId }`;
        return `${ host }/api/staff?languageId=${ languageId }`;
    }

    async fetchData ( languageId ) {
        try {
            const res = await fetch( this.queryApi( languageId ) );
            console.log( res.json() );
            if ( !res.ok )
                throw new Error( 'No faculty found' );

            return res.json();
        }
        catch ( err ) {
            throw err;
        }
    }

    // Compare information class name and database table name
    static classModifier () {
        return {
            name:          'name',
            officeAddress: 'office-location',
            officeTel:     'office-tel',
            email:         'email',
        };
    }

    /***
     * Set all data of profile in database
     * ( include informating, department tags, researchGroup tags and image )
     */

    async setData () {
        try {
            // Get all language data
            Promise.all( LanguageUtils.supportedLanguageId.map( id => this.fetchData( id ) ) )
            .then( ( dbData ) => {
                // Set block information
                Object.keys( SetStaffProfile.classModifier() ).forEach( ( key ) => {
                    this.setProfileBlock( key, dbData );
                } );

                this.setTags( dbData[ this.config.languageId ] );
                this.setImage( dbData[ this.config.languageId ].profile );
            } );
        }
        catch ( err ) {
            console.error( err );
        }
    }

    closeEditPageWindow () {
        document.body.removeChild( document.getElementById( 'edit-page' ) );
    }

    /****
     * DbTable: string, database table name
     * dbData:  data of profile in database
     */

    setProfileBlock ( dbTable, dbData ) {
        const dbProfileData = dbData[ this.config.languageId ].profile;
        if ( dbProfileData[ dbTable ] !== null ) {
            this.textDOM[ dbTable ].textContent = dbProfileData[ dbTable ];
            if ( dbTable === 'nation' ) {
                const nationId = dbProfileData.nation;
                this.textDOM[ dbTable ].textContent = nationUtils.i18n[ this.config.languageId ][ nationUtils.map[ nationId ] ];
            }
        }
        else {
            this.textDOM[ dbTable ].textContent = '';
            if ( dbTable === 'nation' )
                this.textDOM[ dbTable ].textContent = nationUtils.i18n[ this.config.languageId ][ nationUtils.map[ nationUtils.default ] ];
        }

        this.updateButtonDOM[ dbTable ].addEventListener( 'click', async () => {
            await this.setUpdateButtonEvent( dbTable, dbData );
        } );
    }

    /****
     * DbTable: string, database table name
     * dbData:  data of profile in database
     */

    async setUpdateButtonEvent ( dbTable, dbData ) {
        const selector = {
            check:  '.edit-page__window > .window__form > .form__button > .button__item--check',
            cancel: '.edit-page__window > .window__form > .form__button > .button__item--cancel',
        };

        // Format data i18n for profile edit-page
        const tempDataI18n = LanguageUtils.supportedLanguageId.map( id => ( {
            default: {
                [ dbTable ]: dataI18n.profile[ id ].default[ dbTable ],
            },
            topic:   dataI18n.profile[ id ].topic[ dbTable ],
        } ) );

        // Check whether is addEventListener
        this.isAddEventListener[ dbTable ] = true;
        const editPage = new EditPage( {
            dbTable:        'profile',
            editPageConfig: this.editPageConfig[ dbTable ],
            languageId:     this.config.languageId,
            dataI18n:       tempDataI18n,
            dbData:         LanguageUtils.supportedLanguageId.map( id => dbData[ id ].profile ),
            buttonMethod:   'update',
        } );
        await editPage.renderEditPage();

        // After edit-page render, add event of that
        const editPageDOM = document.getElementById( 'edit-page' );
        const cancelDOM = editPageDOM.querySelector( selector.cancel );
        const checkDOM = editPageDOM.querySelector( selector.check );

        cancelDOM.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            this.closeEditPageWindow();
        } );
        checkDOM.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            const isValid = this.checkSubmitData();
            if ( isValid )
                this.uploadProfileData( dbTable );
        } );
    }

    /***
     * Validate data before submit
     * @returns boolean, whether the data is valid
     */

    checkSubmitData () {
        let isValid = true;
        const editPageDOM = document.getElementById( 'edit-page' );
        const input = editPageDOM.getElementsByTagName( 'input' );
        const errorSelector = '.edit-page__window > .window__form > .form__content > .content__error > .error__message';
        const errDOM = editPageDOM.querySelector( errorSelector );

        const constraints = validationInfo.profile;

        Array.from( input ).forEach( ( element ) => {
            if ( constraints[ element.name ].presence.allowEmpty === false || element.value !== '' ) {
                const errors = validate.single( element.value, constraints[ element.name ] );
                if ( errors ) {
                    this.setErrorMessage( element, errors[ 0 ], errDOM );
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
        const editPageDOM = document.getElementById( 'edit-page' );
        const input = editPageDOM.getElementsByTagName( 'input' );
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
            Promise.all( LanguageUtils.supportedLanguageId.map( id => this.fetchData( id ) ) )
            .then( ( dbData ) => {
                this.setProfileBlock( dbTableItem, dbData );
                this.closeEditPageWindow();
            } );
        } ).catch( ( err ) => {
            this.closeEditPageWindow();
            console.error( err );
        } );
    }

    setImage ( dbData ) {
        try {
            if ( ValidateUtils.isValidString( dbData.photo ) ) {
                const photoUrl = `${ host }/static/image/faculty/${ dbData.photo }`;
                this.imageDOM.preview.style.backgroundImage = `url('${ photoUrl }')`;
                this.imageDOM.button.name = `modify_profile_photo_0_${ this.config.profileId }`;
                this.imageDOM.block.action = `${ host }/user/profile`;
            }
            else
                this.imageDOM.preview.style.backgroundImage = '';

            classAdd( this.imageDOM.check, 'image__button--hide' );
            classAdd( this.imageDOM.cancel, 'image__button--hide' );
            classRemove( this.imageDOM.check, 'image__button--active' );
            classRemove( this.imageDOM.cancel, 'image__button--active' );

            if ( !this.isAddEventListener.imageCancel ) {
                this.imageDOM.cancel.addEventListener( 'click', async ( e ) => {
                    e.preventDefault();
                    const dbData = await this.fetchData( this.config.languageId );
                    const dbProfileData = dbData.profile;
                    this.setImage( dbProfileData );
                } );
                this.isAddEventListener.imageCancel = true;
            }

            if ( !this.isAddEventListener.imageChange ) {
                this.imageDOM.button.addEventListener( 'change', () => {
                    new Promise( async ( res, rej ) => {
                        const input = this.imageDOM.button;
                        if ( input.files && input.files[ 0 ] ) {
                            const reader = new FileReader();

                            reader.onload = ( e ) => {
                                this.imageDOM.preview.style.backgroundImage = `url('${ e.target.result }')`;
                            };
                            reader.onabort = ( ( err ) => {
                                rej( err );
                            } );
                            reader.readAsDataURL( input.files[ 0 ] );

                            const formData = new FormData();

                            formData.append( 'file', input.files[ 0 ] );

                            const result = await fetch( `${ host }/user/uploadPhoto`, {
                                credentials: 'include',
                                method:      'post',
                                body:        formData,
                            } );

                            res();
                        }
                    } )
                    .then( async () => {
                        classRemove( this.imageDOM.check, 'image__button--hide' );
                        classRemove( this.imageDOM.cancel, 'image__button--hide' );
                        classAdd( this.imageDOM.check, 'image__button--active' );
                        classAdd( this.imageDOM.cancel, 'image__button--active' );
                    } )
                    .catch( ( err ) => {
                        console.error( err );
                    } );
                } );
                this.isAddEventListener.imageChange = true;
            }
        }
        catch ( err ) {
            console.error( err );
        }
    }

    /***
     * Set department and researchGroup event
     * Submit its status when click
     */

    setTags ( dbData ) {
        [ 'department',
            'researchGroup', ].forEach( ( dbTable ) => {
            // Initialize selected tags
            dbData[ dbTable ].forEach( ( element ) => {
                classAdd( this[ dbTable ][ element.type ].node, `content__tag--${ this[ dbTable ][ element.type ].classModifier }--active` );
                this[ dbTable ][ element.type ].selected = true;
            } );

            // Add eventListener to all tags
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
