import { Op, } from 'sequelize';
import {
    Announcement,
    AnnouncementI18n,
    Tag,
} from 'models/announcement/operations/associations.js';
import AnnouncementUtils from 'models/announcement/utils/announcement.js';
import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/announcement/utils/validate.js';
import TagUtils from 'models/announcement/utils/tag.js';

/**
 * A function for getting all announcements.
 *
 * @async
 * @param {string[]} [tags = []]                          - Specify the announcements with the given tags.
 * @param {string}   [startTime = defaultValue.startTime] - A string of the js Date object, specifying the earliest time of filter interval when
 *                                                          announcements were post.
 * @param {string}   [endTime = defaultValue.endTime]     - A string of the js Date object, specifying the latest time of filter interval when
 *                                                          announcements were post.
 * @param {number}   [page = defaultValue.page]           - Specify the announcements under the given page number.
 * @param {string}   [language = defaultValue.language]   - Language option of the announcements.
 * @returns {object[]}                                      Requested pinned announcements, including:
 * - id
 * - title
 * - content
 * - updateTime
 * - tags(id, name)
 *
 * All announcements which contain at least one of the specified tags will be taken into account.
 */


export default async ( opt ) => {
    opt = opt || {};
    const {
        tags = [],
        page = 1,
        amount = 1,
        from = AnnouncementUtils.defaultFromTime,
        to = AnnouncementUtils.defaultToTime,
        languageId = LanguageUtils.defaultLanguageId,
    } = opt;

    let tagIds = [];
    if ( tags.length === 0 )
        tagIds = TagUtils.supportedTagId;
    else
        tagIds = tags.map( Number );

    if ( !tagIds.every( TagUtils.isSupportedTagId ) )
        return { error: 'invalid tag id', };
    if ( !ValidateUtils.isValidNumber( page ) )
        return { error: 'invalid page', };
    if ( !ValidateUtils.isValidNumber( amount ) )
        return { error: 'invalid amount', };
    if ( !ValidateUtils.isValidDate( new Date( from ) ) )
        return { error: 'invalid time - from', };
    if ( !ValidateUtils.isValidDate( new Date( to ) ) )
        return { error: 'invalid time - to', };
    if ( !LanguageUtils.isSupportedLanguageId( languageId ) )
        return { error: 'invalid language id', };


    const fromTime = new Date( from ).toISOString();
    const toTime = new Date( to ).toISOString();
    const offset = Number( amount * ( page - 1 ) );
    const limit = Number( amount );

    const data = await Announcement.findAll( {
        attributes: [
            'announcementId',
            'updateTime',
            'views',
            'author',
        ],
        where: {
            updateTime: {
                [ Op.between ]: [
                    fromTime,
                    toTime,
                ],
            },
            isPublished: 1,
        },
        limit,
        offset,
        include: [
            {
                model:      AnnouncementI18n,
                as:         'announcementI18n',
                attributes: [
                    'title',
                    'content',
                ],
                where: {
                    languageId,
                },
            },
            {
                model:      Tag,
                as:         'tag',
                attributes: [ 'typeId', ],
                where:      {
                    TypeId: {
                        [ Op.in ]: tagIds,
                    },
                },
            },
        ],
    } );

    return data;
};
