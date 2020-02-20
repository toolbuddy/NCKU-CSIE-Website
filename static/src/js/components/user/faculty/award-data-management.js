import BaseDataManagement from 'static/src/js/components/user/faculty/base-data-management.js';
import validate from 'validate.js';
import awardErrorMessageUtils from 'models/faculty/utils/award-error-message.js';
import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';
import { host, } from 'settings/server/config.js';

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

    subscribePostCheckButton () {
        this.DOM.post.checkButton.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            const isValid = this.dataValidation( 'post' );
        } );
    }

    subscribePatchCheckButton () {
        this.DOM.patch.checkButton.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            const isValid = this.dataValidation( 'patch' );

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
                    this.hideForm();
                    this.renderLoading();
                } );
            }
        } );
    }

    async dataValidation ( method ) {
        new Promise( ( res ) => {
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
    }
}
