import BaseDataManagement from 'static/src/js/components/user/staff/base-data-management.js';
import validate from 'validate.js';
import businessI18nErrorMessageUtils from 'models/staff/utils/businessI18n-error-message.js';
import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';
import cardsHTML from 'static/src/pug/components/user/card/staff/cards.pug';
import UrlUtils from 'static/src/js/utils/url.js';
import { host, staticHost, } from 'settings/server/config.js';

export default class BusinessI18nDataManagement extends BaseDataManagement {
    constructor ( opt ) {
        super( opt );

        this.constraints = {
            'businessTW': {
                presence: {
                    allowEmpty: false,
                    message:    businessI18nErrorMessageUtils.getValueByOption( {
                        option:     'businessTWBlank',
                        languageId: this.config.languageId,
                    } ),
                },
            },
            'businessEN': {
                presence: {
                    allowEmpty: false,
                    message:    businessI18nErrorMessageUtils.getValueByOption( {
                        option:     'businessENBlank',
                        languageId: this.config.languageId,
                    } ),
                },
            },
        };
    }

    subscribeDeleteButton ( e ) {
        this.fetchData( this.config.languageId )
        .then( ( data ) => {
            this.status.dataId = e.target.getAttribute( 'data-id' );
            const businessI18nData = data.businessI18n.find( item => item.businessId === Number( e.target.getAttribute( 'data-id' ) ) );

            this.DOM.delete.preview.innerHTML = businessI18nData.business;
        } )
        .then( () => {
            this.showDeleteForm();
        } );
    }

    subscribePostCheckButton () {
        this.DOM.post.checkButton.addEventListener( 'click', async ( e ) => {
            e.preventDefault();

            const isValid = await this.dataValidation( 'post' );

            const data = {};
            Array.from( this.DOM.post.input ).forEach( ( element ) => {
                data[ element.name ] = element.value;
            } );

            if ( isValid ) {
                fetch( `${ host }/user/profile`, {
                    method:   'POST',
                    body:   JSON.stringify( {
                        profileId:     this.config.profileId,
                        dbTableId:     0,
                        method:        'add',
                        dbTable:       this.config.dbTable,
                        i18n:      {
                            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                                business: data.businessTW,
                            },
                            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                                business: data.businessEN,
                            },
                        },
                    } ),
                } )
                .then( () => {
                    this.hideForm();
                    this.renderLoading();
                    this.insertCard( 'post' );
                } )
                .then( () => {
                    this.renderSuccess();
                } );
            }
        } );
    }

    subscribePatchCheckButton () {
        this.DOM.patch.checkButton.addEventListener( 'click', async ( e ) => {
            e.preventDefault();
            const isValid = await this.dataValidation( 'patch' );

            const data = {};
            Array.from( this.DOM.patch.input ).forEach( ( element ) => {
                data[ element.name ] = element.value;
            } );

            if ( isValid ) {
                fetch( `${ host }/user/profile`, {
                    method:   'POST',
                    body:   JSON.stringify( {
                        profileId:     this.config.profileId,
                        method:        'update',
                        dbTable:       'business',
                        dbTableItemId:    this.status.dataId,
                        i18n:          {
                            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                                business: data.businessTW,
                            },
                            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                                business: data.businessEN,
                            },
                        },
                    } ),
                } )
                .then( () => {
                    this.removeCard();
                    this.hideForm();
                    this.renderLoading();
                    this.insertCard( 'patch' );
                } )
                .then( () => {
                    this.renderSuccess();
                } );
            }
        } );
    }

    subscribeDeleteCheckButton () {
        this.DOM.delete.checkButton.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            fetch( `${ host }/user/profile`, {
                method:   'POST',
                body:   JSON.stringify( {
                    profileId:     this.config.profileId,
                    method:        'delete',
                    dbTable:       this.config.dbTable,
                    dbTableItemId:    this.status.dataId,
                } ),
            } )
            .then( () => {
                this.hideForm();
                this.renderLoading();
                this.removeCard();
            } )
            .then( () => {
                this.renderSuccess();
            } );
        } );
    }

    async removeCard () {
        const cardDOM =  this.DOM.cards.cards.querySelector( `#cards__businessI18n-card--${ this.status.dataId }` );
        cardDOM.remove();
    }

    async dataValidation ( method ) {
        const isValid = new Promise( ( res ) => {
            let errorMessage = '';
            Array.from( this.DOM[ method ].input ).forEach( ( element ) => {
                const message = validate.single( element.value, this.constraints[ element.name ] );
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

            this.DOM[ method ].errorMessage.innerHTML = errorMessage;
            return false;
        } );

        return isValid;
    }

    insertCard ( method ) {
        this.fetchData( this.config.languageId )
        .then( data => data.businessI18n )
        .then( ( data ) => {
            const dataId = ( method === 'post' ) ? Math.max( ...data.map( item => item.businessId ) ) : this.status.dataId;
            const businessData = data.find( item => item.businessId === Number( dataId ) );

            const tempBusinessDOM = document.createElement( 'temp-section' );
            tempBusinessDOM.innerHTML = cardsHTML( {
                LANG: {
                    id: this.config.languageId,
                },
                UTILS: {
                    staticUrl:    UrlUtils.serverUrl( new UrlUtils( staticHost, this.config.languageId ) ),
                },
                data:     businessData,
                modifier: this.config.dbTable,
            } );

            this.DOM.cards.cards.appendChild( tempBusinessDOM.firstChild );

            return dataId;
        } )
        .then( ( dataId ) => {
            document.getElementById( `businessI18n-card__delete--${ dataId }` ).addEventListener( 'click', ( e ) => {
                this.subscribeDeleteButton( e );
            } );
            document.getElementById( `businessI18n-card__patch--${ dataId }` ).addEventListener( 'click', ( e ) => {
                this.subscribePatchButton( e );
            } );
        } );
    }
}
