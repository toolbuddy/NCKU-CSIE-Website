import { default as language, langToNum, numToLang, } from 'settings/language/config.js';

class LanguageUtils {
    static isSupported ( language ) {
        return language.support.includes( language );
    }

    static get defaultLanguage () {
        return language.default;
    }

    static languageToNum ( language ) {
        return langToNum[ language ];
    }

    static numToLanguage ( num ) {
        return numToLang[ num ];
    }
}
export default LanguageUtils;
