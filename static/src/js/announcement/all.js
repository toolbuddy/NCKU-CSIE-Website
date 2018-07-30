/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import style from 'cssComponent/announcement/all.min.css';
import { filterTags, } from 'jsComponent/announcement/filter.js';
import { init, } from 'jsComponent/announcement/multiple-default-tags.js';

init( [] );
filterTags( 'all' );
