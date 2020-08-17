/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'degree',
    'name',
];

const defaultOption = 'technology';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        degree:  'degree',
        name:    'name',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        degree:  '學位',
        name:    '學生姓名',
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

