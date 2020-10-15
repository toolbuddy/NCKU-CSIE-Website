/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = ['admin', 'faculty', 'staff'];

const defaultOption = 'admin';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        admin: 'admin',
        faculty: 'faculty',
        staff: 'staff',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        admin: '管理員',
        faculty: '教職員',
        staff: '系辦成員',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};
