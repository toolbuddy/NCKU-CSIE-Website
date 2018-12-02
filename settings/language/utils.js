import languageSettings from 'settings/language/config.js';

class LanguageUtils {
    static isSupported ( language ) {
        return languageSettings.support.includes( language );
    }

    static get defaultLanguage () {
        return languageSettings.default;
    }
}

export default LanguageUtils;
