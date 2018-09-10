function filterSelection () {
    // Get filters
    const filters = [];
    Array.from( document.getElementsByClassName( 'filters__filter' ) ).forEach( ( filter ) => {
        if ( filter.classList.contains( 'filters__filter--active' ) )
            filters.push( filter.getAttribute( 'data' ) );
    } );

    // Start to filter
    Array.from( document.getElementsByClassName( 'card' ) ).forEach( ( card ) => {
        // Show all carsd at first
        card.classList.remove( 'card--hide' );

        // Hide cards which are not same to filters
        Array.from( card.getElementsByClassName( 'departments' ) ).forEach( ( departments ) => {
            // Deal with cards with department tags
            if ( departments.childNodes.length ) {
                // Get id of department tags
                const cardTags = [];
                Array.from( card.getElementsByClassName( 'departments__department' ) ).forEach( ( department ) => {
                    cardTags.push( department.getAttribute( 'data' ) );
                } );
                filters.forEach( ( filterTag ) => {
                    // Hide card which are not same to filters
                    if ( cardTags.includes( filterTag ) === false )
                        card.classList.add( 'card--hide' );
                } );
            }

            // Deal with cards without department tags
            else
                card.classList.add( 'card--hide' );
        } );
    } );
}

Array.from( document.getElementsByClassName( 'filters__filter' ) ).forEach( filter => filter.addEventListener( 'click', function changeColor ( e ) {
    if ( e.target.classList.contains( 'filters__filter--active' ) )
        e.target.classList.remove( 'filters__filter--active' );
    else
        e.target.classList.add( 'filters__filter--active' );

    filterSelection();
} ) );
