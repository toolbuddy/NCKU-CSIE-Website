import briefingHTML from 'static/src/pug/components/home/news-briefing.pug';
import {classAdd, classRemove, delay} from 'static/src/js/utils/style.js';
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
            briefings: opt.announcementDOM.querySelector('.news__frame > .frame__briefings'),
            frame: opt.announcementDOM.querySelector('.news__frame'),
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
        this.briefingWidth = 307;
        this.state = {
            page: 1,
            newsAmount: 0,
            end: false,
            loading: false,
        };
    }

    newsQueryApi () {
        return `${host}/api/announcement/get-news?amount=${this.amount}&page=${Math.ceil(this.state.newsAmount / this.amount) + 1}`;
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

    moveBriefing (page) {
        this.DOM.briefings.style.transform = `translate(-${307 * (page - 1)}px, 0px)`;
        this.state.page = page;
    }

    insertBriefing (data) {
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

    async getNewNews () {
        try {
            const res = await fetch(this.newsQueryApi());
            if (!res.ok) {
                this.state.end = true;
                throw new Error('No news found');
            }
            else {
                const data = await res.json();
                this.insertBriefing(this.constructor.formatData({
                    data,
                    languageId: this.languageId,
                }));
                this.state.newsAmount += data.length;
                if (data.length < this.amount)
                    this.state.end = true;
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    subscribeControl () {
        this.DOM.frame.addEventListener('scroll', async () => {
            if (
                this.DOM.frame.scrollLeft + this.DOM.frame.offsetWidth >= (this.briefingWidth * this.state.newsAmount - 1) &
                !this.state.loading & !this.state.end
            ) {
                this.state.loading = true;
                classAdd(this.DOM.frame, 'news__frame--hidden');
                classRemove(this.DOM.loading, 'loading--hidden');
                await this.getNewNews();
                await delay(500);
                classAdd(this.DOM.loading, 'loading--hidden');
                classRemove(this.DOM.frame, 'news__frame--hidden');
                this.state.loading = false;
            }
        });
        this.DOM.control.backword.addEventListener('click', async (e) => {
            e.preventDefault();

            if ((this.state.page * this.briefingWidth + this.DOM.frame.offsetWidth) <= (this.briefingWidth * this.state.newsAmount))
                this.moveBriefing(this.state.page + 1);
            else if( !this.state.loading & !this.state.end ) {
                this.state.loading = true;
                classAdd(this.DOM.frame, 'news__frame--hidden');
                classRemove(this.DOM.loading, 'loading--hidden');
                await this.getNewNews();

                await delay(500);
                classAdd(this.DOM.loading, 'loading--hidden');
                classRemove(this.DOM.frame, 'news__frame--hidden');

                this.state.loading = false;
                this.moveBriefing(this.state.page + 1);
            }
        });
        this.DOM.control.forword.addEventListener('click', (e) => {
            e.preventDefault();

            if (this.state.page > 1)
                this.moveBriefing(this.state.page - 1);
        });
    }

    async exec () {
        try {
            this.DOM.briefings.innerHTML = '';
            classAdd(this.DOM.noResult, 'no-result--hidden');

            const res = await fetch(this.newsQueryApi());

            if (!res.ok)
                throw new Error('No announcement found');

            const data = await res.json();

            this.state.newsAmount += data.length;
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
