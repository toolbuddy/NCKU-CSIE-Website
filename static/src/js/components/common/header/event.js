let toggle = false;
const headerMenu = document.getElementById( 'header__menu' );
headerMenu.addEventListener( 'click', () => {
    if ( toggle )
        headerMenu.classList.add( 'header__menu--active' );
    else
        headerMenu.classList.remove( 'header__menu--active' );
    toggle = !toggle;
} );

export default headerMenu;
