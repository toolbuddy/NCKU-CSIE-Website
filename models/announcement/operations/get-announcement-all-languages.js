import {
    Announcement,
    AnnouncementI18n,
    File,
    Tag,
} from 'models/announcement/operations/associations.js';

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
    const data = await Announcement.findOne( {
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
        include: [
            {
                model:      AnnouncementI18n,
                as:         'announcementI18n',
                attributes: [
                    'title',
                    'content',
                ],
            },
            {
                model:      File,
                as:         'files',
                attributes: [
                    'fileId',
                    'name',
                ],
            },
            {
                model:      Tag,
                as:         'tags',
                attributes: [
                    'tagId',
                ],
            },
        ],
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
            'files':       announcement.files.map(
                file => ( {
                    id:   file.fileId,
                    name: file.name,
                } ),
            ),
            'tags':        announcement.tags.map(
                tag => tag.tagId,
            ),
        } )
    );

    return data;
};
