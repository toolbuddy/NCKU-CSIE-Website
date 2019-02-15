import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

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
