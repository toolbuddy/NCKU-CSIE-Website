/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'titleTW',
    'titleEN',
];

const defaultOption = 'titleTW';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        titleTW: 'title',
        titleEN: 'title',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        titleTW: '中文職稱',
        titleEN: '英文職稱',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

