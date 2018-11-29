import associations from 'models/announcement/operation/associations.js';
import defaultValue from 'settings/default-value/announcement/config.js';

/**
 * A function for getting a specific announcement in specific languages with its associated information by the id of the announcement.
 *
 * @param {string} [language = defaultValue.language]   - specify the announcement in the given language.
 * @param {number} [announcementId=1]                   - the id of the requested announcement.
 * @returns {object}                                      the related information of the requested announcement, including:
 * - id
 * - title
 * - content
 * - author
 * - publishTime
 * - updateTime
 * - views
 * - ispinned
 * - files
 * - tags.
 */

export default async ( { language = defaultValue.language, announcementId = 1, } = {} ) => {
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
                where: {
                    language,
                },
            },
            {
                model:   table.announcementTag,
                as:      'announcementTag',
                include: [
                    {
                        model:      table.tagI18n,
                        as:         'tagI18n',
                        attributes: [
                            'tagId',
                            'name',
                        ],
                        where: {
                            language: 'en-US',
                        },
                    },
                ],
            },
            {
                model:   table.announcementFile,
                as:      'announcementFile',
                include: [
                    {
                        model:      table.announcementFileI18n,
                        as:         'announcementFileI18n',
                        attributes: [
                            'url',
                            'name',
                        ],
                        where: {
                            language,
                        },
                    },
                ],
                attributes: [
                    'type',
                    'uploadTime',
                ],
            },
        ],
        attributes: [
            'announcementId',
            'author',
            'publishTime',
            'updateTime',
            'views',
            'isPinned',
        ],
        where: {
            announcementId,
        },
    } )
    .then(
        announcement => ( {
            id:          announcement.announcementId,
            title:       announcement.announcementI18n[ 0 ].title,
            content:     announcement.announcementI18n[ 0 ].content,
            author:      announcement.author,
            publishTime: announcement.publishTime,
            updateTime:  announcement.updateTime,
            views:       announcement.views,
            isPinned:    announcement.isPinned,
            files:       announcement.announcementFile.map(
                announcementFile => ( {
                    uploadTime: announcementFile.uploadTime,
                    type:       announcementFile.type,
                    url:        announcementFile.announcementFileI18n[ 0 ].url,
                    name:       announcementFile.announcementFileI18n[ 0 ].name,
                } ),
            ),
            tags:        announcement.announcementTag.map(
                announcementTag => ( {
                    id:   announcementTag.tagI18n[ 0 ].tagId,
                    name: announcementTag.tagI18n[ 0 ].name,
                } )
            ),
        } )
    );

    table.database.close();

    return data;
};
