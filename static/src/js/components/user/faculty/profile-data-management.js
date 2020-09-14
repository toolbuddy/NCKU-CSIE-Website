import ValidateUtils from 'models/common/utils/validate.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import LanguageUtils from 'models/common/utils/language.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import errorMessageUtils from 'models/user/utils/error-message.js';
import profileColumnsUtils from 'models/faculty/utils/profile-columns.js';
import { host, } from 'settings/server/config.js';

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
        const inputQuerySelector = modifier => `input[ column = ${ modifier }]`;
        const errorMessageQuerySelector = modifier => ` #form-${ modifier }-patch > .form-input__content > .content__error-message`;
        const cardValueQuerySelector = modifier => `.profile-card > .profile-card__value--${ modifier }`;

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
            nation:        'nation',
            officeAddress: 'office-address',
            labName:       'lab-name',
            labAddress:    'lab-address',
            labTel:        'lab-tel',
            labWeb:        'lab-web',
            officeTel:     'office-tel',
            email:         'email',
            fax:           'fax',
            personalWeb:   'personal-web',
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

        this.department = Array
        .from( opt.departmentDOM )
        .map( node => ( {
            node,
            selected:      ( node.getAttribute( 'selected' ) === 'true' ) ? true : false,
            id:            node.getAttribute( 'data-department-id' ),
            table:         'department',
        } ) );

        this.researchGroup = Array
        .from( opt.researchGroupDOM )
        .map( node => ( {
            node,
            selected:      ( node.getAttribute( 'selected' ) === 'true' ) ? true : false,
            id:            node.getAttribute( 'data-research-id' ),
            table:         'researchGroup',
        } ) );
    }

    async subscribeTags () {
        [ this.department,
            this.researchGroup, ].forEach( ( obj ) => {
            obj.forEach( ( tag ) => {
                tag.node.addEventListener( 'click', () => {
                    let body = {};
                    if ( tag.selected ) {
                        body = {
                            dbTable:   tag.table,
                            profileId: this.config.profileId,
                            type:      Number( tag.id ),
                        };
                    }
                    else {
                        body = {
                            dbTable: tag.table,
                            data:    {
                                type:                     Number( tag.id ),
                                profileId:                this.config.profileId,
                                [ `${ tag.table }I18n` ]: null,
                            },
                        };
                    }
                    fetch( `${ host }/user/faculty/profile`, {
                        method:  ( tag.selected ) ? 'DELETE' : 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body:   JSON.stringify( body ),
                    } )
                    .then( () => {
                        if ( tag.selected ) {
                            classRemove( tag.node, 'tags__tag--active' );
                            tag.selected = false;
                        }
                        else {
                            classAdd( tag.node, 'tags__tag--active' );
                            tag.selected = true;
                        }
                    } )
                    .catch( ( err ) => {
                        console.error( err );
                    } );
                } );
            } );
        } );
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
                    const { item, i18n, } = await this.formatFormData( columnName );
                    e.target.disabled = true;
                    fetch( `${ host }/user/faculty/profile`, {
                        method:   'PATCH',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body:   JSON.stringify( {
                            dbTable:       'profile',
                            profileId:     this.config.profileId,
                            dbTableItemId: this.config.profileId,
                            item,
                            i18n,
                        } ),
                    } )
                    .then( () => {
                        this.updateCard( columnName );
                        this.hideForm();
                        e.target.disabled = false;
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
                const photoUrl = `${ host }/static/image/faculty/${ data.photo }`;
                this.DOM.image.preview.style.backgroundImage = `url('${ photoUrl }')`;
            }
        } );
    }

    updateCard ( columnName ) {
        this.fetchData( this.config.languageId )
        .then( data => data.profile[ columnName ] )
        .then( ( data ) => {
            this.DOM[ columnName ].cardValue.innerText = data;
        } );
    }


    showPatchForm ( data, columnName ) {
        Array.from( this.DOM[ columnName ].input ).forEach( ( element ) => {
            const languageId = element.getAttribute( 'languageId' );
            if ( element.getAttribute( 'input-pattern' ) === 'checkbox' )
                element.checked = data[ this.config.languageId ];
            else if ( element.getAttribute( 'input-pattern' ) === 'dropdown' )
                element.value = data[ this.config.languageId ];
            else if ( element.tagName === 'INPUT' )
                element.value = data[ languageId ];
        } );
        this.DOM[ columnName ].errorMessage.innerText = '';
        classAdd( this.DOM.formBackground, 'form--active' );
        classAdd( this.DOM[ columnName ].form, 'form-input--active' );
    }

    hideForm () {
        classRemove( this.DOM.formBackground, 'form--active' );
        Object.keys( this.modifier ).forEach( ( columnName ) => {
            classRemove( this.DOM[ columnName ].form, 'form-input--active' );
        } );
    }

    getErrorMessage ( opt ) {
        const isI18n =  ( opt.element.getAttribute( 'input-pattern' ) === 'i18n' ) ? true : false;
        const languageId = Number( opt.element.getAttribute( 'languageid' ) );

        const column = profileColumnsUtils.getValueByOption( {
            option:     opt.element.getAttribute( 'column' ),
            languageId: this.config.languageId,
        } );
        const error = errorMessageUtils.getValueByOption( {
            option:     opt.errorType,
            languageId: this.config.languageId,
        } );
        const language = ( isI18n ) ? `(${ LanguageUtils.getLanguageById( languageId ) })` : '';
        return `${ column }${ language }${ error }`;
    }

    async dataValidation ( columnName ) {
        const isValid = new Promise( ( res ) => {
            let errorMessage = '';
            Array.from( this.DOM[ columnName ].input ).forEach( ( element ) => {
                if ( element.validity.typeMismatch || element.validity.patternMismatch ) {
                    errorMessage = this.getErrorMessage( {
                        errorType:  'typeMismatch',
                        element,
                    } );
                    element.focus();
                }
                else if ( element.validity.rangeUnderflow ) {
                    errorMessage = this.getErrorMessage( {
                        errorType:  'rangeUnderflow',
                        element,
                    } );
                    element.focus();
                }
                else if ( element.validity.valueMissing ) {
                    errorMessage = this.getErrorMessage( {
                        errorType:  'valueMissing',
                        element,
                    } );
                    element.focus();
                }
            } );
            res( errorMessage );
        } )
        .then( ( errorMessage ) => {
            if ( errorMessage === '' )
                return true;

            this.DOM[ columnName ].errorMessage.innerText = errorMessage;
            return false;
        } );

        return isValid;
    }

    async formatFormData ( method ) {
        const item = {};
        let i18n = LanguageUtils.supportedLanguageId.map( function ( id ) {
            return { language: id, };
        } );

        Array.from( this.DOM[ method ].form.elements ).forEach( ( element ) => {
            if ( element.getAttribute( 'input-pattern' ) === 'i18n' )
                i18n[ element.getAttribute( 'languageid' ) ][ element.getAttribute( 'column' ) ] = element.value;
            else if ( element.getAttribute( 'input-pattern' ) === 'checkbox' )
                item[ element.name ] = element.checked;
            else if ( element.getAttribute( 'datatype' ) === 'int' )
                item[ element.name ] = Number( element.value );
            else if ( element.tagName === 'INPUT' )
                item[ element.name ] = element.value;
        } );

        if ( Object.keys( i18n[ 0 ] ).length === 1 && i18n[ 0 ].constructor === Object )
            i18n = [];

        return { item, i18n, };
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
            this.subscribeTags();
        } );
    }
}
