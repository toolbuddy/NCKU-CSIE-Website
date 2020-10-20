const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'general',
    'nsc',
];

const defaultOption = 'general';

const i18n = {
    [LanguageUtils.getLanguageId('en-US')]: {
        general: 'General Projects',
        nsc: 'National Science Council Projects',
    },
    [LanguageUtils.getLanguageId('zh-TW')]: {
        general: '一般建教案',
        nsc: '國科會計劃',
    },
};

deepFreeze(i18n);
deepFreeze(map);

module.exports = {
    defaultOption,
    i18n,
    map,
};

