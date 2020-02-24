import BaseDataManagement from 'static/src/js/components/user/staff/base-data-management.js';
import validate from 'validate.js';
import titleI18nErrorMessageUtils from 'models/staff/utils/titleI18n-error-message.js';
import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';
import cardsHTML from 'static/src/pug/components/user/card/staff/cards.pug';
import UrlUtils from 'static/src/js/utils/url.js';
import { host, staticHost, } from 'settings/server/config.js';

export default class TitleI18nDataManagement extends BaseDataManagement {
    constructor ( opt ) {
        super( opt );

        this.constraints = {
            'titleTW': {
                presence: {
                    allowEmpty: false,
                    message:    titleI18nErrorMessageUtils.getValueByOption( {
                        option:     'titleTWBlank',
                        languageId: this.config.languageId,
                    } ),
                },
            },
            'titleEN': {
                presence: {
                    allowEmpty: false,
                    message:    titleI18nErrorMessageUtils.getValueByOption( {
                        option:     'titleENBlank',
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
            const titleI18nData = data.titleI18n.find( item => item.titleId === Number( e.target.getAttribute( 'data-id' ) ) );

            this.DOM.delete.preview.innerHTML = titleI18nData.title;
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
                                title: data.titleTW,
                            },
                            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                                title: data.titleEN,
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
                        dbTable:       'title',
                        dbTableItemId:    this.status.dataId,
                        i18n:          {
                            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                                title: data.titleTW,
                            },
                            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                                title: data.titleEN,
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
        const cardDOM =  this.DOM.cards.cards.querySelector( `#cards__titleI18n-card--${ this.status.dataId }` );
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
        .then( data => data.titleI18n )
        .then( ( data ) => {
            const titleId = ( method === 'post' ) ? Math.max( ...data.map( item => item.titleId ) ) : this.status.dataId;
            const titleData = data.find( item => item.titleId === Number( titleId ) );

            const tempTitleDOM = document.createElement( 'temp-section' );
            tempTitleDOM.innerHTML = cardsHTML( {
                LANG: {
                    id: this.config.languageId,
                },
                UTILS: {
                    staticUrl:    UrlUtils.serverUrl( new UrlUtils( staticHost, this.config.languageId ) ),
                },
                data:     titleData,
                modifier: this.config.dbTable,
            } );

            this.DOM.cards.cards.appendChild( tempTitleDOM.firstChild );

            return titleId;
        } )
        .then( ( dataId ) => {
            document.getElementById( `titleI18n-card__delete--${ dataId }` ).addEventListener( 'click', ( e ) => {
                this.subscribeDeleteButton( e );
            } );
            document.getElementById( `titleI18n-card__patch--${ dataId }` ).addEventListener( 'click', ( e ) => {
                this.subscribePatchButton( e );
            } );
        } );
    }
}
