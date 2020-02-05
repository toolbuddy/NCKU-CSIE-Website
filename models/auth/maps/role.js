import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'admin',
    'faculty',
    'staff',
];

const defaultOption = 'admin';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        admin:   'admin',
        faculty: 'faculty',
        staff:   'staff',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        admin:   '管理員',
        faculty: '教職員',
        staff:   '系辦成員',
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

