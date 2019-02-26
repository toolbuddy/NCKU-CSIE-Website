/**
 * ResearchGroupUtils module.
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

import LanguageUtils from '../../common/utils/language.js';
import researchGroupMap from '../maps/research-group.js';

class ResearchGroupUtils {
    static defaultResearchGroup ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return researchGroupMap[ languageId ].default;
    }

    static get defaultResearchGroupId () {
        return researchGroupMap[ LanguageUtils.defaultLanguageId ]
        .support
        .indexOf( researchGroupMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static supportedResearchGroup ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return Array.from( researchGroupMap[ languageId ].support );
        return [];
    }

    static get supportedResearchGroupId () {
        return researchGroupMap[ LanguageUtils.defaultLanguageId ]
        .support
        .map( ( {}, index ) => index );
    }

    static isSupportedResearchGroup ( opt ) {
        opt = opt || {};
        const {
            researchGroup = null,
            languageId = null,
        } = opt;
        if ( typeof ( researchGroup ) === 'string' && LanguageUtils.isSupportedLanguageId( languageId ) ) {
            return researchGroupMap[ languageId ]
            .support
            .includes( researchGroup );
        }
        return false;
    }

    static isSupportedResearchGroupId ( researchGroupId = null ) {
        if ( typeof ( researchGroupId ) === 'number' ) {
            return ResearchGroupUtils
            .supportedResearchGroupId
            .includes( researchGroupId );
        }
        return false;
    }

    static getResearchGroupId ( opt ) {
        opt = opt || {};
        const {
            researchGroup = null,
            languageId = null,
        } = opt;
        if ( ResearchGroupUtils.isSupportedResearchGroup( { researchGroup, languageId, } ) ) {
            return researchGroupMap[ languageId ]
            .support
            .indexOf( researchGroup );
        }
    }

    static getResearchGroupById ( opt ) {
        opt = opt || {};
        const {
            researchGroupId = null,
            languageId = null,
        } = opt;
        if ( ResearchGroupUtils.isSupportedResearchGroupId( researchGroupId ) && LanguageUtils.isSupportedLanguageId( languageId ) )
            return researchGroupMap[ languageId ].support[ researchGroupId ];
    }
}

export default ResearchGroupUtils;
