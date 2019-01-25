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
 * A function for getting all pinned announcements.
 *
 * @async
 * @param {string[]} [tags = []]                          - Specifying the pinned announcements with the given tags.
 * @param {string}   [startTime = defaultValue.startTime] - A string of the js Date object, specifying the earliest time of filter interval when
 *                                                          announcements were post.
 * @param {string}   [endTime = defaultValue.endTime]     - A string of the js Date object, specifying the latest time of filter interval when
 *                                                          announcements were post.
 * @param {string} [language = defaultValue.language]     - Language option of the announcements.
 * @returns {object[]}                                      Requested pinned announcements, including:
 * - id
 * - title
 * - content
 * - updateTime
 * - tags(id, name)
 *
 * Announcements which contain at least one of the specified tags are taken into account.
 */

export default async ( opt ) => {
    opt = opt || {};
    const {
        tags = [],
        from = AnnouncementUtils.defaultFromTime,
        to = AnnouncementUtils.defaultToTime,
        languageId = LanguageUtils.defaultLanguageId,
    } = opt;

    let tagIds = [];
    if ( tags.length === 0 )
        tagIds = TagUtils.supportedTagId;
    else
        tagIds = tags.map( Number );

    if ( !tagIds.every( TagUtils.isSupportedTagId ) ) {
        return {
            status: 400,
            error:  {
                message: 'invalid tag id',
            },
        };
    }
    if ( !ValidateUtils.isValidDate( new Date( from ) ) ) {
        return {
            status: 400,
            error:  {
                message: 'invalid time - from',
            },
        };
    }
    if ( !ValidateUtils.isValidDate( new Date( to ) ) ) {
        return {
            status: 400,
            error:  {
                message: 'invalid time - to',
            },
        };
    }
    if ( !LanguageUtils.isSupportedLanguageId( languageId ) ) {
        return {
            status: 400,
            error:  {
                message: 'invalid language id',
            },
        };
    }

    const fromTime = new Date( from ).toISOString();
    const toTime = new Date( to ).toISOString();

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
            isPinned:    1,
        },
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
