import { registClick, registFilter, } from 'static/src/js/components/about/faculty/filters/event.js';

export default ( filters, cards, noResult ) => {
    filters = Array.from( filters.getElementsByClassName( 'filters__filter' ) );
    filters.forEach( ( filter ) => {
        registClick( filter, cards, noResult );
        registFilter( filter, filters, cards, noResult );
    } );
};
