/**
 * @file header event module.
 * @author ProFatXuanAll <ProFatXuanAll@gmail.com>
 * @version 1.0.0
 * @since 1.0.0
 */

import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import ValidateUtils from 'models/common/utils/validate.js';

export default class GetHeaderMedium {
    /**
     * @param {object} opt
     * @param {HTMLElement} opt.headerDOM
     */

    constructor ( opt ) {
        opt = opt || {};

        if (
            !opt.headerDOM ||
            !ValidateUtils.isDomElement( opt.headerDOM ) ||
            opt.allHeaderDOMs.length === 0 ||
            !Array.from( opt.allHeaderDOMs ).every( ValidateUtils.isDomElement )
        )
            throw new TypeError( 'invalid arguments' );

        const headerElementQuerySelector = element => `.header > .header__${ element }`;
        const headerBlockQuerySelector = block => `${ headerElementQuerySelector( block ) }.${ block }`;
        const navigationElementQuerySelector = element => `${ headerBlockQuerySelector( 'navigation' ) } > .navigation__${ element }`;
        const navigationBlockQuerySelector = block => `${ navigationElementQuerySelector( block ) }.${ block }`;
        const languageElementQuerySelector = element => `${ navigationBlockQuerySelector( 'language' ) } > .language__${ element }`;
        const languageBlockQuerySelector = block => `${ languageElementQuerySelector( block ) }.${ block }`;
        const listItemModifiers = [
            'about',
            'research',
            'student',
            'announcement',
            'resource',
        ];
        const listQuerySelector = modifier => `${ navigationBlockQuerySelector( 'list' ) } > .list__item.item.list__item--${ modifier }`;
        const listItemElementQuerySelector = ( element, modifier ) => `${ listQuerySelector( modifier ) } > .item__${ element }`;
        const listItemBlockQuerySelector = ( block, modifier ) => `${ listItemElementQuerySelector( block, modifier ) }.${ block }`;

        this.DOM = {
            header:         opt.headerDOM,
            allNavigations: Array.from( opt.allHeaderDOMs ).map( header => header.querySelector( headerBlockQuerySelector( 'navigation' ) ) ),
            menu:           opt.headerDOM.querySelector( headerElementQuerySelector( 'menu' ) ),
            navigation:     opt.headerDOM.querySelector( headerBlockQuerySelector( 'navigation' ) ),
            cancel:         opt.headerDOM.querySelector( navigationElementQuerySelector( 'cancel' ) ),
            item:           listItemModifiers.map( modifier => ( {
                switch:    opt.headerDOM.querySelector( listItemElementQuerySelector( 'switch', modifier ) ),
                switches:  Array.from( opt.allHeaderDOMs )
                .map( header => header.querySelector( listItemElementQuerySelector( 'switch', modifier ) ) )
                .filter( switchDOM => switchDOM !== null ),
                dropdowns: Array.from( opt.allHeaderDOMs )
                .map( header => header.querySelector( listItemBlockQuerySelector( 'dropdown', modifier ) ) )
                .filter( dropdownDOM => dropdownDOM !== null ),
            } ) )
            .filter( itemObj => itemObj.switch !== null ),
            language: {
                switch:    opt.headerDOM.querySelector( languageElementQuerySelector( 'switch' ) ),
                switches:  Array.from( opt.allHeaderDOMs )
                .map( header => header.querySelector( languageElementQuerySelector( 'switch' ) ) )
                .filter( switchDOM => switchDOM !== null ),
                dropdowns: Array.from( opt.allHeaderDOMs )
                .map( header => header.querySelector( languageBlockQuerySelector( 'dropdown' ) ) )
                .filter( dropdownDOM => dropdownDOM !== null ),
            },
        };

        if (
            !ValidateUtils.isDomElement( this.DOM.menu ) ||
            !ValidateUtils.isDomElement( this.DOM.cancel ) ||
            !this.DOM.item.length ||
            !this.DOM.item.every( itemObj => ValidateUtils.isDomElement( itemObj.switch ) &&
                itemObj.dropdowns.every( ValidateUtils.isDomElement ) &&
                itemObj.dropdowns.length !== 0 ) ||
            !ValidateUtils.isDomElement( this.DOM.language.switch ) ||
            !this.DOM.language.switches.length ||
            !this.DOM.language.switches.every( ValidateUtils.isDomElement ) ||
            !this.DOM.language.dropdowns.length ||
            !this.DOM.language.dropdowns.every( ValidateUtils.isDomElement )
        )
            throw new Error( 'DOM not found.' );

        this.subscribeMenuEvent();
        this.subscribeDropdownEvent();
        this.subscribeLanguageEvent();
        this.subscribeScrollEvent();

        return this;
    }

