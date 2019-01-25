import { renderFilter, renderFilterResearch, renderCards, } from 'static/src/js/components/about/faculty/filters/render.js';

/**
 * Execute `renderFilter` when click on `filter`.
 *
 * @param {HTMLElement} filter
 *
 * Add `click` event to `filter`
 * and render filter with function `renderFilter`.
 */

export function registClick ( filter ) {
    filter.addEventListener( 'click', () => {
        renderFilter( filter );
    } );
}

export function registClickResearch ( filter ) {
    filter.addEventListener( 'click', () => {
        renderFilterResearch( filter );
    } );
}

/**
 * Execute `renderFilter` when click on `filter`.
 *
 * @param {HTMLElement}   filter
 * @param {HTMLElement[]} filters
 * @param {HTMLElement}   cards
 * @param {HTMLElement}   noResult
 *
 * Add `click` event to `filter`
 * and render `cards` and `noResult` with function `renderCards`.
 */

export function registFilter ( filter, filters, cards, noResult ) {
    filter.addEventListener( 'click', () => {
        renderCards( filters, cards, noResult );
    } );
}
