/* eslint no-unused-vars: off */
// import event from 'static/src/js/components/common/header/event.js';
import { registClickModifyClass, registItemSwitch, documentClickCheck, registLanguageSwitch, }
from 'static/src/js/components/common/header/event.js';

export default ( header ) => {
  const headerMenu = header.querySelector( '.header__menu' );
  const headerNavigation = header.querySelector( '.header__navigation' );
  const navigationCancel = headerNavigation.querySelector( '.navigation__cancel' );
  const headerLanguage = header.querySelector( '.header__language' );
  const languageButton = headerLanguage.querySelector( '.language__button' );
  const headerlanguageDropdown = languageButton.querySelector( '.button__dropdown' );
  const headerSearch = header.querySelector( '.header__search' );
  const searchButton = headerSearch.querySelector( '.search__button' );
  const searchDropdown = headerSearch.querySelector( '.search__dropdown' );
  const formInput = searchDropdown.querySelector( '.dropdown__form' ).querySelector( '.form__input' );
  const searchCancel = headerSearch.querySelector( '.dropdown__cancel' );
  const navigationLanguage = headerNavigation.querySelector( '.navigation__language' );
  const languageSwitch = navigationLanguage.querySelector( '.language__switch' );
  const languageDropdown = languageSwitch.parentElement.querySelector( '.language__dropdown' );

  // Large screen
  registClickModifyClass( languageButton, headerlanguageDropdown, 'button__dropdown--active' );

  registClickModifyClass( searchButton, searchDropdown, 'search__dropdown--active', formInput.focus() )

  registClickModifyClass( searchCancel, searchDropdown, 'search__dropdown--active');

  // Small screen
  registClickModifyClass( headerMenu, headerNavigation, 'header__navigation--active' );

  registClickModifyClass( navigationCancel, headerNavigation, 'header__navigation--active');

  Array.from( headerNavigation.querySelectorAll( '.item__switch' ) )
  .forEach( (itemSwitch) => registItemSwitch(itemSwitch) );

  registLanguageSwitch( navigationLanguage, languageSwitch, languageDropdown, 'language__switch--active', 'language__dropdown--open' )

  // Common
  documentClickCheck( document, headerNavigation, headerMenu, 'header__navigation--active',
  headerlanguageDropdown, languageButton, 'button__dropdown--active' )
}
