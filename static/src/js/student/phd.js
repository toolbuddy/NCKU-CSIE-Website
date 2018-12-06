import header from 'static/src/js/components/common/header/index.js';
import { singleDefaultTagFilter, } from 'static/src/js/components/announcement/filter/index.js';

header( document.getElementById( 'header' ) );

singleDefaultTagFilter( 'phd' );
