/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'account',
    'passwordOld',
    'passwordNew',
    'passwordConfirm',
    'valueMissing',
    'patternMismatch',
    'checkMismatch',
];

const defaultOption = 'passwordOld';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        account:         'account',
        passwordOld:     'old password',
        passwordNew:     'new password',
        passwordConfirm:   'new password check',
        valueMissing:    ' can\'t be blank',
        patternMismatch: ' invalid character or invalid password length (  4~16 )',
        checkMismatch:   'new password and check password mismatch',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        account:         '帳號',
        passwordOld:     '舊密碼',
        passwordNew:     '新密碼',
        passwordConfirm:   '確認密碼',
        valueMissing:    '為必填欄位',
        patternMismatch: '有非法字元或密碼長度不正確 ( 4~16個字元 )',
        checkMismatch:   '新密碼以及確認密碼不一致',
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

