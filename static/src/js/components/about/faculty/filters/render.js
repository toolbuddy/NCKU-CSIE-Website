export function renderFilter ( filter ) {
    // Toggle filter.
    if ( filter.classList.contains( 'filters__filter--active' ) )
        filter.classList.remove( 'filters__filter--active' );
    else
        filter.classList.add( 'filters__filter--active' );
}

export function renderCards ( filters, cards, noResult ) {
    // Get actived filters.
    const selectedFilters = filters
    .filter( filter => filter.classList.contains( 'filters__filter--active' ) )
    .map( filter => filter.getAttribute( 'data' ) );

    // If no filter in actived.
    if ( selectedFilters.length === 0 ) {
        // Show all cards
        Array.from( cards.getElementsByClassName( 'cards__card' ) )
        .forEach( ( card ) => {
            if ( card.classList.contains( 'card--hide' ) )
                card.classList.remove( 'card--hide' );
        } );

        // Hide no-result section
        if ( !noResult.classList.contains( 'no-result--hide' ) )
            noResult.classList.add( 'no-result--hide' );
        return;
    }

    // If there is turned-on filter
    // assume all cards are hidden at first
    let noShowedCard = true;

    // Start to filter
    Array.from( cards.getElementsByClassName( 'cards__card' ) ).forEach( ( card ) => {
        // Get tags of the card
        const departments = Array.from( card.getElementsByClassName( 'departments__department' ) )
        .map( department => department.getAttribute( 'data' ) )
        .filter( data => data != null );

        // Deal with cards which have tags
        if ( departments.length ) {
            // If tags do not match filters
            if ( selectedFilters.some( filter => departments.indexOf( filter ) < 0 ) ) {
                // Hide the card
                if ( !card.classList.contains( 'card--hide' ) )
                    card.classList.add( 'card--hide' );
            }

            // If tags match filters
            else {
                // There is at least one card showed
                noShowedCard = false;

                // Show the card
                if ( card.classList.contains( 'card--hide' ) )
                    card.classList.remove( 'card--hide' );
            }
        }

        // Deal with cards which do not have tags
        else if ( !card.classList.contains( 'card--hide' ) )
            card.classList.add( 'card--hide' );
    } );

    // No card is showed
    if ( noShowedCard ) {
        // Show no-result tag
        if ( noResult.classList.contains( 'no-result--hide' ) )
            noResult.classList.remove( 'no-result--hide' );
    }

    // At least one card is showed
    else if ( !noResult.classList.contains( 'no-result--hide' ) )

        // Hide no-result tag
        noResult.classList.add( 'no-result--hide' );
}
