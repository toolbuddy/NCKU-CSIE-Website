/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'from',
    'to',
    'title',
];

const defaultOption = 'receivedYear';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        from: 'from',
        to: 'to',
        title: 'title',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        from: '從',
        to: '至',
        title: '職稱',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

