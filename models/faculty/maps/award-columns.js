/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = ['receivedYear', 'award'];

const defaultOption = 'receivedYear';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        receivedYear: 'received year',
        award: 'award',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        receivedYear: '獲獎日期',
        award: '獎項',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

