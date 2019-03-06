import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'dept',
    'inst',
    'adj',
    'join',
];

const defaultOption = 'dept';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        dept: 'Department of CSIE',
        inst: 'Institute of CSIE',
        adj:  'Adjunct Professor',
        join: 'Joint Appointment',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        dept: '資訊系',
        inst: '資訊所',
        adj:  '兼任師資',
        join: '合聘師資',
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
