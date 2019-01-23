/**
 * NationUtils module.
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
 * function `LanguageUtils.isSupportedLanguageId` should only be called at most once,
 * functions other than called function should also only be called at most once.
 */

import LanguageUtils from 'models/common/utils/language.js';
import nationMap from 'models/faculty/maps/nation.js';

class NationUtils {
    static defaultNation ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return nationMap[ languageId ].default;
    }

    static get defaultNationId () {
        return nationMap[ LanguageUtils.defaultLanguageId ]
        .support
        .indexOf( nationMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static supportedNation ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return Array.from( nationMap[ languageId ].support );
        return [];
    }

    static get supportedNationId () {
        return nationMap[ LanguageUtils.defaultLanguageId ]
        .support
        .map( ( {}, index ) => index );
    }

    static isSupportedNation ( opt ) {
        opt = opt || {};
        const {
            nation = null,
            languageId = null,
        } = opt;
        if ( typeof ( nation ) === 'string' && LanguageUtils.isSupportedLanguageId( languageId ) ) {
            return nationMap[ languageId ]
            .support
            .includes( nation );
        }
        return false;
    }

    static isSupportedNationId ( nationId = null ) {
        if ( typeof ( nationId ) === 'number' ) {
            return NationUtils
            .supportedNationId
            .includes( nationId );
        }
        return false;
    }

    static getNationId ( opt ) {
        opt = opt || {};
        const {
            nation = null,
            languageId = null,
        } = opt;
        if ( NationUtils.isSupportedNation( { nation, languageId, } ) ) {
            return nationMap[ languageId ]
            .support
            .indexOf( nation );
        }
    }

    static getNationById ( opt ) {
        opt = opt || {};
        const {
            nationId = null,
            languageId = null,
        } = opt;
        if ( NationUtils.isSupportedNationId( nationId ) && LanguageUtils.isSupportedLanguageId( languageId ) )
            return nationMap[ languageId ].support[ nationId ];
    }
}

export default NationUtils;
