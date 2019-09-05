import ValidateUtils from 'models/common/utils/validate.js';
import tagUtils from 'models/announcement/utils/tag.js';
import LanguageUtils from 'models/common/utils/language.js';
import { host, } from 'settings/server/config.js';
import { classAdd, classRemove, delay, } from 'static/src/js/utils/style.js';

export default class AnnouncementEvent {
    constructor ( opt ) {
        opt = opt || {};

        if ( !ValidateUtils.isValidId( opt.id ) ||
            !ValidateUtils.isValidId( opt.languageId ) ||
            !ValidateUtils.isDomElement( opt.editBlockDOM ) )
            throw new TypeError( 'invalid arguments' );

        this.config = {
            id:         opt.id,
            languageId: opt.languageId,
        };

        this.state = {
            languageId: opt.languageId,
        };

        this.DOM = {
            tags: Array.from( opt.editBlockDOM.querySelectorAll( '.edit-block__tags.tags > .tags__tag' ) ).map( ( node ) => {
                const tagId = node.getAttribute( 'data-tag-id' );
                if ( tagId === null )
                    throw new Error( 'DOM attribute `data-tag-id` not found.' );
                if ( !( Number( tagId ) === tagUtils.tagAllId ) && !tagUtils.isSupportedId( Number( tagId ) ) )
                    throw new Error( 'Invalid DOM attribute `data-tag-id`.' );
                return {
                    node,
                    id:   Number( tagId ),
                };
            } ),
        };
    }

    queryApi ( languageId ) {
        return `${ host }/api/announcement/${ this.config.id }?languageId=${ languageId }`;
    }

    async fetchData ( languageId ) {
        try {
            const res = await fetch( this.queryApi( languageId ) );

            if ( !res.ok )
                throw new Error( 'No Announcement found' );

            return res.json();
        }
        catch ( err ) {
            throw err;
        }
    }

    subscribeTagEvent () {
        this.DOM.tags.forEach( ( tag ) => {
            tag.node.addEventListener( 'click', () => {
                const index = this.state.tags.indexOf( tag.id );
                if ( index < 0 ) {
                    this.state.tags.push( tag.id );
                    classAdd( tag.node, 'tags__tag--active' );
                }
                else {
                    this.state.tags.splice( index, 1 );
                    classRemove( tag.node, 'tags__tag--active' );
                }
            } );
        } );
    }

    exec () {
        Promise.all( LanguageUtils.supportedLanguageId.map( id => this.fetchData( id ) ) )
        .then( async ( data ) => {
            console.log( data );
            if ( data !== null )
                this.state.tags = data[ this.config.languageId ].tags;
        } )
        .then( () => {
            this.subscribeTagEvent();
        } );
    }
}
