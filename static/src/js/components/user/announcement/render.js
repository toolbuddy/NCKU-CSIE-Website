export function changeEditorLanguage ( editors, language ) {
    Array.from( editors ).forEach( ( editor ) => {
        if ( editor.classList.contains( `editor__editor--${ language }` ) )
            editor.style.display = 'block';
        else
            editor.style.display = 'none';
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
