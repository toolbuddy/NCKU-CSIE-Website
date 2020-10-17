/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'name',
    'title',
    'nation',
    'officeAddress',
    'labName',
    'labAddress',
    'labTel',
    'labWeb',
    'officeTel',
    'email',
    'fax',
    'personalWeb',
];

const defaultOption = 'nameTW';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        name:          'name',
        title:         'title',
        nation:        'nation',
        officeAddress: 'Office Address',
        labName:       'Lab Name',
        labAddress:    'Lab Location',
        labTel:        'Lab Tel',
        labWeb:        'Lab Web',
        officeTel:     'Office Tel',
        email:         'Email',
        fax:           'Fax',
        personalWeb:   'Personal Web',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        name:          '姓名',
        title:         '職稱',
        nation:        '國籍',
        officeAddress:  '辦公室位置',
        labName:       '實驗室名稱',
        labAddress:    '實驗室位置',
        labTel:        '實驗室電話',
        labWeb:        '實驗室網站',
        officeTel:     '辦公室電話',
        email:         'Email',
        fax:           '傳真',
        personalWeb:   '個人網站',
    },
};

deepFreeze( i18n );
deepFreeze( map );

module.exports = {
    defaultOption,
    i18n,
    map,
};


