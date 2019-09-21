/**
 * @file header event module.
 * @author ProFatXuanAll <ProFatXuanAll@gmail.com>
 * @version 1.0.0
 * @since 1.0.0
 */

import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import ValidateUtils from 'models/common/utils/validate.js';
import { host, staticHost, } from 'settings/server/config.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import loginButtonHTML from 'static/src/pug/components/common/login.pug';
import LanguageUtils from 'models/common/utils/language.js';
import UrlUtils from 'static/src/js/utils/url.js';

export default class GetHeaderLarge {
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
        const functionElementQuerySelector = element => `${ headerBlockQuerySelector( 'functions' ) } > .functions__${ element }`;
        const functionBlockQuerySelector = block => `${ functionElementQuerySelector( block ) }.${ block }`;
        const functionRightElementQuerySelector = element => `${ functionBlockQuerySelector( 'right' ) } > .right__${ element }`;
        const functionRightBlockQuerySelector = block => `${ functionRightElementQuerySelector( block ) }.${ block }`;
        const searchElementQuerySelector = element => `${ functionRightBlockQuerySelector( 'search' ) } > .search__${ element }`;
        const searchBlockQuerySelector = block => `${ searchElementQuerySelector( block ) }.${ block }`;
        const languageElementQuerySelector = element => `${ functionRightBlockQuerySelector( 'language' ) } > .language__${ element }`;
        const languageBlockQuerySelector = block => `${ languageElementQuerySelector( block ) }.${ block }`;
        const languageButtonElementQuerySelector = element => `${ languageBlockQuerySelector( 'button' ) } > .button__${ element }`;

        this.DOM = {
            header:         opt.headerDOM,
            language:       {
                button:   opt.headerDOM.querySelector( languageBlockQuerySelector( 'button' ) ),
                dropdown: opt.headerDOM.querySelector( languageButtonElementQuerySelector( 'dropdown' ) ),
                active:   false,
            },
            search: {
                button:   opt.headerDOM.querySelector( searchBlockQuerySelector( 'button' ) ),
                dropdown: opt.headerDOM.querySelector( searchBlockQuerySelector( 'dropdown' ) ),
                cancel:   opt.headerDOM.querySelector( `${ searchBlockQuerySelector( 'dropdown' ) } > .dropdown__cancel` ),
            },
            login: opt.headerDOM.querySelector( functionRightElementQuerySelector( 'login' ) ),
        };

        if (
            !ValidateUtils.isDomElement( this.DOM.language.button ) ||
            !ValidateUtils.isDomElement( this.DOM.language.dropdown ) ||
            !ValidateUtils.isDomElement( this.DOM.search.button ) ||
            !ValidateUtils.isDomElement( this.DOM.search.dropdown ) ||
            !ValidateUtils.isDomElement( this.DOM.search.cancel ) ||
            !ValidateUtils.isDomElement( this.DOM.login )
        )
            throw new Error( 'DOM not found.' );

        this.host = host;
        this.languageId = WebLanguageUtils.currentLanguageId;

        this.subscribeLanguageEvent();
        this.subscribeSearchEvent();
        this.subscribeScrollEvent();

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

    subscribeScrollEvent () {
        let prevScrollpos = window.pageYOffset;
        window.addEventListener( 'scroll', () => {
            const currentScrollPos = window.pageYOffset;
            if ( prevScrollpos < currentScrollPos && currentScrollPos > 70 )
                classAdd( this.DOM.header, 'header--active' );
            else
                classRemove( this.DOM.header, 'header--active' );

            if ( currentScrollPos > 70 )
                classAdd( this.DOM.header, 'header--fixed' );
            else
                classRemove( this.DOM.header, 'header--fixed' );
            prevScrollpos = currentScrollPos;
        } );
    }

    async renderLogin () {
        try {
            const result = await this.fetchData( 'user/id', {
                credentials: 'include',
                method:      'post',
            } );
            console.log( result );
            if ( result.userId > -1 ) {
                const data = await this.fetchMiniProfileData( result.userId );
                console.log( data );
                this.DOM.login.innerHTML = loginButtonHTML( {
                    name:        data.name,
                    belongBlock: 'login',
                    photo:       `faculty/${ data.photo }`,
                    LANG:        {
                        id:            WebLanguageUtils.currentLanguageId,
                        getLanguageId: LanguageUtils.getLanguageId,
                    },
                    UTILS: {
                        url:          UrlUtils.serverUrl( new UrlUtils( host, WebLanguageUtils.currentLanguageId ) ),
                        staticUrl:    UrlUtils.serverUrl( new UrlUtils( staticHost, WebLanguageUtils.currentLanguageId ) ),
                    },
                },
                'login' );
            }
        }
        catch ( err ) {
            console.error( err );
        }
    }

    async fetchData ( url, opt ) {
        try {
            const res = await fetch( `${ this.host }/${ url }`, opt );

            if ( !res.ok )
                throw new Error( 'Fetch data failed' );

            return res.json();
        }
        catch ( err ) {
            throw err;
        }
    }

    async fetchMiniProfileData ( id ) {
        try {
            const res = await fetch( `${ this.host }/api/user/miniProfile/${ id }?languageId=${ this.languageId }`, {
                credentials: 'include',
            } );

            if ( !res.ok )
                throw new Error( 'No miniProfile found' );

            return res.json();
        }
        catch ( err ) {
            throw err;
        }
    }
}

