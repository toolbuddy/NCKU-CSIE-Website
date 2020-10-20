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
    'degree',
    'nation',
    'school',
    'major',
];

const defaultOption = 'receivedYear';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        from: 'from',
        to: 'to',
        degree: 'degree',
        nation: 'nation',
        school: 'school',
        major: 'major',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        from: '從',
        to: '至',
        degree: '學位',
        nation: '國家',
        school: '學校',
        major: '主修',

    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

