import TagUtils from 'models/announcement/utils/tag.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import UrlUtils from 'static/src/js/utils/url.js';
import tagsHTML from 'static/src/pug/components/announcement/tags.pug';
import briefingHTML from 'static/src/pug/components/announcement/briefing.pug';
import pagesHTML from 'static/src/pug/components/announcement/pages.pug';
import config from 'static/src/js/components/announcement/filter/default-value.js';
import { classAdd, classRemove, } from 'static/src/js/utils/class-name.js';
import { host, } from 'settings/server/config.js';

export default class SingleDefaultTagFilter {
    constructor ( opt ) {
        opt = opt || {};
        const languageId = WebLanguageUtils.getLanguageId( 'en-US' );

        if ( !opt.defaultTag ||
            !opt.supportedTag ||
            !opt.filterDOM ||
            !opt.announcementPinnedDOM ||
            !opt.announcementNormalDOM ||
            !opt.pagesDOM ||
            !opt.amount )
            throw new TypeError( 'invalid arguments' );

        if ( !opt.supportedTag.every( tag => TagUtils.isSupportedTag( { tag, languageId, } ) ) )
            throw new TypeError( 'tag is not supported' );

        if ( !opt.supportedTag.includes( opt.defaultTag ) )
            throw new Error( 'inconsistent tag arguements' );

        /**
         * @todo amount validation
         */

        this.tagId = {
            default: TagUtils.getTagId( {
                tag: opt.defaultTag,
                languageId,
            } ),
            supported: opt.supportedTag.map( tag => TagUtils.getTagId( {
                tag,
                languageId,
            } ) ),
        };

        this.state = {
            amount:     opt.amount,
            languageId: WebLanguageUtils.currentLanguageId,
            tags:       [],
            from:       config.from,
            to:         config.to,
            page:       config.page,
        };

        this.DOM = {
            filter: {
                from: {
                    year:  opt.filterDOM.querySelector( '.filter__time.time>.time__from.from>.from__input.input>.input__year' ),
                    month: opt.filterDOM.querySelector( '.filter__time.time>.time__from.from>.from__input.input>.input__month' ),
                    date:  opt.filterDOM.querySelector( '.filter__time.time>.time__from.from>.from__input.input>.input__date' ),
                },
                to:   {
                    year:  opt.filterDOM.querySelector( '.filter__time.time>.time__to.to>.to__input.input>.input__year' ),
                    month: opt.filterDOM.querySelector( '.filter__time.time>.time__to.to>.to__input.input>.input__month' ),
                    date:  opt.filterDOM.querySelector( '.filter__time.time>.time__to.to>.to__input.input>.input__date' ),
                },
                tags: opt.filterDOM.querySelector( '.filter__tags.tags' ),
            },
            announcement: {
                pinned: {
                    noResult:  opt.announcementPinnedDOM.querySelector( '.announcement__no-result.no-result' ),
                    loading:   opt.announcementPinnedDOM.querySelector( '.announcement__loading.loading' ),
                    briefings: opt.announcementPinnedDOM.querySelector( '.announcement__briefings.briefings' ),
                },
                normal: {
                    noResult:  opt.announcementNormalDOM.querySelector( '.announcement__no-result.no-result' ),
                    loading:   opt.announcementNormalDOM.querySelector( '.announcement__loading.loading' ),
                    briefings: opt.announcementNormalDOM.querySelector( '.announcement__briefings.briefings' ),
                },
            },
            pages: opt.pagesDOM,
        };

        /**
         * Construct innerHTML for filter tags
         */

        this.DOM.filter.tags.innerHTML = tagsHTML( {
            tags: this.tagId.supported.map( tagId => ( {
                color: TagUtils.getTagColorById( tagId ),
                tagId,
                tag:   TagUtils.getTagById( { tagId, languageId: this.state.languageId, } ),
            } ) ),
        } );

        /**
         * DOM element `.filter__time` initialization.
         */

        this.DOM.filter.from.year.value = this.state.from.getFullYear();
        this.DOM.filter.from.month.value = this.state.from.getMonth() + 1;
        this.DOM.filter.from.date.value = this.state.from.getDate();
        this.DOM.filter.to.year.value = this.state.to.getFullYear();
        this.DOM.filter.to.month.value = this.state.to.getMonth() + 1;
        this.DOM.filter.to.date.value = this.state.to.getDate();

        /**
         * DOM elements `.time__from` click event subscribe.
         */

        [
            'year',
            'month',
            'date',
        ].forEach( ( key ) => {
            this.DOM.filter.from[ key ].addEventListener( 'change', () => {
                const year  = this.DOM.filter.from.year.value;
                const month = this.DOM.filter.from.month.value;
                const date  = this.DOM.filter.from.date.value;

                /**
                 * @todo add date validation.
                 */

                this.state.from = new Date( `${ year }/${ month }/${ date }` );
                this.getPage();
            } );
        } );

        /**
         * DOM elements `.time__to` click event subscribe.
         */

        [
            'year',
            'month',
            'date',
        ].forEach( ( key ) => {
            this.DOM.filter.to[ key ].addEventListener( 'change', () => {
                const year  = this.DOM.filter.to.year.value;
                const month = this.DOM.filter.to.month.value;
                const date  = this.DOM.filter.to.date.value;

                /**
                 * @todo add date validation.
                 */

                this.state.to = new Date( `${ year }/${ month }/${ date }` );
                this.getPage();
            } );
        } );

        /**
         * DOM elements `.tags__tag` click event subscribe.
         */

        const tagDOMArr = Array.from( this.DOM.filter.tags.querySelectorAll( '.tags__tag' ) );
        tagDOMArr.forEach( ( tagDOM ) => {
            const tagId = Number( tagDOM.getAttribute( 'data-tag-id' ) );

            // Non-default tags event subscribe
            if ( tagId !== this.tagId.default ) {
                tagDOM.addEventListener( 'click', () => {
                    const index = this.state.tags.indexOf( tagId );
                    if ( index >= 0 ) {
                        this.state.tags.splice( index, 1 );
                        classRemove( tagDOM, 'tags__tag--active' );
                    }
                    else {
                        this.state.tags.push( tagId );
                        classAdd( tagDOM, 'tags__tag--active' );
                    }
                    this.getPage();
                } );
            }

            // Default tag event subscribe
            else {
                // Default tag should be always active.
                classAdd( tagDOM, 'tags__tag--active' );
                tagDOM.addEventListener( 'click', () => {
                    tagDOMArr.forEach( ( tagDOM ) => {
                        classRemove( tagDOM, 'tags__tag--active' );
                    } );
                    classAdd( tagDOM, 'tags__tag--active' );
                    this.state.tags = [];
                    this.getPage();
                } );
            }
        } );
    }

