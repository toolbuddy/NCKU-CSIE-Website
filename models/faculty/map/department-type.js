import LanguageUtils from 'settings/language/utils.js';

const departmentTypeMap = {};
Object.defineProperties( departmentTypeMap, {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'value': {
            'support': [
                'Department of CSIE',
                'Institute of CSIE',
                'Adjunct Professor',
                'Joint Appointment',
            ],
            'default': 'Department of CSIE',
        },
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'value': {
            'support': [
                '資訊系',
                '資訊所',
                '兼任師資',
                '合聘師資',
            ],
            'default': '資訊系',
        },
    },
} );

export default departmentTypeMap;
