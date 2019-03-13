/**
 * @file header event module.
 * @author ProFatXuanAll <ProFatXuanAll@gmail.com>
 * @version 1.0.0
 * @since 1.0.0
 */

import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import ValidateUtils from 'models/common/utils/validate.js';

export default class GetHeaderLarge {
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
        const functionElementQuerySelector = element => `${ headerBlockQuerySelector( 'functions' ) } > .functions__${ element }`;
        const functionBlockQuerySelector = block => `${ functionElementQuerySelector( block ) }.${ block }`;
        const functionBottomElementQuerySelector = element => `${ functionBlockQuerySelector( 'bottom' ) } > .bottom__${ element }`;
        const functionBottomBlockQuerySelector = block => `${ functionBottomElementQuerySelector( block ) }.${ block }`;
        const searchElementQuerySelector = element => `${ functionBottomBlockQuerySelector( 'search' ) } > .search__${ element }`;
        const searchBlockQuerySelector = block => `${ searchElementQuerySelector( block ) }.${ block }`;
        const languageElementQuerySelector = element => `${ functionBlockQuerySelector( 'language' ) } > .language__${ element }`;
        const languageBlockQuerySelector = block => `${ languageElementQuerySelector( block ) }.${ block }`;
        const languageButtonElementQuerySelector = element => `${ languageBlockQuerySelector( 'button' ) } > .button__${ element }`;

        this.DOM = {
            header:         opt.headerDOM,
            allNavigations: Array.from( opt.allHeaderDOMs ).map( header => header.querySelector( headerBlockQuerySelector( 'navigation' ) ) ),
            language:       {
                button:   opt.headerDOM.querySelector( languageElementQuerySelector( 'button' ) ),
                dropdown: opt.headerDOM.querySelector( languageButtonElementQuerySelector( 'dropdown' ) ),
                active:   false,
            },
            search: {
                button:   opt.headerDOM.querySelector( searchBlockQuerySelector( 'button' ) ),
                dropdown: opt.headerDOM.querySelector( searchBlockQuerySelector( 'dropdown' ) ),
                cancel:   opt.headerDOM.querySelector( `${ searchBlockQuerySelector( 'dropdown' ) } > .dropdown__cancel` ),
            },
        };

        if (
            !this.DOM.allNavigations.length ||
            !this.DOM.allNavigations.every( ValidateUtils.isDomElement ) ||
            !ValidateUtils.isDomElement( this.DOM.language.button ) ||
            !ValidateUtils.isDomElement( this.DOM.language.dropdown ) ||
            !ValidateUtils.isDomElement( this.DOM.search.button ) ||
            !ValidateUtils.isDomElement( this.DOM.search.dropdown ) ||
            !ValidateUtils.isDomElement( this.DOM.search.cancel )
        )
            throw new Error( 'DOM not found.' );

        this.subscribeLanguageEvent();
        this.subscribeSearchEvent();

        return this;
    }

    subscribeLanguageEvent () {
        this.DOM.language.button.addEventListener( 'click', () => {
            if ( this.DOM.language.active )
                classRemove( this.DOM.language.dropdown, 'button__dropdown--active' );

            else
                classAdd( this.DOM.language.dropdown, 'button__dropdown--active' );

            this.DOM.language.active = !this.DOM.language.active;
        } );
    }

    subscribeSearchEvent () {
        this.DOM.search.button.addEventListener( 'click', () => {
            classAdd( this.DOM.search.dropdown, 'search__dropdown--active' );
        } );
        this.DOM.search.cancel.addEventListener( 'click', () => {
            classRemove( this.DOM.search.dropdown, 'search__dropdown--active' );
        } );
    }
}
