( () => {
    let flip  = 0;
    const filterButton = document.getElementById( 'filter__button' );
    const buttonIcon = document.getElementById( 'button__icon' );
    const filterTags = document.getElementById( 'filter__tags' );
    const filterTime = document.getElementById( 'filter__time' );
    filterButton.onclick = () => {
        flip = ( flip + 1 ) % 2;
        if ( flip ) {
            filterTags.classList.remove( 'filter__tags--hidden' );
            filterTime.classList.remove( 'filter__time--hidden' );
            buttonIcon.classList.add( 'button__icon--active' );
        }
        else {
            filterTags.classList.add( 'filter__tags--hidden' );
            filterTime.classList.add( 'filter__time--hidden' );
            buttonIcon.classList.remove( 'button__icon--active' );
        }
    };
} )();
