/* eslint no-unused-vars: off */
import header from 'static/src/js/components/common/header/index.js';
import filters from 'static/src/js/components/about/faculty/filters/index.js';
import getFactuly from 'static/src/js/components/about/faculty/get-faculty.js';

const cards = document.getElementById( 'cards' );

// Construct filter's events on DOM element `#filters`, '#cards`, `#no-result`.
filters(
    document.getElementById( 'filters' ),
    cards,
    document.getElementById( 'no-result' )
);

// Get all faculty data from database and append to DOM element `#cards`.
getFactuly( cards );
