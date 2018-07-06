function filterTagActive ( tags ) {
    document.getElementById( `tags__tag--${ tags[ 0 ] }` ).classList.add( 'filter__tag--active' );
    tags.forEach( ( tag ) => {
        const btn = document.getElementById( `tags__tag--${ tag }` );
        btn.onclick = () => {
            if ( btn.classList.contains( 'filter__tag--active' ) )
                btn.classList.remove( 'filter__tag--active' );
            else
                btn.classList.add( 'filter__tag--active' );
        };
    } );
}

