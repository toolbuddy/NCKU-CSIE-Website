import { registClick, registFilter, } from 'static/src/js/components/about/faculty/filters/event.js';

/**
 * Construct filter's events on DOM element `filters`, 'cards`, `noResult`.
 *
 * @param {HTMLElement} filters
 * @param {HTMLElement} cards
 * @param {HTMLElement} noResult
 *
 * Regist event `registClick` for each DOM element with class name `.filters__filter`.
 * Regist event `registFilter` for each DOM element with class name `.filters__filter`
 * which affect DOM elements `filters`, `cards`, and `noResult`.
 */

export default ( filters, cards, noResult ) => {
    const allFilters = Array.from( filters.getElementsByClassName( 'filters__filter' ) );
    allFilters.forEach( ( filter ) => {
        registClick( filter );
        registFilter( filter, allFilters, cards, noResult );
    } );
};
