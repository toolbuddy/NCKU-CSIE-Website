export default class MessageText {
    constructor ( opt ) {
        this.opt = opt;
    }

    lightenForget () {
        this.opt.classList.add( 'message--light-color' );
    }

    darkenForget () {
        this.opt.classList.remove( 'message--light-color' );
    }

    hideMessage () {
        this.opt.classList.add( 'message--hide' );
    }
}
