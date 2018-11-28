import LanguageUtils from 'settings/language/utils.js';

class WebLanguageUtils extends LanguageUtils {
    static get currentLanguage () {
        const queryLanguage = new URLSearchParams( window.location.search ).get( 'language' );
        if ( queryLanguage && LanguageUtils.isSupported( queryLanguage ) )
            return queryLanguage;
        return LanguageUtils.defaultLanguage;
    }
}

export default WebLanguageUtils;
