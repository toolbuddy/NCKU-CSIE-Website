const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
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
    'admission',
];

const defaultOption = 'faculty';

const i18n = {
    [LanguageUtils.getLanguageId('zh-TW')]: {
        faculty: '教職人員',
        course: '課程',
        college: '大學部',
        master: '碩士',
        phd: '博士',
        admission: '招生',
        speech: '演講',
        conference: '研討會',
        exhibition: '展覽',
        competition: '競賽',
        scholarship: '獎學金',
        international: '國際交流',
        internship: '實習',
        rule: '法規彙編',
        recruitment: '徵人',
        award: '榮譽',
        all: '全部',
    },
    [LanguageUtils.getLanguageId('en-US')]: {
        faculty: 'faculty',
        course: 'course',
        college: 'college',
        master: 'master',
        phd: 'phd',
        admission: 'admission',
        speech: 'speech',
        conference: 'conference',
        exhibition: 'exhibition',
        competition: 'competition',
        scholarship: 'scholarship',
        international: 'international',
        internship: 'internship',
        rule: 'rule',
        recruitment: 'recruitment',
        award: 'award',
        all: 'all',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

