import LanguageUtils from 'settings/language/utils.js';

const tagMap = {};
Object.defineProperties( tagMap, {
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'value': {
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
        },
    },
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'value':{
            'support':[
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
        }
    },
} );

export default tagMap;
