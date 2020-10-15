import loadGoogleMapsApi from 'load-google-maps-api';

export default (target, latlng) => loadGoogleMapsApi().then((googleMaps) => {
    const map = new googleMaps.Map(target, {
        zoom: 17,
        center: latlng,
    });
    return new googleMaps.Marker({position: latlng, map});
});
