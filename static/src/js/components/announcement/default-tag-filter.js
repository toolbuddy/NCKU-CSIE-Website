import TagUtils from 'models/announcement/utils/tag.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import UrlUtils from 'static/src/js/utils/url.js';
import briefingHTML from 'static/src/pug/components/announcement/announcement-briefing.pug';
import pagesHTML from 'static/src/pug/components/announcement/pages.pug';
import { classAdd, classRemove, delay, } from 'static/src/js/utils/style.js';
import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';

export default class DefaultTagFilter {
    constructor ( opt ) {
        opt = opt || {};
        const languageId = WebLanguageUtils.getLanguageId( 'en-US' );

        if ( !opt.defaultTag ||
            !Array.isArray( opt.defaultTag ) ||
            !opt.supportedTag ||
            !Array.isArray( opt.supportedTag ) ||
            ( opt.defaultTag.length === 0 && opt.supportedTag.length === 0 ) ||
            !opt.filterDOM ||
            !ValidateUtils.isDomElement( opt.filterDOM ) ||
            !opt.announcementPinnedDOM ||
            !ValidateUtils.isDomElement( opt.announcementPinnedDOM ) ||
            !opt.announcementNormalDOM ||
            !ValidateUtils.isDomElement( opt.announcementNormalDOM ) ||
            !opt.pagesDOM ||
            !ValidateUtils.isDomElement( opt.pagesDOM ) ||
            !opt.scrollTopDOM ||
            !ValidateUtils.isDomElement( opt.scrollTopDOM ) ||
            !opt.amount ||
            !ValidateUtils.isPositiveInteger( opt.amount ) ||
            !opt.from ||
            !ValidateUtils.isValidDate( opt.from ) ||
            !opt.to ||
            !ValidateUtils.isValidDate( opt.to ) ||
            !opt.page ||
            !ValidateUtils.isPositiveInteger( opt.page ) ||
            !opt.visiblePageNum ||
            !ValidateUtils.isPositiveInteger( opt.visiblePageNum ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.currentLanguageId )
        )
            throw new TypeError( 'invalid arguments' );

        if ( !opt.supportedTag.every( tag => TagUtils.isSupportedTag( { tag, languageId, } ) ) ||
            !opt.defaultTag.every( tag => TagUtils.isSupportedTag( { tag, languageId, } ) ) )
            throw new TypeError( 'tag is not supported' );

        /**
         * Default & supported tags should not have tags in common.
         */

        opt.supportedTag.forEach( ( tag ) => {
            if ( opt.defaultTag.indexOf( tag ) >= 0 )
                throw new TypeError( 'invalid arguments' );
        } );

        this.config = {
            amount:         opt.amount,
            from:           opt.from,
            to:             opt.to,
            page:           opt.page,
            visiblePageNum: opt.visiblePageNum,
            transitionSec:  0.5,
            scrollPx:       5,
        };

        this.tagId = {
            default: opt.defaultTag.map( tag => TagUtils.getTagId( {
                tag,
                languageId,
            } ) ),
            supported: opt.supportedTag.map( tag => TagUtils.getTagId( {
                tag,
                languageId,
            } ) ),
        };

        this.state = {
            languageId:    opt.currentLanguageId,
            from:          this.config.from,
            to:            this.config.to,
            page:          this.config.page,
            tags:          [],
        };

        const timeQuerySelector = ( block, element ) => `.filter__time.time > .time__${ block }.${ block } > .${ block }__input.input > .input__${ element }`;
        const announcementQuerySelector = block => `.announcement__${ block }.${ block }`;
        this.DOM = {
            filter: {
                from: {
                    year:  opt.filterDOM.querySelector( timeQuerySelector( 'from', 'year' ) ),
                    month: opt.filterDOM.querySelector( timeQuerySelector( 'from', 'month' ) ),
                    date:  opt.filterDOM.querySelector( timeQuerySelector( 'from', 'date' ) ),
                },
                to:   {
                    year:  opt.filterDOM.querySelector( timeQuerySelector( 'to', 'year' ) ),
                    month: opt.filterDOM.querySelector( timeQuerySelector( 'to', 'month' ) ),
                    date:  opt.filterDOM.querySelector( timeQuerySelector( 'to', 'date' ) ),
                },
                tags: Array.from( opt.filterDOM.querySelectorAll( '.filter__tags.tags > .tags__tag' ) ).map( ( node ) => {
                    const tagId = node.getAttribute( 'data-tag-id' );
                    if ( tagId === null )
                        throw new Error( 'DOM attribute `data-tag-id` not found.' );
                    if ( !( Number( tagId ) === TagUtils.tagAllId ) && !TagUtils.isSupportedTagId( Number( tagId ) ) )
                        throw new Error( 'Invalid DOM attribute `data-tag-id`.' );
                    return {
                        node,
                        id:   Number( tagId ),
                    };
                } ),
            },
            announcement: {
                pinned: {
                    noResult:  opt.announcementPinnedDOM.querySelector( announcementQuerySelector( 'no-result' ) ),
                    loading:   opt.announcementPinnedDOM.querySelector( announcementQuerySelector( 'loading' ) ),
                    briefings: opt.announcementPinnedDOM.querySelector( announcementQuerySelector( 'briefings' ) ),
                },
                normal: {
                    noResult:  opt.announcementNormalDOM.querySelector( announcementQuerySelector( 'no-result' ) ),
                    loading:   opt.announcementNormalDOM.querySelector( announcementQuerySelector( 'loading' ) ),
                    briefings: opt.announcementNormalDOM.querySelector( announcementQuerySelector( 'briefings' ) ),
                },
            },
            pages:     opt.pagesDOM,
            scrollTop: opt.scrollTopDOM,
        };

        if (
            !ValidateUtils.isDomElement( this.DOM.filter.from.year ) ||
            !ValidateUtils.isDomElement( this.DOM.filter.from.month ) ||
            !ValidateUtils.isDomElement( this.DOM.filter.from.date ) ||
            !ValidateUtils.isDomElement( this.DOM.filter.to.year ) ||
            !ValidateUtils.isDomElement( this.DOM.filter.to.month ) ||
            !ValidateUtils.isDomElement( this.DOM.filter.to.date ) ||
            this.DOM.filter.tags.length === 0 ||
            !Array.from( this.DOM.filter.tags.map( tag => tag.node ) ).every( ValidateUtils.isDomElement ) ||
            !ValidateUtils.isDomElement( this.DOM.announcement.pinned.noResult ) ||
            !ValidateUtils.isDomElement( this.DOM.announcement.pinned.loading ) ||
            !ValidateUtils.isDomElement( this.DOM.announcement.pinned.briefings ) ||
            !ValidateUtils.isDomElement( this.DOM.announcement.normal.noResult ) ||
            !ValidateUtils.isDomElement( this.DOM.announcement.normal.loading ) ||
            !ValidateUtils.isDomElement( this.DOM.announcement.normal.briefings )
        )
            throw new Error( 'DOM not found.' );

        /**
         * Set transition of `.briefings`
         */

        this.renderTransitionInit();

        /**
         * Load state from url.
         */

        this.loadState();
        this.pushState();

        /**
         * ONLY USE `this.eventLock` WITH FOLLOWING FUNCTIONS:
         * - `this.constructor.acquireLock()`
         * - `this.constructor.releaseLock()`
         * - `this.constructor.isLocked()`
         */

        this.eventLock = false;

        /**
         * @abstract
         * DOM elements `.time__from` and `.time__to` click event subscribe.
         */

        this.subscribeTimeEvent();

        /**
         * @abstract
         * DOM elements `.tags__tag` click event subscribe.
         */

        this.subscribeTagEvent();

        /**
         * Subscribe popstate event.
         */

        window.addEventListener( 'popstate', () => {
            this.loadState();
            this.getAll();
        } );
    }

