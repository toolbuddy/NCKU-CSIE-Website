/**
 * Event module for `static/src/js/components/commmon/header`.
 *
 * @typedef {object} HTMLElement - An object represents HTML DOM element.
 */

/**
 * Registing `click` event for DOM object `source`.
 *
 * When `source` is clicked, check `target`'s class name list.
 * If `target`'s class name list contains `className`, remove `className` from it.
 * If not, add `className` on it.
 *
 * @param  {HTMLElement} source    - DOM element registing click event listener.
 * @param  {HTMLElement} target    - DOM element adding or removing class when `source` is clicked.
 * @param  {string}      className - The class name add or remove to `target` class name list.
 * @throws {TypeError} A type error is thrown if invalid arguments are passed.
 */

export function registClickToActive ( source, target, className ) {
    /**
     * An object's nodeType not equals to 1 means it is not an element node.
     */

    if ( source.nodeType !== 1 || target.nodeType !== 1 )
        throw new TypeError( 'Parameters \'source\' and \'target\' should be HTMLElement type.' );
    source.addEventListener( 'click', () => {
        if ( !target.classList.contains( className ) )
            target.classList.add( className );
        else
            target.classList.remove( className );
    } );
}

/**
 * Registing `click` event for search button, triggering search dropdown and focusing on form input.
 *
 * When `searchButton` is clicked, check `searchDropdown`'s class name list.
 * If `searchDropdown`'s class name list contains `'search__dropdown--active'`, remove from it.
 * If not, add on it and focus on `formInput`.
 *
 * @param  {HTMLElement} searchButton   - DOM element registing click event listener.
 * @param  {HTMLElement} searchDropdown - DOM element adding or removing class when `searchButton` is clicked.
 * @param  {HTMLElement} formInput      - DOM element focusing on when `'search__dropdown--active'` is added on `searchDropdown` class name list.
 * @throws {TypeError} A type error is thrown if invalid arguments are passed.
 */

export function registClickToActiveAndFocus ( searchButton, searchDropdown, formInput ) {
    /**
     * An object's nodeType not equals to 1 means it is not an element node.
     */

    if ( searchButton.nodeType !== 1 || searchDropdown.nodeType !== 1 || formInput.nodeType !== 1 )
        throw new TypeError( 'Parameters \'searchButton\', \'searchDropdown\' and \'formInput\' should be HTMLElement type.' );
    searchButton.addEventListener( 'click', () => {
        if ( !searchDropdown.classList.contains( 'search__dropdown--active' ) ) {
            searchDropdown.classList.add( 'search__dropdown--active' );
            formInput.focus();
        }
        else
            searchDropdown.classList.remove( 'search__dropdown--active' );
    } );
}

/**
 * Registing `click` event for `itemSwitch`, triggering `itemSwitch` and `itemDropdown` changing class name.
 *
 * When `itemSwitch` is clicked, check it's class name list.
 * If it's class name list contains `'item__switch--active'`, remove from it
 * and remove class name `'item__dropdown--open'` from `itemDropdown`.
 * If not, add on it and add `'item__dropdown--open'` on `itemDropdown`.
 *
 * @param  {HTMLElement} itemSwitch - Every list items in the header navigation.
 * @throws {TypeError} A type error is thrown if invalid arguments are passed.
 */

export function registItemSwitch ( itemSwitch ) {
    /**
     * An object's nodeType not equals to 1 means it is not an element node.
     */

    if ( itemSwitch.nodeType !== 1 )
        throw new TypeError( 'Parameter \'itemSwitch\' should be HTMLElement type.' );

    /**
     * A constant variable which level is same as `itemSwitch` and class name contain `'item__dropdown'`.
     * @constant {HTMLElement} itemDropdown
     */

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
}

/**
 * Registing `click` event for `navigationLanguage`, triggering `languageSwitch` and `languageDropdown` changing class name.
 *
 * When `navigationLanguage` is clicked, check it's class name list.
 * If it's class name list contains `'language__switch--active'`, remove from it
 * and remove class name `'language__dropdown--open'` from `languageDropdown`.
 * If not, add on it and add `'language__dropdown--open'` on `languageDropdown`.
 *
 * @param  {HTMLElement} navigationLanguage - Language list in header navigation, only appear in small screen version.
 * @param  {HTMLElement} languageSwitch     - Switch icon in `navigationLanguage`.
 * @param  {HTMLElement} languageDropdown   - Drop down list of `navigationLanguage`.
 * @throws {TypeError} A type error is thrown if invalid arguments are passed.
 */

