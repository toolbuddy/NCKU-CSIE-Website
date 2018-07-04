function initMap () {
    const nckucsie = { lat: 22.997134, lng: 120.2210986, };
    const map = new google.maps.Map( document.getElementById( 'map' ), {
        zoom:   17,
        center: nckucsie,
    } );
    new google.maps.Marker( { position: nckucsie, map, } );
}
