/**
 * TagUtils module.
 *
 * All `^default*` and `^get*` methods should only return one of the following ResearchGroups:
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
import tagMap from 'models/announcement/maps/tag.js';

class TagUtils {
    static defaultTag ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return tagMap[ languageId ].default;
    }

    static get defaultTagId () {
        return tagMap[ LanguageUtils.defaultLanguageId ]
        .support
        .indexOf( tagMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static supportedTag ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return Array.from( tagMap[ languageId ].support );
        return [];
    }

    static get supportedTagId () {
        return tagMap[ LanguageUtils.defaultLanguageId ]
        .support
        .map( ( {}, index ) => index );
    }

    static isSupportedTag ( opt ) {
        opt = opt || {};
        const {
            tag = null,
            languageId = null,
        } = opt;
        if ( typeof ( tag ) === 'string' && LanguageUtils.isSupportedLanguageId( languageId ) ) {
            return tagMap[ languageId ]
            .support
            .includes( tag );
        }
        return false;
    }

    static isSupportedTagId ( tagId = null ) {
        if ( typeof ( tagId ) === 'number' ) {
            return TagUtils
            .supportedTagId
            .includes( tagId );
        }
        return false;
    }

    static getTagId ( opt ) {
        opt = opt || {};
        const {
            tag = null,
            languageId = null,
        } = opt;
        if ( TagUtils.isSupportedTag( { tag, languageId, } ) ) {
            return tagMap[ languageId ]
            .support
            .indexOf( tag );
        }
    }

    static getTagById ( opt ) {
        opt = opt || {};
        const {
            tagId = null,
            languageId = null,
        } = opt;
        if ( TagUtils.isSupportedTagId( tagId ) && LanguageUtils.isSupportedLanguageId( languageId ) )
            return tagMap[ languageId ].support[ tagId ];
    }
}

export default TagUtils;