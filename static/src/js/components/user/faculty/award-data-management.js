import BaseDataManagement from 'static/src/js/components/user/faculty/base-data-management.js';
import validate from 'validate.js';
import awardErrorMessageUtils from 'models/faculty/utils/award-error-message.js';
import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';
import cardsHTML from 'static/src/pug/components/user/faculty/card/cards.pug';
import UrlUtils from 'static/src/js/utils/url.js';
import { host, staticHost, } from 'settings/server/config.js';

export default class AwardDataManagement extends BaseDataManagement {
    constructor ( opt ) {
        super( opt );

        this.constraints = {
            'receivedYear': {
                presence:   {
                    allowEmpty: false,
                    message:    awardErrorMessageUtils.getValueByOption( {
                        option:     'receieveYearEmpty',
                        languageId: this.config.languageId,
                    } ),
                },
                numericality: {
                    greaterThanOrEqualTo: 1970,
                    message:              awardErrorMessageUtils.getValueByOption( {
                        option:     'receieveYearRangeError',
                        languageId: this.config.languageId,
                    } ),
                },
            },
            'awardTW': {
                presence: {
                    allowEmpty: false,
                    message:    awardErrorMessageUtils.getValueByOption( {
                        option:     'awardTWEmpty',
                        languageId: this.config.languageId,
                    } ),
                },
            },
            'awardEN': {
                presence: {
                    allowEmpty: false,
                    message:    awardErrorMessageUtils.getValueByOption( {
                        option:     'awardENEmpty',
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
            const awardData = data.award.find( item => item.awardId === Number( e.target.getAttribute( 'data-id' ) ) );

            this.DOM.delete.preview.innerHTML = awardData.award;
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
                        item:          {
                            receivedYear: data.receivedYear,
                        },
                        i18n: {
                            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                                award: data.awardTW,
                            },
                            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                                award: data.awardEN,
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
                        dbTable:       this.config.dbTable,
                        dbTableItemId:    this.status.dataId,
                        item:          {
                            receivedYear: data.receivedYear,
                        },
                        i18n: {
                            [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
                                award: data.awardTW,
                            },
                            [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
                                award: data.awardEN,
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
        const cardDOM =  this.DOM.cards.cards.querySelector( `#cards__award-card--${ this.status.dataId }` );
        if ( cardDOM.previousSibling.nodeName === 'H4' && ( cardDOM.nextSibling === null || cardDOM.nextSibling.nodeName === 'H4' ) )
            cardDOM.previousSibling.remove();
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
        .then( ( data ) => {
            data.award.sort( ( dataA, dataB ) => {
                if ( dataA.receivedYear === null )
                    return -1;
                else if ( dataB.receivedYear === null )
                    return 1;
                return dataB.receivedYear - dataA.receivedYear;
            } );
            return data.award;
        } )
        .then( ( data ) => {
            const awardId = ( method === 'post' ) ? Math.max( ...data.map( item => item.awardId ) ) : this.status.dataId;
            const awardData = data.find( item => item.awardId === Number( awardId ) );
            const awardDataIndex = data.indexOf( awardData );

            const tempAwardDOM = document.createElement( 'temp-section' );
            tempAwardDOM.innerHTML = cardsHTML( {
                LANG: {
                    id: this.config.languageId,
                },
                UTILS: {
                    staticUrl:    UrlUtils.serverUrl( new UrlUtils( staticHost, this.config.languageId ) ),
                },
                data:     awardData,
                modifier: this.config.dbTable,
            } );

            if ( awardDataIndex !== 0 && ( data[ awardDataIndex - 1 ].receivedYear === data[ awardDataIndex ].receivedYear ) ) {
                const preDOM = this.DOM.cards.cards.querySelector( `#cards__award-card--${ data[ awardDataIndex - 1 ].awardId }` );
                this.DOM.cards.cards.insertBefore( tempAwardDOM.firstChild, preDOM.nextSibling );
            }
            else if ( awardDataIndex !== data.length - 1 && ( data[ awardDataIndex + 1 ].receivedYear === data[ awardDataIndex ].receivedYear ) ) {
                const postDOM = this.DOM.cards.cards.querySelector( `#cards__award-card--${ data[ awardDataIndex + 1 ].awardId }` );
                this.DOM.cards.cards.insertBefore( tempAwardDOM.firstChild, postDOM );
            }
            else {
                const tempTitleDOM = document.createElement( 'temp-section' );
                tempTitleDOM.innerHTML = cardsHTML( {
                    data:     awardData.receivedYear,
                    modifier: 'classfication-title',
                } );

                if ( data.length === 1 ) {
                    this.DOM.cards.cards.appendChild( tempTitleDOM.firstChild );
                    this.DOM.cards.cards.appendChild( tempAwardDOM.firstChild );
                }
                else if ( awardDataIndex === 0 ) {
                    this.DOM.cards.cards.insertBefore( tempAwardDOM.firstChild, this.DOM.cards.cards.firstChild );
                    this.DOM.cards.cards.insertBefore( tempTitleDOM.firstChild, this.DOM.cards.cards.firstChild );
                }
                else {
                    const preDOM = this.DOM.cards.cards.querySelector( `#cards__award-card--${ data[ awardDataIndex - 1 ].awardId }` );
                    this.DOM.cards.cards.insertBefore( tempAwardDOM.firstChild, preDOM.nextSibling );
                    this.DOM.cards.cards.insertBefore( tempTitleDOM.firstChild, preDOM.nextSibling );
                }
            }
            return awardId;
        } )
        .then( ( awardId ) => {
            document.getElementById( `award-card__delete--${ awardId }` ).addEventListener( 'click', ( e ) => {
                this.subscribeDeleteButton( e );
            } );
            document.getElementById( `award-card__patch--${ awardId }` ).addEventListener( 'click', ( e ) => {
                this.subscribePatchButton( e );
            } );
        } );
    }
}
