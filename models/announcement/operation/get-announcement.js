import associations from 'models/announcement/operation/associations.js';
import { defaultValue, } from 'settings/default-value/announcement/config.js';
import languageUtils from 'settings/language/utils.js';

/**
 * A function for getting a specific announcement in specific languages by the id of the announcement.
 *
 * @async
 * @param {string} [language = defaultValue.language]   - Language option of the announcements.
 * @param {number} [announcementId=1]                   - Id of the requested announcement.
 * @returns {object}                                      Related information of the requested announcement, including:
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
 *
 */

export default async ( { language = languageUtils.languageToNum( defaultValue.language ), announcementId = 1, } = {} ) => {
    const table = await associations();
    language = languageUtils.languageToNum( language );

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
                        ],
                        where: {
                            language,
                        },
                    },
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
                    url:        announcementFile.announcementFileI18n[ 0 ].filepath,
                    name:       announcementFile.announcementFileI18n[ 0 ].name,
                } ),
            ),
            tags:        announcement.tag.map(
                tag => ( {
                    name: tag.type,
                } )
            ),
        } )
    );

    table.database.close();

    return data;
};
