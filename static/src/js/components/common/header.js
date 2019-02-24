/**
 * @file header event module.
 * @author ProFatXuanAll <ProFatXuanAll@gmail.com>
 * @version 1.0.0
 * @since 1.0.0
 */

import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import ValidateUtils from 'models/common/utils/validate.js';

export class GetHeaderMin {
    /**
     * @param {object} opt
     * @param {HTMLElement} opt.headerDOM
     */

    constructor ( opt ) {
        opt = opt || {};

        if (
            !opt.headerDOM ||
            !ValidateUtils.isDomElement( opt.headerDOM )
        )
            throw new TypeError( 'invalid arguments' );

        const headerElementQuerySelector = element => `.header > .header__${ element }`;
        const headerBlockQuerySelector = block => `${ headerElementQuerySelector( block ) }.${ block }`;
        const navigationElementQuerySelector = element => `${ headerBlockQuerySelector( 'navigation' ) } > .navigation__${ element }`;
        const navigationBlockQuerySelector = block => `${ navigationElementQuerySelector( block ) }.${ block }`;
        const itemElementQuerySelector = element => `${ navigationBlockQuerySelector( 'list' ) } > .list__item.item > .item__${ element }`;
        const itemBlockQuerySelector = block => `${ itemElementQuerySelector( block ) }.${ block }`;
        const languageElementQuerySelector = element => `${ navigationBlockQuerySelector( 'language' ) } > .language__${ element }`;
        const languageBlockQuerySelector = block => `${ languageElementQuerySelector( block ) }.${ block }`;

        this.DOM = {
            header:     opt.headerDOM,
            menu:       opt.headerDOM.querySelector( headerElementQuerySelector( 'menu' ) ),
            navigation: opt.headerDOM.querySelector( headerBlockQuerySelector( 'navigation' ) ),
            cancel:     opt.headerDOM.querySelector( navigationElementQuerySelector( 'cancel' ) ),
            item:       Array
            .from( opt.headerDOM.querySelectorAll( `${ navigationBlockQuerySelector( 'list' ) } > .list__item.item` ) )
            .map( listDOM => ( {
                switch:   listDOM.querySelector( itemElementQuerySelector( 'switch' ) ),
                dropdown: listDOM.querySelector( itemBlockQuerySelector( 'dropdown' ) ),
                active:   false,
            } ) )
            .filter( itemObj => itemObj.switch !== null && itemObj.dropdown !== null ),
            language: {
                switch:   opt.headerDOM.querySelector( languageElementQuerySelector( 'switch' ) ),
                dropdown: opt.headerDOM.querySelector( languageBlockQuerySelector( 'dropdown' ) ),
                active:   false,
            },
        };

        if (
            !ValidateUtils.isDomElement( this.DOM.menu ) ||
            !ValidateUtils.isDomElement( this.DOM.cancel ) ||
            !this.DOM.item.length ||
            !this.DOM.item.every( itemObj => ValidateUtils.isDomElement( itemObj.switch ) && ValidateUtils.isDomElement( itemObj.dropdown ) ) ||
            !ValidateUtils.isDomElement( this.DOM.language.switch ) ||
            !ValidateUtils.isDomElement( this.DOM.language.dropdown )
        )
            throw new Error( 'DOM not found.' );

        this.subscribeMenuEvent();
        this.subscribeDropdownEvent();
        this.subscribeLanguageEvent();

        return this;
    }

    subscribeMenuEvent () {
        window.addEventListener( 'click', ( event ) => {
            if ( event.target !== this.DOM.menu && !this.DOM.navigation.contains( event.target ) )
                classRemove( this.DOM.navigation, 'header__navigation--active' );
        } );

        this.DOM.menu.addEventListener( 'click', () => {
            classAdd( this.DOM.navigation, 'header__navigation--active' );
        } );

        this.DOM.cancel.addEventListener( 'click', () => {
            classRemove( this.DOM.navigation, 'header__navigation--active' );
        } );
    }

    subscribeDropdownEvent () {
        this.DOM.item.forEach( ( itemObj ) => {
            itemObj.switch.addEventListener( 'click', () => {
                if ( itemObj.active ) {
                    classRemove( itemObj.dropdown, 'item__dropdown--open' );
                    classRemove( itemObj.switch, 'item__switch--active' );
                }
                else {
                    this.DOM.item.forEach( ( itemObj ) => {
                        if ( itemObj.active ) {
                            classRemove( itemObj.dropdown, 'item__dropdown--open' );
                            classRemove( itemObj.switch, 'item__switch--active' );
                            itemObj.active = false;
                        }
                    } );
                    classAdd( itemObj.dropdown, 'item__dropdown--open' );
                    classAdd( itemObj.switch, 'item__switch--active' );
                }
                itemObj.active = !itemObj.active;
            } );
        } );
    }

