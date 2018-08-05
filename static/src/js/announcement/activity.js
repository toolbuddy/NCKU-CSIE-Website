/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import style from 'static/dist/css/announcement/activity.min.css';
import { multipleDefaultTagsFilter, } from 'static/src/js/components/announcement/filter/index.js';

multipleDefaultTagsFilter( [
    'competition',
    'conference',
    'exhibition',
    'speech',
] );
