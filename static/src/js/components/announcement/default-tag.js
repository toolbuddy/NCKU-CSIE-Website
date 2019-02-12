import TagUtils from 'models/announcement/utils/tag.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import UrlUtils from 'static/src/js/utils/url.js';
import briefingHTML from 'static/src/pug/components/announcement/briefing.pug';
import pagesHTML from 'static/src/pug/components/announcement/pages.pug';
import { classAdd, classRemove, } from 'static/src/js/utils/class-name.js';
import { host, } from 'settings/server/config.js';
import ValidateUtils from 'models/common/utils/validate.js';

export default class DefaultTagFilter {
    constructor ( opt ) {
        this.config = {
            from:           new Date( '2018/01/01' ),
            to:             new Date( Date.now() ),
            page:           1,
            visiblePageNum: 2,
            pageExtraLimit: 4,
        };

        opt = opt || {};
        const languageId = WebLanguageUtils.getLanguageId( 'en-US' );

        if ( !opt.defaultTag ||
            !Array.isArray( opt.defaultTag ) ||
            !opt.supportedTag ||
            !Array.isArray( opt.supportedTag ) ||
            !opt.filterDOM ||
            !ValidateUtils.isDomElement( opt.filterDOM ) ||
            !opt.announcementPinnedDOM ||
            !ValidateUtils.isDomElement( opt.announcementPinnedDOM ) ||
            !opt.announcementNormalDOM ||
            !ValidateUtils.isDomElement( opt.announcementNormalDOM ) ||
            !opt.pagesDOM ||
            !ValidateUtils.isDomElement( opt.pagesDOM ) ||
            !opt.amount ||
            !ValidateUtils.isPositiveInteger( opt.amount ) )
            throw new TypeError( 'invalid arguments' );

        if ( !opt.supportedTag.every( tag => TagUtils.isSupportedTag( { tag, languageId, } ) ) ||
            !opt.defaultTag.every( tag => TagUtils.isSupportedTag( { tag, languageId, } ) ) )
            throw new TypeError( 'tag is not supported' );

        /**
         * Check if default & supported tags has the same tag
         */

        opt.supportedTag.forEach( ( tag ) => {
            if ( opt.defaultTag.indexOf( tag ) >= 0 )
                throw new TypeError( 'invalid arguments' );
        } );

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
            amount:        opt.amount,
            languageId:    WebLanguageUtils.currentLanguageId,
            from:          this.config.from,
            to:            this.config.to,
            page:          this.config.page,
            tags:          [],
            selectDefault:  true,
            tagParam:      this.tagId.default,
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
                        throw new Error( 'Invalid Tag DOM attribute.' );
                    if ( !( Number( tagId ) === -1 ) && !TagUtils.isSupportedTagId( Number( tagId ) ) )
                        throw new Error( 'Invalid Tag DOM attribute.' );
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
            pages: opt.pagesDOM,
        };

        if (
            !ValidateUtils.isDomElement( this.DOM.filter.from.year ) ||
            !ValidateUtils.isDomElement( this.DOM.filter.from.month ) ||
            !ValidateUtils.isDomElement( this.DOM.filter.from.date ) ||
            !ValidateUtils.isDomElement( this.DOM.filter.to.year ) ||
            !ValidateUtils.isDomElement( this.DOM.filter.to.month ) ||
            !ValidateUtils.isDomElement( this.DOM.filter.to.date ) ||
            !Array.from( this.DOM.filter.tags.map( tag => tag.node ) ).every( ValidateUtils.isDomElement ) ||
            !ValidateUtils.isDomElement( this.DOM.announcement.pinned.noResult ) ||
            !ValidateUtils.isDomElement( this.DOM.announcement.pinned.loading ) ||
            !ValidateUtils.isDomElement( this.DOM.announcement.pinned.briefings ) ||
            !ValidateUtils.isDomElement( this.DOM.announcement.normal.noResult ) ||
            !ValidateUtils.isDomElement( this.DOM.announcement.normal.loading ) ||
            !ValidateUtils.isDomElement( this.DOM.announcement.normal.briefings ) ||
            !ValidateUtils.isDomElement( this.DOM.pages ) )
            throw new Error( 'DOM not found.' );

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
         * @abstract
         * DOM elements `.time__from` and `.time__to` click event subscribe.
         */

