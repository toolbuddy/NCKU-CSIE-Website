import ValidateUtils from 'models/common/utils/validate.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import LanguageUtils from 'models/common/utils/language.js';
import { host, } from 'settings/server/config.js';
import profileErrorMessageUtils from 'models/staff/utils/profile-error-message.js';
import validate from 'validate.js';

export default class ProfileDataManagement {
    constructor ( opt ) {
        opt = opt || {};

        if (
            !ValidateUtils.isDomElement( opt.bodyFormDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId )
        )
            throw new TypeError( 'invalid arguments' );

        this.config = {
            languageId:   opt.languageId,
            dbTable:      'profile',
        };

        const formQuerySelector = modifier => `#form-${ modifier }-patch`;
        const patchButtonQuerySelector = modifier => `.profile-card > #profile-card__patch--${ modifier }`;
        const checkButtonQuerySelector = modifier => ` #form-${ modifier }-patch > .form-input__button > .button__check`;
        const cancelButtonQuerySelector = modifier => ` #form-${ modifier }-patch > .form-input__button > .button__cancel`;
        const inputQuerySelector = modifier => `input[ column-name = ${ modifier }]`;
        const errorMessageQuerySelector = modifier => ` #form-${ modifier }-patch > .form-input__content > .content__error-message`;
        const cardValueQuerySelector = modifier => `.profile-card > #profile-card__value--${ modifier }`;

        this.DOM = {
            formBackground: opt.bodyFormDOM,
            image:          {
                checkButton:  opt.porfileContentDOM.querySelector( ' .profile__image > .image__button--check ' ),
                cancelButton: opt.porfileContentDOM.querySelector( ' .profile__image > .image__button--cancel ' ),
                preview:      opt.porfileContentDOM.querySelector( ' .profile__image > .image__frame ' ),
                uploadButton: opt.porfileContentDOM.querySelector( ' .profile__image > .image__frame > .frame__upload ' ),
            },
        };

        this.imageFile = null;

        this.modifier = {
            name:          'name',
            email:         'email',
            officeAddress: 'office-address',
            officeTel:     'office-tel',
        };

        Object.keys( this.modifier ).forEach( ( key ) => {
            this.DOM[ key ] = {
                patchButton:  opt.porfileContentDOM.querySelector( patchButtonQuerySelector( this.modifier[ key ] ) ),
                cardValue:    opt.porfileContentDOM.querySelector( cardValueQuerySelector( this.modifier[ key ] ) ),
                form:         opt.bodyFormDOM.querySelector( formQuerySelector( key ) ),
                checkButton:  opt.bodyFormDOM.querySelector( checkButtonQuerySelector( key ) ),
                cancelButton: opt.bodyFormDOM.querySelector( cancelButtonQuerySelector( key ) ),
                input:        opt.bodyFormDOM.querySelectorAll( inputQuerySelector( key ) ),
                errorMessage: opt.bodyFormDOM.querySelector( errorMessageQuerySelector( key ) ),
            };
        } );

        this.constraints = {
            name: {
                nameTW: {
                    presence: {
                        allowEmpty: false,
                        message:    profileErrorMessageUtils.getValueByOption( {
                            option:     'nameTWBlank',
                            languageId: this.config.languageId,
                        } ),
                    },
                },
                nameEN: {
                    presence: {
                        allowEmpty: false,
                        message:    profileErrorMessageUtils.getValueByOption( {
                            option:     'nameENBlank',
                            languageId: this.config.languageId,
                        } ),
                    },
                },
            },
            officeAddress: {
                officeAddressTW: {
                    presence: {
                        allowEmpty: false,
                        message:    profileErrorMessageUtils.getValueByOption( {
                            option:     'officeAddressTWBlank',
                            languageId: this.config.languageId,
                        } ),
                    },
                },
                officeAddressEN: {
                    presence: {
                        allowEmpty: false,
                        message:    profileErrorMessageUtils.getValueByOption( {
                            option:     'officeAddressENBlank',
                            languageId: this.config.languageId,
                        } ),
                    },
                },
            },
            email: {
                email: {
                    presence: {
                        allowEmpty: false,
                        message:    profileErrorMessageUtils.getValueByOption( {
                            option:     'emailBlank',
                            languageId: this.config.languageId,
                        } ),
                    },
                },
            },
            officeTel: {
                officeTel: {
                    presence: {
                        allowEmpty: false,
                        message:    profileErrorMessageUtils.getValueByOption( {
                            option:     'officeTelBlank',
                            languageId: this.config.languageId,
                        } ),
                    },
                },
            },
        };
    }

    subscribeCancelButton () {
        Object.keys( this.modifier ).forEach( ( columnName ) => {
            this.DOM[ columnName ].cancelButton.addEventListener( 'click', ( e ) => {
                e.preventDefault();
                this.hideForm();
            } );
        } );
    }

