import deepFreeze from 'deep-freeze';
import LanguageUtils from 'models/common/utils/language.js';

const nationMap = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
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
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
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
};

deepFreeze( nationMap );

export default nationMap;
