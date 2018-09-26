const header = document.getElementById( 'header' );
const headerMenu = header.querySelector( '.header__menu' );
const headerNavigation = header.querySelector( '.header__navigation' );
const navigationCancel = headerNavigation.querySelector( '.navigation__cancel' );
const headerLanguage = header.querySelector( '.header__language' );
const languageButton = headerLanguage.querySelector( '.language__button' );
const headerlanguageDropdown = headerLanguage.querySelector( '.language__dropdown' );
const headerSearch = header.querySelector( '.header__search' );
const searchButton = headerSearch.querySelector( '.search__button' );
const searchDropdown = headerSearch.querySelector( '.search__dropdown' );
const searchCancel = headerSearch.querySelector( '.dropdown__cancel' );

headerMenu.addEventListener( 'click', () => {
    headerNavigation.classList.add( 'header__navigation--active' );
} );

navigationCancel.addEventListener( 'click', () => {
    headerNavigation.classList.remove( 'header__navigation--active' );
} );

languageButton.addEventListener( 'click', () => {
    if ( headerlanguageDropdown.classList.contains( 'language__dropdown--active' ) )
        headerlanguageDropdown.classList.remove( 'language__dropdown--active' );
    else
        headerlanguageDropdown.classList.add( 'language__dropdown--active' );
} );

searchButton.addEventListener( 'click', () => {
    if ( searchDropdown.classList.contains( 'search__dropdown--active' ) )
        searchDropdown.classList.remove( 'search__dropdown--active' );
    else
        searchDropdown.classList.add( 'search__dropdown--active' );
} );

searchCancel.addEventListener( 'click', () => {
    searchDropdown.classList.remove( 'search__dropdown--active' );
} );

Array.from( headerNavigation.querySelectorAll( '.item__switch' ) )
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

const navigationLanguage = headerNavigation.querySelector( '.navigation__language' );
const languageSwitch = navigationLanguage.querySelector( '.language__switch' );
const languageDropdown = languageSwitch.parentElement.querySelector( '.language__dropdown' );
navigationLanguage.addEventListener( 'click', () => {
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
