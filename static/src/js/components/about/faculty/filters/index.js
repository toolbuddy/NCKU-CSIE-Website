import { registClick, registFilter, } from 'static/src/js/components/about/faculty/filters/event.js';

/**
 * Construct filter's events on DOM element `filters`, 'cards`, `noResult`.
 *
 * @param {HTMLElement} filters
 * @param {HTMLElement} cards
 * @param {HTMLElement} noResult
 *
 * Regist event `registClick` for each DOM element with class nmae `.filters__filter`.
 * Regist event `registFilter` for each DOM element with class nmae `.filters__filter`
 * which affect DOM elements `filters`, `cards`, and `noResult`.
 */

export default ( filters, cards, noResult ) => {
    filters = Array.from( filters.getElementsByClassName( 'filters__filter' ) );
    filters.forEach( ( filter ) => {
        registClick( filter );
        registFilter( filter, filters, cards, noResult );
    } );
};
