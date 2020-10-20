/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = ['patent'];

const defaultOption = 'patent';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        patent: 'patent',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        patent: '專利名稱',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

