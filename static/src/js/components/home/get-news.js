import briefingHTML from 'static/src/pug/components/home/news-briefing.pug';
import {classAdd, classRemove} from 'static/src/js/utils/style.js';
import {host} from 'settings/server/config.js';
import tagUtils from 'models/announcement/utils/tag.js';
import UrlUtils from 'static/src/js/utils/url.js';
import ValidateUtils from 'models/common/utils/validate.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

export default class GetNews {
    constructor (opt) {
        opt = opt || {};

        if (
            !opt.amount ||
            !ValidateUtils.isPositiveInteger(opt.amount) ||
            !opt.announcementDOM ||
            !ValidateUtils.isDomElement(opt.announcementDOM) ||
            !opt.controlForwordDOM ||
            !ValidateUtils.isDomElement(opt.controlForwordDOM) ||
            !opt.controlBackwordDOM ||
            !ValidateUtils.isDomElement(opt.controlBackwordDOM) ||
            !opt.from ||
            !ValidateUtils.isValidDate(opt.from) ||
            !WebLanguageUtils.isSupportedLanguageId(opt.languageId) ||
            !opt.to ||
            !ValidateUtils.isValidDate(opt.to) ||
            !Array.isArray(opt.tags) ||
            !opt.tags.every(tag => tagUtils.isSupportedOption(tag)) ||
            !opt.page ||
            !ValidateUtils.isPositiveInteger(opt.page))
            throw new TypeError('invalid arguments');

        const announcementQuerySelector = block => `.${opt.announcementDOM.id}__${block}.${block}`;

        this.DOM = {
            noResult: opt.announcementDOM.querySelector(announcementQuerySelector('no-result')),
            loading: opt.announcementDOM.querySelector(announcementQuerySelector('loading')),
            briefings: opt.announcementDOM.querySelector(announcementQuerySelector('briefings')),
            control: {
                forword: opt.controlForwordDOM,
                backword: opt.controlBackwordDOM,
            },
        };

        if (
            !ValidateUtils.isDomElement(this.DOM.noResult) ||
            !ValidateUtils.isDomElement(this.DOM.loading) ||
            !ValidateUtils.isDomElement(this.DOM.briefings))
            throw new Error('DOM not found.');

        this.amount = opt.amount;
        this.from = opt.from;
        this.languageId = opt.languageId;
        this.tags = opt.tags;
        this.to = opt.to;
        this.page = opt.page;
        this.state = {
            page: 1,
        };
    }

    static singleNewsQueryApi (page) {
        return `${host}/api/announcement/get-news?amount=1&page=${page}`;
    }

    static formatUpdateTime (time) {
        if (!(ValidateUtils.isValidDate(time)))
            throw new TypeError('Invalid time.');

        return [
            `${time.getFullYear()}`,
            `${time.getMonth() < 9 ? `0${String(time.getMonth() + 1)}` : String(time.getMonth() + 1)}`,
            `${time.getDate() < 10 ? `0${String(time.getDate())}` : String(time.getDate())}`,
        ].join('-');
    }

    static formatData ({data}) {
        return data.map((briefing) => {
            briefing.time = GetNews.formatUpdateTime(new Date(briefing.publishTime));
            return briefing;
        });
    }

    render (data) {
        const extractTextObj = data;
        extractTextObj.forEach((ann) => {
            ann.content = ((new DOMParser()).parseFromString(ann.content, 'text/html')).documentElement.textContent.trim();
        });
        extractTextObj.forEach((briefing) => {
            this.DOM.briefings.innerHTML += briefingHTML({
                briefing,
                UTILS: {
                    url: UrlUtils.serverUrl(new UrlUtils(host, this.languageId)),
                },
            });
        });
    }

    insertBack (data) {
        const extractTextObj = data;
        extractTextObj.forEach((ann) => {
            ann.content = ((new DOMParser()).parseFromString(ann.content, 'text/html')).documentElement.textContent.trim();
        });
        this.DOM.briefings.removeChild(this.DOM.briefings.childNodes[0]);
        extractTextObj.forEach((briefing) => {
            this.DOM.briefings.innerHTML += briefingHTML({
                briefing,
                UTILS: {
                    url: UrlUtils.serverUrl(new UrlUtils(host, this.languageId)),
                },
            });
        });
    }

    insertFront (data) {
        const extractTextObj = data;
        extractTextObj.forEach((ann) => {
            ann.content = ((new DOMParser()).parseFromString(ann.content, 'text/html')).documentElement.textContent.trim();
        });
        this.DOM.briefings.removeChild(this.DOM.briefings.lastElementChild);
        extractTextObj.forEach((briefing) => {
            this.DOM.briefings.insertAdjacentHTML('afterbegin', briefingHTML({
                briefing,
                UTILS: {
                    url: UrlUtils.serverUrl(new UrlUtils(host, this.languageId)),
                },
            }));
        });
    }

    subscribeControl () {
        this.DOM.control.forword.addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                const res = await fetch(this.constructor.singleNewsQueryApi(this.state.page + 4));

                if (!res.ok)
                    throw new Error('No news found');

                const data = await res.json();

                this.insertBack(this.constructor.formatData({
                    data,
                    languageId: this.languageId,
                }));

                this.state.page += 1;
            }
            catch (err) {
                console.error(err);
            }
        });
        this.DOM.control.backword.addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                if (this.state.page > 1) {
                    const res = await fetch(this.constructor.singleNewsQueryApi(this.state.page - 1));

                    if (!res.ok)
                        throw new Error('No news found');

                    const data = await res.json();

                    this.insertFront(this.constructor.formatData({
                        data,
                        languageId: this.languageId,
                    }));

                    this.state.page -= 1;
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }

    async exec () {
        try {
            this.DOM.briefings.innerHTML = '';
            classAdd(this.DOM.noResult, 'no-result--hidden');

            const res = await fetch(`${host}/api/announcement/get-news?amount=4&page=1`);

            if (!res.ok)
                throw new Error('No announcement found');

            const data = await res.json();

            this.render(this.constructor.formatData({
                data,
                languageId: this.languageId,
            }));

            classAdd(this.DOM.loading, 'loading--hidden');

            this.subscribeControl();
        }
        catch (err) {
            classAdd(this.DOM.loading, 'loading--hidden');
            classRemove(this.DOM.noResult, 'no-result--hidden');
            console.error(err);
        }
    }
}
