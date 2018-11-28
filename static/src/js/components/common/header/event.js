const header = document.getElementById( 'header' );
const headerMenu = header.querySelector( '.header__menu' );
const headerNavigation = header.querySelector( '.header__navigation' );
const navigationCancel = headerNavigation.querySelector( '.navigation__cancel' );
const headerLanguage = header.querySelector( '.header__language' );
const languageButton = headerLanguage.querySelector( '.language__button' );
const headerlanguageDropdown = languageButton.querySelector( '.button__dropdown' );
const chineseButton = headerlanguageDropdown.querySelector( '.dropdown__item--zh-TW' );
const englishButton = headerlanguageDropdown.querySelector( '.dropdown__item--en-US' );
const headerSearch = header.querySelector( '.header__search' );
const searchButton = headerSearch.querySelector( '.search__button' );
const searchDropdown = headerSearch.querySelector( '.search__dropdown' );
const formInput = searchDropdown.querySelector( '.dropdown__form' ).querySelector( '.form__input' );
const searchCancel = headerSearch.querySelector( '.dropdown__cancel' );

function IsChild ( child, parent ) {
    if ( child && parent ) {
        let parentNode = child.parentNode;
        while ( parentNode ) {
            if ( parent === parentNode )
                return true;

            parentNode = parentNode.parentNode;
        }
    }
    return false;
}

document.addEventListener( 'click', ( e ) => {
    if ( headerNavigation.classList.contains( 'header__navigation--active' ) &&
        e.target !== headerMenu &&
        e.target !== headerNavigation &&
        !IsChild( e.target, headerNavigation ) )
        headerNavigation.classList.remove( 'header__navigation--active' );
} );

headerMenu.addEventListener( 'click', () => {
    headerNavigation.classList.add( 'header__navigation--active' );
} );

navigationCancel.addEventListener( 'click', () => {
    headerNavigation.classList.remove( 'header__navigation--active' );
} );

languageButton.addEventListener( 'focus', () => {
    headerlanguageDropdown.classList.add( 'button__dropdown--active' );
} );

languageButton.addEventListener( 'blur', () => {
    headerlanguageDropdown.classList.remove( 'button__dropdown--active' );
} );

chineseButton.addEventListener( 'click', () => {
    location.href = '?language=zh-TW';
} );

englishButton.addEventListener( 'click', () => {
    location.href = '?language=en-US';
} );

searchButton.addEventListener( 'click', () => {
    if ( searchDropdown.classList.contains( 'search__dropdown--active' ) )
        searchDropdown.classList.remove( 'search__dropdown--active' );
    else {
        searchDropdown.classList.add( 'search__dropdown--active' );
        formInput.focus();
    }
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