    subscribeLanguageEvent () {
        this.DOM.language.switch.addEventListener( 'click', () => {
            if ( this.DOM.language.active ) {
                classRemove( this.DOM.language.dropdown, 'language__dropdown--open' );
                classRemove( this.DOM.language.switch, 'language__switch--open' );
            }
            else {
                classAdd( this.DOM.language.dropdown, 'language__dropdown--open' );
                classAdd( this.DOM.language.switch, 'language__switch--open' );
            }
            this.DOM.language.active = !this.DOM.language.active;
        } );
    }
}

export class GetHeaderSmall {
    /**
     * @param {object} opt
     * @param {HTMLElement} opt.headerDOM
     */

    constructor ( opt ) {
        opt = opt || {};

        if (
            !opt.headerDOM ||
            !ValidateUtils.isDomElement( opt.headerDOM )
        )
            throw new TypeError( 'invalid arguments' );

        const headerElementQuerySelector = element => `.header > .header__${ element }`;
        const headerBlockQuerySelector = block => `${ headerElementQuerySelector( block ) }.${ block }`;
        const navigationElementQuerySelector = element => `${ headerBlockQuerySelector( 'navigation' ) } > .navigation__${ element }`;
        const navigationBlockQuerySelector = block => `${ navigationElementQuerySelector( block ) }.${ block }`;
        const itemElementQuerySelector = element => `${ navigationBlockQuerySelector( 'list' ) } > .list__item.item > .item__${ element }`;
        const itemBlockQuerySelector = block => `${ itemElementQuerySelector( block ) }.${ block }`;
        const languageElementQuerySelector = element => `${ navigationBlockQuerySelector( 'language' ) } > .language__${ element }`;
        const languageBlockQuerySelector = block => `${ languageElementQuerySelector( block ) }.${ block }`;

        this.DOM = {
            header:     opt.headerDOM,
            menu:       opt.headerDOM.querySelector( headerElementQuerySelector( 'menu' ) ),
            navigation: opt.headerDOM.querySelector( headerBlockQuerySelector( 'navigation' ) ),
            cancel:     opt.headerDOM.querySelector( navigationElementQuerySelector( 'cancel' ) ),
            item:       Array
            .from( opt.headerDOM.querySelectorAll( `${ navigationBlockQuerySelector( 'list' ) } > .list__item.item` ) )
            .map( listDOM => ( {
                switch:   listDOM.querySelector( itemElementQuerySelector( 'switch' ) ),
                dropdown: listDOM.querySelector( itemBlockQuerySelector( 'dropdown' ) ),
                active:   false,
            } ) )
            .filter( itemObj => itemObj.switch !== null && itemObj.dropdown !== null ),
            language: {
                switch:   opt.headerDOM.querySelector( languageElementQuerySelector( 'switch' ) ),
                dropdown: opt.headerDOM.querySelector( languageBlockQuerySelector( 'dropdown' ) ),
                active:   false,
            },
        };

        if (
            !ValidateUtils.isDomElement( this.DOM.menu ) ||
            !ValidateUtils.isDomElement( this.DOM.cancel ) ||
            !this.DOM.item.length ||
            !this.DOM.item.every( itemObj => ValidateUtils.isDomElement( itemObj.switch ) && ValidateUtils.isDomElement( itemObj.dropdown ) ) ||
            !ValidateUtils.isDomElement( this.DOM.language.switch ) ||
            !ValidateUtils.isDomElement( this.DOM.language.dropdown )
        )
            throw new Error( 'DOM not found.' );

        this.subscribeMenuEvent();
        this.subscribeDropdownEvent();
        this.subscribeLanguageEvent();

        return this;
    }

    subscribeMenuEvent () {
        window.addEventListener( 'click', ( event ) => {
            if ( event.target !== this.DOM.menu && !this.DOM.navigation.contains( event.target ) )
                classRemove( this.DOM.navigation, 'header__navigation--active' );
        } );

        this.DOM.menu.addEventListener( 'click', () => {
            classAdd( this.DOM.navigation, 'header__navigation--active' );
        } );

        this.DOM.cancel.addEventListener( 'click', () => {
            classRemove( this.DOM.navigation, 'header__navigation--active' );
        } );
    }

    subscribeDropdownEvent () {
        this.DOM.item.forEach( ( itemObj ) => {
            itemObj.switch.addEventListener( 'click', () => {
                if ( itemObj.active ) {
                    classRemove( itemObj.dropdown, 'item__dropdown--open' );
                    classRemove( itemObj.switch, 'item__switch--active' );
                }
                else {
                    this.DOM.item.forEach( ( itemObj ) => {
                        if ( itemObj.active ) {
                            classRemove( itemObj.dropdown, 'item__dropdown--open' );
                            classRemove( itemObj.switch, 'item__switch--active' );
                            itemObj.active = false;
                        }
                    } );
                    classAdd( itemObj.dropdown, 'item__dropdown--open' );
                    classAdd( itemObj.switch, 'item__switch--active' );
                }
                itemObj.active = !itemObj.active;
            } );
        } );
    }

