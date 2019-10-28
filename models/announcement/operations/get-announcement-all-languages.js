import associations from 'models/announcement/operation/associations.js';

/**
 * A function for getting a specific announcement in all languages
 * with its associated information by the id of the announcement.
 * @async
 * @param   {number} [announcementId=1] - Id of the requested announcement.
 * @returns {object}                      Related information of the requested announcement, including:
 * - id
 * - author
 * - updateTime
 * - views
 * - ispinned
 * - isPublished
 * - en-US(title, content)
 * - zh-TW(title, content)
 * - files
 * - tags.
 *
 */

export default async ( { announcementId = 1, } = {} ) => {
    const table = await associations();

    const data = await table.announcement.findOne( {
        include: [
            {
                model:      table.announcementI18n,
                as:         'announcementI18n',
                attributes: [
                    'title',
                    'content',
                ],
            },
            {
                model:   table.tag,
                as:      'tag',
            },
            {
                model:   table.announcementFile,
                as:      'announcementFile',
                include: [
                    {
                        model:      table.announcementFileI18n,
                        as:         'announcementFileI18n',
                        attributes: [
                            'filepath',
                            'name',
                            'path',
                        ],
                    },
                ],
            },
        ],
        attributes: [
            'announcementId',
            'author',
            'updateTime',
            'views',
            'isPinned',
            'isPublished',
        ],
        where: {
            announcementId,
        },
    } )
    .then(
        announcement => ( {
            'id':          announcement.announcementId,
            'author':      announcement.author,
            'updateTime':  announcement.updateTime,
            'views':       announcement.views,
            'isPinned':    announcement.isPinned,
            'isPublished': announcement.isPublished,
            'en-US':       {
                title:   announcement.announcementI18n[ 0 ].title,
                content: announcement.announcementI18n[ 0 ].content,
            },
            'zh-TW': {
                title:   announcement.announcementI18n[ 1 ].title,
                content: announcement.announcementI18n[ 1 ].content,
            },
            'files':       announcement.announcementFile.map(
                announcementFile => ( {
                    url:        announcementFile.announcementFileI18n[ 0 ].filepath,
                    name:       announcementFile.announcementFileI18n[ 0 ].name,
                    path:       announcementFile.announcementFileI18n[ 0 ].path,
                } ),
            ),
            'tags':        announcement.tag.map(
                tag => tag.type,
            ),
        } )
    );

    table.database.close();

    return data;
};
