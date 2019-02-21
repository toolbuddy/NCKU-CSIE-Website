// Import {
//     registClickToActive,
//     registItemSwitch,
//     registClickToHide,
//     registLanguageSwitch,
//     registClickToActiveAndFocus,
// } from 'static/src/js/components/common/header/event.js';

// export default ( header ) => {
//     // Large screen
//     const headerLanguage = header.querySelector( '.header__language' );
//     const languageButton = headerLanguage.querySelector( '.language__button' );
//     const headerlanguageDropdown = languageButton.querySelector( '.button__dropdown' );
//     const headerSearch = header.querySelector( '.header__search' );
//     const searchButton = headerSearch.querySelector( '.search__button' );
//     const searchDropdown = headerSearch.querySelector( '.search__dropdown' );
//     const formInput = searchDropdown.querySelector( '.dropdown__form' ).querySelector( '.form__input' );
//     const searchCancel = headerSearch.querySelector( '.dropdown__cancel' );

//     registClickToActive( languageButton, headerlanguageDropdown, 'button__dropdown--active' );

//     registClickToActiveAndFocus( searchButton, searchDropdown, formInput );

//     registClickToActive( searchCancel, searchDropdown, 'search__dropdown--active' );

//     // Small screen
//     const headerMenu = header.querySelector( '.header__menu' );
//     const headerNavigation = header.querySelector( '.header__navigation' );
//     const navigationCancel = headerNavigation.querySelector( '.navigation__cancel' );
//     const navigationLanguage = headerNavigation.querySelector( '.navigation__language' );
//     const languageSwitch = navigationLanguage.querySelector( '.language__switch' );
//     const languageDropdown = navigationLanguage.querySelector( '.language__dropdown' );

//     registClickToActive( headerMenu, headerNavigation, 'header__navigation--active' );

//     registClickToActive( navigationCancel, headerNavigation, 'header__navigation--active' );

//     Array.from( headerNavigation.querySelectorAll( '.item__switch' ) )
//     .forEach( itemSwitch => registItemSwitch( itemSwitch ) );

//     registLanguageSwitch( navigationLanguage, languageSwitch, languageDropdown );

//     // Common
//     registClickToHide( headerNavigation, headerMenu, headerlanguageDropdown, languageButton );
// };

export default function () {
    return;
}
