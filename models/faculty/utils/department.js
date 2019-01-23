/**
 * DepartmentUtils module.
 *
 * All `^default*` and `^get*` methods should only return one of the following Departments:
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
import departmentMap from 'models/faculty/maps/department.js';

class DepartmentUtils {
    static defaultDepartment ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return departmentMap[ languageId ].default;
    }

    static get defaultDepartmentId () {
        return departmentMap[ LanguageUtils.defaultLanguageId ]
        .support
        .indexOf( departmentMap[ LanguageUtils.defaultLanguageId ].default );
    }

    static supportedDepartment ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return Array.from( departmentMap[ languageId ].support );
        return [];
    }

    static get supportedDepartmentId () {
        return departmentMap[ LanguageUtils.defaultLanguageId ]
        .support
        .map( ( {}, index ) => index );
    }

    static isSupportedDepartment ( opt ) {
        opt = opt || {};
        const {
            department = null,
            languageId = null,
        } = opt;
        if ( typeof ( department ) === 'string' && LanguageUtils.isSupportedLanguageId( languageId ) ) {
            return departmentMap[ languageId ]
            .support
            .includes( department );
        }
        return false;
    }

    static isSupportedDepartmentId ( departmentId = null ) {
        if ( typeof ( departmentId ) === 'number' ) {
            return DepartmentUtils
            .supportedDepartmentId
            .includes( departmentId );
        }
        return false;
    }

    static getDepartmentId ( opt ) {
        opt = opt || {};
        const {
            department = null,
            languageId = null,
        } = opt;
        if ( DepartmentUtils.isSupportedDepartment( { department, languageId, } ) ) {
            return departmentMap[ languageId ]
            .support
            .indexOf( department );
        }
    }

    static getDepartmentById ( opt ) {
        opt = opt || {};
        const {
            departmentId = null,
            languageId = null,
        } = opt;
        if ( DepartmentUtils.isSupportedDepartmentId( departmentId ) && LanguageUtils.isSupportedLanguageId( languageId ) )
            return departmentMap[ languageId ].support[ departmentId ];
    }
}

export default DepartmentUtils;
