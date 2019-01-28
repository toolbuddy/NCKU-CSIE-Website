import config from 'static/src/js/components/announcement/filter/config.js';
import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils  from 'models/announcement/utils/validate.js';
import TagUtils from 'models/announcement/utils/tag.js';
import { dateFormating, }  from 'static/src/js/components/announcement/filter/format.js';

export default class QueryString {
    static getFilters ( defaultTags ) {
        const query = new URLSearchParams( window.location.search );

        let tags = [ ...new Set( query.getAll( 'tags' ) ), ];
        tags = tags.map( Number );
        if ( !tags.every( TagUtils.isSupportedTagId ) )
            tags = defaultTags;

        let from = new Date( query.get( 'from' ) || config.defaultStartTime );
        if ( !ValidateUtils.isValidDate( from ) )
            from = new Date( config.defaultStartTime );
        from = dateFormating( from );

        let to = new Date( query.get( 'to' ) || config.defaultEndTime );
        if ( !ValidateUtils.isValidDate( to ) )
            to = new Date( config.defaultEndTime );
        to = dateFormating( to );

        let page = Number(query.get( 'page' )) || config.defaultPage;
        if ( !ValidateUtils.isValidNumber( page ) )
            page = config.defaultPage;

        let amount = Number(query.get( 'amount' )) || config.defaultAmount;
        if ( !ValidateUtils.isValidNumber( amount ) )
            amount = config.defaultAmount;

        let languageId = Number(query.get( 'languageId' )) || LanguageUtils.defaultLanguageId;
        if ( !LanguageUtils.isSupportedLanguageId( languageId ) )
            languageId = LanguageUtils.defaultLanguageId;

        return { tags, from, to, page, languageId, amount, };
    }

    static generate ( obj = null ) {
        const query = new URLSearchParams();
        Reflect.ownKeys( obj ).forEach( ( key ) => {
            if ( obj[ key ] instanceof Array )
                obj[ key ].forEach( value => query.append( key, value ) );
            else
                query.append( key, obj[ key ] );
        } );
        return query.toString();
    }
}
