import TagUtils from 'models/announcement/utils/tag.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import UrlUtils from 'static/src/js/utils/url.js';
import briefingHTML from 'static/src/pug/components/announcement/briefing.pug';
import pagesHTML from 'static/src/pug/components/announcement/pages.pug';
import config from 'static/src/js/components/announcement/filter/default-value.js';
import { classAdd, classRemove, } from 'static/src/js/utils/class-name.js';
import { host, } from 'settings/server/config.js';
import validate from 'validate.js';

export default class DefaultTagFilter {
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

        if ( !opt.supportedTag.every( tag => TagUtils.isSupportedTag( { tag, languageId, } ) ) ||
            !opt.defaultTag.every( tag => TagUtils.isSupportedTag( { tag, languageId, } ) ) )
            throw new TypeError( 'tag is not supported' );

        /* Check if default & supported tags has the same tag */

        TagUtils.supportedTag( languageId ).forEach( ( tag ) => {
            if ( opt.supportedTag.includes( tag ) && opt.defaultTag.includes( tag ) )
                throw new TypeError( 'invalid arguments' );
        } );

        /**
         * @todo amount validation
         */
        if( ! validate.isInteger( opt.amount ) ||
            opt.amount < 0 ||
            ! (opt.amount <= Number.MAX_SAFE_INTEGER) )
            throw TypeError('invalid arguments');

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
            amount:     opt.amount,
            languageId: WebLanguageUtils.currentLanguageId,
            from:       config.from,
            to:         config.to,
            page:       config.page,
            tags:       [],
            selectAll:  true,
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

        this.abstractMessage = 'Abstract method not implemented.';
        /**
         * Construct innerHTML for filter tags
         */

        this.constructTagHTML();

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

        this.subscribeTimeFromEvent();

        /**
         * DOM elements `.time__to` click event subscribe.
         */

        this.subscribeTimeToEvent();

        /**
         * DOM elements `.tags__tag` click event subscribe.
         */

