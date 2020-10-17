const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

/**
 * `map` should following ISO 3166-1.
 */

const map = [
    'tw',
    'us',
    'cn',
    'gb',
    'jp',
    'de',
    'au',
];

const defaultOption = 'tw';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        tw: 'Taiwan',
        us: 'USA',
        cn: 'China',
        gb: 'UK',
        jp: 'Japan',
        de: 'Germany',
        au: 'Australia',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        tw: '臺灣',
        us: '美國',
        cn: '中國',
        gb: '英國',
        jp: '日本',
        de: '德國',
        au: '澳洲',
    },
};

deepFreeze( i18n );
deepFreeze( map );

module.exports = {
    defaultOption,
    i18n,
    map,
};

