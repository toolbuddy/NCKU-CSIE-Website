/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'typeMismatch',
    'valueMissing',
    'rangeUnderflow',
];

const defaultOption = 'typeMismatch';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        typeMismatch:   ' type mismatch',
        valueMissing:   ' can\'t be blank',
        rangeUnderflow: ' range underflow',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        typeMismatch:   '格式錯誤',
        valueMissing:   '為必填欄位',
        rangeUnderflow: '範圍錯誤',
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

