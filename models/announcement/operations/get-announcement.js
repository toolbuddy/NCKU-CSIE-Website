import {
    Announcement,
    AnnouncementI18n,
    File,
    Tag,
} from 'models/announcement/operations/associations.js';
import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';

/**
 * A function for getting a specific announcement in specific languages by the id of the announcement.
 *
 * @async
 * @param {number} [language = defaultValue.language]   - Language option of the announcements.
 * @param {number} [announcementId = 1]                     - Id of the requested announcement.
 * @returns {object}                                        - Related information of the requested announcement, including:
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
    try {
        const {
            language = null,
            announcementId = null,
        } = opt || {};

        if ( !LanguageUtils.isSupportedLanguageId( language ) ) {
            const error = new Error( 'invalid language id' );
            error.status = 400;
            throw error;
        }
        if ( !ValidateUtils.isPositiveInteger( announcementId ) ) {
            const error = new Error( 'invalid announcement id' );
            error.status = 400;
            throw error;
        }

        const data = await Announcement.findOne( {
            attributes: [
                'announcementId',
                'author',
                'publishTime',
                'updateTime',
                'views',
                'isPinned',
                'image',
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
                    where: {
                        language,
                    },
                },
                {
                    model:      Tag,
                    as:         'tags',
                    attributes: [
                        'tagId',
                    ],
                    where: {
                        announcementId,
                    },
                },
            ],
        } );
        if ( !data ) {
            const error = new Error( 'no result' );
            error.status = 404;
            throw error;
        }

        await Announcement.update( {
            views: data.views + 1,
        }, {
            where: {
                announcementId,
            },
        } );

        const files = await File.findAll( {
            attributes: [
                'fileId',
                'name',
            ],
            where: {
                announcementId,
            },
        } );

        return {
            announcementId: data.announcementId,
            author:         data.author,
            publishTime:    data.publishTime,
            updateTime:     data.updateTime,
            views:          data.views,
            isPinned:       data.isPinned,
            image:          data.image,
            title:          data.announcementI18n[ 0 ].title,
            content:        data.announcementI18n[ 0 ].content,
            tags:           data.tags.map( tag => tag.tagId ),
            files,
        };
    }
    catch ( err ) {
        console.error( err );
        if ( err.status )
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
