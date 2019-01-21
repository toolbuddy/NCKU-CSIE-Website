class UrlUtils {
    constructor ( host, languagId ) {
        this.host = host;
        this.languagId = languagId;
    }

    serverUrl ( { href = '', query = null, } = {} ) {
        if ( !query )
            return `${ this.host }/${ href }/` + `?languageId=${ this.languagId }`;
        const queryStr = Reflect.ownKeys( query )
        .map( key => `${ key }=${ query[ key ] }` )
        .join( '&' );
        if ( query.languageId )
            return `${ this.host }/${ href }?${ queryStr }`;
        return `${ this.host }/${ href }?${ queryStr }&languageId=${ this.languagId }`;
    }
}

export default UrlUtils;
