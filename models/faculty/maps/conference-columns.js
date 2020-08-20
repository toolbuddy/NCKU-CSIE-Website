/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'hostYear',
    'conference',
    'title',
];

const defaultOption = 'receivedYear';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'conference': 'conference',
        'title':      'title',
        'hostYear':   'host year',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'conference':  '會議名稱',
        'title':       '職稱',
        'hostYear':    '舉行年份',
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

