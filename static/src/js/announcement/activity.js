import header from 'static/src/js/components/common/header/index.js';
import { multipleDefaultTagsFilter, } from 'static/src/js/components/announcement/filter/index.js';

header( document.getElementById( 'header' ) );

multipleDefaultTagsFilter( [
    'competition',
    'conference',
    'exhibition',
    'speech',
] );
