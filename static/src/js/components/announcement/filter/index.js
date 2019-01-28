import { initializeRenderFilter, } from 'static/src/js/components/announcement/filter/render.js';
import { filterEvent, setURLOnChange, } from 'static/src/js/components/announcement/filter/event.js';
import { singleDefaultTag, multipleDefaultTags, } from 'static/src/js/components/announcement/filter/query.js';
import TagUtils from 'models/announcement/utils/tag.js';
import LanguageUtils from 'models/common/utils/language.js';
import config from 'static/src/js/components/announcement/filter/config.js';


// Single default tag filter constructor.
export function singleDefaultTagFilter (
        tag = null,
        briefingTopObj = null,
        briefingObj = null,
        briefingNum = config.defaultAmount,
        filterObj = null,
        filterNames = [],
) {
    // Set default tag for query functions.
    const tagId = TagUtils.getTagId( { tag, languageId: LanguageUtils.getLanguageId( 'en-US' ), } );
    singleDefaultTag.defaultTag = tagId;
    singleDefaultTag.announcementBriefingTop = briefingTopObj;
    singleDefaultTag.announcementBriefing = briefingObj;
    singleDefaultTag.briefingNum = briefingNum;

    // Render filter.
    initializeRenderFilter( filterObj, filterNames );

    const urlOnChange = setURLOnChange(
        tagId,
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
    filterEvent( tagId );
}


// Multiple default tags filter constructor.
export function multipleDefaultTagsFilter (
        tags = [],
        briefingTopObj = null,
        briefingObj = null,
        briefingNum = config.defaultAmount,
        filterObj,
        filterNames,
) {
    // Set default tags for query functions.
    const tagsId = [];
    tags.forEach( ( tag ) => {
        tagsId.push( TagUtils.getTagId( { tag, languageId: LanguageUtils.getLanguageId( 'en-US' ), } ) );
    } );
    multipleDefaultTags.defaultTags = tagsId;
    multipleDefaultTags.announcementBriefingTop = briefingTopObj;
    multipleDefaultTags.announcementBriefing = briefingObj;
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
