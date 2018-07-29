import config from 'jsComponent/announcement/config.js';
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
}
