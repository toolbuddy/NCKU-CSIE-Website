function filterSelection () {
    Array.from( document.getElementsByClassName( 'filters__filter' ) ).forEach( ( filter ) => {
        if ( filter.classList.contains( 'filters__filter--active' ) )
            document.getElementsByClassName( 'filters__filter' );
    } );
}

Array.from( document.getElementsByClassName( 'filters__filter' ) ).forEach( filter => filter.addEventListener( 'click', function changeColor ( e ) {
    if ( e.target.classList.contains( 'filters__filter--active' ) )
        e.target.classList.remove( 'filters__filter--active' );
    else
        e.target.classList.add( 'filters__filter--active' );

    filterSelection();
} ) );
