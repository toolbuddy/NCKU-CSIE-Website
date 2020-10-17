/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'password-error',
    'check-password-different',
    'input-empty',
];

const defaultOption = 'password_error';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        'password-error': 'password error',
        'check-password-different': 'check new password different',
        'input-empty': 'input block empty',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        'password-error': '密碼錯誤',
        'check-password-different': '與新密碼不符',
        'input-empty': '此欄位不為空',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

