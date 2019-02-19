/**
 * ProjectUtils module.
 *
 * All `^default*` and `^get*` methods should only return one of the following Projects:
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
import projectCategoryMap from '../maps/project-category.js';

class ProjectUtils {
    static defaultProjectCategory ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return projectCategoryMap[ languageId ].default;
    }

    static get defaultProjectCategoryId () {
        return projectCategoryMap[ LanguageUtils.defaultLanguageId ]
        .support
        .indexOf( projectCategoryMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static supportedProjectCategory ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return Array.from( projectCategoryMap[ languageId ].support );
        return [];
    }

    static get supportedProjectCategoryId () {
        return projectCategoryMap[ LanguageUtils.defaultLanguageId ]
        .support
        .map( ( {}, index ) => index );
    }

    static isSupportedProjectCategory ( opt ) {
        opt = opt || {};
        const {
            projectCategory = null,
            languageId = null,
        } = opt;
        if ( typeof ( projectCategory ) === 'string' && LanguageUtils.isSupportedLanguageId( languageId ) ) {
            return projectCategoryMap[ languageId ]
            .support
            .includes( projectCategory );
        }
        return false;
    }

    static isSupportedProjectCategoryId ( projectCategoryId = null ) {
        if ( typeof ( projectCategoryId ) === 'number' ) {
            return ProjectUtils
            .supportedProjectCategoryId
            .includes( projectCategoryId );
        }
        return false;
    }

    static getProjectCategoryId ( opt ) {
        opt = opt || {};
        const {
            projectCategory = null,
            languageId = null,
        } = opt;
        if ( ProjectUtils.isSupportedProjectCategory( { projectCategory, languageId, } ) ) {
            return projectCategoryMap[ languageId ]
            .support
            .indexOf( projectCategory );
        }
    }

    static getProjectCategoryById ( opt ) {
        opt = opt || {};
        const {
            projectCategoryId = null,
            languageId = null,
        } = opt;
        if ( ProjectUtils.isSupportedProjectCategoryId( projectCategoryId ) && LanguageUtils.isSupportedLanguageId( languageId ) )
            return projectCategoryMap[ languageId ].support[ projectCategoryId ];
    }
}

export default ProjectUtils;
