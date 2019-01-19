import sequelize from 'sequelize';
import associations from 'models/announcement/operation/associations.js';
import validate from 'test/models/announcement/operation/validate.js';
import { defaultValue, } from 'settings/default-value/announcement/config.js';
import languageUtils from 'settings/language/utils.js';
import tagUtils from 'settings/components/tags/utils.js';

/**
 * A function for getting all announcements.
 *
 * @async
 * @param {string[]} [tags = []]                          - Specifying the announcements with the given tags.
 * @param {string}   [startTime = defaultValue.startTime] - A string of the js Date object, specifying the earliest time of filter interval when
 *                                                          announcements were post.
 * @param {string}   [endTime = defaultValue.endTime]     - A string of the js Date object, specifying the latest time of filter interval when
 *                                                          announcements were post.
 * @param {number}   [page = defaultValue.page]           - Specify the announcements under the given page number.
 * @param {string} [language = defaultValue.language]     - Language option of the announcements.
 * @returns {object[]}                                      Requested announcements, including:
 * - id
 * - title
 * - content
 * - updateTime
 * - tags(id, name)
 *
 * Announcements which contain all the given tags are taken into account.
 */

const Op = sequelize.Op;

export default async ( {
    tags = [],
    startTime = defaultValue.startTime,
    endTime = defaultValue.endTime,
    page = defaultValue.page,
    language = languageUtils.languageToNum( defaultValue.language ),
} = {} ) => {
    tags = [ ...new Set( tags ), ];
    startTime = new Date( startTime );
    endTime = new Date( endTime );
    language = languageUtils.languageToNum( language );

    // If ( !tagUtils.isValidTagNums( tags ) )
    //    return { error: 'invalid tag num', };

    if ( !validate.isValidDate( startTime ) )
        return { error: 'invalid start time', };

    if ( !validate.isValidDate( endTime ) )
        return { error: 'invalid end time', };

    if ( !validate.isValidPage( page ) )
        return { error: 'invalid page', };

    const table = await associations();
    if ( page <= 0 )
        return [];
    const data = await table.announcement.findAll( {
        attributes: [ 'announcementId', ],
        where:      {
            '$tag.type$': {
                [ Op.in ]: tags,
            },
            'updateTime': {
                [ Op.between ]: [
                    new Date( startTime ),
                    new Date( endTime ),
                ],
            },
            'isPublished': 1,
        },
        include: [ {
            model:      table.tag,
            attributes: [],
            as:         'tag',
        }, ],
        group:  'announcementId',
        having: sequelize.literal( `count(*) = ${ tags.length }` ),
    } )
    .then( ids => table.announcement.findAll( {
        attributes: [
            'announcementId',
            'updateTime',
        ],
        where: {
            announcementId: {
                [ Op.in ]: ids.map( id => id.announcementId ),
            },
        },
        offset:  ( page - 1 ) * defaultValue.announcementsPerPage,
        limit:   defaultValue.announcementsPerPage,
        include: [
            {
                model:      table.announcementI18n,
                as:         'announcementI18n',
                attributes: [
                    'title',
                    'content',
                ],
                where: {
                    language,
                },
            },
            {
                model:      table.tag,
                as:         'tag',
                attributes: [ 'type', ],
            },
        ],
    } ) )
    .then( announcements => announcements.map( announcement => ( {
        id:         announcement.announcementId,
        title:      announcement.announcementI18n[ 0 ].title,
        content:    announcement.announcementI18n[ 0 ].content,
        updateTime: announcement.updateTime,
        tags:       announcement.tag.map( tag => ( {
            type: tag.type,
        } ) ),
    } ) ) );

    table.database.close();

    return data;
};
