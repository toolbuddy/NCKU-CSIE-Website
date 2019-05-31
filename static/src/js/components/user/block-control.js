export default class BlockControl {
    constructor ( button, isTitle ) {
        this.isTitle = isTitle;
        if ( button.id.indexOf( 'add' ) != -1 ) {
            button.addEventListener( 'click', ( element ) => {
                const blockId  = element.target.parentNode.parentNode.id;
                const parentId = element.target.parentNode.parentNode.parentNode.id;
                this.addBlock( blockId, parentId, this.isTitle );
            } );
        }
    }

    addBlock ( blockId, parentId, isTitle ) {
        const blockNode = document.getElementById( blockId ).cloneNode( true );

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

        document.getElementById( parentId ).appendChild( blockNode );
    }
}
