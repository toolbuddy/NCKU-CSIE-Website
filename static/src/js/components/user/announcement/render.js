export function changeEditorLanguage ( editors, language ) {
    Array.from( editors ).forEach( ( editor ) => {
        if ( editor.classList.contains( `editor__editor--${ language }` ) ){
            editor.classList.add( 'editor__editor--show' );
        }
        else{
            editor.classList.remove( 'editor__editor--show' );
        }
    } );
}

export function flipTag ( tag ) {
    if ( !tag.classList.contains( 'tags__tag--active' ) ) {
        tag.classList.add( 'tags__tag--active' );
        return true;
    }

    tag.classList.remove( 'tags__tag--active' );
    return false;
}
