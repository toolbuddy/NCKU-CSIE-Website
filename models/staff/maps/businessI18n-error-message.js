/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'businessTWBlank',
    'businessENBlank',
];

const defaultOption = 'businessTWBlank';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        businessTWBlank:           'business ( zh-TW ) can\'t be blank',
        businessENBlank:           'business ( zh-TW ) can\'t be blank',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        businessTWBlank:           '中文負責項目為必填欄位',
        businessENBlank:           '英文負責項目為必填欄位',
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

