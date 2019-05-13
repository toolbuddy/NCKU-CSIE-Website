export default class ButtonControl {
    constructor ( account, password, button ) {
        this.account = account;
        this.password = password;
        this.button = button;
    }

    isEmpty () {
        if ( this.account.value === '' || this.password.value === '' || this.account.value === 'null' || this.password.value === 'null' )
            return true;
        return false;
    }

    setButton () {
        this.button.disabled = true;
        this.account.addEventListener( 'input', () => {
            if ( this.isEmpty() ) {
                this.button.classList.remove( 'form__button--enable' );
                this.button.disabled = true;
            }
            else {
                this.button.classList.add( 'form__button--enable' );
                this.button.disabled = false;
            }
        } );
        this.password.addEventListener( 'input', () => {
            if ( this.isEmpty() ) {
                this.button.classList.remove( 'form__button--enable' );
                this.button.disabled = true;
            }
            else {
                this.button.classList.add( 'form__button--enable' );
                this.button.disabled = false;
            }
        } );
    }
}
