import deepFreeze from 'deep-freeze';
import LanguageUtils from 'models/common/utils/language.js';

const degreeMap = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'support': [
            'bachelor',
            'master',
            'phd',
        ],
        'default': 'bachelor',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'support': [
            '學士',
            '碩士',
            '博士',
        ],
        'default': '學士',
    },
};

deepFreeze( degreeMap );

export default degreeMap;
