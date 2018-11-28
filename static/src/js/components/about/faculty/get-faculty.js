import card from 'static/src/pug/components/about/faculty/cards.pug';
import languageSetting from 'settings/language/config.js';

const reqURL = `${ window.location.protocol }//${ window.location.host }/api/faculty${ location.search }`;

export default target => fetch( reqURL )
.then( res => res.json() )
.then( ( faculty ) => {
    const query = new URLSearchParams( window.location.search );
    const language = query.get( 'language' );
    if ( language )
        target.innerHTML = card( { faculty, language, } );
    else
        target.innerHTML = card( { faculty, language: languageSetting.default, } );
} );
