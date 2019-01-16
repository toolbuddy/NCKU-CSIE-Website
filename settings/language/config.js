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
        ],
    },
    'default': {
        value: 'zh-TW',
    },
} );

export const numToLang = Object.freeze( {
    '1': 'zh-TW',
    '2': 'en-US',
} );

function getLangToNum ( numToLangObj ) {
    const obj = {};
    for ( const key of Object.keys( numToLangObj ) )
        obj[ numToLangObj[ key ] ] = key;
    return obj;
}

export const langToNum = getLangToNum( numToLang );
export default language;
