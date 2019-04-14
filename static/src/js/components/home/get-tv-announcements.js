import { classAdd, classRemove, delay, } from 'static/src/js/utils/style.js';
import { host, staticHost, } from 'settings/server/config.js';
import tvAnnouncementHTML from 'static/src/pug/components/home/tv-announcement.pug';
import tagUtils from 'models/announcement/utils/tag.js';
import UrlUtils from 'static/src/js/utils/url.js';
import ValidateUtils from 'models/common/utils/validate.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

export default class GetTvAnnouncements {
    constructor ( opt ) {
        opt = opt || {};

        if (
            !opt.amount ||
            !ValidateUtils.isPositiveInteger( opt.amount ) ||
            !opt.tvDOM ||
            !ValidateUtils.isDomElement( opt.tvDOM ) ||
            !WebLanguageUtils.isSupportedLanguageId( opt.languageId ) ||
            !Array.isArray( opt.tags ) ||
            opt.tags.length === 0 ||
            !opt.tags.every( tag => tagUtils.isSupportedOption( tag ) ) )
            throw new TypeError( 'invalid arguments' );

        const tvQuerySelector = block => `.${ opt.tvDOM.id } > .${ opt.tvDOM.id }__${ block }.${ block }`;

        this.DOM = {
            noResult:  opt.tvDOM.querySelector( tvQuerySelector( 'no-result' ) ),
            loading:   opt.tvDOM.querySelector( tvQuerySelector( 'loading' ) ),
            series:   opt.tvDOM.querySelector( tvQuerySelector( 'series' ) ),
        };

        if (
            !ValidateUtils.isDomElement( this.DOM.noResult ) ||
            !ValidateUtils.isDomElement( this.DOM.loading ) ||
            !ValidateUtils.isDomElement( this.DOM.series ) )
            throw new Error( 'DOM not found.' );

        this.amount = opt.amount;
        this.languageId = opt.languageId;
        this.tags = opt.tags;
    }

    get queryString () {
        return [
            `amount=${ this.amount }`,
            `languageId=${ this.languageId }`,
            ...this.tags.map( tag => `tags=${ tagUtils.getIdByOption( tag ) }` ),
        ].join( '&' );
    }

    get queryApi () {
        return `${ host }/api/announcement/get-tv-announcements?${ this.queryString }`;
    }

    async subscribeShowEvent () {
        classRemove( this.DOM.show.hidden[ 0 ], 'show--hide' );
        classAdd( this.DOM.show.active, 'show--start-from-right' );
        await delay( 3000 );
        classAdd( this.DOM.show.active, 'show--end-from-left' );
        classAdd( this.DOM.show.hidden[ 0 ], 'show--start-from-right' );
        await delay( 1000 );
        classAdd( this.DOM.show.active, 'show--hide' );
        classRemove( this.DOM.show.active, 'show--start-from-right' );
        classRemove( this.DOM.show.active, 'show--end-from-left' );
        await delay( 1000 );
        this.DOM.show.hidden.push( this.DOM.show.active );
        this.DOM.show.active = this.DOM.show.hidden[ 0 ];
        this.DOM.show.hidden.splice( 0, 1 );
        setTimeout( () => {
            this.subscribeShowEvent();
        }, 3000 );
    }

    render ( data ) {
        const extractTextObj = data;
        extractTextObj.forEach( ( ann ) => {
            ann.content = ( ( new DOMParser() ).parseFromString( ann.content, 'text/html' ) ).documentElement.textContent.trim();
        } );
        extractTextObj.forEach( ( show ) => {
            try {
                this.DOM.series.innerHTML += tvAnnouncementHTML( {
                    data: show,
                    LANG: {
                        getLanguageId: WebLanguageUtils.getLanguageId,
                        id:            this.languageId,
                    },
                    UTILS: {
                        url:       UrlUtils.serverUrl( new UrlUtils( host, this.languageId ) ),
                        staticUrl: UrlUtils.serverUrl( new UrlUtils( staticHost, this.languageId ) ),
                    },
                } );
            }
            catch ( err ) {
                console.error( err );
            }
        } );
        this.DOM.show = {
            hidden: Array.from( this.DOM.series.querySelectorAll( '.series__show.show' ) ),
            active: null,
        };
        if ( this.DOM.show.hidden.length === 0 )
            classRemove( this.DOM.noResult, 'no-result--hidden' );

        this.DOM.show.active = this.DOM.show.hidden[ 0 ];
        this.DOM.show.hidden.splice( 0, 1 );
        classRemove( this.DOM.show.active, 'show--hide' );

        this.subscribeShowEvent();
    }

    async exec () {
        try {
            this.DOM.series.innerHTML = '';
            classAdd( this.DOM.noResult, 'no-result--hidden' );

            const res = await fetch( this.queryApi );

            if ( !res.ok )
                throw new Error( 'No tv show found' );

            const data = await res.json();

            this.render( data );

            classAdd( this.DOM.loading, 'loading--hidden' );
        }
        catch ( err ) {
            classAdd( this.DOM.loading, 'loading--hidden' );
            classRemove( this.DOM.noResult, 'no-result--hidden' );
            console.error( err );
        }
    }
}
