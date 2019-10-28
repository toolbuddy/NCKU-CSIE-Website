import {
    Announcement,
    AnnouncementI18n,
    File,
    FileI18n,
    Tag,
} from 'models/announcement/operations/associations.js';
import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';

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
    try {
        const {
            languageId = null,
            announcementId = null,
        } = opt || {};

        if ( !LanguageUtils.isSupportedLanguageId( languageId ) ) {
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
                                'name',
                                'path',
                            ],
                            where: {
                                languageId,
                            },
                        },
                    ],
                },
            ],
        } );
        if ( !data ) {
            const error = new Error( 'no result' );
            error.status = 404;
            throw error;
        }

        return {
            announcementId: data.announcementId,
            author:         data.author,
            publishTime:    Number( data.publishTime ),
            updateTime:     Number( data.updateTime ),
            views:          data.views,
            isPinned:       data.isPinned,
            image:          data.image,
            title:          data.announcementI18n[ 0 ].title,
            content:        data.announcementI18n[ 0 ].content,
            tags:           data.tag.map( tag => tag.typeId ),
            files:          data.file.map( file => ( {
                fileId: file.fileId,
                name:   file.fileI18n[ 0 ].name,
                path:   file.fileI18n[ 0 ].path,
            } ) ),
        };
    }
    catch ( err ) {
        if ( err.status )
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