    queryApi ( languageId ) {
        return `${ host }/api/staff/staffWithId/${ this.config.profileId }?languageId=${ languageId }`;
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

    subscribeUploadImageButton () {
        this.DOM.image.uploadButton.addEventListener( 'change', ( element ) => {
            const reader = new FileReader();

            reader.onload = ( e ) => {
                classAdd( this.DOM.image.checkButton, 'image__button--active' );
                classAdd( this.DOM.image.cancelButton, 'image__button--active' );
                this.DOM.image.preview.style.backgroundImage = `url('${ e.target.result }')`;
                this.imageFile = element.target.files[ 0 ];
            };

            reader.readAsDataURL( element.target.files[ 0 ] );
        } );
        this.DOM.image.checkButton.addEventListener( 'click', async ( e ) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append( 'file', this.imageFile );

            await fetch( `${ host }/user/uploadPhoto`, {
                credentials: 'include',
                method:      'post',
                body:        formData,
            } );

            classRemove( this.DOM.image.checkButton, 'image__button--active' );
            classRemove( this.DOM.image.cancelButton, 'image__button--active' );
        } );
        this.DOM.image.cancelButton.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            this.setProfileImage();
            classRemove( this.DOM.image.checkButton, 'image__button--active' );
            classRemove( this.DOM.image.cancelButton, 'image__button--active' );
        } );
    }

    subscribePatchButton () {
        Object.keys( this.modifier ).forEach( ( columnName ) => {
            this.DOM[ columnName ].patchButton.addEventListener( 'click', () => {
                Promise.all( LanguageUtils.supportedLanguageId.map( languageId => this.fetchData( languageId ) ) )
                .then( data => ( {
                    [ LanguageUtils.getLanguageId( 'en-US' ) ]: data[ LanguageUtils.getLanguageId( 'en-US' ) ].profile[ columnName ],
                    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: data[ LanguageUtils.getLanguageId( 'zh-TW' ) ].profile[ columnName ],
                } ) )
                .then( ( data ) => {
                    this.showPatchForm( data, columnName );
                } );
            } );
        } );
    }

    subscribePatchCheckButton () {
        Object.keys( this.modifier ).forEach( ( columnName ) => {
            this.DOM[ columnName ].checkButton.addEventListener( 'click', async ( e ) => {
                e.preventDefault();
                const isValid = await this.dataValidation( columnName );

                if ( isValid ) {
                    new Promise( ( res ) => {
                        const item = {};
                        const i18n = {
                            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {},
                            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {},
                        };
                        Array.from( this.DOM[ columnName ].input ).forEach( ( element ) => {
                            if ( element.getAttribute( 'input-type' ) === 'i18n-text' )
                                i18n[ element.getAttribute( 'languageid' ) ][ columnName ] = element.value;
                            else
                                item[ columnName ] = element.value;
                        } );

                        res( { item, i18n, } );
                    } )
                    .then( ( opt ) => {
                        fetch( `${ host }/user/staff/profile`, {
                            method:   'PATCH',
                            body:   JSON.stringify( {
                                profileId:     this.config.profileId,
                                method:        'update',
                                dbTable:       'profile',
                                item:      opt.item,
                                i18n:      opt.i18n,
                            } ),
                        } )
                        .then( () => {
                            this.updateCard( columnName );
                            this.hideForm();
                        } );
                    } );
                }
            } );
        } );
    }

    setProfileImage () {
        this.fetchData( this.config.languageId )
        .then( data => data.profile )
        .then( ( data ) => {
            if ( data.photo !== null ) {
                const photoUrl = `${ host }/static/image/staff/${ data.photo }`;
                this.DOM.image.preview.style.backgroundImage = `url('${ photoUrl }')`;
            }
        } );
    }

    updateCard ( columnName ) {
        this.fetchData( this.config.languageId )
        .then( data => data.profile[ columnName ] )
        .then( ( data ) => {
            this.DOM[ columnName ].cardValue.innerHTML = data;
        } );
    }

    showPatchForm ( data, columnName ) {
        Array.from( this.DOM[ columnName ].input ).forEach( ( element ) => {
            const languageId = element.getAttribute( 'languageId' );
            element.value = data[ languageId ];
        } );
        this.DOM[ columnName ].errorMessage.innerHTML = '';
        classAdd( this.DOM.formBackground, 'form--active' );
        classAdd( this.DOM[ columnName ].form, 'form-input--active' );
    }

    hideForm () {
        classRemove( this.DOM.formBackground, 'form--active' );
        Object.keys( this.modifier ).forEach( ( columnName ) => {
            classRemove( this.DOM[ columnName ].form, 'form-input--active' );
        } );
    }

    async dataValidation ( columnName ) {
        const isValid = new Promise( ( res ) => {
            let errorMessage = '';
            Array.from( this.DOM[ columnName ].input ).forEach( ( element ) => {
                const message = validate.single( element.value, this.constraints[ columnName ][ element.name ] );
                if ( ValidateUtils.isValidArray( message ) ) {
                    errorMessage = message[ 0 ];
                    element.focus();
                }
            } );
            res( errorMessage );
        } )
        .then( ( errorMessage ) => {
            if ( errorMessage === '' )
                return true;

            this.DOM[ columnName ].errorMessage.innerHTML = errorMessage;
            return false;
        } );
        return isValid;
    }

    async exec () {
        fetch( `${ host }/user/id`, {
            credentials: 'include',
            method:      'post',
        } )
        .then( res => res.json() )
        .then( ( res ) => {
            this.config.profileId = res.roleId;
        } )
        .then( () => {
            this.subscribeCancelButton();
            this.subscribePatchButton();
            this.subscribePatchCheckButton();
            this.subscribeUploadImageButton();
            this.setProfileImage();
        } );
    }
}
