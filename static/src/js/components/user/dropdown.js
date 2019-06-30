export default class DropdownControl {
    setDropdownEvent ( dropdown ) {
        dropdown.forEach( ( element ) => {
            for ( const item of element.children ) {
                item.disabled = true;
                this.setButtonEvent( item );
            }

            element.addEventListener( 'click', () => {
                for ( const item of element.children ) {
                    item.classList.add( 'content__button--show' );
                    item.disabled = false;
                }
            } );
            element.addEventListener( 'mouseleave', () => {
                for ( const item of element.children ) {
                    item.classList.remove( 'content__button--show' );
                    item.disabled = true;
                }
            } );
        } );
    }

    setButtonEvent ( button ) {
        button.addEventListener( 'click', ( element ) => {
            const block        = element.target.parentNode.parentNode;
            block.firstChild.classList.remove( 'content__button--top' );

            const blockNode     = block.cloneNode( true );
            const selectedClass = element.target.parentNode.className;
            const selectedNode  = block.getElementsByClassName( selectedClass )[ 0 ].cloneNode( true );
            console.log( selectedNode );
            selectedNode.classList.add( 'content__button--top' );

            blockNode.removeChild( blockNode.getElementsByClassName( selectedClass )[ 0 ] );
            block.innerHTML = '';

            block.appendChild( selectedNode );
            blockNode.querySelectorAll( '.content__button' ).forEach( ( element ) => {
                block.appendChild( element );
            } );

            for ( const item of block.children )
                this.setButtonEvent( item );
        } );
    }
}
