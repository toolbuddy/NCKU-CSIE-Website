/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'receieveYearEmpty',
    'receieveYearRangeError',
    'awardTWEmpty',
    'awardENEmpty',
];

const defaultOption = 'receieveYearEmpty';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        receieveYearEmpty:      'receieve year shouldn\'t be empty',
        receieveYearRangeError: 'receieve year out of range',
        awardTWEmpty:           'award ( zh-TW ) shouldn\'t be empty',
        awardENEmpty:           'award ( zh-TW ) shouldn\'t be empty',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        receieveYearEmpty:      '獲獎日期為必填欄位',
        receieveYearRangeError: '獲獎日期須大於 1970 年',
        awardTWEmpty:           '中文獎項為必填欄位',
        awardENEmpty:           '英文獎項為必填欄位',
    },
};

deepFreeze( i18n );
deepFreeze( map );

export default {
    defaultOption,
    i18n,
    map,
};

export {
    defaultOption,
    i18n,
    map,
};