    acquireLock () {
        if ( this.eventLock )
            return;
        this.eventLock = true;
    }

    releaseLock () {
        if ( this.eventLock )
            this.eventLock = false;
    }

    /**
     * @returns {boolean}
     */

    isLocked () {
        return this.eventLock;
    }

    async renderTransitionShow ( dom ) {
        classRemove( dom, 'briefings__briefing--disappear' );
        classAdd( dom, 'briefings__briefing--show' );
        dom.style.height = `${ dom.scrollHeight }px`;
        await delay( this.config.transitionSec * 1000 );
    }

    static renderTransitionHide ( dom ) {
        if ( dom.style.height !== '0px' ) {
            classRemove( dom, 'briefings__briefing--show' );
            classAdd( dom, 'briefings__briefing--disappear' );
            dom.style.height = '0px';
        }
    }

    renderTransitionInit () {
        [
            'pinned',
            'normal',
        ].forEach( ( which ) => {
            this.DOM.announcement[ which ].briefings.style.transition = `height ${ this.config.transitionSec }s ease`;
            this.constructor.renderTransitionHide( this.DOM.announcement[ which ].briefings );
        } );
    }

    loadState () {
        const urlParams = new URLSearchParams( window.location.search );
        const tempTags = urlParams.getAll( 'tags' );
        const tempFrom = urlParams.get( 'from' );
        const tempTo = urlParams.get( 'to' );
        const tempPage = urlParams.get( 'page' );

        this.state.tags = [];
        tempTags.forEach( ( tagId ) => {
            tagId = Number( tagId );
            if ( this.tagId.default.includes( tagId ) || this.tagId.supported.includes( tagId ) )
                this.state.tags.push( tagId );
        } );
        this.state.tags = [ ...new Set( this.state.tags ), ];

        if ( tempPage !== null && ValidateUtils.isPositiveInteger( Number( tempPage ) ) )
            this.state.page = Number( tempPage );
        if ( tempFrom !== null && ValidateUtils.isValidDate( new Date( Number( tempFrom ) ) ) )
            this.state.from = new Date( Number( tempFrom ) );
        if ( tempTo !== null && ValidateUtils.isValidDate( new Date( Number( tempTo ) ) ) )
            this.state.to = new Date( Number( tempTo ) );

        /**
         * Render `.filter__tags.tags > .tags__tag`.
         */

        this.DOM.filter.tags.forEach( ( tagObj ) => {
            if ( tagObj.id === TagUtils.tagAllId ||
                ( this.tagId.default.length === 1 && this.tagId.default[ 0 ] === tagObj.id ) ||
                this.state.tags.indexOf( tagObj.id ) >= 0
            )
                classAdd( tagObj.node, 'tags__tag--active' );
            else
                classRemove( tagObj.node, 'tags__tag--active' );
        } );

        /**
         * Set value for `.filter__time.time`.
         */

        [
            'from',
            'to',
        ].forEach( ( timeFilter ) => {
            this.DOM.filter[ timeFilter ].year.value = this.state[ timeFilter ].getFullYear();
            this.DOM.filter[ timeFilter ].month.value = this.state[ timeFilter ].getMonth() + 1;
            this.DOM.filter[ timeFilter ].date.value = this.state[ timeFilter ].getDate();
        } );
    }

