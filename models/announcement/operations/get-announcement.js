import {
    Announcement,
    AnnouncementI18n,
    File,
    FileI18n,
    Tag,
} from 'models/announcement/operations/associations.js';
import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/announcement/utils/validate.js';

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

export default async ( opt ) => {
    opt = opt || {};
    const {
        languageId = LanguageUtils.defaultLanguageId,
        announcementId = null,
    } = opt;

    if ( !LanguageUtils.isSupportedLanguageId( languageId ) ) {
        return {
            status: 400,
            error:  {
                message: 'invalid language id',
            },
        };
    }
    if ( !ValidateUtils.isValidNumber( announcementId ) ) {
        return {
            status: 400,
            error:  {
                message: 'invalid announcement id',
            },
        };
    }

    const data = await Announcement.findOne( {
        include: [
            {
                model:      AnnouncementI18n,
                as:         'announcementI18n',
                attributes: [
                    'title',
                    'content',
                ],
                where: {
                    languageId,
                },
            },
            {
                model:      Tag,
                as:         'tag',
                attributes: [
                    'typeId',
                ],
            },
            {
                model:      File,
                as:         'file',
                attributes: [ 'fileId', ],
                include:    [
                    {
                        model:      FileI18n,
                        as:         'fileI18n',
                        attributes: [
                            'filepath',
                            'name',
                        ],
                        where: {
                            languageId,
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
    } );

    return data;
};
