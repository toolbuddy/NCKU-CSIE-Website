import { filterTags, } from 'jsComponent/announcement/filter/render.js';
import { filterEvent, } from 'jsComponent/announcement/filter/event.js';
import { singleDefaultTag, multipleDefaultTags, } from 'jsComponent/announcement/filter/query.js';

export function singleDefaultTagFilter ( tag = null ) {
    // Set default tag for query functions
    singleDefaultTag.defaultTag = tag;

    // Set up filter UI
    filterTags( tag );

    // Set up page buttons
    singleDefaultTag.getAllPageNumber();

    // Get default announcements in this page
    singleDefaultTag.getAllAnnouncements();

    // Regist event listeners to components
    filterEvent(
        singleDefaultTag.getAllAnnouncements,
        singleDefaultTag.getAnnouncementsByTags,
        singleDefaultTag.getAllPageNumber,
        singleDefaultTag.getPageNumberByTags,
        tag
    );
}

export function multipleDefaultTagsFilter ( tags = [] ) {
    // Set default tags for query functions
    multipleDefaultTags.defaultTags = tags;

    // Set up filter UI
    filterTags( 'all' );

    // Set up page buttons
    multipleDefaultTags.getAllPageNumber();

    // Get default announcements in this page
    multipleDefaultTags.getAllAnnouncements();

    // Regist event listeners to components
    filterEvent(
        multipleDefaultTags.getAllAnnouncements,
        multipleDefaultTags.getAnnouncementsByTags,
        multipleDefaultTags.getAllPageNumber,
        multipleDefaultTags.getPageNumberByTags
    );
}
