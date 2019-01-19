import { renderFilter, } from 'static/src/js/components/announcement/filter/render.js';
import { filterEvent, setURLOnChange, } from 'static/src/js/components/announcement/filter/event.js';
import { singleDefaultTag, multipleDefaultTags, } from 'static/src/js/components/announcement/filter/query.js';
import tagUtils from 'settings/components/tags/utils.js';
import { defaultValue, } from 'settings/default-value/announcement/config.js';

// Single default tag filter constructor.
export function singleDefaultTagFilter ( 
        tag = null, 
        briefingTopObj = null, 
        briefingObj = null, 
        briefingTopNum = defaultValue.announcementsPerPage, 
        briefingNum = defaultValue.announcementsPerPage 
) {
    // Set default tag for query functions.
    let tagNum = tagUtils.tagNameToNum(tag, 'en-US');
    singleDefaultTag.defaultTag = tagNum;
    singleDefaultTag.announcementBriefingTop = briefingTopObj;
    singleDefaultTag.announcementBriefing = briefingObj;
    singleDefaultTag.briefingTopNum = briefingTopNum;
    singleDefaultTag.briefingNum = briefingNum;

    // Render filter.
    renderFilter( tag );

    const urlOnChange = setURLOnChange(
        tag,
        singleDefaultTag.getAllPinnedAnnouncements,
        singleDefaultTag.getAllAnnouncements,
        singleDefaultTag.getAllPageNumber,
        singleDefaultTag.getPinnedAnnouncementsByTags,
        singleDefaultTag.getAnnouncementsByTags,
        singleDefaultTag.getPageNumberByTags
    );

    window.addEventListener( 'popstate', urlOnChange );
    urlOnChange();

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
    filterEvent( tag );
}


// Multiple default tags filter constructor.
export function multipleDefaultTagsFilter ( 
        tags = [], 
        briefingTopObj = null, 
        briefingObj = null, 
        briefingTopNum = defaultValue.announcementsPerPage, 
        briefingNum = defaultValue.announcementsPerPage 
) {
    // Set default tags for query functions.
    let tagsNum = [];
    tags.forEach((tag) => {
        tagsNum.push(tagUtils.tagNameToNum(tag, 'en-US'));
    });
    multipleDefaultTags.defaultTags = tagsNum;
    multipleDefaultTags.announcementBriefingTop = briefingTopObj;
    multipleDefaultTags.announcementBriefing = briefingObj;
    multipleDefaultTags.briefingTopNum = briefingTopNum;
    multipleDefaultTags.briefingNum = briefingNum;

    // Render filter, must be `tags__tag--all`.
    renderFilter( 'all' );

    const urlOnChange = setURLOnChange(
        'all',
        multipleDefaultTags.getAllPinnedAnnouncements,
        multipleDefaultTags.getAllAnnouncements,
        multipleDefaultTags.getAllPageNumber,
        multipleDefaultTags.getPinnedAnnouncementsByTags,
        multipleDefaultTags.getAnnouncementsByTags,
        multipleDefaultTags.getPageNumberByTags
    );

    window.addEventListener( 'popstate', urlOnChange );
    urlOnChange();

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
    filterEvent();
}
