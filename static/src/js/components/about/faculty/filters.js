function showNoResult ( noResult ) {
    // Show 404
    if ( noResult ) {
        Array.from( document.getElementsByClassName( 'no-result__text' ) ).forEach( ( noResultText ) => {
            noResultText.classList.remove( 'no-result__text--hide' );
        } );
    }

    // Hide 404 at first
    else {
        Array.from( document.getElementsByClassName( 'no-result__text' ) ).forEach( ( noResultText ) => {
            noResultText.classList.add( 'no-result__text--hide' );
        } );
    }
}
function filterSelection () {
    // Get filters
    const filters = [];
    let noResult = false;
    showNoResult( noResult );
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
                    else
                        noResult = true;
                } );
            }

            // Deal with cards without department tags
            else
                card.classList.add( 'card--hide' );
        } );
    } );
    showNoResult( noResult );
}

Array.from( document.getElementsByClassName( 'filters__filter' ) ).forEach( filter => filter.addEventListener( 'click', function changeColor ( e ) {
    if ( e.target.classList.contains( 'filters__filter--active' ) )
        e.target.classList.remove( 'filters__filter--active' );
    else
        e.target.classList.add( 'filters__filter--active' );

    filterSelection();
} ) );
