import { Op, } from 'sequelize';
import associations from 'models/announcement/operation/associations.js';
import validate from 'test/models/announcement/operation/validate.js';
import { defaultValue, } from 'settings/default-value/announcement/config.js';

// Import tagUtils from 'settings/components/tags/utils.js';

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
 * Announcements which contain at least one of the given tags are taken into account.
 */

export default async ( {
    tags = [],
    startTime = defaultValue.startTime,
    endTime = defaultValue.endTime,
} = {} ) => {
    tags = [ ...new Set( tags ), ];
    startTime = new Date( startTime );
    endTime = new Date( endTime );

    // If ( !tagUtils.isValidTagNums( tags ) )
    //    return { error: 'invalid tag num', };

    if ( !validate.isValidDate( startTime ) )
        return { error: 'invalid start time', };

    if ( !validate.isValidDate( endTime ) )
        return { error: 'invalid end time', };
    const table = await associations();
    let count = 0;
    if ( tags.length === 0 ) {
        count = await table.announcement.count( {
            where: {
                updateTime: {
                    [ Op.between ]: [
                        startTime,
                        endTime,
                    ],
                },
                isPublished: 1,
            },
        } );
    }
    else {
        count = await table.announcement.count( {
            where: {
                '$tag.type$': {
                    [ Op.in ]: tags,
                },
                'updateTime': {
                    [ Op.between ]: [
                        startTime,
                        endTime,
                    ],
                },
                'isPublished': 1,
            },
            include: [
                {
                    model:   table.tag,
                    as:      'tag',
                },
            ],
            distinct: true,
        } );
    }
    table.database.close();

    return { pageNumber: Math.ceil( count / defaultValue.announcementsPerPage ), };
};
