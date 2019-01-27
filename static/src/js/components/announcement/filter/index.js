import { initializeRenderFilter, } from 'static/src/js/components/announcement/filter/render.js';
import { filterEvent, setURLOnChange, } from 'static/src/js/components/announcement/filter/event.js';
import { singleDefaultTag, multipleDefaultTags, } from 'static/src/js/components/announcement/filter/query.js';
import TagUtils from 'models/announcement/utils/tag.js';
import LanguageUtils from 'models/common/utils/language.js';


// Single default tag filter constructor.
export function singleDefaultTagFilter (
        tag = null,
        briefingTopObj = null,
        briefingObj = null,
        briefingTopNum = 1,
        briefingNum = 1,
        filterObj,
        filterNames,
) {
    // Set default tag for query functions.
    const tagNum = TagUtils.getTagId( { tag, languageId: LanguageUtils.getLanguageId( 'en-US' ), } );
    singleDefaultTag.defaultTag = tagNum;
    singleDefaultTag.announcementBriefingTop = briefingTopObj;
    singleDefaultTag.announcementBriefing = briefingObj;
    singleDefaultTag.briefingTopNum = briefingTopNum;
    singleDefaultTag.briefingNum = briefingNum;

    // Render filter.
    initializeRenderFilter( filterObj, filterNames );

    const urlOnChange = setURLOnChange(
        tagNum,
        singleDefaultTag.getAllPinnedAnnouncements,
        singleDefaultTag.getAllAnnouncements,
        singleDefaultTag.getAllPageNumber,
        singleDefaultTag.getPinnedAnnouncementsByTags,
        singleDefaultTag.getAnnouncementsByTags,
        singleDefaultTag.getPageNumberByTags,
        filterObj,
        filterNames,
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
    filterEvent( tagNum );
}


// Multiple default tags filter constructor.
export function multipleDefaultTagsFilter (
        tags = [],
        briefingTopObj = null,
        briefingObj = null,
        briefingTopNum = 1,
        briefingNum = 1,
        filterObj,
        filterNames,
) {
    // Set default tags for query functions.
    const tagsNum = [];
    tags.forEach( ( tag ) => {
        tagsNum.push( TagUtils.getTagId( { tag, languageId: LanguageUtils.getLanguageId( 'en-US' ), } ) );
    } );
    multipleDefaultTags.defaultTags = tagsNum;
    multipleDefaultTags.announcementBriefingTop = briefingTopObj;
    multipleDefaultTags.announcementBriefing = briefingObj;
    multipleDefaultTags.briefingTopNum = briefingTopNum;
    multipleDefaultTags.briefingNum = briefingNum;

    // Render filter, must be `tags__tag--all`.
    initializeRenderFilter( filterObj, filterNames );

    const urlOnChange = setURLOnChange(
        'all',
        multipleDefaultTags.getAllPinnedAnnouncements,
        multipleDefaultTags.getAllAnnouncements,
        multipleDefaultTags.getAllPageNumber,
        multipleDefaultTags.getPinnedAnnouncementsByTags,
        multipleDefaultTags.getAnnouncementsByTags,
        multipleDefaultTags.getPageNumberByTags,
        filterObj,
        filterNames,
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
