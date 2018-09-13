/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import style from 'static/dist/css/about/faculty.min.css';
import header from 'static/src/js/components/common/header/index.js';
import filters from 'static/src/js/components/about/faculty/filters/index.js';
import getTeachersProfile from 'static/src/js/components/about/faculty/get-faculty.js';

const cards = document.getElementById( 'cards' );

filters(
    document.getElementById( 'filters' ),
    cards,
    document.getElementById( 'no-result' )
);

getTeachersProfile( cards );
