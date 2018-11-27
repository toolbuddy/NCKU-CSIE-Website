import sequelize from 'sequelize';
import associations from 'models/announcement/operation/associations.js';
import validate from 'test/models/announcement/operation/validate.js';
import defaultValue from 'settings/default-value/announcement/config.js';

const Op = sequelize.Op;

/**
 * A function for getting the number of pages to display all the requested announcements which contain all of the given tags.
 * 
 * @param {string[]} [tags=[]]                          - an array of strings, specifying the announcements with the given tags.
 * @param {string} [startTime = defaultValue.startTime] - a string of the js object Date, specifying the start time of the update time of the announcements.
 * @param {string} [endTime = defaultValue.endTime]     - a string of the js object Date, specifying the end time of the update time of the announcements.
 * @returns {object}                                      the number of pages required to display all the requested announcements.
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

    const table = await associations();
    const count = await table.announcement.count( {
        where: {
            '$announcementTag.tagI18n.name$': {
                [ Op.in ]: tags,
            },
            'updateTime':                       {
                [ Op.between ]: [
                    new Date( startTime ),
                    new Date( endTime ),
                ],
            },
            'isPublished': 1,
            'isApproved':  1,
        },
        include: [ {
            model:   table.announcementTag,
            as:      'announcementTag',
            include: [ {
                model:      table.tagI18n,
                as:         'tagI18n',
            }, ],
        }, ],
        group:  '`announcement`.`announcement_id`',
        having: sequelize.literal( `count(*) = ${ tags.length }` ),
    } )
    .then( count => count.length );

    table.database.close();

    return { pageNumber: Math.ceil( count / defaultValue.announcementsPerPage ), };
};
