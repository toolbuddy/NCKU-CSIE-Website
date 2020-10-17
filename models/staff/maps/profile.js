/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

const LanguageUtils = require('../../common/utils/language.js');
const deepFreeze = require('deep-freeze');

const map = [
    'nameTW',
    'nameEN',
    'email',
    'officeAddressTW',
    'officeAddressEN',
    'officeTel',
];

const defaultOption = 'nameTW';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        nameTW:           'name ( zh-TW )',
        nameEN:           'name ( en-US )',
        officeAddressTW:  'office address ( zh-TW )',
        officeAddressEN:  'office address ( en-US )',
        email:            'email',
        officeTel:        'office tel',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        nameTW:           '中文姓名',
        nameEN:           '英文姓名',
        officeAddressTW:  '中文辦公室位置',
        officeAddressEN:  '英文辦公室位置',
        email:            'email',
        officeTel:        '辦公室電話',
    },
};

deepFreeze( i18n );
deepFreeze( map );

module.exports = {
    defaultOption,
    i18n,
    map,
};


