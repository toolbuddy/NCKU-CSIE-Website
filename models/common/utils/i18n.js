/**
 * I18nUtils module.
 *
 * All `^default*` and `^get*` methods should only return one of the following types:
 *     - `string`
 *     - `number`
 *     - `undefined`
 * All `^is*` methods should only return `boolean`.
 * All `^supported*` methods should return an `array` having following properties:
 *     - `configurable: true`
 *     - `writable: true`
 *     - `enumerable: true`.
 *
 * In each function call stack,
 * function `LanguageUtils.isSupportedLanguageId` should only be called at most once,
 * functions other than called function should also only be called at most once.
 */

import LanguageUtils from './language.js';

export default class I18nUtils {
    constructor ( opt ) {
        const {
            defaultOption = null,
            i18n = null,
            map = null,
        } = opt || {};

        if ( defaultOption === null || i18n === null || map === null )
            throw new Error( 'Invalid arguments' );

        this.defaultOption = defaultOption;
        this.i18n = i18n;
        this.map = map;
    }

    defaultValue ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return this.i18n[ languageId ][ this.defaultOption ];
    }

    get defaultOption () {
        return this.defaultOption;
    }

    get defaultId () {
        return this.map.indexOf( this.defaultOption );
    }

    supportedValues ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return Array.from( this.map.map( option => this.i18n[ languageId ][ option ] ) );
        return [];
    }

    get supportedOptions () {
        return Array.from( this.map );
    }

    get supportedId () {
        return this.map.map( ( {}, index ) => index );
    }

    isSupportedValue ( opt ) {
        opt = opt || {};
        const {
            value = null,
            languageId = null,
        } = opt;

        if ( typeof ( value ) === 'string' )
            return this.supportedValues( languageId ).includes( value );
        return false;
    }

    isSupportedOption ( option = null ) {
        if ( typeof ( option ) === 'string' )
            return this.supportedOptions.includes( option );
        return false;
    }

    isSupportedId ( id = null ) {
        if ( typeof ( id ) === 'number' )
            return this.supportedId.includes( id );
        return false;
    }

    getValueByOption ( opt ) {
        opt = opt || {};
        const {
            option = null,
            languageId = null,
        } = opt;

        if ( this.isSupportedOption( option ) && LanguageUtils.isSupportedLanguageId( languageId ) )
            return this.i18n[ languageId ][ option ];
    }

    getValueById ( opt ) {
        opt = opt || {};
        const {
            id = null,
            languageId = null,
        } = opt;

        if ( this.isSupportedId( id ) && LanguageUtils.isSupportedLanguageId( languageId ) )
            return this.i18n[ languageId ][ this.map[ id ] ];
    }
}
