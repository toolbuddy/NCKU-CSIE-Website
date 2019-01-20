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
        },
    },
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        '1':  'faculty',
        '2':  'course',
        '3':  'college',
        '4':  'master',
        '5':  'phd',
        '6':  'speech',
        '7':  'conference',
        '8':  'exhibition',
        '9':  'competition',
        '10': 'scholarship',
        '11': 'international',
        '12': 'internship',
        '13': 'rule',
        '14': 'recruitment',
        '15': 'award',
    },
} );

export default tagMap;
