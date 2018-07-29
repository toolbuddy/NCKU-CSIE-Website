/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import style from 'cssComponent/announcement/activity.min.css';

import { filterTags, buildEventListener, } from 'jsComponent/announcement/filter.js';
import queryString from 'jsComponent/announcement/query-string.js';
import { getAllAnnouncements, getAnnouncementsByTags, getAllPageNumber, getPageNumberByTags, } from 'jsComponent/announcement/multiple-default-tags.js';

queryString.defaultTags = [ 'competition',
    'conference',
    'exhibition',
    'speech', ];

getAllPageNumber();
getAllAnnouncements();
buildEventListener( getAllAnnouncements, getAnnouncementsByTags, getAllPageNumber, getPageNumberByTags );
filterTags( 'all' );
