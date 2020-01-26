import ValidateUtils from 'models/common/utils/validate.js';
import { classAdd, classRemove, delay, } from 'static/src/js/utils/style.js';

export default class ResetPasswordEvent {
    constructor ( opt ) {
        opt = opt || {};

        console.log( opt );

        if (
            typeof ( opt.newPasswordDOM ) === 'undefined' ||
            !ValidateUtils.isDomElement( opt.newPasswordDOM ) ||
            typeof ( opt.currentPasswordDOM ) === 'undefined' ||
            !ValidateUtils.isDomElement( opt.currentPasswordDOM ) ||
            typeof ( opt.checkNewPasswordDOM ) === 'undefined' ||
            !ValidateUtils.isDomElement( opt.checkNewPasswordDOM ) ||
            typeof ( opt.checkButtonDOM ) === 'undefined' ||
            !ValidateUtils.isDomElement( opt.checkButtonDOM )
        )
            throw new TypeError( 'invalid arguments' );

        this.DOM = {
            inputBlock: {
                newPassword:      opt.newPasswordDOM,
                currentPassword:      opt.currentPasswordDOM,
                checkNewPassword: opt.checkNewPasswordDOM,
            },
            checkButton: opt.checkButtonDOM,
        };
    }

    isInputBlockValid () {
        if (
            this.DOM.inputBlock.currentPassword.value === '' ||
            this.DOM.inputBlock.newPassword.value === '' ||
            this.DOM.inputBlock.checkNewPassword === ''
        )
            return false;

        const newPassword = this.DOM.inputBlock.newPassword.value;
        const checkNewPassword = this.DOM.inputBlock.checkNewPassword.value;
        if ( newPassword !== checkNewPassword )
            return false;

        return true;
    }

    setButton () {
        if ( this.isInputBlockValid() )
            classAdd( this.DOM.checkButton, 'form__button--enable' );
        else
            classRemove( this.DOM.checkButton, 'form__button--enable' );
    }

    subscribeInputBlock () {
        Object.keys( this.DOM.inputBlock ).forEach( ( key ) => {
            this.DOM.inputBlock[ key ].addEventListener( 'input', () => {
                this.setButton();
            } );
        } );
    }

    setEvent () {
        this.DOM.inputBlock.currentPassword.focus();
        this.subscribeInputBlock();
    }
}
