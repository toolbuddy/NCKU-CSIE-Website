import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const departmentMap = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'support': [
            'Department of CSIE',
            'Institute of CSIE',
            'Adjunct Professor',
            'Joint Appointment',
        ],
        'default': 'Department of CSIE',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'support': [
            '資訊系',
            '資訊所',
            '兼任師資',
            '合聘師資',
        ],
        'default': '資訊系',
    },
};

deepFreeze( departmentMap );

export default departmentMap;