        this.subscribeTimeEvent();

        /**
         * @abstract
         * DOM elements `.tags__tag` click event subscribe.
         */

        this.subscribeTagEvent();
    }

    async getAll () {
        try {
            await this.getPage();
            await this.getPinnedAnnouncement();
            await this.getNormalAnnouncement();
        }

        /* Silence */

        catch ( {} ) {}
    }

    static formatUpdateTime ( time ) {
        if ( !( time instanceof Date ) )
            throw new TypeError( 'invalid arguments' );

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
         * If pages is larger than pageExtraLimit, then pages__extra may show.
         */

        if ( pages > this.config.pageExtraLimit ) {
            pageDOMArr.forEach( ( pageDOM ) => {
                classRemove( pageDOM, 'pages__page--hidden' );
                const dataPage = pageDOM.getAttribute( 'data-page' );
                if ( dataPage !== null ) {
                    const page = Number( dataPage );

                    /**
                     * The first page & the last page must show.
                     * If the distance between a page and the current page is larger than visiblePageNum, then the page should be hidden.
                     */

                    if ( page !== this.config.page &&
                        page !== pages &&
                        Math.abs( page - this.state.page ) > this.config.visiblePageNum )
                        classAdd( pageDOM, 'pages__page--hidden' );
                }
            } );

            /**
             * If the page after the first page is hidden, then pages__extra--before should show.
             */

            if ( this.DOM.pages.querySelector( `.pages > [data-page="2"]` ).classList.contains( 'pages__page--hidden' ) )
                classRemove( this.DOM.pages.querySelector( '.pages > .pages__extra--before' ), 'pages__extra--hidden' );

            else
                classAdd( this.DOM.pages.querySelector( '.pages > .pages__extra--before' ), 'pages__extra--hidden' );

            /**
             * If the page before the last page is hidden, then pages__extra--after should show.
             */

            if ( this.DOM.pages.querySelector( `.pages > [data-page="${ pages - 1 }"]` ).classList.contains( 'pages__page--hidden' ) )
                classRemove( this.DOM.pages.querySelector( '.pages > .pages__extra--after' ), 'pages__extra--hidden' );

            else
                classAdd( this.DOM.pages.querySelector( '.pages > .pages__extra--after' ), 'pages__extra--hidden' );
        }
    }

    renderPages ( pages ) {
        try {
            this.state.page = this.config.page;
            this.DOM.pages.innerHTML = pagesHTML( { pages, } );

            const pageDOMArr = Array.from( this.DOM.pages.querySelectorAll( '.pages > .pages__page' ) );

            /* Render `pages__extra` */

            this.renderPageExtra( pages );

            /* Add eventListener to all the `pages__page` element,when rendering pages. */

            pageDOMArr.forEach( ( pageDOM ) => {
                pageDOM.addEventListener( 'click', () => {
                    /* Render `pages__page--active` */

                    pageDOMArr.forEach( ( pageDOM ) => {
                        classRemove( pageDOM, 'pages__page--active' );
                    } );

                    const dataPage = pageDOM.getAttribute( 'data-page' );
                    if ( dataPage !== null && ValidateUtils.isPositiveInteger( Number( dataPage ) ) ) {
                        this.state.page = Number( dataPage );
                        classAdd( pageDOM, 'pages__page--active' );

                        /* Render `pages__extra` */

                        this.renderPageExtra( pages );
                        this.getNormalAnnouncement();
                    }
                } );
            } );

            /* Set default active page */

            const activeDOM = this.DOM.pages.querySelector( `.pages > [data-page="${ this.state.page }"]` );
            classAdd( activeDOM, 'pages__page--active' );

            /* Add eventListener to all the `pages__control` element,when rendering pages. */

            if ( pages !== 1 ) {
                this.DOM.pages.querySelector( '.pages > .pages__control--forward' ).addEventListener( 'click', () => {
                    /* Render `pages__page--active` */

                    pageDOMArr.forEach( ( pageDOM ) => {
                        classRemove( pageDOM, 'pages__page--active' );
                    } );

                    this.state.page -= 1;
                    if ( this.state.page < 1 )
                        this.state.page = 1;

                    const activeDOM = this.DOM.pages.querySelector( `.pages > [data-page="${ this.state.page }"]` );
                    classAdd( activeDOM, 'pages__page--active' );

                    /* Render `pages__extra` */

                    this.renderPageExtra( pages );
                    this.getNormalAnnouncement();
                } );
                this.DOM.pages.querySelector( '.pages > .pages__control--backward' ).addEventListener( 'click', () => {
                    /* Render `pages__page--active` */

                    pageDOMArr.forEach( ( pageDOM ) => {
                        classRemove( pageDOM, 'pages__page--active' );
                    } );

                    this.state.page += 1;
                    if ( this.state.page > pages )
                        this.state.page = pages;

                    const activeDOM = this.DOM.pages.querySelector( `.pages > [data-page="${ this.state.page }"]` );
                    classAdd( activeDOM, 'pages__page--active' );

                    /* Render `pages__extra` */

                    this.renderPageExtra( pages );
                    this.getNormalAnnouncement();
                } );
            }
        }
        catch ( err ) {
            throw new Error( 'failed to render pages' );
        }
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

            const index = this.state.tagParam.indexOf( -1 );
            if ( index >= 0 )
                this.state.tagParam.splice( index, 1 );

            const queryString = [
                `amount=${ this.state.amount }`,
                `from=${ Number( this.state.from ) }`,
                `to=${ Number( this.state.to ) }`,
                ...this.state.tagParam.map( tagId => `tags=${ tagId }` ),
            ].join( '&' );

            let res = null;
            if ( this.state.selectDefault )
                res = await fetch( `${ host }/api/announcement/all-pages?${ queryString }` );
            else
                res = await fetch( `${ host }/api/announcement/tags-pages?${ queryString }` );

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
            this.DOM.announcement.pinned.briefings.innerHTML = '';
            classAdd( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.pinned.loading, 'loading--hidden' );

            const index = this.state.tagParam.indexOf( -1 );
            if ( index >= 0 )
                this.state.tagParam.splice( index, 1 );

            const queryString = [
                `languageId=${ this.state.languageId }`,
                `from=${ Number( this.state.from ) }`,
                `to=${ Number( this.state.to ) }`,
                ...this.state.tagParam.map( tagId => `tags=${ tagId }` ),
            ].join( '&' );

            let res = null;
            if ( this.state.selectDefault )
                res = await fetch( `${ host }/api/announcement/all-pinned?${ queryString }` );
            else
                res = await fetch( `${ host }/api/announcement/tags-pinned?${ queryString }` );

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
                briefing.updateTime = DefaultTagFilter.formatUpdateTime( new Date( briefing.updateTime ) );
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
            throw err;
        }
    }

    async getNormalAnnouncement () {
        try {
            this.DOM.announcement.normal.briefings.innerHTML = '';
            classAdd( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.normal.loading, 'loading--hidden' );

            const index = this.state.tagParam.indexOf( -1 );
            if ( index >= 0 )
                this.state.tagParam.splice( index, 1 );

            const queryString = [
                `amount=${ this.state.amount }`,
                `languageId=${ this.state.languageId }`,
                `from=${ Number( this.state.from ) }`,
                `page=${ this.state.page }`,
                `to=${ Number( this.state.to ) }`,
                ...this.state.tagParam.map( tagId => `tags=${ tagId }` ),
            ].join( '&' );

            let res = null;
            if ( this.state.selectDefault )
                res = await fetch( `${ host }/api/announcement/all-announcement?${ queryString }` );
            else
                res = await fetch( `${ host }/api/announcement/tags-announcement?${ queryString }` );

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
                briefing.updateTime = DefaultTagFilter.formatUpdateTime( new Date( briefing.updateTime ) );
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
            throw err;
        }
    }
}
