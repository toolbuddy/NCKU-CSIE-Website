/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'authors',
    'title',
    'issueYear',
    'issueMonth',
];

const defaultOption = 'receivedYear';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        authors:       'authors',
        title:         'title',
        issueYear:     'issue year',
        issueMonth:    'issue month',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        authors:       '作者',
        title:         '著作名稱',
        issueYear:     '發行年份',
        issueMonth:    '發行月份',
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

