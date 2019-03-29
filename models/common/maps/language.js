/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 * @property {string}   default - Default language.
 */

import deepFreeze from 'deep-freeze';

const languageMap = {
    'support': [
        'zh-TW',
        'en-US',
    ],
    'default': 'zh-TW',
};

deepFreeze( languageMap );

export default languageMap;