    pushState () {
        const urlString = [
            `languageId=${ this.state.languageId }`,
            `from=${ Number( this.state.from ) }`,
            `to=${ Number( this.state.to ) }`,
            ...this.state.tags.map( tagId => `tags=${ tagId }` ),
            `page=${ this.state.page }`,
        ].join( '&' );
        window.history.pushState( null, 'query string', `${ window.location.pathname }?${ urlString }` );
    }

    renderAnnouncement ( currentY ) {
        if ( this.DOM.scrollTop.offsetTop - currentY > this.config.scrollPx ) {
            setTimeout( () => {
                window.scrollTo( window.scrollX, currentY );
                this.renderAnnouncement( currentY + this.config.scrollPx );
            }, 1 );
        }
        else if ( currentY - this.DOM.scrollTop.offsetTop > this.config.scrollPx ) {
            setTimeout( () => {
                window.scrollTo( window.scrollX, currentY );
                this.renderAnnouncement( currentY - this.config.scrollPx );
            }, 1 );
        }
    }

    static formatUpdateTime ( time ) {
        if ( !( ValidateUtils.isValidDate( time ) ) )
            throw new TypeError( 'Invalid time.' );

        return [
            [
                `${ time.getFullYear() }`,
                `${ time.getMonth() < 9 ? `0${ String( time.getMonth() + 1 ) }` : String( time.getMonth() + 1 ) }`,
                `${ time.getDate() < 10 ? `0${ String( time.getDate() ) }` : String( time.getDate() ) }`,
            ].join( '-' ),
            [
                `${ time.getHours() < 10 ? `0${ String( time.getHours() ) }` : String( time.getHours() ) }`,
                `${ time.getMinutes() < 10 ? `0${ String( time.getMinutes() ) }` : String( time.getMinutes() ) }`,
                `${ time.getSeconds() < 10 ? `0${ String( time.getSeconds() ) }` : String( time.getSeconds() ) }`,
            ].join( ':' ),
        ].join( ' | ' );
    }