export function registLanguageSwitch ( navigationLanguage, languageSwitch, languageDropdown ) {
    /**
     * An object's nodeType not equals to 1 means it is not an element node.
     */

    if ( navigationLanguage.nodeType !== 1 || languageSwitch.nodeType !== 1 || languageDropdown.nodeType !== 1 )
        throw new TypeError( 'Parameter \'navigationLanguage\', \'languageSwitch\' and \'languageDropdown\' should be HTMLElement type.' );
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
}

/**
 * A variable recording the parent-child relationship.
 * @constant {Map} cacheParentLog
 */

const cacheParentLog = new Map();

/**
 * Checking the parent-child relationship between the two parameters.
 *
 * Fisrt check `cacheParentLog[child]`:
 * 1. If it exists and has value `parent`, return `true`.
 * 2. Otherwise, find `child`'s parent `parentNode` and check whether it is equals to `parent`.
 * If yes, add `parent` to `cacheParentLog[child]` and return `true`.
 * If not, repeat step 2 until `parentNode` is null and then return `false`.
 *
 * @param   {HTMLElement} child  - Target element to judge.
 * @param   {HTMLElement} parent - Target element to be judged with.
 * @returns {boolean} `child` is child of `parent` or not.
 */

function isChild ( child, parent ) {
    /**
     * An object's nodeType not equals to 1 means it is not an element node.
     */

    if ( child.nodeType !== 1 || parent.nodeType !== 1 )
        throw new TypeError( 'Parameters \'child\' and \'parent\' should be HTMLElement type.' );
    if ( cacheParentLog[ child ] && cacheParentLog[ child ].has( parent ) )
        return true;
    let parentNode = child.parentNode;
    while ( parentNode ) {
        if ( parent === parentNode ) {
            if ( !cacheParentLog[ child ] )
                cacheParentLog[ child ] = new Set();
            cacheParentLog[ child ].add( parent );
            return true;
        }
        parentNode = parentNode.parentNode;
    }
    return false;
}

/**
 * Registing `click` event for `document`, trigger `headerNavigation` and `headerlanguageDropdown`
 * changing class name, respectively.
 *
 * First `addEventListener` is
 * when `doucument` is clicked and the following conditions are all true,
 * add `'header__navigation--active'` on `headerNavigation`.
 *  - `headerNavigation`'s class name list contains `'header__navigation--active'`.
 *  - The clicked place is not either `headerMenu`, `headerNavigation` nor `headerNavigation`'s child.
 * Otherwise, remove class name`'header__navigation--active'` from it.
 *
 * Second `addEventListener` is
 * when `doucument` is clicked and the following conditions are all true,
 * add `'button__dropdown--active'` on `headerlanguageDropdown`.
 *  - `headerlanguageDropdown`'s class name list contains `'button__dropdown--active'`.
 *  - The clicked place is not either `languageButton` nor its child.
 * Otherwise, remove class name `'button__dropdown--active'` from it.
 *
 * @param  {HTMLElement} headerNavigation       - Navigation bar in header, only appear in small screen version.
 * @param  {HTMLElement} headerMenu             - Menu icon in header, only appear in small screen version.
 * @param  {HTMLElement} headerlanguageDropdown - Drop down list of language button, only appear in large screen version.
 * @param  {HTMLElement} languageButton         - Language button in header, only appear in large screen version.
 * @throws {TypeError} A type error is thrown if invalid arguments are passed.
 */

export function registClickToHide ( headerNavigation, headerMenu, headerlanguageDropdown, languageButton ) {
    /**
     * An object's nodeType not equals to 1 means it is not an element node.
     */

    if ( headerNavigation.nodeType !== 1 || headerMenu.nodeType !== 1 || headerlanguageDropdown.nodeType !== 1 || languageButton.nodeType !== 1 )
        throw new TypeError( 'Parameter \'headerNavigation\', \'headerMenu\', \'headerlanguageDropdown\' and \'languageButton\' should be HTMLElement type.' );
    document.addEventListener( 'click', ( e ) => {
        if ( headerNavigation.classList.contains( 'header__navigation--active' ) &&
            e.target !== headerMenu &&
            e.target !== headerNavigation &&
            !isChild( e.target, headerNavigation ) )
            headerNavigation.classList.remove( 'header__navigation--active' );
        if ( headerlanguageDropdown.classList.contains( 'button__dropdown--active' ) &&
            e.target !== languageButton &&
            !isChild( e.target, languageButton ) )
            headerlanguageDropdown.classList.remove( 'button__dropdown--active' );
    } );
}
