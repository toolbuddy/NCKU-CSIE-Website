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

import I18nUtils from '../../common/utils/i18n.js';
import { defaultOption, i18n, map, } from '../maps/department.js';

export const departmentUtils = new I18nUtils( {
    defaultOption,
    i18n,
    map,
} );

export default departmentUtils;