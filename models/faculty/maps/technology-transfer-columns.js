/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'technology',
    'authorizingParty',
    'authorizedParty',
    'from',
    'to',
];

const defaultOption = 'technology';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        authorizingParty: 'authorizing party',
        authorizedParty: 'authorized party',
        technology: 'technology',
        from: 'from',
        to: 'to',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        authorizingParty: '授權方名稱',
        authorizedParty: '接受方名稱',
        technology: '技術名稱',
        from: '合約期間(自)',
        to: '合約期間(到)',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