    renderPageExtra ( pages ) {
        const pageDOMArr = Array.from( this.DOM.pages.querySelectorAll( '.pages > .pages__page' ) );

        /**
         * If `pages` is larger than `visiblePageNum * 2 + 1`,
         * then `.pages__extra` is created and need to be rendered.
         */

        if ( pages > this.config.visiblePageNum * 2 + 1 ) {
            pageDOMArr.forEach( ( pageDOM ) => {
                const dataPage = pageDOM.getAttribute( 'data-page' );
                if ( dataPage !== null ) {
                    const page = Number( dataPage );

                    /**
                     * The first page & the last page must show.
                     * If the distance between a page and the current page is larger than `this.config.visiblePageNum`,
                     * then the page should be hidden.
                     */

                    if ( page !== this.config.page &&
                        page !== pages &&
                        Math.abs( page - this.state.page ) > this.config.visiblePageNum )
                        classAdd( pageDOM, 'pages__page--hidden' );
                    else
                        classRemove( pageDOM, 'pages__page--hidden' );
                }
            } );

            /**
             * If the page after the first page is hidden, then pages__extra--before should show.
             */

            if ( this.DOM.pages.querySelector( `.pages > .pages__page[ data-page = "${ this.config.page + 1 }" ]` )
            .classList.contains( 'pages__page--hidden' ) )
                classRemove( this.DOM.pages.querySelector( '.pages > .pages__extra--before' ), 'pages__extra--hidden' );
            else
                classAdd( this.DOM.pages.querySelector( '.pages > .pages__extra--before' ), 'pages__extra--hidden' );

            /**
             * If the page before the last page is hidden, then pages__extra--after should show.
             */

            if ( this.DOM.pages.querySelector( `.pages > .pages__page[ data-page = "${ pages - 1 }" ]` )
            .classList.contains( 'pages__page--hidden' ) )
                classRemove( this.DOM.pages.querySelector( '.pages > .pages__extra--after' ), 'pages__extra--hidden' );

            else
                classAdd( this.DOM.pages.querySelector( '.pages > .pages__extra--after' ), 'pages__extra--hidden' );
        }
    }

