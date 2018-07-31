import { filterTags, } from 'jsComponent/announcement/filter/render.js';
import { filterEvent, } from 'jsComponent/announcement/filter/event.js';
import { singleDefaultTag, multipleDefaultTags, } from 'jsComponent/announcement/filter/query.js';

// Single default tag filter constructor.
export function singleDefaultTagFilter ( tag = null ) {
    // Set default tag for query functions.
    singleDefaultTag.defaultTag = tag;

    // Construct filter UI.
    filterTags( tag );

    // Construct page buttons.
    // Using default tag to count how many pages required to contain all announcement.
    singleDefaultTag.getAllPageNumber();

    // Construct announcements.
    // Using default tag to get announcements on first page.
    singleDefaultTag.getAllAnnouncements();

    // Constructor filter event.
    // * When `tags__tag--all` is clicked, using default tag to:
    //     * Count number of announcements ( OR operation ).
    //     * Construct page buttons base on number of announcements.
    //     * Construct announcements on first page.
    // * When `tags__tag--*` is clicked, using default tag and selected tags to:
    //     * Count number of announcements ( AND operation ).
    //     * Construct page buttons base on number of announcements.
    //     * Construct announcements on first page.
    // * When `page__button` is clicked, using previous events queried result to:
    //     * Construct announcements on requested page.
    //     * Change page number.
    filterEvent(
        singleDefaultTag.getAllAnnouncements,
        singleDefaultTag.getAnnouncementsByTags,
        singleDefaultTag.getAllPageNumber,
        singleDefaultTag.getPageNumberByTags,
        tag
    );
}


// Multiple default tags filter constructor.
export function multipleDefaultTagsFilter ( tags = [] ) {
    // Set default tags for query functions.
    multipleDefaultTags.defaultTags = tags;

    // Construct filter UI, must be `tags__tag--all`.
    filterTags( 'all' );

    // Construct page buttons.
    // Using default tags to count how many pages required to contain all announcement.
    multipleDefaultTags.getAllPageNumber();

    // Construct announcements.
    // Using default tags to get announcements on first page.
    multipleDefaultTags.getAllAnnouncements();

    // Constructor filter event.
    // * When `tags__tag--all` is clicked, using default tags to:
    //     * Count number of announcements ( OR operation ).
    //     * Construct page buttons base on number of announcements.
    //     * Construct announcements on first page.
    // * When `tags__tag--*` is clicked, using default tags and selected tags to:
    //     * Count number of announcements ( AND operation ).
    //     * Construct page buttons base on number of announcements.
    //     * Construct announcements on first page.
    // * When `page__button` is clicked, using previous events queried result to:
    //     * Construct announcements on requested page.
    //     * Change page number.
    filterEvent(
        multipleDefaultTags.getAllAnnouncements,
        multipleDefaultTags.getAnnouncementsByTags,
        multipleDefaultTags.getAllPageNumber,
        multipleDefaultTags.getPageNumberByTags
    );
}
