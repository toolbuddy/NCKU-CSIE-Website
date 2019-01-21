import LanguageUtils from 'settings/language/utils.js';

const degreeMap = {};
Object.defineProperties( degreeMap, {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'value': {
            'support': [
                'bachelor',
                'master',
                'phd',
            ],
            'default': 'bachelor',
        },
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'value': {
            'support': [
                '學士',
                '碩士',
                '博士',
            ],
            'default': '學士',
        },
    },
} );

export default degreeMap;
