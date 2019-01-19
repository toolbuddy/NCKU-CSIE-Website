/**
 * Data loading module for loading faculty data.
 *
 * @todo add loading fail handler
 * @todo disable faculty filter before data is completely loaded.
 */

import card from 'static/src/pug/components/about/faculty/cards.pug';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import serverSetting from 'settings/server/config.js';

const currentLanguage = WebLanguageUtils.currentLanguage;
const reqURL = `${ serverSetting.host }/api/faculty?language=${
    currentLanguage === 'zh-TW' ? '0' : '1'
}`;

export default target => fetch( reqURL )
.then( res => res.json() )
.then( ( faculty ) => {
    /* eslint no-console: 0 */
    console.log( faculty );
    target.innerHTML = card( { faculty, language: currentLanguage, } );
} );
