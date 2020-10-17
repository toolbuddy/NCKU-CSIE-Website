/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'specialty',
];

const defaultOption = 'specialty';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        specialty:   'specialty',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        specialty:   '專長領域',
    },
};

deepFreeze( i18n );
deepFreeze( map );

module.exports = {
    defaultOption,
    i18n,
    map,
};


