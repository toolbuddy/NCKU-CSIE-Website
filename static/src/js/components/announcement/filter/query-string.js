import config from 'jsComponent/announcement/filter/config.js';
import { isValidDate, isValidPage, isValidTags, }  from 'jsUtil/validate.js';
import { dateFormating, }  from 'jsUtil/format.js';

export default class QueryString {
    static getFilters ( defaultTags ) {
        let tags = [ ...new Set( new URLSearchParams( window.location.search ).getAll( 'tags' ) ), ];
        if ( !isValidTags( tags ) )
            tags = defaultTags;

        let startTime = new Date( new URLSearchParams( window.location.search ).get( 'startTime' ) || config.defaultStartTime );
        if ( !isValidDate( startTime ) )
            startTime = new Date( config.defaultStartTime );
        startTime = dateFormating( startTime );

        let endTime = new Date( new URLSearchParams( window.location.search ).get( 'endTime' ) || config.defaultEndTime );
        if ( !isValidDate( endTime ) )
            endTime = new Date( config.defaultEndTime );
        endTime = dateFormating( endTime );

        let page = new URLSearchParams( window.location.search ).get( 'page' ) || config.defaultPage;
        if ( !isValidPage( page ) )
            page = config.defaultPage;

        return { tags, startTime, endTime, page, };
    }

    static generate ( obj = null ) {
        const query = new URLSearchParams();
        const keys = Reflect.ownKeys( obj );
        keys.forEach( ( key ) => {
            if ( obj[ key ] instanceof Array )
                obj[ key ].forEach( value => query.append( key, value ) );
            else
                query.append( key, obj[ key ] );
        } );
        return query.toString();
    }
}