    static formatUpdateTime ( time ) {
        /**
         * @todo add time validation.
         */

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

    renderPages ( pages ) {
        this.state.page = config.page;
        this.DOM.pages.innerHTML = pagesHTML( { pages, } );
        const pageDOMArr = Array.from( this.DOM.pages.querySelectorAll( '.pages__page' ) );

        /* Add eventListener to all the `pages__page` element,when rendering pages. */

        pageDOMArr.forEach( ( pageDOM ) => {
            pageDOM.addEventListener( 'click', () => {
                pageDOMArr.forEach( ( pageDOM ) => {
                    classRemove( pageDOM, 'pages__page--active' );
                } );
                this.state.page = Number( pageDOM.getAttribute( 'data-page' ) );
                classAdd( pageDOM, 'pages__page--active' );
                this.getNormalAnnouncement();
            } );
        } );

        /* Set default active page */

        let activeDOM = document.querySelector('[data-page="'+this.state.page+'"]');
        classAdd(activeDOM, 'pages__page--active');

        /* Add eventListener to all the `pages__control` element,when rendering pages. */

        this.DOM.pages.querySelector( '.pages__control--forward' ).addEventListener( 'click', () => {
            pageDOMArr.forEach( ( pageDOM ) => {
                classRemove( pageDOM, 'pages__page--active' );
            } );

            this.state.page -= 1;
            if ( this.state.page < 1 )
                this.state.page = 1;

            const activeDOM = document.querySelector( `[data-page="${ this.state.page }"]` );
            classAdd( activeDOM, 'pages__page--active' );
            this.getNormalAnnouncement();
        } );
        this.DOM.pages.querySelector( '.pages__control--backward' ).addEventListener( 'click', () => {
            pageDOMArr.forEach( ( pageDOM ) => {
                classRemove( pageDOM, 'pages__page--active' );
            } );

            this.state.page += 1;
            if ( this.state.page > this.state.maxPage )
                this.state.page = this.state.maxPage;
                
            const activeDOM = document.querySelector( `[data-page="${ this.state.page }"]` );
            classAdd( activeDOM, 'pages__page--active' );
            this.getNormalAnnouncement();
        } );
    }

    async getPage () {
        try {
            this.DOM.pages.innerHTML = '';
            this.DOM.announcement.pinned.briefings.innerHTML = '';
            this.DOM.announcement.normal.briefings.innerHTML = '';
            classAdd( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.pinned.loading, 'loading--hidden' );
            classAdd( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.normal.loading, 'loading--hidden' );

            const queryString = [
                `amount=${ this.state.amount }`,
                `from=${ Number( this.state.from ) }`,
                `to=${ Number( this.state.to ) }`,
                `tags=${ this.tagId.default }`,
                ...this.state.tags.map( tagId => `tags=${ tagId }` ),
            ].join( '&' );

            const res = await fetch( `${ host }/api/announcement/tags-pages?${ queryString }` );
            if ( !res.ok )
                throw new Error( 'failed to get all pages' );
            const { pages, } = await res.json();
            if ( pages ) {
                this.state.maxPage = pages;
                this.renderPages( pages );
                this.getPinnedAnnouncement();
                this.getNormalAnnouncement();
            }
            else {
                classAdd( this.DOM.announcement.pinned.loading, 'loading--hidden' );
                classRemove( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
                classAdd( this.DOM.announcement.normal.loading, 'loading--hidden' );
                classRemove( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
            }
        }
        catch ( err ) {
            this.DOM.pages.innerHTML = '';
            classAdd( this.DOM.announcement.pinned.loading, 'loading--hidden' );
            classRemove( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
            classAdd( this.DOM.announcement.normal.loading, 'loading--hidden' );
            classRemove( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
        }
    }

    async getPinnedAnnouncement () {
        try {
            this.DOM.announcement.pinned.briefings.innerHTML = '';
            classAdd( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.pinned.loading, 'loading--hidden' );

            const queryString = [
                `languageId=${ this.state.languageId }`,
                `from=${ Number( this.state.from ) }`,
                `to=${ Number( this.state.to ) }`,
                `tags=${ this.tagId.default }`,
                ...this.state.tags.map( tagId => `tags=${ tagId }` ),
            ].join( '&' );

            const res = await fetch( `${ host }/api/announcement/tags-pinned?${ queryString }` );
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
                briefing.updateTime = SingleDefaultTagFilter.formatUpdateTime( new Date( briefing.updateTime ) );
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
        }
        catch ( err ) {
            this.DOM.announcement.pinned.briefings.innerHTML = '';
            classAdd( this.DOM.announcement.pinned.loading, 'loading--hidden' );
            classRemove( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
        }
    }

    async getNormalAnnouncement () {
        try {
            this.DOM.announcement.normal.briefings.innerHTML = '';
            classAdd( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.normal.loading, 'loading--hidden' );

            const queryString = [
                `amount=${ this.state.amount }`,
                `languageId=${ this.state.languageId }`,
                `from=${ Number( this.state.from ) }`,
                `page=${ this.state.page }`,
                `to=${ Number( this.state.to ) }`,
                `tags=${ this.tagId.default }`,
                ...this.state.tags.map( tagId => `tags=${ tagId }` ),
            ].join( '&' );

            const res = await fetch( `${ host }/api/announcement/tags-announcement?${ queryString }` );
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
                briefing.updateTime = SingleDefaultTagFilter.formatUpdateTime( new Date( briefing.updateTime ) );
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
        }
        catch ( err ) {
            this.DOM.announcement.normal.briefings.innerHTML = '';
            classAdd( this.DOM.announcement.normal.loading, 'loading--hidden' );
            classRemove( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
        }
    }
}
