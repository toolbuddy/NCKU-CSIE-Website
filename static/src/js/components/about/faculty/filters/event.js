import { renderFilter, renderCards, } from 'static/src/js/components/about/faculty/filters/render.js';

// Add click event to each filter.
export function registClick ( filter ) {
    filter.addEventListener( 'click', () => {
        renderFilter( filter );
    } );
}

export function registFilter ( filter, filters, cards, noResult ) {
    filter.addEventListener( 'click', () => {
        renderCards( filters, cards, noResult );
    } );
}
