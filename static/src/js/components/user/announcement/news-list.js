import UrlUtils from 'static/src/js/utils/url.js';
import roleUtils from 'models/auth/utils/role.js';
import briefingHTML from 'static/src/pug/components/user/announcement/news-briefing.pug';
import addButtonHTML from 'static/src/pug/components/announcement/add-button.pug';
import pagesHTML from 'static/src/pug/components/announcement/pages.pug';
import {classAdd, classRemove, delay} from 'static/src/js/utils/style.js';
import {host, staticHost} from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

export default class NewsList {
    constructor (opt) {
        opt = opt || {};

        if (
            !ValidateUtils.isDomElement(opt.newsDOM) ||
            typeof (opt.pagesDOM) === 'undefined' ||
            !ValidateUtils.isDomElement(opt.pagesDOM) ||
            typeof (opt.scrollTopDOM) === 'undefined' ||
            !ValidateUtils.isDomElement(opt.scrollTopDOM) ||
            typeof (opt.amount) === 'undefined' ||
            !ValidateUtils.isPositiveInteger(opt.amount) ||
            typeof (opt.page) === 'undefined' ||
            !ValidateUtils.isPositiveInteger(opt.page) ||
            typeof (opt.visiblePageNum) === 'undefined' ||
            !ValidateUtils.isPositiveInteger(opt.visiblePageNum)
        )
            throw new TypeError('invalid arguments');

        /**
         * Default & supported tags should not have tags in common.
         */

        this.config = {
            amount: opt.amount,
            page: opt.page,
            visiblePageNum: opt.visiblePageNum,
            animationDelayTime: 50,
            scrollPx: 8,
            languageId: WebLanguageUtils.currentLanguageId,
        };

        this.state = {
            page: this.config.page,
            newsId: -1,
            from: 1514736000000,
            to: 1609925797285,
            tags: [1],
            languageId: 0,
        };

        const newsQuerySelector = block => `.news__${block}.${block}`;
        const deleteBriefingSelector = element => `.delete-preview > .delete-preview__briefing > .briefing__${element}`;
        this.DOM = {
            news: {
                noResult: opt.newsDOM.querySelector(newsQuerySelector('no-result')),
                loading: opt.newsDOM.querySelector(newsQuerySelector('loading')),
                briefings: opt.newsDOM.querySelector(newsQuerySelector('briefings')),
            },
            preview: {
                topic: opt.deletePreviewDOM.querySelector('.delete-preview > .delete-preview__topic'),
                block: opt.deletePreviewDOM.querySelector('.delete-preview'),
                button: {
                    cancel: opt.deletePreviewDOM.querySelector('.delete-preview > .delete-preview__button > .button__cancel'),
                    check: opt.deletePreviewDOM.querySelector('.delete-preview > .delete-preview__button > .button__check'),
                },
                briefing: {
                    title: opt.deletePreviewDOM.querySelector(deleteBriefingSelector('title')),
                    time: opt.deletePreviewDOM.querySelector(deleteBriefingSelector('time')),
                },
            },
            pages: opt.pagesDOM,
            scrollTop: opt.scrollTopDOM,
        };

        /**
         * Set transition of `.briefings`
         */

        this.constructor.renderTransitionHide(this.DOM.news.briefings);

        /**
         * ONLY USE `this.eventLock` WITH FOLLOWING FUNCTIONS:
         * - `this.constructor.acquireLock()`
         * - `this.constructor.releaseLock()`
         * - `this.constructor.isLocked()`
         */

        this.eventLock = false;
    }

    static renderTransitionShow (dom) {
        classRemove(dom, 'news__briefings--hide');
        classAdd(dom, 'news__briefings--show');
    }

    static renderTransitionHide (dom) {
        classRemove(dom, 'news__briefings--show');
        classAdd(dom, 'news__briefings--hide');
    }

    pushState () {
        const queryString = [
            `languageId=${this.state.languageId}`,
            `from=${Number(this.state.from)}`,
            `to=${Number(this.state.to)}`,
            ...this.state.tags.map(tagId => `tags=${tagId}`),
            `page=${this.state.page}`,
        ].join('&');
        window.history.pushState(null, 'query string', `${window.location.pathname}?${queryString}`);
    }

    acquireLock () {
        if (this.eventLock)
            return;
        this.eventLock = true;
    }

