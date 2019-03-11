/**
 * @file Staff data fetch module.
 * @author ProFatXuanAll <ProFatXuanAll@gmail.com>
 * @version 1.0.0
 * @since 1.0.0
 */

import WebLanguageUtils from 'static/src/js/utils/language.js';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import { host, staticHost, } from 'settings/server/config.js';
import cardHTML from 'static/src/pug/components/about/staff/cards.pug';
import UrlUtils from 'static/src/js/utils/url.js';
import ValidateUtils from 'models/common/utils/validate.js';

export default class GetStaff {
    /**
     * @param {object} opt
     * @param {HTMLElement} opt.staffDOM
     * @param {number} opt.languageId
     */

    constructor ( opt ) {
        opt = opt || {};

        if (
            !opt.staffDOM ||
            !ValidateUtils.isDomElement( opt.staffDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId )
        )
            throw new TypeError( 'invalid arguments' );

        const staffQuerySelector = block => `.staff__${ block }.${ block }`;

        this.DOM = {
            noResult: opt.staffDOM.querySelector( staffQuerySelector( 'no-result' ) ),
            loading:  opt.staffDOM.querySelector( staffQuerySelector( 'loading' ) ),
            cards:    opt.staffDOM.querySelector( staffQuerySelector( 'cards' ) ),
        };

        if (
            !ValidateUtils.isDomElement( this.DOM.noResult ) ||
            !ValidateUtils.isDomElement( this.DOM.loading ) ||
            !ValidateUtils.isDomElement( this.DOM.cards )
        )
            throw new Error( 'DOM not found.' );

        this.state = {
            languageId: opt.languageId,
        };

        return this;
    }

    get queryApi () {
        return `${ host }/api/staff?languageId=${ this.state.languageId }`;
    }

    async fetchData () {
        try {
            const res = await fetch( this.queryApi );

            if ( !res.ok )
                throw new Error( 'No staff found' );

            return res.json();
        }
        catch ( err ) {
            throw err;
        }
    }

    renderLoading () {
        classAdd( this.DOM.noResult, 'no-result--hidden' );
        classRemove( this.DOM.loading, 'loading--hidden' );
    }

    renderLoadingSucceed () {
        classAdd( this.DOM.loading, 'loading--hidden' );
        classAdd( this.DOM.noResult, 'no-result--hidden' );
    }

    renderLoadingFailed () {
        classAdd( this.DOM.loading, 'loading--hidden' );
        classRemove( this.DOM.noResult, 'no-result--hidden' );
    }

    /**
     * @param {object[]} data
     */

    renderCard ( data ) {
        try {
            this.DOM.cards.innerHTML = cardHTML( {
                data,
                LANG: {
                    id:            this.state.languageId,
                    getLanguageId: WebLanguageUtils.getLanguageId,
                },
                UTILS: {
                    url:       UrlUtils.serverUrl( new UrlUtils( host, this.state.languageId ) ),
                    staticUrl: UrlUtils.serverUrl( new UrlUtils( staticHost, this.state.languageId ) ),
                },
            } );

            if ( !this.DOM.cards.hasChildNodes() )
                throw new Error( 'No data is rendered.' );
        }
        catch ( err ) {
            throw err;
        }
    }

    async exec () {
        try {
            this.renderLoading();
            this.renderCard( await this.fetchData() );
            this.renderLoadingSucceed();
        }
        catch ( err ) {
            this.renderLoadingFailed();
            console.error( err );
        }
    }
}
