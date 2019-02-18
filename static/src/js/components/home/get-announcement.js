import briefingHTML from 'static/src/pug/components/announcement/announcement-briefing.pug';
import { classAdd, classRemove, } from 'static/src/js/utils/style.js';
import { host, } from 'settings/server/config.js';
import hotAnnouncementBriefingHTML from 'static/src/pug/components/home/hot-announcement-briefing.pug';
import TagUtils from 'models/announcement/utils/tag.js';
import UrlUtils from 'static/src/js/utils/url.js';
import ValidateUtils from 'models/common/utils/validate.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

export class GetAllAnnouncement {
    constructor ( opt ) {
        opt = opt || {};

        if (
            !opt.amount ||
            !ValidateUtils.isPositiveInteger( opt.amount ) ||
            !opt.announcementDOM ||
            !ValidateUtils.isDomElement( opt.announcementDOM ) ||
            !opt.from ||
            !ValidateUtils.isValidDate( opt.from ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId ) ||
            !opt.to ||
            !ValidateUtils.isValidDate( opt.to ) ||
            !Array.isArray( opt.tags ) ||
            !opt.tags.every( tag => TagUtils.isSupportedTag( { tag, languageId: WebLanguageUtils.getLanguageId( 'en-US' ), } ) ) ||
            !opt.page ||
            !ValidateUtils.isPositiveInteger( opt.page ) )
            throw new TypeError( 'invalid arguments' );

        const announcementQuerySelector = block => `.${ opt.announcementDOM.id }__${ block }.${ block }`;

        this.DOM = {
            noResult:  opt.announcementDOM.querySelector( announcementQuerySelector( 'no-result' ) ),
            loading:   opt.announcementDOM.querySelector( announcementQuerySelector( 'loading' ) ),
            briefings: opt.announcementDOM.querySelector( announcementQuerySelector( 'briefings' ) ),
        };

        if (
            !ValidateUtils.isDomElement( this.DOM.noResult ) ||
            !ValidateUtils.isDomElement( this.DOM.loading ) ||
            !ValidateUtils.isDomElement( this.DOM.briefings ) )
            throw new Error( 'DOM not found.' );

        this.amount = opt.amount;
        this.from = opt.from;
        this.languageId = opt.languageId;
        this.tags = opt.tags;
        this.to = opt.to;
        this.page = opt.page;
    }

    get queryString () {
        return [
            `amount=${ this.amount }`,
            `languageId=${ this.languageId }`,
            `from=${ Number( this.from ) }`,
            `page=${ this.page }`,
            `to=${ Number( this.to ) }`,
            ...this.tags.map( tag => `tags=${ TagUtils.getTagId( {
                tag,
                languageId: WebLanguageUtils.getLanguageId( 'en-US' ),
            } ) }` ),
        ].join( '&' );
    }

    get queryApi () {
        return `${ host }/api/announcement/get-announcements-by-or-tags?${ this.queryString }`;
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

    static formatData ( { data, languageId, } ) {
        return data.map( ( briefing ) => {
            briefing.tags = briefing.tags.map( tagId => ( {
                color: TagUtils.getTagColorById( tagId ),
                tag:   TagUtils.getTagById( {
                    tagId,
                    languageId,
                } ),
            } ) );
            briefing.updateTime = GetAllAnnouncement.formatUpdateTime( new Date( briefing.updateTime ) );
            return briefing;
        } );
    }

    render ( data ) {
        data.forEach( ( briefing ) => {
            this.DOM.briefings.innerHTML += briefingHTML( {
                briefing,
                UTILS: {
                    url: UrlUtils.serverUrl( new UrlUtils( host, this.languageId ) ),
                },
            } );
        } );
    }

    async exec () {
        try {
            this.DOM.briefings.innerHTML = '';
            classAdd( this.DOM.noResult, 'no-result--hidden' );

            const res = await fetch( this.queryApi );

            if ( !res.ok )
                throw new Error( 'No announcement found' );

            const data = await res.json();

            this.render( this.constructor.formatData( {
                data,
                languageId: this.languageId,
            } ) );

            classAdd( this.DOM.loading, 'loading--hidden' );
        }
        catch ( err ) {
            classAdd( this.DOM.loading, 'loading--hidden' );
            classRemove( this.DOM.noResult, 'no-result--hidden' );
            console.error( err );
        }
    }
}

export class GetHotAnnouncement extends GetAllAnnouncement {
    get queryApi () {
        return `${ host }/api/announcement/get-hot-announcements?${ this.queryString }`;
    }

    static formatData ( { data, } ) {
        return data.map( ( briefing ) => {
            briefing.updateTime = GetAllAnnouncement.formatUpdateTime( new Date( briefing.updateTime ) );
            return briefing;
        } );
    }

    static formatIndex ( index ) {
        if ( typeof index !== 'number' )
            throw new TypeError( 'Invalid number.' );

        return index + 1 >= 10 ? `${ index + 1 }` : `0${ index + 1 }`;
    }

    render ( data ) {
        data.forEach( ( briefing, index ) => {
            this.DOM.briefings.innerHTML += hotAnnouncementBriefingHTML( {
                briefing,
                UTILS: {
                    url:   UrlUtils.serverUrl( new UrlUtils( host, this.languageId ) ),
                    index: GetHotAnnouncement.formatIndex( index ),
                },
                LANG: {
                    getLanguageId: WebLanguageUtils.getLanguageId,
                    id:            this.languageId,
                },
            } );
        } );
    }
}