    releaseLock () {
        if (this.eventLock)
            this.eventLock = false;
    }

    /**
     * @returns {boolean}
     */

    isLocked () {
        return this.eventLock;
    }

    renderAnnouncement (currentY) {
        if (this.DOM.scrollTop.offsetTop - currentY > this.config.scrollPx) {
            setTimeout(() => {
                window.scrollTo(window.scrollX, currentY);
                this.renderAnnouncement(currentY + this.config.scrollPx);
            }, 1);
        }
        else if (currentY - this.DOM.scrollTop.offsetTop > this.config.scrollPx) {
            setTimeout(() => {
                window.scrollTo(window.scrollX, currentY);
                this.renderAnnouncement(currentY - this.config.scrollPx);
            }, 1);
        }
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

    subscribePageControlEvent (pages, pageDOMArr) {
        /**
         * Subscribe click event for `.pages__control.pages__control--forward`.
         */

        this.DOM.pages
        .querySelector('.pages > .pages__control.pages__control--forward')
        .addEventListener('click', () => {
            try {
                if (this.isLocked())
                    return;
                this.acquireLock();

                pageDOMArr.forEach((pageDOM) => {
                    classRemove(pageDOM, 'pages__page--active');
                });

                this.state.page -= 1;
                if (this.state.page < this.config.page)
                    this.state.page = this.config.page;

                const activeDOM = this.DOM.pages.querySelector(`.pages > .pages__page[ data-page = "${this.state.page}" ]`);
                if (!ValidateUtils.isDomElement(activeDOM))
                    throw new Error(`Failed to get element .pages > .pages__page[ data-page = "${this.state.page}" ]`);
                classAdd(activeDOM, 'pages__page--active');

                /**
                 * Render `.pages__extra`.
                 */

                this.renderPageExtra(pages);

                this.getNews();
                this.pushState();
                this.renderAnnouncement(window.scrollY);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                if (this.isLocked())
                    this.releaseLock();
            }
        });

        /**
         * Subscribe click event for `.pages__control.pages__control--backward`.
         */

        this.DOM.pages
        .querySelector('.pages > .pages__control--backward')
        .addEventListener('click', () => {
            try {
                if (this.isLocked())
                    return;
                this.acquireLock();

                pageDOMArr.forEach((pageDOM) => {
                    classRemove(pageDOM, 'pages__page--active');
                });

                this.state.page += 1;
                if (this.state.page > pages)
                    this.state.page = pages;

                const activeDOM = this.DOM.pages.querySelector(`.pages > .pages__page[ data-page = "${this.state.page}" ]`);
                if (!ValidateUtils.isDomElement(activeDOM))
                    throw new Error(`Failed to get element .pages > .pages__page[ data-page = "${this.state.page}" ]`);
                classAdd(activeDOM, 'pages__page--active');

                /**
                 * Render `.pages__extra`.
                 */

                this.renderPageExtra(pages);

                this.getNews();
                this.pushState();
                this.renderAnnouncement(window.scrollY);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                if (this.isLocked())
                    this.releaseLock();
            }
        });
    }

    renderPageExtra (pages) {
        /**
         * If `pages` is larger than `visiblePageNum * 2 + 1`,
         * then `.pages__extra` is created and need to be rendered.
         */

        if (pages <= this.config.visiblePageNum * 2 + 1)
            return;

        const pageDOMArr = Array.from(this.DOM.pages.querySelectorAll('.pages > .pages__page'));

        pageDOMArr.forEach((pageDOM) => {
            const dataPage = pageDOM.getAttribute('data-page');
            if (dataPage !== null) {
                const page = Number(dataPage);

                /**
                 * The first page & the last page must show.
                 * If the distance between a page and the current page
                 * is smaller than or equal to `this.config.visiblePageNum`,
                 * then the page must show.
                 */

                if (page === this.config.page ||
                    page === pages ||
                    Math.abs(page - this.state.page) <= this.config.visiblePageNum
                )
                    classRemove(pageDOM, 'pages__page--hidden');
                else
                    classAdd(pageDOM, 'pages__page--hidden');
            }
        });

        /**
         * If the page after the first page is hidden,
         * then `.pages__extra.pages__extra--before` must show.
         */

        if (this.DOM.pages
        .querySelector(`.pages > .pages__page[ data-page = "${this.config.page + 1}" ]`)
        .classList.contains('pages__page--hidden')
        ) {
            classRemove(
                this.DOM.pages.querySelector('.pages > .pages__extra.pages__extra--before'),
                'pages__extra--hidden',
            );
        }
        else {
            classAdd(
                this.DOM.pages.querySelector('.pages > .pages__extra.pages__extra--before'),
                'pages__extra--hidden',
            );
        }

        /**
         * If the page before the last page is hidden,
         * then `.pages__extra.pages__extra--after` must show.
         */

        if (this.DOM.pages
        .querySelector(`.pages > .pages__page[ data-page = "${pages - 1}" ]`)
        .classList.contains('pages__page--hidden')
        ) {
            classRemove(
                this.DOM.pages.querySelector('.pages > .pages__extra.pages__extra--after'),
                'pages__extra--hidden',
            );
        }

        else {
            classAdd(
                this.DOM.pages.querySelector('.pages > .pages__extra.pages__extra--after'),
                'pages__extra--hidden',
            );
        }
    }

    renderPages (pages) {
        try {
            this.DOM.pages.innerHTML = pagesHTML({pages});

            /**
             * Render `.pages__extra`.
             */

            this.renderPageExtra(pages);

            /**
             * Add eventListener to all the `.pages__page` element after rendering.
             */

            const pageDOMArr = Array.from(this.DOM.pages.querySelectorAll('.pages > .pages__page'));

            pageDOMArr.forEach((pageDOM) => {
                pageDOM.addEventListener('click', () => {
                    try {
                        if (this.isLocked())
                            return;
                        this.acquireLock();

                        pageDOMArr.forEach((page) => {
                            classRemove(page, 'pages__page--active');
                        });

                        const dataPage = pageDOM.getAttribute('data-page');
                        if (dataPage !== null && ValidateUtils.isPositiveInteger(Number(dataPage))) {
                            this.state.page = Number(dataPage);

                            /**
                             * Render `.pages__page--active`.
                             */

                            classAdd(pageDOM, 'pages__page--active');

                            /**
                             * Render `.pages__extra`.
                             */

                            this.renderPageExtra(pages);

                            this.getNews();
                            this.pushState();
                            this.renderAnnouncement(window.scrollY);
                        }
                    }
                    catch (err) {
                        throw new Error(err);
                    }
                    finally {
                        if (this.isLocked())
                            this.releaseLock();
                    }
                });
            });

            /**
             * Set default active page.
             */

            classAdd(
                this.DOM.pages.querySelector(`.pages > .pages__page[ data-page = "${this.state.page}" ]`),
                'pages__page--active',
            );

            /**
             * Add eventListener to all the `.pages__control` element after rendering.
             */

            if (pages !== this.config.page)
                this.subscribePageControlEvent(pages, pageDOMArr);
        }
        catch (err) {
            throw new Error('failed to render pages');
        }
    }

    async getPage () {
        try {
            classAdd(this.DOM.news.noResult, 'no-result--hidden');
            classRemove(this.DOM.news.loading, 'loading--hidden');

            /**
             * Fold `.announcement__briefings.briefings`.
             */

            this.constructor.renderTransitionHide(this.DOM.news.briefings);

            await delay(this.config.animationDelayTime);

            /**
             * Clear `#pages`, `.announcement__briefings.briefings`.
             */

            this.DOM.pages.innerHTML = '';
            this.DOM.news.briefings.innerHTML = '';

            const tags = [1];

            const queryString = [
                `amount=${this.config.amount}`,
                `from=1514736000000`,
                `to=1609925797285`,
                ...tags.map(tagId => `tags=${tagId}`),
            ].join('&');

            let res = null;

            res = await window.fetch(`${host}/api/announcement/get-pages-by-and-tags?${queryString}`);

            if (!res.ok)
                throw new Error('failed to get all pages');

            const {pages} = await res.json();
            this.renderPages(pages);
        }
        catch (err) {
            this.DOM.pages.innerHTML = '';
            classAdd(this.DOM.news.loading, 'loading--hidden');
            classRemove(this.DOM.news.noResult, 'no-result--hidden');
            throw err;
        }
    }

    async getNews () {
        try {
            classAdd(this.DOM.news.noResult, 'no-result--hidden');
            classRemove(this.DOM.news.loading, 'loading--hidden');

            /**
             * Fold `.news__briefings.briefings`.
             */

            if (this.DOM.news.briefings.innerHTML !== '') {
                this.constructor.renderTransitionHide(this.DOM.news.briefings);
                await delay(this.config.animationDelayTime);
            }

            /**
             * Clear `.news__briefings.briefings`, then show `.news__loading.loading`.
             */

            this.DOM.news.briefings.innerHTML = '';

            let res = null;

            res = await window.fetch(`${host}/api/announcement/get-news?amount=${this.config.amount}&page=${this.state.page}`);

            if (!res.ok)
                throw new Error('failed to get all news announcement');

            const data = await res.json();

            const extractTextObj = data;
            extractTextObj.sort((news1, news2) => news2.publishTime - news1.publishTime);
            extractTextObj.forEach((ann) => {
                ann.content = ((new DOMParser()).parseFromString(ann.content, 'text/html')).documentElement.textContent.trim();
            });
            extractTextObj.map((briefing) => {
                briefing.time = this.constructor.formatUpdateTime(new Date(briefing.publishTime));
                return briefing;
            }).forEach((briefing) => {
                new Promise((res) => {
                    this.DOM.news.briefings.innerHTML += briefingHTML({
                        briefing,
                        UTILS: {
                            url: UrlUtils.serverUrl(new UrlUtils(host, this.config.languageId)),
                            staticUrl: UrlUtils.serverUrl(new UrlUtils(staticHost, this.config.languageId)),
                        },
                    });
                    res();
                })
                .then(() => {
                    const editBtn = document.getElementsByClassName(`briefing__button--update-${briefing.newsId}`)[0];
                    editBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.location.href = `${host}/user/announcement/news/${briefing.newsId}?languageId=${this.config.languageId}`;
                    });
                    const deleteBtn = document.getElementsByClassName(`briefing__button--delete-${briefing.newsId}`)[0];
                    deleteBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        classAdd(this.DOM.preview.block, 'delete-preview--show');
                        this.state.newsId = briefing.newsId;
                        this.state.preview = 'delete';
                        this.DOM.preview.topic.innerText = '刪除新聞';
                        this.DOM.preview.briefing.title.innerText = briefing.title;
                        this.DOM.preview.briefing.time.innerText = briefing.publishTime;
                    });
                });
            });
            classAdd(this.DOM.news.loading, 'loading--hidden');

            /**
             * Unfold `.news__briefings.briefings`.
             */

            this.constructor.renderTransitionShow(this.DOM.news.briefings);
            await delay(this.config.animationDelayTime);
        }
        catch (err) {
            this.DOM.news.briefings.innerHTML = '';
            classAdd(this.DOM.news.loading, 'loading--hidden');
            classRemove(this.DOM.news.noResult, 'no-result--hidden');
            throw err;
        }
    }

    subscribeAddButton () {
        this.DOM.add.innerHTML += addButtonHTML({
            host,
            languageId: this.state.languageId,
        });
    }

    setPreview () {
        this.DOM.preview.button.cancel.addEventListener('click', (e) => {
            e.preventDefault();
            classRemove(this.DOM.preview.block, 'delete-preview--show');
        });
        this.DOM.preview.button.check.addEventListener('click', (e) => {
            e.preventDefault();
            this.sendDeleteRequest();
        });
    }

    sendDeleteRequest () {
        this.DOM.preview.button.check.disabled = true;
        fetch(`${host}/user/news`, {
            method: 'DELETE',
            body: JSON.stringify({
                newsIds: [this.state.newsId],
            }),
            headers: {
                'content-type': 'application/json',
            },
        })
        .then(() => {
            classRemove(this.DOM.preview.block, 'delete-preview--show');
            this.DOM.preview.button.check.disabled = false;
            this.getAll();
        });
    }

    getAll () {
        try {
            fetch(`${host}/user/id`, {
                credentials: 'include',
                method: 'get',
            })
            .then(res => res.json())
            .then((res) => {
                if (res.role === roleUtils.getIdByOption('staff')) {
                    this.config.userId = res.roleId;
                    this.setPreview();
                }
                else
                    this.config.userId = -1;
            })
            .then(async () => {
                await this.getPage();
                await this.getNews();
            });
        }
        catch (err) {
            console.error(err);
        }
        finally {
            if (this.isLocked())
                this.releaseLock();
        }
    }
}
