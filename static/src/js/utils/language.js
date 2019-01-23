import LanguageUtils from 'models/common/utils/language.js';

class WebLanguageUtils extends LanguageUtils {
    static get currentLanguageId () {
        let languageId = new URLSearchParams( window.location.search ).get( 'languageId' );
        languageId = Number( languageId );
        if ( languageId && WebLanguageUtils.isSupportedLanguageId( languageId ) )
            return languageId;
        return LanguageUtils.defaultLanguageId;
    }
}

export default WebLanguageUtils;
