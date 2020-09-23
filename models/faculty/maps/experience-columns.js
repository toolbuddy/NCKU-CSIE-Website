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
    'organization',
    'department',
    'title',
];

const defaultOption = 'receivedYear';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        from:         'from',
        to:           'to',
        organization: 'organization',
        department:   'department',
        title:        'title',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        from:         '從',
        to:           '至',
        organization: '任職單位',
        department:   '任職部門',
        title:        '職位',

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

