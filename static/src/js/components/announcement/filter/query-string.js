import config from 'static/src/js/components/announcement/filter/config.js';
import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils  from 'models/announcement/utils/validate.js';
import { dateFormating, }  from 'static/src/js/components/announcement/filter/format.js';

export default class QueryString {
    static getFilters () {
        const query = new URLSearchParams( window.location.search );
        const tags = [ ...new Set( query.getAll( 'tags' ) ), ];

        /*
        If ( !isValidTags( tags ) )
            tags = defaultTags;
        */

        let from = new Date( query.get( 'from' ) || config.defaultStartTime );
        if ( !ValidateUtils.isValidDate( from ) )
            from = new Date( config.defaultStartTime );
        from = dateFormating( from );

        let to = new Date( query.get( 'to' ) || config.defaultEndTime );
        if ( !ValidateUtils.isValidDate( to ) )
            to = new Date( config.defaultEndTime );
        to = dateFormating( to );

        let page = query.get( 'page' ) || config.defaultPage;
        if ( !ValidateUtils.isValidPage( page ) )
            page = config.defaultPage;

        let amount = query.get( 'amount' ) || 1;

        let languageId = query.get( 'languageId' ) || LanguageUtils.defaultLanguageId;
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
