import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'dept',
    'inst',
    'adj',
    'join',
    'imi',
    'imis',
    'ai',
    'visi',
];

const defaultOption = 'dept';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        dept: 'Department of CSIE',
        inst: 'Institute of CSIE',
        adj:  'Adjunct Professor',
        join: 'Joint Appointment',
        imi:  'Institute of Medical Informatics',
        imis: 'Institute of Manufacturing Information and Systems',
        ai:   'Master\'s Program of Artificial Intelligence Technology',
        visi: 'Visiting Professor',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        dept: '資訊系',
        inst: '資訊所',
        adj:  '兼任師資',
        join: '合聘師資',
        imi:  '醫資所',
        imis: '製造所',
        ai:   '人工智慧學程',
        visi: '客座教授',
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
