const header = document.getElementById( 'header' );
const headerMenu = header.querySelector( '.header__menu' );
const headerNavigation = header.querySelector( '.header__navigation' );
const navigationCancel = header.querySelector( '.navigation__cancel' );

headerMenu.addEventListener( 'click', () => {
    headerNavigation.classList.add( 'header__navigation--active' );
} );

navigationCancel.addEventListener( 'click', () => {
    headerNavigation.classList.remove( 'header__navigation--active' );
} );

Array.from( header.querySelectorAll( '.item__switch' ) )
.forEach( ( itemSwitch ) => {
    const itemDropdown = itemSwitch.parentElement.querySelector( '.item__dropdown' );
    itemSwitch.addEventListener( 'click', () => {
        if ( itemSwitch.classList.contains( 'item__switch--active' ) ) {
            itemSwitch.classList.remove( 'item__switch--active' );
            itemDropdown.classList.remove( 'item__dropdown--open' );
        }
        else {
            itemSwitch.classList.add( 'item__switch--active' );
            itemDropdown.classList.add( 'item__dropdown--open' );
        }
    } );
} );

const languageSwitch = header.querySelector( '.language__switch' );
const languageDropdown = languageSwitch.parentElement.querySelector( '.language__dropdown' );
languageSwitch.addEventListener( 'click', () => {
    if ( languageSwitch.classList.contains( 'language__switch--active' ) ) {
        languageSwitch.classList.remove( 'language__switch--active' );
        languageDropdown.classList.remove( 'language__dropdown--open' );
    }
    else {
        languageSwitch.classList.add( 'language__switch--active' );
        languageDropdown.classList.add( 'language__dropdown--open' );
    }
} );

export default headerMenu;
