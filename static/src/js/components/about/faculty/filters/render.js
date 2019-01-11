/**
 * Render when click on `filter`.
 *
 * @param {HTMLElement} filter
 *
 * Toggle filter's class `filters__filter--active` on and off.
 * Active filter if filter contains class `filters__filter--active`,
 * deactive filter otherwise.
 */

export function renderFilter ( filter ) {
    if ( filter.classList.contains( 'filters__filter--active' ) )
        filter.classList.remove( 'filters__filter--active' );
    else if ( filter.classList.contains( 'filters__filter--research--active' ) )
        filter.classList.remove( 'filters__filter--research--active' );
    else if ( filter.classList.contains( 'filters__filter--research' ) )
        filter.classList.add( 'filters__filter--research--active' );
    else
        filter.classList.add( 'filters__filter--active' );
}

/**
 * Render when click on DOM element with class name `filters__filter`.
 *
 * @param {HTMLElement[]} filters
 * @param {HTMLElement}   cards
 * @param {HTMLElement}   noResult
 *
 * Filter on all `cards__card`.
 * Passed test when:
 *     * No filter condition is presented.
 *     * Test target existes and contains all filter's conditions.
 * Failed test when:
 *     * Test target does not exist.
 *     * Test target existes and lacks at least one filter's conditions.
 *
 * If all `cards__card` failed test, present `noResult`.
 * Hide `noResult` otherwise.
 */

export function renderCards ( filters, cards, noResult ) {
    // Get filter's conditions.
    const selectedFilters = filters
    .filter( filter => filter.classList.contains( 'filters__filter--active' ) )
    .map( filter => filter.getAttribute( 'data' ) );

    // If no filter condition is presented.
    if ( selectedFilters.length === 0 ) {
        // Show all `cards__card`.
        Array.from( cards.getElementsByClassName( 'cards__card' ) )
        .forEach( ( card ) => {
            if ( card.classList.contains( 'card--hide' ) )
                card.classList.remove( 'card--hide' );
        } );

        // Hide `no-result`.
        if ( !noResult.classList.contains( 'no-result--hide' ) )
            noResult.classList.add( 'no-result--hide' );
        return;
    }

    // Assuming that all `cards__card` failed on test.
    let noShowedCard = true;

    // Filter on all `cards__card`.
    // If `cards__card` does not pass the filter's test, hide it.
    // Otherwise `cards__card` remains showing.
    Array.from( cards.getElementsByClassName( 'cards__card' ) ).forEach( ( card ) => {
        // Get testing target from `cards__card`.
        const departments = Array.from( card.getElementsByClassName( 'departments__department' ) )
        .map( department => department.getAttribute( 'data' ) )
        .filter( data => data !== null );

        // Filter on test target.
        if ( departments.length ) {
            // Test failed.
            if ( selectedFilters.some( filter => departments.indexOf( filter ) < 0 ) ) {
                if ( !card.classList.contains( 'card--hide' ) )
                    card.classList.add( 'card--hide' );
            }

            // Test passed.
            else {
                noShowedCard = false;

                if ( card.classList.contains( 'card--hide' ) )
                    card.classList.remove( 'card--hide' );
            }
        }

        // Test failed.
        else if ( !card.classList.contains( 'card--hide' ) )
            card.classList.add( 'card--hide' );
    } );

    // All `cards__card` failed test.
    if ( noShowedCard ) {
        if ( noResult.classList.contains( 'no-result--hide' ) )
            noResult.classList.remove( 'no-result--hide' );
    }

    // Exist some `cards__card` passed test.
    else if ( !noResult.classList.contains( 'no-result--hide' ) )
        noResult.classList.add( 'no-result--hide' );
}
