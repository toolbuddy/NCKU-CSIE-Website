import card from 'static/src/pug/components/about/teachers/card.pug';

const reqURL = `${ window.location.protocol }//${ window.location.host }/api/teachers${ location.search }`;

export default () => fetch( reqURL )
.then( res => res.json() )
.then( ( teachers ) => {
    document.getElementById( 'cards' ).innerHTML = card( { teachers, } );
} );
