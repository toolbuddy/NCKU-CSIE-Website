import loadGoogleMapsApi from 'load-google-maps-api';

const nckucsie = { lat: 22.997134, lng: 120.2210986, };

export default () => loadGoogleMapsApi().then( ( googleMaps ) => {
    const map = new googleMaps.Map( document.getElementById( 'map' ), {
        zoom:   17,
        center: nckucsie,
    } );
    return new googleMaps.Marker( { position: nckucsie, map, } );
} );
