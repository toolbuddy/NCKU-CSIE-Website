import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'bachelor',
    'master',
    'phd',
];

const defaultOption = 'bachelor';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        bachelor: 'bachelor',
        master:   'master',
        phd:      'phd',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        bachelor: '學士',
        master:   '碩士',
        phd:      '博士',
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
