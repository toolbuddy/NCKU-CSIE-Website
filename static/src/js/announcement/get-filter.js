( () => {
    let flip  = 0;
    const filterButton = document.getElementById( 'filter__button' );
    const buttonIcon = document.getElementById( 'button__icon' );
    const filterTags = document.getElementById( 'filter__tags' );
    const filterTime = document.getElementById( 'filter__time' );
    filterButton.onclick = () => {
        flip = ( flip + 1 ) % 2;
        if ( flip % 2 === 0 ) {
            filterTags.classList.add( 'filter__tags--hidden' );
            filterTime.classList.add( 'filter__time--hidden' );

            buttonIcon.classList.remove( 'active' );
        }
        else {
            filterTags.classList.remove( 'filter__tags--hidden' );
            filterTime.classList.remove( 'filter__time--hidden' );
            buttonIcon.classList.add( 'active' );
        }
    };
} )();
