import { Op, } from 'sequelize';
import associations from 'models/announcement/operation/associations.js';
import validate from 'test/models/announcement/operation/validate.js';
import defaultValue from 'settings/default-value/announcement/config.js';

/**
 * A function for getting all the announcements which contain at least one of the specified tags and are under given constraints.
 *
 * @param {string[]} [tags = []]                          - an array of strings, specifying the announcements with the given tags.
 * @param {string}   [startTime = defaultValue.startTime] - a string of the js object Date, specifying the start time of the update time of the announcements.
 * @param {string}   [endTime = defaultValue.endTime]     - a string of the js object Date, specifying the end time of the update time of the announcements.
 * @param {number}   [page = defaultValue.page]           - specify the announcements under the given page number.
 * @param {string}   [language = defaultValue.language]   - specify the announcements in the given language.
 * @returns {object[]}                                      the id, title, content, updateTime, tags(id, name) of the requested announcements.
 */


export default async ( {
    tags = [],
    startTime = defaultValue.startTime,
    endTime = defaultValue.endTime,
    page = defaultValue.page,
    language = defaultValue.language,
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

    if ( !validate.isValidPage( page ) )
        return { error: 'invalid page', };

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
                isPublished: 1,
                isApproved:  1,
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
                    model:      table.announcementTag,
                    as:         'announcementTag',
                    attributes: [ 'tagId', ],
                    include:    [
                        {
                            model:      table.tagI18n,
                            as:         'tagI18n',
                            attributes: [ 'name', ],
                            where:      {
                                language: 'en-US',
                            },
                        },

                    ],
                },
            ],
            offset:  ( page - 1 ) * defaultValue.announcementsPerPage,
            limit:   defaultValue.announcementsPerPage,
        } )
        .then( announcements => announcements.map( announcement => ( {
            id:         announcement.announcementId,
            title:      announcement.announcementI18n[ 0 ].title,
            content:    announcement.announcementI18n[ 0 ].content,
            updateTime: announcement.updateTime,
            tags:       announcement.announcementTag.map( tag => ( {
                id:   tag.tagId,
                name: tag.tagI18n[ 0 ].name,
            } ) ),
        } ) ) );
    }
    else {
        data = await table.announcement.findAll( {
            attributes: [ 'announcementId', ],
            where:      {
                '$announcementTag.tagI18n.name$': {
                    [ Op.in ]: tags,
                },
                'updateTime':                       {
                    [ Op.between ]: [
                        startTime,
                        endTime,
                    ],
                },
                'isPublished': 1,
                'isApproved':  1,
            },
            include: [
                {
                    model:      table.announcementTag,
                    attributes: [],
                    as:         'announcementTag',
                    include:    [
                        {
                            model:      table.tagI18n,
                            attributes: [],
                            as:         'tagI18n',
                        },
                    ],
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
                    model:      table.announcementTag,
                    as:         'announcementTag',
                    attributes: [ 'tagId', ],
                    include:    [
                        {
                            model:      table.tagI18n,
                            as:         'tagI18n',
                            attributes: [ 'name', ],
                            where:      {
                                language: 'en-US',
                            },
                        },

                    ],
                },
            ],
        } ) )
        .then( announcements => announcements.map( announcement => ( {
            id:         announcement.announcementId,
            title:      announcement.announcementI18n[ 0 ].title,
            content:    announcement.announcementI18n[ 0 ].content,
            updateTime: announcement.updateTime,
            tags:       announcement.announcementTag.map( tag => ( {
                id:   tag.tagId,
                name: tag.tagI18n[ 0 ].name,
            } ) ),
        } ) ) );
    }
    table.database.close();

    return data;
};
