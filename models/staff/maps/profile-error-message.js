/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'nameTWBlank',
    'nameENBlank',
    'emailBlank',
    'officeAddressTWBlank',
    'officeAddressENBlank',
    'officeTelBlank',
];

const defaultOption = 'nameTWBlank';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        nameTWBlank:           'name ( zh-TW ) can\'t be blank',
        nameENBlank:           'name ( en-US ) can\'t be blank',
        officeAddressTWBlank:  'office address ( zh-TW ) can\'t be blank',
        officeAddressENBlank:  'office address ( en-US ) can\'t be blank',
        emailBlank:            'email can\'t be blank',
        officeTelBlank:        'office tel can\'t be blank',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        nameTWBlank:           '中文姓名為必填欄位',
        nameENBlank:           '英文姓名為必填欄位',
        officeAddressTWBlank:  '中文辦公室位置為必填欄位',
        officeAddressENBlank:  '英文辦公室位置為必填欄位',
        emailBlank:            'email 為必填欄位',
        officeTelBlank:        '辦公室電話為必填欄位',
    },
};

deepFreeze( i18n );
deepFreeze( map );

export default {
    defaultOption,
    i18n,
    map,
};

export {
    defaultOption,
    i18n,
    map,
};

