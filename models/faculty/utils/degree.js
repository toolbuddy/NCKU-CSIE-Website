/**
 * DegreeUtils module.
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

import LanguageUtils from 'models/common/utils/language.js';
import degreeMap from 'models/faculty/maps/degree.js';

class DegreeUtils {
    static defaultDegree ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return degreeMap[ languageId ].default;
    }

    static get defaultDegreeId () {
        return degreeMap[ LanguageUtils.defaultLanguageId ]
        .support
        .indexOf( degreeMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static supportedDegree ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return Array.from( degreeMap[ languageId ].support );
        return [];
    }

    static get supportedDegreeId () {
        return degreeMap[ LanguageUtils.defaultLanguageId ]
        .support
        .map( ( {}, index ) => index );
    }

    static isSupportedDegree ( opt ) {
        opt = opt || {};
        const {
            degree = null,
            languageId = null,
        } = opt;
        if ( typeof ( degree ) === 'string' && LanguageUtils.isSupportedLanguageId( languageId ) ) {
            return degreeMap[ languageId ]
            .support
            .includes( degree );
        }
        return false;
    }

    static isSupportedDegreeId ( degreeId = null ) {
        if ( typeof ( degreeId ) === 'number' ) {
            return DegreeUtils
            .supportedDegreeId
            .includes( degreeId );
        }
        return false;
    }

    static getDegreeId ( opt ) {
        opt = opt || {};
        const {
            degree = null,
            languageId = null,
        } = opt;
        if ( DegreeUtils.isSupportedDegree( { degree, languageId, } ) ) {
            return degreeMap[ languageId ]
            .support
            .indexOf( degree );
        }
    }

    static getDegreeById ( opt ) {
        opt = opt || {};
        const {
            degreeId = null,
            languageId = null,
        } = opt;
        if ( DegreeUtils.isSupportedDegreeId( degreeId ) && LanguageUtils.isSupportedLanguageId( languageId ) )
            return degreeMap[ languageId ].support[ degreeId ];
    }
}

export default DegreeUtils;
