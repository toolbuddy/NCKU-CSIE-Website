const headerMenu = document.getElementById( 'header__menu' );
const headerNavigation = document.getElementById( 'header__navigation' );
const navigationCancel = document.getElementById( 'navigation__cancel' );

headerMenu.addEventListener( 'click', () => {
    headerNavigation.classList.add( 'header__navigation--active' );
} );

navigationCancel.addEventListener( 'click', () => {
    headerNavigation.classList.remove( 'header__navigation--active' );
} );
export default headerMenu;