    subscribeLanguageEvent () {
        this.DOM.language.switch.addEventListener( 'click', () => {
            if ( this.DOM.language.active ) {
                classRemove( this.DOM.language.dropdown, 'language__dropdown--open' );
                classRemove( this.DOM.language.switch, 'language__switch--open' );
            }
            else {
                classAdd( this.DOM.language.dropdown, 'language__dropdown--open' );
                classAdd( this.DOM.language.switch, 'language__switch--open' );
            }
            this.DOM.language.active = !this.DOM.language.active;
        } );
    }
}

export class GetHeaderMedium {
    /**
     * @param {object} opt
     * @param {HTMLElement} opt.headerDOM
     */

    constructor ( opt ) {
        opt = opt || {};

        if (
            !opt.headerDOM ||
            !ValidateUtils.isDomElement( opt.headerDOM )
        )
            throw new TypeError( 'invalid arguments' );

        const headerElementQuerySelector = element => `.header > .header__${ element }`;
        const headerBlockQuerySelector = block => `${ headerElementQuerySelector( block ) }.${ block }`;
        const navigationElementQuerySelector = element => `${ headerBlockQuerySelector( 'navigation' ) } > .navigation__${ element }`;
        const navigationBlockQuerySelector = block => `${ navigationElementQuerySelector( block ) }.${ block }`;
        const itemElementQuerySelector = element => `${ navigationBlockQuerySelector( 'list' ) } > .list__item.item > .item__${ element }`;
        const itemBlockQuerySelector = block => `${ itemElementQuerySelector( block ) }.${ block }`;
        const languageElementQuerySelector = element => `${ navigationBlockQuerySelector( 'language' ) } > .language__${ element }`;
        const languageBlockQuerySelector = block => `${ languageElementQuerySelector( block ) }.${ block }`;

        this.DOM = {
            header:     opt.headerDOM,
            menu:       opt.headerDOM.querySelector( headerElementQuerySelector( 'menu' ) ),
            navigation: opt.headerDOM.querySelector( headerBlockQuerySelector( 'navigation' ) ),
            cancel:     opt.headerDOM.querySelector( navigationElementQuerySelector( 'cancel' ) ),
            item:       Array
            .from( opt.headerDOM.querySelectorAll( `${ navigationBlockQuerySelector( 'list' ) } > .list__item.item` ) )
            .map( listDOM => ( {
                switch:   listDOM.querySelector( itemElementQuerySelector( 'switch' ) ),
                dropdown: listDOM.querySelector( itemBlockQuerySelector( 'dropdown' ) ),
                active:   false,
            } ) )
            .filter( itemObj => itemObj.switch !== null && itemObj.dropdown !== null ),
            language: {
                switch:   opt.headerDOM.querySelector( languageElementQuerySelector( 'switch' ) ),
                dropdown: opt.headerDOM.querySelector( languageBlockQuerySelector( 'dropdown' ) ),
                active:   false,
            },
        };

        if (
            !ValidateUtils.isDomElement( this.DOM.menu ) ||
            !ValidateUtils.isDomElement( this.DOM.cancel ) ||
            !this.DOM.item.length ||
            !this.DOM.item.every( itemObj => ValidateUtils.isDomElement( itemObj.switch ) && ValidateUtils.isDomElement( itemObj.dropdown ) ) ||
            !ValidateUtils.isDomElement( this.DOM.language.switch ) ||
            !ValidateUtils.isDomElement( this.DOM.language.dropdown )
        )
            throw new Error( 'DOM not found.' );

        this.subscribeMenuEvent();
        this.subscribeDropdownEvent();
        this.subscribeLanguageEvent();

        return this;
    }

    subscribeMenuEvent () {
        window.addEventListener( 'click', ( event ) => {
            if ( event.target !== this.DOM.menu && !this.DOM.navigation.contains( event.target ) )
                classRemove( this.DOM.navigation, 'header__navigation--active' );
        } );

        this.DOM.menu.addEventListener( 'click', () => {
            classAdd( this.DOM.navigation, 'header__navigation--active' );
        } );

        this.DOM.cancel.addEventListener( 'click', () => {
            classRemove( this.DOM.navigation, 'header__navigation--active' );
        } );
    }

