/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'titleTW',
    'titleEN',
];

const defaultOption = 'titleTW';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        titleTW:           'title',
        titleEN:           'title',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        titleTW:           '中文職稱',
        titleEN:           '英文職稱',
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

