import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import ControlMessageText from 'static/src/js/components/auth/message-text.js';
import ControlButton from 'static/src/js/components/auth/button-control.js';

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
}
catch ( err ) {
    console.error( err );
}

/*
Login messages
*/

try {
    const messageForget = new ControlMessageText(
        document.querySelector( '#message--forget' )
    );
    if ( !( messageForget instanceof ControlMessageText ) )
        throw new Error( '#message--forget not found.' );
    messageForget.setForgetMessage();
    messageForget.hideMessage();
}
catch ( err ) {
    console.error( err );
}

try {
    const messageError = new ControlMessageText(
        document.querySelector( '#message--error' )
    );
    if ( !( messageError instanceof ControlMessageText ) )
        throw new Error( '#message--error not found.' );
    messageError.setErrorMessage();
}
catch ( err ) {
    console.error( err );
}

try {
    const submitButton = new ControlButton(
        document.querySelector( '#form__block--account' ),
        document.querySelector( '#form__block--password' ),
        document.querySelector( '#form__button' )
    );
    if ( !( submitButton instanceof ControlButton ) )
        throw new Error( '#message--error not found.' );
    submitButton.setButton();
}
catch ( err ) {
    console.error( err );
}
