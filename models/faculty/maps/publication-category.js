const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'journal',
    'conference',
    'workshop',
];

const defaultOption = 'journal';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        journal: 'journal',
        conference: 'conference',
        workshop: 'workshop',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        journal: '期刊',
        conference: '會議',
        workshop: '工作坊',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

