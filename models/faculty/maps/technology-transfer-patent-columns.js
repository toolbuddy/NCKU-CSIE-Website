/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'patent',
];

const defaultOption = 'patent';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        patent: 'patent',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        patent: '專利名稱',
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

