import sequelize from 'sequelize';
import associations from 'models/announcement/operation/associations.js';
import validate from 'test/models/announcement/operation/validate.js';
import { defaultValue, tagNameToNum, } from 'settings/default-value/announcement/config.js';

const Op = sequelize.Op;

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

export default async ( {
    tags = [],
    startTime = defaultValue.startTime,
    endTime = defaultValue.endTime,
} = {} ) => {
    tags = [ ...new Set( tags ), ];
    startTime = new Date( startTime );
    endTime = new Date( endTime );

    if ( !validate.isValidTags( tags ) )
        return { error: 'invalid tag name', };

    if ( !validate.isValidDate( startTime ) )
        return { error: 'invalid start time', };

    if ( !validate.isValidDate( endTime ) )
        return { error: 'invalid end time', };

    const numOfTags = [];
    const tagLen = tags.length;
    for ( let i = 0; i < tagLen; ++i )
        numOfTags.push( tagNameToNum[ 'en-US' ][ tags[ i ] ] );

    const table = await associations();
    const count = await table.announcement.count( {
        where: {
            '$tag.type$': {
                [ Op.in ]: numOfTags,
            },
            'updateTime':                       {
                [ Op.between ]: [
                    new Date( startTime ),
                    new Date( endTime ),
                ],
            },
            'isPublished': 1,
        },
        include: [ {
            model:   table.tag,
            as:      'tag',
        }, ],
        group:  '`announcement`.`announcement_id`',
        having: sequelize.literal( `count(*) = ${ tags.length }` ),
    } )
    .then( count => count.length );

    table.database.close();

    return { pageNumber: Math.ceil( count / defaultValue.announcementsPerPage ), };
};
