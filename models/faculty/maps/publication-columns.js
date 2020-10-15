/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = ['authors', 'title', 'issueYear', 'issueMonth'];

const defaultOption = 'receivedYear';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        authors: 'authors',
        title: 'title',
        issueYear: 'issue year',
        issueMonth: 'issue month',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        authors: '作者',
        title: '著作名稱',
        issueYear: '發行年份',
        issueMonth: '發行月份',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};
