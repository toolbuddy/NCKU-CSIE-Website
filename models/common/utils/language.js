/**
 * LanguageUtils module.
 *
 * All `^default*` and `^get*` methods should only return one of the following types:
 *     - `string`
 *     - `number`
 *     - `undefined`
 * All `^is*` methods should only return `boolean`.
 * All `^supported*` methods should return an `array` having following properties:
 *     - `configurable: true`
 *     - `writable: true`
 *     - `enumerable: true`
 *
 * In each function call stack,
 * functions other than called function should only be called at most once.
 */

const languageMap = require('../maps/language.js');

class LanguageUtils {
    static get defaultLanguage () {
        return languageMap.default;
    }

    static get defaultLanguageId () {
        return languageMap.support.indexOf( languageMap.default );
    }

    static get supportedLanguage () {
        return Array.from( languageMap.support );
    }

    static get supportedLanguageId () {
        return languageMap.support.map( ( {}, index ) => index );
    }

    static isSupportedLanguage ( language = null ) {
        if ( typeof ( language ) === 'string' )
            return languageMap.support.includes( language );
        return false;
    }

    static isSupportedLanguageId ( languageId = null ) {
        if ( typeof ( languageId ) === 'number' )
            return LanguageUtils.supportedLanguageId.includes( languageId );
        return false;
    }

    static getLanguageId ( language = null ) {
        if ( LanguageUtils.isSupportedLanguage( language ) )
            return languageMap.support.indexOf( language );
    }

    static getLanguageById ( languageId = null ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return languageMap.support[ languageId ];
    }
}

module.exports = LanguageUtils;
