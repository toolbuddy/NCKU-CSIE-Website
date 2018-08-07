import card from 'static/src/pug/components/about/faculty/card.pug';

const reqURL = `${ window.location.protocol }//${ window.location.host }/api/faculty${ location.search }`;

export default () => fetch( reqURL )
.then( res => res.json() )
.then( ( faculty ) => {
    document.getElementById( 'cards' ).innerHTML = card( { faculty, } );
} );
