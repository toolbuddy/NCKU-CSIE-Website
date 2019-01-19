import LanguageUtils from 'settings/language/utils.js';

class WebLanguageUtils extends LanguageUtils {
    static get currentLanguageId () {
        const queryLanguageId = new URLSearchParams( window.location.search ).get( 'languageId' );
        if ( queryLanguageId && LanguageUtils.isSupportedLanguageId( queryLanguageId ) )
            return queryLanguageId;
        return LanguageUtils.defaultLanguageId;
    }
}

export default WebLanguageUtils;
