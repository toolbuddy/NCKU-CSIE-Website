/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'degree',
    'name',
];

const defaultOption = 'technology';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        degree: 'degree',
        name: 'name',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        degree: '學位',
        name: '學生姓名',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

