/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'name',
    'support',
    'category',
    'from',
    'to',
];

const defaultOption = 'receivedYear';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        name: 'name',
        support: 'support',
        category: 'category',
        from: 'from',
        to: 'to',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        name: '專案名稱',
        support: '補助單位',
        category: '投稿對象',
        from: '合約期間(從)',
        to: '合約期間(至)',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

