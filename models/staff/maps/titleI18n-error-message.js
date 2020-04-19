/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'titleTWBlank',
    'titleENBlank',
];

const defaultOption = 'titleTWBlank';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        titleTWBlank:           'title ( zh-TW ) can\'t be blank',
        titleENBlank:           'title ( zh-TW ) can\'t be blank',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        titleTWBlank:           '中文職稱為必填欄位',
        titleENBlank:           '英文職稱為必填欄位',
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

