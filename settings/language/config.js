/**
 * Language settings module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 * @property {string}   default - Default language.
 */

const language = {};
Object.defineProperties( language, {
    'support': {
        value: [
            'zh-TW',
            'en-US',
            '0',
            '1',
        ],
    },
    'default': {
        value: 'zh-TW',
    },
} );

export default language;
