/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'applicationDate',
    'expireDate',
    'issueDate',
    'certificationNumber',
    'nation',
    'inventor',
    'patent',
    'patentOwner',
];

const defaultOption = 'certificationNumber';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'applicationDate':     'application date',
        'certificationNumber': 'certification number',
        'expireDate':          'expire date',
        'issueDate':           'issue date',
        'nation':              'nation',
        'inventor':            'inventor',
        'patent':              'patent',
        'patentOwner':         'patent owner',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'applicationDate':     '申請日期',
        'certificationNumber': '證書號',
        'expireDate':          '到期日期',
        'issueDate':           '核准日期',
        'nation':              '專利國籍',
        'inventor':            '發明人',
        'patent':              '專利名稱',
        'patentOwner':         '專利權人',
    },
};

deepFreeze( i18n );
deepFreeze( map );

module.exports = {
    defaultOption,
    i18n,
    map,
};


