/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'specialty',
];

const defaultOption = 'specialty';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        specialty:   'specialty',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        specialty:   '專長領域',
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

