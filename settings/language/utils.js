import languageSettings from './config.js';

class LanguageUtils {
    static isSupportedLanguage ( language ) {
        //if ( typeof ( language ) !== 'string' )
        //    throw new TypeError( 'Queried language should be a string.' );
        return languageSettings.support.includes( language );
    }

    static isSupportedLanguageId ( id ) {
        //if ( typeof ( Number( id ) ) !== 'number' )
        //    throw new TypeError( 'Queried id should be a number.' );
        return LanguageUtils.supportedLanguageId.includes( Number( id ) );
    }

    static get defaultLanguage () {
        return languageSettings.default;
    }

    static get defaultLanguageId () {
        return languageSettings.support.indexOf( languageSettings.default );
    }

    static get supportedLanguage () {
        return Array.from( languageSettings.support );
    }

    static get supportedLanguageId () {
        return languageSettings.support.map( ( {}, index ) => index );
    }

    static getLanguageId ( language ) {
        if ( typeof ( language ) !== 'string' )
            throw new TypeError( 'Queried language should be a string.' );
        if ( !LanguageUtils.isSupportedLanguage( language ) )
            throw new Error( 'Queried language is not supported.' );
        return languageSettings.support.indexOf( language );
    }

    static getLanguageById ( id ) {
        if ( typeof ( id ) !== 'number' )
            throw new TypeError( 'Queried id should be a number.' );
        if ( !Number.isInteger( id ) || id < 0 || id >= languageSettings.support.length )
            throw new RangeError( 'Queried id out of range.' );
        return String( languageSettings.support[ id ] );
    }
}

export default LanguageUtils;
