import header from 'static/src/js/components/common/header/index.js';
import map from 'static/src/js/components/common/google-map.js';

header( document.getElementById( 'header' ) );

const nckucsie = { lat: 22.997134, lng: 120.2210986, };

map( document.getElementById( 'map' ), nckucsie );
