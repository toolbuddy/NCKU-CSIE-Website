/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'from',
    'to',
    'degree',
    'nation',
    'school',
    'major',
];

const defaultOption = 'receivedYear';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        from:   'from',
        to:     'to',
        degree: 'degree',
        nation: 'nation',
        school: 'school',
        major:  'major',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        from:   '從',
        to:     '至',
        degree: '學位',
        nation: '國家',
        school: '學校',
        major:  '主修',

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

