/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import style from 'static/dist/css/announcement/all.min.css';
import header from 'static/src/js/components/common/header/index.js';
import { multipleDefaultTagsFilter, } from 'static/src/js/components/announcement/filter/index.js';

// Construct filter with no default tags.
multipleDefaultTagsFilter( [] );
