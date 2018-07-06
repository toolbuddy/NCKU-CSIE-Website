( () => {
    const btns = document.getElementById( 'filter__tags' ).getElementsByClassName( 'tags__tag' );

    btns[ 0 ].classList.add( 'filter__tag--active' );
    for ( let i = 0; i < btns.length; i++ ) {
        btns[ i ].onclick = () => {
            if ( btns[ i ].classList.contains( 'filter__tag--active' ) )
                btns[ i ].classList.remove( 'filter__tag--active' );
            else
                btns[ i ].classList.add( 'filter__tag--active' );
        };
    }
} )();
