import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const tagMap = {
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'support': [
            '教職人員',
            '課程',
            '大學部',
            '碩士',
            '博士',
            '演講',
            '研討會',
            '展覽',
            '競賽',
            '獎學金',
            '國際交流',
            '實習',
            '法規彙編',
            '徵人',
            '榮譽',
        ],
        'default': '教職人員',
        'all':     '全部',
    },
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'support': [
            'faculty',
            'course',
            'college',
            'master',
            'phd',
            'speech',
            'conference',
            'exhibition',
            'competition',
            'scholarship',
            'international',
            'internship',
            'rule',
            'recruitment',
            'award',
        ],
        'default': 'faculty',
        'all':     'all',
    },
};

deepFreeze( tagMap );

export default tagMap;
