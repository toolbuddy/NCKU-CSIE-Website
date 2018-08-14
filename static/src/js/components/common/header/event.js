const headerMenu = document.getElementById( 'header__menu' );
const headerNavigation = document.getElementById( 'header__navigation' );
const navigationCancel = document.getElementById( 'navigation__cancel' );

headerMenu.addEventListener( 'click', () => {
    headerNavigation.classList.add( 'header__navigation--active' );
} );

navigationCancel.addEventListener( 'click', () => {
    headerNavigation.classList.remove( 'header__navigation--active' );
} );

Array.from( document.getElementsByClassName( 'item__switch' ) )
.forEach( ( itemSwitch ) => {
    // Const itemSubList = itemSwitch.querySelector( '+ item__sub-list' )[0];
    itemSwitch.addEventListener( 'click', () => {
        if ( itemSwitch.classList.contains( 'item__switch--active' ) )
            itemSwitch.classList.remove( 'item__switch--active' );
        else
            itemSwitch.classList.add( 'item__switch--active' );
    } );
} );

export default headerMenu;
