function filterTagActive ( tags ) {
    document.getElementById( `tags__tag--${ tags[ 0 ] }` ).classList.add( 'tags__tag--active' );
    tags.forEach( ( tag ) => {
        const btn = document.getElementById( `tags__tag--${ tag }` );
        btn.onclick = () => {
            if ( btn.classList.contains( 'tags__tag--active' ) )
                btn.classList.remove( 'tags__tag--active' );
            else
                btn.classList.add( 'tags__tag--active' );
        };
    } );
}

