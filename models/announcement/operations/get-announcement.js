/**
 * A function for getting a specific announcement in specific languages by the id of the announcement.
 * Everytime someone successfully get an announcement, its views will increased by 1.
 *
 * @async
 * @param {number} [language = defaultValue.language] - Language option of the announcements.
 * @param {number} [announcementId]                   - Id of the requested announcement.
 * @returns {object}                                  - Related information of the requested announcement, including:
 * - id
 * - title
 * - content
 * - image
 * - author
 * - publishTime
 * - updateTime
 * - views
 * - ispinned
 * - files
 * - tags.
 */

const {
    Announcement,
    AnnouncementI18n,
    File,
    Tag,
} = require('./associations.js');
const LanguageUtils = require('../../common/utils/language.js');
const ValidateUtils = require('../../common/utils/validate.js');

module.exports = async ( opt ) => {
    try {
        const {
            language = null,
            announcementId = null,
        } = opt || {};

        if ( !LanguageUtils.isSupportedLanguageId( language ) ) {
            const error = new Error( 'Invalid language id' );
            error.status = 400;
            throw error;
        }
        if ( !ValidateUtils.isPositiveInteger( announcementId ) ) {
            const error = new Error( 'Invalid announcement id' );
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
                },
            ],
        } );

        if ( !data ) {
            const error = new Error( 'Announcement not found' );
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

        // Must find files after got announcement, instead of put it in include.
        // Because an announcement may not contain any file, if put this in include,
        // the result will be null.
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
    catch ( error ) {
        if ( !error.status )
            error.status = 500;
        throw error;
    }
};
