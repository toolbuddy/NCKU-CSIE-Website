export default class MessageText {
    constructor ( DOM ) {
        this.DOM = DOM;
    }

    forgetMessage () {
        this.DOM.classList.add( 'message--forget' );
    }

    hideMessage () {
        this.DOM.classList.add( 'message--hide' );
    }

    showMessage () {
        this.DOM.classList.remove( 'message--hide' );
    }

    setForgetMessage () {
        window.addEventListener( 'DOMContentLoaded', () => {
            this.forgetMessage();
        } );
    }

    setErrorMessage () {
        window.addEventListener( 'DOMContentLoaded', () => {
            this.hideMessage();
        } );
    }
}
