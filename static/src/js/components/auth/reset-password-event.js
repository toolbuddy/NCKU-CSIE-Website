import ValidateUtils from 'models/common/utils/validate.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import errorMessageUtils from 'models/auth/utils/error-message.js';

export default class ResetPasswordEvent {
    constructor ( opt ) {
        opt = opt || {};

        if (
            typeof ( opt.newPasswordDOM ) === 'undefined' ||
            !ValidateUtils.isDomElement( opt.newPasswordDOM ) ||
            typeof ( opt.currentPasswordDOM ) === 'undefined' ||
            !ValidateUtils.isDomElement( opt.currentPasswordDOM ) ||
            typeof ( opt.checkNewPasswordDOM ) === 'undefined' ||
            !ValidateUtils.isDomElement( opt.checkNewPasswordDOM ) ||
            typeof ( opt.checkButtonDOM ) === 'undefined' ||
            !ValidateUtils.isDomElement( opt.checkButtonDOM ) ||
            typeof ( opt.errorMessageDOM ) === 'undefined' ||
            !ValidateUtils.isDomElement( opt.errorMessageDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId )
        )
            throw new TypeError( 'invalid arguments' );

        this.DOM = {
            inputBlock: {
                newPassword:      opt.newPasswordDOM,
                currentPassword:      opt.currentPasswordDOM,
                checkNewPassword: opt.checkNewPasswordDOM,
            },
            checkButton:  opt.checkButtonDOM,
            errorMessage: opt.errorMessageDOM,
        };

        this.config = {
            languageId: opt.languageId,
        };
    }

    isInputBlockEmpty () {
        if (
            this.DOM.inputBlock.currentPassword.value === '' ||
            this.DOM.inputBlock.newPassword.value === '' ||
            this.DOM.inputBlock.checkNewPassword === ''
        )
            return true;
        return false;
    }

    isCheckNewPasswordValid () {
        const newPassword = this.DOM.inputBlock.newPassword.value;
        const checkNewPassword = this.DOM.inputBlock.checkNewPassword.value;
        if ( newPassword === checkNewPassword )
            return true;

        return false;
    }

    setErrorMessage ( errorMessage ) {
        this.DOM.errorMessage.textContent = errorMessage;
    }

    setButton () {
        this.setErrorMessage( '' );
        if ( !this.isInputBlockEmpty() &&
             this.isCheckNewPasswordValid() )
            classAdd( this.DOM.checkButton, 'form__button--enable' );
        else
            classRemove( this.DOM.checkButton, 'form__button--enable' );
    }

    subscribeInputBlock () {
        this.DOM.inputBlock.currentPassword.addEventListener( 'input', () => {
            this.setButton();
        } );
        this.DOM.inputBlock.newPassword.addEventListener( 'input', () => {
            this.setButton();
        } );
        this.DOM.inputBlock.checkNewPassword.addEventListener( 'input', () => {
            this.setButton();
            if ( !this.isCheckNewPasswordValid() ) {
                this.setErrorMessage(
                    errorMessageUtils.getValueByOption( {
                        option:     'check-password-different',
                        languageId: this.config.languageId,
                    } )
                );
            }
            else
                this.setErrorMessage( '' );
        } );
    }

    setEvent () {
        this.DOM.inputBlock.currentPassword.focus();
        this.setErrorMessage( '' );
        this.subscribeInputBlock();
    }
}
