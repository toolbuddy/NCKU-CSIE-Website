import LanguageUtils from 'settings/language/utils.js';

const nationMap = {};
Object.defineProperties( nationMap, {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'value': {
            'support': [
                'Taiwan',
                'USA',
                'China',
                'UK',
                'Japan',
                'Germany',
                'Australia',
            ],
            'default': 'Taiwan',
        },
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'value': {
            'support': [
                '臺灣',
                '美國',
                '中國',
                '英國',
                '日本',
                '德國',
                '澳洲',
            ],
            'default': '臺灣',
        },
    },
} );

export default nationMap;
