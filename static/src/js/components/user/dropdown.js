export default class DropdownControl {
    constructor ( dropdown ) {
        this.dropdown = dropdown;
        dropdown.forEach( ( element ) => {
            element.addEventListener( 'click', () => {
                for ( const item of element.children )
                    item.classList.add( 'content__button--show' );
            } );
            element.addEventListener( 'mouseleave', () => {
                for ( const item of element.children )
                    item.classList.remove( 'content__button--show' );
            } );
        } );
    }

    setDropdown ( dropdown ) {
        dropdown.forEach( ( element ) => {
            element.addEventListener( 'click', () => {
                for ( const item of element.children )
                    item.classList.add( 'content__button--show' );
            } );
            element.addEventListener( 'mouseleave', () => {
                for ( const item of element.children )
                    item.classList.remove( 'content__button--show' );
            } );
        } );
    }
}
