/**
 * PublicationUtils module.
 *
 * All `^default*` and `^get*` methods should only return one of the following Publications:
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
import publicationCategoryMap from 'models/faculty/maps/publication-category.js';

class PublicationUtils {
    static defaultPublicationCategory ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return publicationCategoryMap[ languageId ].default;
    }

    static get defaultPublicationCategoryId () {
        return publicationCategoryMap[ LanguageUtils.defaultLanguageId ]
        .support
        .indexOf( publicationCategoryMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static supportedPublicationCategory ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return Array.from( publicationCategoryMap[ languageId ].support );
        return [];
    }

    static get supportedPublicationCategoryId () {
        return publicationCategoryMap[ LanguageUtils.defaultLanguageId ]
        .support
        .map( ( {}, index ) => index );
    }

    static isSupportedPublicationCategory ( opt ) {
        opt = opt || {};
        const {
            publicationCategory = null,
            languageId = null,
        } = opt;
        if ( typeof ( publicationCategory ) === 'string' && LanguageUtils.isSupportedLanguageId( languageId ) ) {
            return publicationCategoryMap[ languageId ]
            .support
            .includes( publicationCategory );
        }
        return false;
    }

    static isSupportedPublicationCategoryId ( publicationCategoryId = null ) {
        if ( typeof ( publicationCategoryId ) === 'number' ) {
            return PublicationUtils
            .supportedPublicationCategoryId
            .includes( publicationCategoryId );
        }
        return false;
    }

    static getPublicationCategoryId ( opt ) {
        opt = opt || {};
        const {
            publicationCategory = null,
            languageId = null,
        } = opt;
        if ( PublicationUtils.isSupportedPublicationCategory( { publicationCategory, languageId, } ) ) {
            return publicationCategoryMap[ languageId ]
            .support
            .indexOf( publicationCategory );
        }
    }

    static getPublicationCategoryById ( opt ) {
        opt = opt || {};
        const {
            publicationCategoryId = null,
            languageId = null,
        } = opt;
        if ( PublicationUtils.isSupportedPublicationCategoryId( publicationCategoryId ) && LanguageUtils.isSupportedLanguageId( languageId ) )
            return publicationCategoryMap[ languageId ].support[ publicationCategoryId ];
    }
}

export default PublicationUtils;