    subscribePageControlEvent ( pages, pageDOMArr ) {
        this.DOM.pages.querySelector( '.pages > .pages__control.pages__control--forward' ).addEventListener( 'click', () => {
            /**
             * Render `.pages__page--active`.
             */

            try {
                if ( this.isLocked() )
                    return;
                this.acquireLock();

                pageDOMArr.forEach( ( pageDOM ) => {
                    classRemove( pageDOM, 'pages__page--active' );
                } );

                this.state.page -= 1;
                if ( this.state.page < this.config.page )
                    this.state.page = this.config.page;

                const activeDOM = this.DOM.pages.querySelector( `.pages > .pages__page[ data-page = "${ this.state.page }" ]` );
                if ( !ValidateUtils.isDomElement( activeDOM ) )
                    throw new Error( `Failed to get element .pages > .pages__page[ data-page = "${ this.state.page }" ]` );
                classAdd( activeDOM, 'pages__page--active' );

                /**
                 * Render `.pages__extra`.
                 */

                this.renderPageExtra( pages );
                this.getNormalAnnouncement();
                this.pushState();
                this.renderAnnouncement( window.scrollY );
            }
            catch ( err ) {
                console.error( err );
            }
            finally {
                this.releaseLock();
            }
        } );
        this.DOM.pages.querySelector( '.pages > .pages__control--backward' ).addEventListener( 'click', () => {
            /**
             * Render `.pages__page--active`.
             */

            try {
                if ( this.isLocked() )
                    return;
                this.acquireLock();

                pageDOMArr.forEach( ( pageDOM ) => {
                    classRemove( pageDOM, 'pages__page--active' );
                } );

                this.state.page += 1;
                if ( this.state.page > pages )
                    this.state.page = pages;

                const activeDOM = this.DOM.pages.querySelector( `.pages > .pages__page[ data-page = "${ this.state.page }" ]` );
                if ( !ValidateUtils.isDomElement( activeDOM ) )
                    throw new Error( `Failed to get element .pages > .pages__page[ data-page = "${ this.state.page }" ]` );
                classAdd( activeDOM, 'pages__page--active' );

                /**
                 * Render `.pages__extra`.
                 */

                this.renderPageExtra( pages );
                this.getNormalAnnouncement();
                this.pushState();

                // Window.scrollTo( window.scrollX, this.DOM.scrollTop.offsetTop );
                this.renderAnnouncement( window.scrollY );
            }
            catch ( err ) {
                console.error( err );
            }
            finally {
                this.releaseLock();
            }
        } );
    }

    renderPages ( pages ) {
        try {
            this.DOM.pages.innerHTML = pagesHTML( { pages, } );

            const pageDOMArr = Array.from( this.DOM.pages.querySelectorAll( '.pages > .pages__page' ) );

            /**
             * Render `.pages__extra`.
             */

            this.renderPageExtra( pages );

            /**
             * Add eventListener to all the `.pages__page` element after rendering.
             */

            pageDOMArr.forEach( ( pageDOM ) => {
                pageDOM.addEventListener( 'click', () => {
                    /**
                     * Render `.pages__page--active`.
                     */

                    try {
                        if ( this.isLocked() )
                            return;
                        this.acquireLock();

                        pageDOMArr.forEach( ( pageDOM ) => {
                            classRemove( pageDOM, 'pages__page--active' );
                        } );

                        const dataPage = pageDOM.getAttribute( 'data-page' );
                        if ( dataPage !== null && ValidateUtils.isPositiveInteger( Number( dataPage ) ) ) {
                            this.state.page = Number( dataPage );
                            classAdd( pageDOM, 'pages__page--active' );

                            /**
                             * Render `.pages__extra`.
                             */

                            this.renderPageExtra( pages );
                            this.getNormalAnnouncement();
                            this.pushState();
                            this.renderAnnouncement( window.scrollY );
                        }
                    }
                    catch ( err ) {
                        throw new Error( err );
                    }
                    finally {
                        this.releaseLock();
                    }
                } );
            } );

            /**
             * Set default active page.
             */

            classAdd(
                this.DOM.pages.querySelector( `.pages > .pages__page[ data-page = "${ this.state.page }" ]` ),
                'pages__page--active'
            );

            /**
             * Add eventListener to all the `.pages__control` element after rendering.
             */

            if ( pages !== this.config.page )
                this.subscribePageControlEvent( pages, pageDOMArr );
        }
        catch ( err ) {
            throw new Error( 'failed to render pages' );
        }
    }

