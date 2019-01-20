import header from 'static/src/js/components/common/header/index.js';
import { multipleDefaultTagsFilter, } from 'static/src/js/components/announcement/filter/index.js';

header( document.getElementById( 'header' ) );

multipleDefaultTagsFilter( [
    'competition',
    'conference',
    'exhibition',
    'speech',
],
document.getElementById( 'announcement__brefings--top' ),
document.getElementById( 'announcement__brefings' ), );