    subscribeDropdownEvent () {
        this.DOM.item.forEach( ( itemObj ) => {
            itemObj.switch.addEventListener( 'click', () => {
                if ( itemObj.active ) {
                    classRemove( itemObj.dropdown, 'item__dropdown--open' );
                    classRemove( itemObj.switch, 'item__switch--active' );
                }
                else {
                    this.DOM.item.forEach( ( itemObj ) => {
                        if ( itemObj.active ) {
                            classRemove( itemObj.dropdown, 'item__dropdown--open' );
                            classRemove( itemObj.switch, 'item__switch--active' );
                            itemObj.active = false;
                        }
                    } );
                    classAdd( itemObj.dropdown, 'item__dropdown--open' );
                    classAdd( itemObj.switch, 'item__switch--active' );
                }
                itemObj.active = !itemObj.active;
            } );
        } );
    }

    subscribeLanguageEvent () {
        this.DOM.language.switch.addEventListener( 'click', () => {
            if ( this.DOM.language.active ) {
                classRemove( this.DOM.language.dropdown, 'language__dropdown--open' );
                classRemove( this.DOM.language.switch, 'language__switch--open' );
            }
            else {
                classAdd( this.DOM.language.dropdown, 'language__dropdown--open' );
                classAdd( this.DOM.language.switch, 'language__switch--open' );
            }
            this.DOM.language.active = !this.DOM.language.active;
        } );
    }
}

export class GetHeaderLarge {
    /**
     * @param {object} opt
     * @param {HTMLElement} opt.headerDOM
     */

    constructor ( opt ) {
        opt = opt || {};

        if (
            !opt.headerDOM ||
            !ValidateUtils.isDomElement( opt.headerDOM )
        )
            throw new TypeError( 'invalid arguments' );

        const headerElementQuerySelector = element => `.header > .header__${ element }`;
        const headerBlockQuerySelector = block => `${ headerElementQuerySelector( block ) }.${ block }`;
        const navigationElementQuerySelector = element => `${ headerBlockQuerySelector( 'navigation' ) } > .navigation__${ element }`;
        const navigationBlockQuerySelector = block => `${ navigationElementQuerySelector( block ) }.${ block }`;
        const itemElementQuerySelector = element => `${ navigationBlockQuerySelector( 'list' ) } > .list__item.item > .item__${ element }`;
        const itemBlockQuerySelector = block => `${ itemElementQuerySelector( block ) }.${ block }`;
        const languageElementQuerySelector = element => `${ navigationBlockQuerySelector( 'language' ) } > .language__${ element }`;
        const languageBlockQuerySelector = block => `${ languageElementQuerySelector( block ) }.${ block }`;

        this.DOM = {
            header:     opt.headerDOM,
            menu:       opt.headerDOM.querySelector( headerElementQuerySelector( 'menu' ) ),
            navigation: opt.headerDOM.querySelector( headerBlockQuerySelector( 'navigation' ) ),
            cancel:     opt.headerDOM.querySelector( navigationElementQuerySelector( 'cancel' ) ),
            item:       Array
            .from( opt.headerDOM.querySelectorAll( `${ navigationBlockQuerySelector( 'list' ) } > .list__item.item` ) )
            .map( listDOM => ( {
                switch:   listDOM.querySelector( itemElementQuerySelector( 'switch' ) ),
                dropdown: listDOM.querySelector( itemBlockQuerySelector( 'dropdown' ) ),
                active:   false,
            } ) )
            .filter( itemObj => itemObj.switch !== null && itemObj.dropdown !== null ),
            language: {
                switch:   opt.headerDOM.querySelector( languageElementQuerySelector( 'switch' ) ),
                dropdown: opt.headerDOM.querySelector( languageBlockQuerySelector( 'dropdown' ) ),
                active:   false,
            },
        };

        if (
            !ValidateUtils.isDomElement( this.DOM.menu ) ||
            !ValidateUtils.isDomElement( this.DOM.cancel ) ||
            !this.DOM.item.length ||
            !this.DOM.item.every( itemObj => ValidateUtils.isDomElement( itemObj.switch ) && ValidateUtils.isDomElement( itemObj.dropdown ) )
        )
            throw new Error( 'DOM not found.' );

        this.subscribeMenuEvent();

        return this;
    }

    subscribeMenuEvent () {
        window.addEventListener( 'click', ( event ) => {
            if ( event.target !== this.DOM.menu && !this.DOM.navigation.contains( event.target ) )
                classRemove( this.DOM.navigation, 'header__navigation--active' );
        } );

        this.DOM.menu.addEventListener( 'click', () => {
            classAdd( this.DOM.navigation, 'header__navigation--active' );
        } );

        this.DOM.cancel.addEventListener( 'click', () => {
            classRemove( this.DOM.navigation, 'header__navigation--active' );
        } );
    }
}