    async getPage () {
        try {
            classAdd( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.pinned.loading, 'loading--hidden' );
            classAdd( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.normal.loading, 'loading--hidden' );

            /**
             * Fold `.announcement__briefings.briefings`.
             */

            this.constructor.renderTransitionHide( this.DOM.announcement.pinned.briefings );
            this.constructor.renderTransitionHide( this.DOM.announcement.normal.briefings );
            await delay( this.config.transitionSec * 1000 );

            /**
             * Clear `#pages` & `.announcement__briefings.briefings`, then show `.announcement__loading.loading`.
             */

            this.DOM.pages.innerHTML = '';
            this.DOM.announcement.pinned.briefings.innerHTML = '';
            this.DOM.announcement.normal.briefings.innerHTML = '';


            let tags = this.state.tags;
            if ( tags.length === 0 )
                tags = this.tagId.default;
            else if ( this.tagId.default.length === 1 )
                tags = tags.concat( this.tagId.default );

            const queryString = [
                `amount=${ this.config.amount }`,
                `from=${ Number( this.state.from ) }`,
                `to=${ Number( this.state.to ) }`,
                ...tags.map( tagId => `tags=${ tagId }` ),
            ].join( '&' );

            let res = null;
            if ( this.state.tags.length === 0 )
                res = await fetch( `${ host }/api/announcement/get-pages-by-or-tags?${ queryString }` );
            else
                res = await fetch( `${ host }/api/announcement/get-pages-by-and-tags?${ queryString }` );

            if ( !res.ok )
                throw new Error( 'failed to get all pages' );

            const { pages, } = await res.json();
            this.renderPages( pages );
        }
        catch ( err ) {
            this.DOM.pages.innerHTML = '';
            classAdd( this.DOM.announcement.pinned.loading, 'loading--hidden' );
            classRemove( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
            classAdd( this.DOM.announcement.normal.loading, 'loading--hidden' );
            classRemove( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
            throw err;
        }
    }

    async getPinnedAnnouncement () {
        try {
            classAdd( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.pinned.loading, 'loading--hidden' );

            /**
             * Fold `.announcement__briefings.briefings`.
             */

            if ( this.DOM.announcement.pinned.briefings.innerHTML !== '' ) {
                this.constructor.renderTransitionHide( this.DOM.announcement.pinned.briefings );
                await delay( this.config.transitionSec * 1000 );
            }

            /**
             * Clear `.announcement__briefings.briefings`, then show `.announcement__loading.loading`.
             */

            this.DOM.announcement.pinned.briefings.innerHTML = '';

            let tags = this.state.tags;
            if ( tags.length === 0 )
                tags = this.tagId.default;
            if ( this.tagId.default.length === 1 && this.state.tags.length !== 0 )
                tags = tags.concat( this.tagId.default );

            const queryString = [
                `languageId=${ this.state.languageId }`,
                `from=${ Number( this.state.from ) }`,
                `to=${ Number( this.state.to ) }`,
                ...tags.map( tagId => `tags=${ tagId }` ),
            ].join( '&' );

            let res = null;
            if ( this.state.tags.length === 0 )
                res = await fetch( `${ host }/api/announcement/get-pinned-announcements-by-or-tags?${ queryString }` );
            else
                res = await fetch( `${ host }/api/announcement/get-pinned-announcements-by-and-tags?${ queryString }` );

            if ( !res.ok )
                throw new Error( 'failed to get all pinned announcement' );

            const data = await res.json();
            data.map( ( briefing ) => {
                briefing.tags = briefing.tags.map( tagId => ( {
                    color: TagUtils.getTagColorById( tagId ),
                    tag:   TagUtils.getTagById( {
                        tagId,
                        languageId: this.state.languageId,
                    } ),
                } ) );
                briefing.updateTime = this.constructor.formatUpdateTime( new Date( briefing.updateTime ) );
                return briefing;
            } )
            .forEach( ( briefing ) => {
                this.DOM.announcement.pinned.briefings.innerHTML += briefingHTML( {
                    briefing,
                    UTILS: {
                        url: UrlUtils.serverUrl( new UrlUtils( host, this.state.languageId ) ),
                    },
                } );
            } );
            classAdd( this.DOM.announcement.pinned.loading, 'loading--hidden' );

            /**
             * Unfold `.announcement__briefings.briefings`.
             */

            await this.renderTransitionShow( this.DOM.announcement.pinned.briefings );
        }
        catch ( err ) {
            this.DOM.announcement.pinned.briefings.innerHTML = '';
            classAdd( this.DOM.announcement.pinned.loading, 'loading--hidden' );
            classRemove( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
        }
    }

    async getNormalAnnouncement () {
        try {
            classAdd( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.normal.loading, 'loading--hidden' );

            /**
             * Fold `.announcement__briefings.briefings`.
             */

            if ( this.DOM.announcement.normal.briefings.innerHTML !== '' ) {
                this.constructor.renderTransitionHide( this.DOM.announcement.normal.briefings );
                await delay( this.config.transitionSec * 1000 );
            }

            /**
             * Clear `.announcement__briefings.briefings`, then show `.announcement__loading.loading`.
             */

            this.DOM.announcement.normal.briefings.innerHTML = '';

            let tags = this.state.tags;
            if ( tags.length === 0 )
                tags = this.tagId.default;
            if ( this.tagId.default.length === 1 && this.state.tags.length !== 0 )
                tags = tags.concat( this.tagId.default );

            const queryString = [
                `amount=${ this.config.amount }`,
                `languageId=${ this.state.languageId }`,
                `from=${ Number( this.state.from ) }`,
                `page=${ this.state.page }`,
                `to=${ Number( this.state.to ) }`,
                ...tags.map( tagId => `tags=${ tagId }` ),
            ].join( '&' );

            let res = null;
            if ( this.state.tags.length === 0 )
                res = await fetch( `${ host }/api/announcement/get-announcements-by-or-tags?${ queryString }` );
            else
                res = await fetch( `${ host }/api/announcement/get-announcements-by-and-tags?${ queryString }` );

            if ( !res.ok )
                throw new Error( 'failed to get all normal announcement' );

            const data = await res.json();
            data.map( ( briefing ) => {
                briefing.tags = briefing.tags.map( tagId => ( {
                    color: TagUtils.getTagColorById( tagId ),
                    tag:   TagUtils.getTagById( {
                        tagId,
                        languageId: this.state.languageId,
                    } ),
                } ) );
                briefing.updateTime = this.constructor.formatUpdateTime( new Date( briefing.updateTime ) );
                return briefing;
            } )
            .forEach( ( briefing ) => {
                this.DOM.announcement.normal.briefings.innerHTML += briefingHTML( {
                    briefing,
                    UTILS: {
                        url: UrlUtils.serverUrl( new UrlUtils( host, this.state.languageId ) ),
                    },
                } );
            } );
            classAdd( this.DOM.announcement.normal.loading, 'loading--hidden' );

            /**
             * Unfold `.announcement__briefings.briefings`.
             */

            await this.renderTransitionShow( this.DOM.announcement.normal.briefings );
        }
        catch ( err ) {
            this.DOM.announcement.normal.briefings.innerHTML = '';
            classAdd( this.DOM.announcement.normal.loading, 'loading--hidden' );
            classRemove( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
            throw err;
        }
    }

    async getAll () {
        try {
            await this.getPage();
            await this.getPinnedAnnouncement();
            await this.getNormalAnnouncement();
        }
        catch ( err ) {
            console.error( err );
        }
        finally {
            this.releaseLock();
        }
    }
}