    subscribeMenuEvent () {
        window.addEventListener( 'click', ( event ) => {
            if ( event.target !== this.DOM.menu &&
                !this.DOM.navigation.contains( event.target ) &&
                window.getComputedStyle( this.DOM.header ).display !== 'none'
            ) {
                this.DOM.allNavigations.forEach( ( navigationDOM ) => {
                    classRemove( navigationDOM, 'header__navigation--active' );
                } );
            }
        } );

        this.DOM.menu.addEventListener( 'click', () => {
            this.DOM.allNavigations.forEach( ( navigationDOM ) => {
                classAdd( navigationDOM, 'header__navigation--active' );
            } );
        } );

        this.DOM.cancel.addEventListener( 'click', () => {
            this.DOM.allNavigations.forEach( ( navigationDOM ) => {
                classRemove( navigationDOM, 'header__navigation--active' );
            } );
        } );
    }

    subscribeDropdownEvent () {
        this.DOM.item.forEach( ( itemObj ) => {
            itemObj.switch.addEventListener( 'click', () => {
                if ( itemObj.switch.classList.contains( 'item__switch--active' ) ) {
                    itemObj.switches.forEach( switchDOM => classRemove( switchDOM, 'item__switch--active' ) );
                    itemObj.dropdowns.forEach( dropdownDOM => classRemove( dropdownDOM, 'item__dropdown--open' ) );
                }
                else {
                    this.DOM.item.forEach( ( itemObj ) => {
                        itemObj.switches.forEach( switchDOM => classRemove( switchDOM, 'item__switch--active' ) );
                        itemObj.dropdowns.forEach( dropdownDOM => classRemove( dropdownDOM, 'item__dropdown--open' ) );
                    } );
                    itemObj.switches.forEach( switchDOM => classAdd( switchDOM, 'item__switch--active' ) );
                    itemObj.dropdowns.forEach( dropdownDOM => classAdd( dropdownDOM, 'item__dropdown--open' ) );
                }
            } );
        } );
    }

    subscribeLanguageEvent () {
        this.DOM.language.switch.addEventListener( 'click', () => {
            if ( this.DOM.language.switch.classList.contains( 'language__switch--active' ) ) {
                this.DOM.language.dropdowns.forEach( dropdownDOM => classRemove( dropdownDOM, 'language__dropdown--open' ) );
                this.DOM.language.switches.forEach( switchDOM => classRemove( switchDOM, 'language__switch--active' ) );
            }
            else {
                this.DOM.language.dropdowns.forEach( dropdownDOM => classAdd( dropdownDOM, 'language__dropdown--open' ) );
                this.DOM.language.switches.forEach( switchDOM => classAdd( switchDOM, 'language__switch--active' ) );
            }
        } );
    }

    subscribeScrollEvent () {
        let prevScrollpos = window.pageYOffset;
        window.addEventListener( 'scroll', () => {
            const currentScrollPos = window.pageYOffset;
            if ( prevScrollpos < currentScrollPos && currentScrollPos > 96 )
                classAdd( this.DOM.header, 'header--active' );
            else
                classRemove( this.DOM.header, 'header--active' );

            if ( currentScrollPos > 96 )
                classAdd( this.DOM.header, 'header--fixed' );
            else
                classRemove( this.DOM.header, 'header--fixed' );
            prevScrollpos = currentScrollPos;
        } );
    }
}
