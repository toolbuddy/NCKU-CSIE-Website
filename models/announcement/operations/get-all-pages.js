import { Op, } from 'sequelize';
import {
    Announcement,
    Tag,
} from 'models/announcement/operations/associations.js';
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
    try {
        opt = opt || {};
        const {
            tags = [],
            from = null,
            to = null,
            amount = null,
        } = opt;

        if ( !tags.every( TagUtils.isSupportedTagId ) ) {
            return {
                status: 400,
                error:  {
                    message: 'invalid tag id',
                },
            };
        }
        if ( !ValidateUtils.isValidNumber( amount ) ) {
            return {
                status: 400,
                error:  {
                    message: 'invalid amount',
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
                isPublished: true,
            },
            include: [ {
                model:      Tag,
                as:         'tag',
                attributes: [ 'typeId', ],
                where:      {
                    typeId: {
                        [ Op.in ]: tags,
                    },
                },
            }, ],
            distinct: true,
        } );
        return Math.ceil( count / amount );
    }

    /**
     * Something wrong, must be a server error.
     */

    catch ( error ) {
        return {
            status: 500,
            error:  {
                message: 'server internal error',
            },
        };
    }
};
