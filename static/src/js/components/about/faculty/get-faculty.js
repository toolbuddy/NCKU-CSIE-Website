import card from 'static/src/pug/components/about/faculty/card.pug';

const reqURL = `${ window.location.protocol }//${ window.location.host }/api/faculty${ location.search }`;

export default () => fetch( reqURL )
.then( res => res.json() )
.then( ( faculty ) => {
    const query = new URLSearchParams( window.location.search );
    const language = query.get( 'language' );
    if ( language )
        document.getElementById( 'cards' ).innerHTML = card( { faculty, language, } );
    else
        document.getElementById( 'cards' ).innerHTML = card( { faculty, language: 'zh-TW', } );
} );
