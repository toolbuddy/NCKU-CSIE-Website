import { filterTags, } from 'jsComponent/announcement/filter/render.js';
import { filterRegistEvent, } from 'jsComponent/announcement/filter/event.js';
import { singleDefaultTag, multipleDefaultTags, } from 'jsComponent/announcement/filter/query-function.js';

export function singleDefaultTagFilter ( tag = [] ) {
    singleDefaultTag.defaultTag = tag;
    filterTags( tag[ 0 ] );
    singleDefaultTag.getAllPageNumber();
    singleDefaultTag.getAllAnnouncements();
    filterRegistEvent(
        singleDefaultTag.getAllAnnouncements,
        singleDefaultTag.getAnnouncementsByTags,
        singleDefaultTag.getAllPageNumber,
        singleDefaultTag.getPageNumberByTags,
        tag[ 0 ]
    );
}

export function multipleDefaultTagsFilter ( tags = [] ) {
    multipleDefaultTags.defaultTags = tags;
    filterTags( 'all' );
    multipleDefaultTags.getAllPageNumber();
    multipleDefaultTags.getAllAnnouncements();
    filterRegistEvent(
        multipleDefaultTags.getAllAnnouncements,
        multipleDefaultTags.getAnnouncementsByTags,
        multipleDefaultTags.getAllPageNumber,
        multipleDefaultTags.getPageNumberByTags
    );
}
