/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'businessTW',
    'businessEN',
];

const defaultOption = 'businessTW';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        businessTW:           'business ( zh-TW ) ',
        businessEN:           'business ( en-US ) ',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        businessTW:           '中文負責項目',
        businessEN:           '英文負責項目',
    },
};

deepFreeze( i18n );
deepFreeze( map );

module.exports = {
    defaultOption,
    i18n,
    map,
};

