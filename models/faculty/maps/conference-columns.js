/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'hostYear',
    'conference',
    'title',
];

const defaultOption = 'receivedYear';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        conference: 'conference',
        title: 'title',
        hostYear: 'host year',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        conference: '會議名稱',
        title: '職稱',
        hostYear: '舉行年份',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

