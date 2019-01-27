import Sequelize from 'sequelize';
import {
    Announcement,
    Tag,
} from 'models/announcement/operations/associations.js';
import AnnouncementUtils from 'models/announcement/utils/announcement.js';
import TagUtils from 'models/announcement/utils/tag.js';
import ValidateUtils from 'models/announcement/utils/validate.js';

const op = Sequelize.Op;

/**
 * A function for getting the number of pages to display all requested announcements.
 *
 * @async
 * @param {string[]} [tags=[]]                            - Specifying the announcements with the given tags.
 * @param {string}   [startTime = defaultValue.startTime] - A string of the js Date object, specifying the earliest time of filter interval when
 *                                                          announcements were post.
 * @param {string}   [endTime = defaultValue.endTime]     - A string of the js Date object, specifying the latest time of filter interval when
 *                                                          announcements were post.
 * @returns {object}                                        The number of pages required to display all the requested announcements.
 *
 * Announcements which contain all of the given tags are taken into account.
 */

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            tags = [],
            from = AnnouncementUtils.defaultFromTime,
            to = AnnouncementUtils.defaultToTime,
            amount = 1,
        } = opt;

        let tagIds = [];
        tagIds = tags.map( Number );

        if ( !tagIds.every( TagUtils.isSupportedTagId ) ) {
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
            attributes: [
                'announcementId',
                [ Sequelize.fn( 'COUNT', Sequelize.col( 'tag.typeId' ) ),
                    'tagsCount', ],
            ],
            where: {
                updateTime: {
                    [ op.between ]: [
                        fromTime,
                        toTime,
                    ],
                },
                isPublished: 1,
            },
            include: [
                {
                    model:      Tag,
                    as:         'tag',
                    attributes: [],
                    where:      {
                        TypeId: {
                            [ op.in ]: tagIds,
                        },
                    },
                },
            ],
            group:  [ 'announcementId', ],
            having: {
                tagsCount: {
                    [ op.gte ]: tagIds.length,
                },
            },
        } );

        return Math.ceil( count.length / amount );
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
