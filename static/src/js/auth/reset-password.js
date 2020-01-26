import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import ControlMessageText from 'static/src/js/components/auth/message-text.js';
import ControlButton from 'static/src/js/components/auth/button-control.js';
import ResetPasswordEvent from 'static/src/js/components/auth/reset-password-event.js';

/*
Header
*/

try {
    const headerBase = new GetHeaderBase( {
        headerDOM:     document.querySelector( '.body__header.header.header--base' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    if ( !( headerBase instanceof GetHeaderBase ) )
        throw new Error( '.header.header--base not found.' );
}
catch ( err ) {
    console.error( err );
}
try {
    const headerMedium = new GetHeaderMedium( {
        headerDOM:     document.querySelector( '.body__header.header.header--medium' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    if ( !( headerMedium instanceof GetHeaderMedium ) )
        throw new Error( '.header.header--medium not found.' );
}
catch ( err ) {
    console.error( err );
}
try {
    const headerLarge = new GetHeaderLarge( {
        headerDOM:     document.querySelector( '.body__header.header.header--large' ),
    } );
    if ( !( headerLarge instanceof GetHeaderLarge ) )
        throw new Error( '.header.header--medium not found.' );
    headerLarge.renderLogin();
}
catch ( err ) {
    console.error( err );
}

try {
    const resetPasswordEvent = new ResetPasswordEvent( {
        newPasswordDOM:      document.querySelector( '#form__block--new-password' ),
        currentPasswordDOM:      document.querySelector( '#form__block--current-password' ),
        checkNewPasswordDOM:     document.querySelector( '#form__block--check-new-password' ),
        checkButtonDOM:      document.querySelector( '#form__button' ),
    } );
    if ( !( resetPasswordEvent instanceof ResetPasswordEvent ) )
        throw new Error( 'resetPasswordEvent not found.' );
    resetPasswordEvent.setEvent();
}
catch ( err ) {
    console.error( err );
}
