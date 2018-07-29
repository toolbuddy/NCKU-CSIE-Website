/**
 * CSS of the file
 */
/* eslint no-unused-vars: off */
import style from 'cssComponent/student/college.min.css';
import { filterTags, buildEventListener, } from 'jsComponent/announcement/filter.js';
import queryString from 'jsComponent/announcement/query-string.js';
import { getAllAnnouncements, getAnnouncementsByTags, getAllPageNumber, getPageNumberByTags, } from 'jsComponent/announcement/single-default-tag.js';

queryString.defaultTags = 'college';
getAllPageNumber();
getAllAnnouncements();
buildEventListener( getAllAnnouncements, getAnnouncementsByTags, getAllPageNumber, getPageNumberByTags, queryString.defaultTags );
filterTags( queryString.defaultTags );
