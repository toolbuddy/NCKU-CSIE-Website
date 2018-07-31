import config from 'jsComponent/announcement/filter/config.js';
import { isValidDate, isValidPage, isValidTags, }  from 'jsUtil/validate.js';

export default class QueryString {
    static getTags ( defaultTags ) {
        const tags = [ ...new Set( new URLSearchParams( window.location.search ).getAll( 'tags' ) ), ];
        if ( !isValidTags( tags ) )
            return defaultTags;
        return tags;
    }

    static getStartTime () {
        const startTime = new Date( new URLSearchParams( window.location.search ).get( 'startTime' ) || config.defaultStartTime );
        if ( !isValidDate( startTime ) )
            return new Date( config.defaultStartTime );
        return startTime;
    }

    static getEndTime () {
        const endTime = new Date( new URLSearchParams( window.location.search ).get( 'endTime' ) || config.defaultEndTime );
        if ( !isValidDate( endTime ) )
            return new Date( config.defaultEndTime );
        return endTime;
    }

    static getPage () {
        const page = new URLSearchParams( window.location.search ).get( 'page' ) || config.defaultPage;
        if ( !isValidPage( page ) )
            return config.defaultPage;
        return page;
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
