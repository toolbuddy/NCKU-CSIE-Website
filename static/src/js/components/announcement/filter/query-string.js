import config from 'jsComponent/announcement/filter/config.js';
import { isValidDate, isValidPage, isValidTags, }  from 'jsUtil/validate.js';
import { dateFormating, }  from 'jsUtil/format.js';

export default class QueryString {
    static getFilters ( defaultTags ) {
        const query = new URLSearchParams( window.location.search );
        let tags = [ ...new Set( query.getAll( 'tags' ) ), ];
        if ( !isValidTags( tags ) )
            tags = defaultTags;

        let startTime = new Date( query.get( 'startTime' ) || config.defaultStartTime );
        if ( !isValidDate( startTime ) )
            startTime = new Date( config.defaultStartTime );
        startTime = dateFormating( startTime );

        let endTime = new Date( query.get( 'endTime' ) || config.defaultEndTime );
        if ( !isValidDate( endTime ) )
            endTime = new Date( config.defaultEndTime );
        endTime = dateFormating( endTime );

        let page = query.get( 'page' ) || config.defaultPage;
        if ( !isValidPage( page ) )
            page = config.defaultPage;

        return { tags, startTime, endTime, page, };
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
