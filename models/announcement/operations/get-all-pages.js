import { Op, } from 'sequelize';
import {
    Announcement,
    Tag,
} from 'models/announcement/operations/associations.js';
import AnnouncementUtils from 'models/announcement/utils/announcement.js';
import TagUtils from 'models/announcement/utils/tag.js';
import ValidateUtils from 'models/announcement/utils/validate.js';

/**
 * A function for getting the number of pages to display all requested announcements.
 *
 * @async
 * @param {string[]} [tags=[]]                            - Specifying the announcements with the given tags.
 * @param {string}   [from = defaultValue.startTime] - A string of the js Date object, specifying the earliest time of filter interval when
 *                                                          announcements were post.
 * @param {string}   [to = defaultValue.endTime]     - A string of the js Date object, specifying the latest time of filter interval when
 *                                                          announcements were post.
 * @returns {object}                                        The number of pages required to display all the requested announcements.
 *
 * Announcements which contain at least one of the given tags are taken into account.
 */

export default async ( opt ) => {
    opt = opt || {};
    const {
        tags = [],
        from = AnnouncementUtils.defaultFromTime,
        to = AnnouncementUtils.defaultToTime,
        amount = 1,
    } = opt;

    let tagIds = [];
    if ( tags.length === 0 )
        tagIds = TagUtils.supportedTagId;
    else
        tagIds = tags.map( Number );

    if ( !tagIds.every( TagUtils.isSupportedTagId ) )
        return { error: 'invalid tag id', };
    if ( !ValidateUtils.isValidDate( new Date( from ) ) )
        return { error: 'invalid time - from', };
    if ( !ValidateUtils.isValidDate( new Date( to ) ) )
        return { error: 'invalid time - to', };
    if ( !ValidateUtils.isValidNumber( amount ) )
        return { error: 'invalid amount', };

    const fromTime = new Date( from ).toISOString();
    const toTime = new Date( to ).toISOString();

    const count = await Announcement.count( {
        where: {
            updateTime: {
                [ Op.between ]: [
                    fromTime,
                    toTime,
                ],
            },
            isPublished: 1,
        },
        include: [ {
            model:      Tag,
            as:         'tag',
            attributes: [ 'typeId', ],
            where:      {
                TypeId: {
                    [ Op.in ]: tagIds,
                },
            },
        }, ],
        distinct: true,
    } );
    return Math.ceil( count / amount );
};
