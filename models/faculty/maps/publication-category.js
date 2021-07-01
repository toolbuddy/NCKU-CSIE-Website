const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'journal',
    'conference',
    'workshop',
    'book',
];

const defaultOption = 'journal';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        journal: 'journal',
        conference: 'conference',
        workshop: 'workshop',
        book: 'book',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        journal: '期刊',
        conference: '會議',
        workshop: '工作坊',
        book: '專書',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

