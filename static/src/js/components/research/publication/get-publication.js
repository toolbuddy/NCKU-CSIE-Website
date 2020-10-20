/**
 * @file punliication data fetch module.
 * @author ProFatXuanAll <ProFatXuanAll@gmail.com>
 * @version 1.0.0
 * @since 1.0.0
 */

import WebLanguageUtils from 'static/src/js/utils/language.js';
import {classAdd, classRemove} from 'static/src/js/utils/style.js';
import {host, staticHost} from 'settings/server/config.js';
import cardHTML from 'static/src/pug/components/research/publication/card.pug';
import UrlUtils from 'static/src/js/utils/url.js';
import ValidateUtils from 'models/common/utils/validate.js';

export default class GetPublications {
    /**
     * @param {object} opt
     * @param {HTMLElement} opt.publicationDOM
     * @param {number} opt.languageId
     */

    constructor (opt) {
        opt = opt || {};

        if (
            !opt.publicationDOM ||
            !ValidateUtils.isDomElement(opt.publicationDOM) ||
            !WebLanguageUtils.isSupportedLanguageId(opt.languageId)
        )
            throw new TypeError('invalid arguments');

        const publicationQuerySelector = block => `.publication__${block}.${block}`;
        const timeQuerySelector = (block, element) => `.filter__time.time > .time__${block}.${block} > .${block}__input.input > .input__${element}`;

        this.DOM = {
            noResult: opt.publicationDOM.querySelector(publicationQuerySelector('no-result')),
            loading: opt.publicationDOM.querySelector(publicationQuerySelector('loading')),
            cards: opt.publicationDOM.querySelector(publicationQuerySelector('cards')),
            filter: {
                from: document.querySelector(timeQuerySelector('from', 'year')),
                to: document.querySelector(timeQuerySelector('to', 'year')),
            },
        };

        if (
            !ValidateUtils.isDomElement(this.DOM.noResult) ||
            !ValidateUtils.isDomElement(this.DOM.loading) ||
            !ValidateUtils.isDomElement(this.DOM.cards) ||
            !ValidateUtils.isDomElement(this.DOM.filter.from) ||
            !ValidateUtils.isDomElement(this.DOM.filter.to)
        )
            throw new Error('DOM not found.');

        this.state = {
            languageId: opt.languageId,
        };

        return this;
    }

    get queryApi () {
        return `${host}/api/faculty/publication?languageId=${this.state.languageId}&from=${this.DOM.filter.from.value}&to=${this.DOM.filter.to.value}`;
    }

    async fetchData () {
        try {
            const res = await fetch(this.queryApi);

            if (!res.ok)
                throw new Error('No publication found');

            return res.json();
        }
        catch (err) {
            throw err;
        }
    }

    renderLoading () {
        classAdd(this.DOM.noResult, 'no-result--hidden');
        classRemove(this.DOM.loading, 'loading--hidden');
    }

    renderLoadingSucceed () {
        classAdd(this.DOM.loading, 'loading--hidden');
        classAdd(this.DOM.noResult, 'no-result--hidden');
    }

    renderLoadingFailed () {
        classAdd(this.DOM.loading, 'loading--hidden');
        classRemove(this.DOM.noResult, 'no-result--hidden');
    }

    subscribeTime () {
        [
            'from',
            'to',
        ].forEach(((timeFilter) => {
            this.DOM.filter[timeFilter].addEventListener('change', async () => {
                try {
                    this.renderCards(await this.fetchData());
                }
                catch (err) {
                    console.error(err);
                }
            });
        }));
    }

    /**
     * @param {object[]} data
     */

    renderCards (data) {
        try {
            this.DOM.cards.innerHTML = '';
            data.sort((publication1, publication2) => publication2.issueYear - publication1.issueYear);
            data.forEach((data) => {
                try {
                    this.DOM.cards.innerHTML += cardHTML({
                        data,
                        LANG: {
                            id: this.state.languageId,
                            getLanguageId: WebLanguageUtils.getLanguageId,
                        },
                        UTILS: {
                            url: UrlUtils.serverUrl(new UrlUtils(host, this.state.languageId)),
                            staticUrl: UrlUtils.serverUrl(new UrlUtils(staticHost, this.state.languageId)),
                        },
                    });
                }
                catch (err) {
                    console.error(err);
                }
            });
        }
        catch (err) {
            throw err;
        }
    }

    async exec () {
        try {
            this.renderLoading();
            this.subscribeTime();
            this.renderCards(await this.fetchData());
            this.renderLoadingSucceed();
        }
        catch (err) {
            this.renderLoadingFailed();
            console.error(err);
        }
    }
}
