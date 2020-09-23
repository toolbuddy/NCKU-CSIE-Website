/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'password-error',
    'check-password-different',
    'input-empty',
];

const defaultOption = 'password_error';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        'password-error':           'password error',
        'check-password-different': 'check new password different',
        'input-empty':              'input block empty',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        'password-error':           '密碼錯誤',
        'check-password-different': '與新密碼不符',
        'input-empty':              '此欄位不為空',
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

