export default class BlockControl {
    addButtonEvent ( button, isTitle = true ) {
        if ( button.id.indexOf( 'add' ) !== -1 ) {
            button.addEventListener( 'click', ( element ) => {
                let block  = element.target.parentNode.parentNode;
                let parentId = element.target.parentNode.parentNode.parentNode.id;

                if ( element.target.className.indexOf( 'image' ) == -1 ) {
                    block = element.target.parentNode;
                    parentId = element.target.parentNode.parentNode.id;
                }

                this.addBlock( block, parentId, isTitle );
            } );
        }
        else {
            button.addEventListener( 'click', ( element ) => {
                let block  = element.target.parentNode.parentNode;

                if ( element.target.className.indexOf( 'image' ) == -1 )
                    block = element.target.parentNode;

                this.removeBlock( block );
            } );
        }
    }

    addBlock ( block, parentId, isTitle ) {
        const blockNode = block.cloneNode( true );

        const map = Array.prototype.map;

        blockNode.removeChild( blockNode.getElementsByClassName( 'input-button--add' )[ 0 ] );

        if ( !isTitle ) {
            map.call( blockNode.getElementsByClassName( ' input ' ), ( obj ) => {
                obj.removeChild( obj.getElementsByClassName( 'input__title' )[ 0 ] );
            } );
        }

        map.call( blockNode.getElementsByTagName( 'input' ), ( obj ) => {
            obj.value = '';
        } );

        this.addButtonEvent( blockNode.getElementsByClassName( 'input-button--delete' )[ 0 ] );

        document.getElementById( parentId ).appendChild( blockNode );
    }

    removeBlock ( block ) {
        block.remove();
    }
}
