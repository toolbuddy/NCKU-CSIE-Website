export default class MessageText {
    constructor (DOM) {
        this.DOM = DOM;
    }

    hideMessage () {
        this.DOM.classList.add('message--hide');
    }

    showMessage () {
        this.DOM.classList.remove('message--hide');
    }

    setForgetMessage () {
        window.addEventListener('DOMContentLoaded', () => {
            this.DOM.classList.add('message--forget');
        });
    }

    setErrorMessage () {
        window.addEventListener('DOMContentLoaded', () => {
            this.hideMessage();
        });
    }
}