        this.subscribeTagEvent();
    }

    constructTagHTML () {
        throw new Error( this.abstractMessage );
    }

    subscribeTimeFromEvent () {
        throw new Error( this.abstractMessage );
    }

    subscribeTimeToEvent () {
        throw new Error( this.abstractMessage );
    }

    subscribeTagEvent () {
        throw new Error( this.abstractMessage );
    }

    static formatUpdateTime ( time ) {
        /**
         * @todo add time validation.
         */
        if (! time instanceof Date)
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

    renderPages ( pages, tags ) {
        this.state.page = config.page;
        this.DOM.pages.innerHTML = pagesHTML( { pages, } );
        const pageDOMArr = Array.from( this.DOM.pages.querySelectorAll( '.pages__page' ) );

        /* Render `pages__extra` */

        this.renderPageExtra( pages );

        /* Add eventListener to all the `pages__page` element,when rendering pages. */

        pageDOMArr.forEach( ( pageDOM ) => {
            pageDOM.addEventListener( 'click', () => {
                /* Render `pages__page--active` */

                pageDOMArr.forEach( ( pageDOM ) => {
                    classRemove( pageDOM, 'pages__page--active' );
                } );
                this.state.page = Number( pageDOM.getAttribute( 'data-page' ) );
                classAdd( pageDOM, 'pages__page--active' );

                /* Render `pages__extra` */

                this.renderPageExtra( pages );
                this.getNormalAnnouncement( tags );
            } );
        } );

        /* Set default active page */

        const activeDOM = this.DOM.pages.querySelector( `[data-page="${ this.state.page }"]` );
        classAdd( activeDOM, 'pages__page--active' );

        /* Add eventListener to all the `pages__control` element,when rendering pages. */

        if ( pages !== 1 ) {
            this.DOM.pages.querySelector( '.pages__control--forward' ).addEventListener( 'click', () => {
                /* Render `pages__page--active` */

                pageDOMArr.forEach( ( pageDOM ) => {
                    classRemove( pageDOM, 'pages__page--active' );
                } );

                this.state.page -= 1;
                if ( this.state.page < 1 )
                    this.state.page = 1;

                const activeDOM = this.DOM.pages.querySelector( `[data-page="${ this.state.page }"]` );
                classAdd( activeDOM, 'pages__page--active' );

                /* Render `pages__extra` */

                this.renderPageExtra( pages );
                this.getNormalAnnouncement( tags );
            } );
            this.DOM.pages.querySelector( '.pages__control--backward' ).addEventListener( 'click', () => {
                /* Render `pages__page--active` */

                pageDOMArr.forEach( ( pageDOM ) => {
                    classRemove( pageDOM, 'pages__page--active' );
                } );

                this.state.page += 1;
                if ( this.state.page > pages )
                    this.state.page = pages;

                const activeDOM = this.DOM.pages.querySelector( `[data-page="${ this.state.page }"]` );
                classAdd( activeDOM, 'pages__page--active' );

                /* Render `pages__extra` */

                this.renderPageExtra( pages );
                this.getNormalAnnouncement( tags );
            } );
        }
    }

    renderPageExtra ( pages ) {
        const pageDOMArr = Array.from( this.DOM.pages.querySelectorAll( '.pages__page' ) );
        if ( pages > 4 ) {
            pageDOMArr.forEach( ( pageDOM ) => {
                classRemove( pageDOM, 'pages__page--hidden' );
                const page = Number( pageDOM.getAttribute( 'data-page' ) );
                if ( page !== 1 &&
                    page !== pages &&
                    Math.abs( page - this.state.page ) > 2 )
                    classAdd( pageDOM, 'pages__page--hidden' );
            } );
            if ( this.DOM.pages.querySelector( `[data-page="2"]` ).classList.contains( 'pages__page--hidden' ) )
                classRemove( this.DOM.pages.querySelector( '#pages__extra--before' ), 'pages__extra--hidden' );

            else
                classAdd( this.DOM.pages.querySelector( '#pages__extra--before' ), 'pages__extra--hidden' );


            if ( this.DOM.pages.querySelector( `[data-page="${ pages - 1 }"]` ).classList.contains( 'pages__page--hidden' ) )
                classRemove( this.DOM.pages.querySelector( '#pages__extra--after' ), 'pages__extra--hidden' );

            else
                classAdd( this.DOM.pages.querySelector( '#pages__extra--after' ), 'pages__extra--hidden' );
        }
    }

    async getPage ( tags ) {
        try {
            this.DOM.pages.innerHTML = '';
            this.DOM.announcement.pinned.briefings.innerHTML = '';
            this.DOM.announcement.normal.briefings.innerHTML = '';
            classAdd( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.pinned.loading, 'loading--hidden' );
            classAdd( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.normal.loading, 'loading--hidden' );

            const index = tags.indexOf( -1 );
            if ( index >= 0 )
                tags.splice( tags.indexOf( -1 ), 1 );

            const queryString = [
                `amount=${ this.state.amount }`,
                `from=${ Number( this.state.from ) }`,
                `to=${ Number( this.state.to ) }`,
                ...tags.map( tagId => `tags=${ tagId }` ),
            ].join( '&' );

            let res = null;
            if ( this.state.selectAll )
                res = await fetch( `${ host }/api/announcement/all-pages?${ queryString }` );
            else
                res = await fetch( `${ host }/api/announcement/tags-pages?${ queryString }` );

            if ( !res.ok )
                throw new Error( 'failed to get all pages' );

            const { pages, } = await res.json();
            this.renderPages( pages, tags );
        }
        catch ( err ) {
            this.DOM.pages.innerHTML = '';
        }
    }

    async getPinnedAnnouncement ( tags ) {
        try {
            this.DOM.announcement.pinned.briefings.innerHTML = '';
            classAdd( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.pinned.loading, 'loading--hidden' );

            const index = tags.indexOf( -1 );
            if ( index >= 0 )
                tags.splice( tags.indexOf( -1 ), 1 );
            const queryString = [
                `languageId=${ this.state.languageId }`,
                `from=${ Number( this.state.from ) }`,
                `to=${ Number( this.state.to ) }`,
                ...tags.map( tagId => `tags=${ tagId }` ),
            ].join( '&' );

            let res = null;
            if ( this.state.selectAll )
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
        }
    }

    async getNormalAnnouncement ( tags ) {
        try {
            this.DOM.announcement.normal.briefings.innerHTML = '';
            classAdd( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
            classRemove( this.DOM.announcement.normal.loading, 'loading--hidden' );

            const index = tags.indexOf( -1 );
            if ( index >= 0 )
                tags.splice( tags.indexOf( -1 ), 1 );
            const queryString = [
                `amount=${ this.state.amount }`,
                `languageId=${ this.state.languageId }`,
                `from=${ Number( this.state.from ) }`,
                `page=${ this.state.page }`,
                `to=${ Number( this.state.to ) }`,
                ...tags.map( tagId => `tags=${ tagId }` ),
            ].join( '&' );

            let res = null;
            if ( this.state.selectAll )
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
        }
    }
}
