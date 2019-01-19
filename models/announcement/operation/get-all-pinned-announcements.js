import { Op, } from 'sequelize';
import associations from 'models/announcement/operation/associations.js';
import validate from 'test/models/announcement/operation/validate.js';
import { defaultValue, } from 'settings/default-value/announcement/config.js';
import languageUtils from 'settings/language/utils.js';
import tagUtils from 'settings/components/tags/utils.js';

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

export default async ( {
    tags = [],
    startTime = defaultValue.startTime,
    endTime = defaultValue.endTime,
    language = languageUtils.getLanguageId( defaultValue.language ),
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
    let data = [];
    if ( tags.length === 0 ) {
        data = await table.announcement.findAll( {
            attributes: [
                'announcementId',
                'updateTime',
            ],
            where: {
                updateTime: {
                    [ Op.between ]: [
                        startTime,
                        endTime,
                    ],
                },
                isPinned:    1,
                isPublished: 1,
            },
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
                },
            ],
        } )
        .then( announcements => announcements.map( announcement => ( {
            id:         announcement.announcementId,
            title:      announcement.announcementI18n[ 0 ].title,
            content:    announcement.announcementI18n[ 0 ].content,
            updateTime: announcement.updateTime,
            tags:       announcement.tag.map( tag => ( {
                type: tag.type,
            } ) ),
        } ) ) );
    }
    else {
        data = await table.announcement.findAll( {
            attributes: [ 'announcementId', ],
            where:      {
                '$tag.type$': {
                    [ Op.in ]: tags,
                },
                'updateTime': {
                    [ Op.between ]: [
                        startTime,
                        endTime,
                    ],
                },
                'isPinned':      1,
                'isPublished': 1,
            },
            include: [
                {
                    model:      table.tag,
                    as:         'tag',
                },
            ],
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
    }

    table.database.close();

    return data;
};
