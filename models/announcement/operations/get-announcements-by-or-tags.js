import { Op, } from 'sequelize';
import {
    Announcement,
    AnnouncementI18n,
    Tag,
} from 'models/announcement/operations/associations.js';
import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';
import tagUtils from 'models/announcement/utils/tag.js';

/**
 * A function for getting all announcements.
 *
 * @async
 * @param {string[]} [tags = []]                              - Specify the announcements with the given tags.
 * @param {string}   [startTime = defaultValue.startTime]     - A string of the js Date object, specifying the earliest time of filter interval when
 *                                                              announcements were post.
 * @param {string}   [endTime = defaultValue.endTime]         - A string of the js Date object, specifying the latest time of filter interval when
 *                                                              announcements were post.
 * @param {number}   [page = defaultValue.page]               - Specify the announcements under the given page number.
 * @param {number}   [language = defaultValue.language]   - Language option of the announcements.
 * @returns {object[]}                                        Requested pinned announcements, including:
 * - id
 * - title
 * - content
 * - updateTime
 * - tags(id, name)
 *
 * All announcements which contain at least one of the specified tags will be taken into account.
 */


export default async ( opt ) => {
    try {
        const {
            tags = [],
            page = null,
            amount = null,
            from = null,
            to = null,
            language = null,
        } = opt || {};

        if ( !tags.every( tagUtils.isSupportedId, tagUtils ) ) {
            const error = new Error( 'invalid tag id' );
            error.status = 400;
            throw error;
        }
        if ( !ValidateUtils.isPositiveInteger( page ) ) {
            const error = new Error( 'invalid page' );
            error.status = 400;
            throw error;
        }
        if ( !ValidateUtils.isPositiveInteger( amount ) ) {
            const error = new Error( 'invalid amount' );
            error.status = 400;
            throw error;
        }
        if ( !ValidateUtils.isValidDate( new Date( from ) ) ) {
            const error = new Error( 'invalid time - from' );
            error.status = 400;
            throw error;
        }
        if ( !ValidateUtils.isValidDate( new Date( to ) ) ) {
            const error = new Error( 'invalid time - to' );
            error.status = 400;
            throw error;
        }
        if ( !LanguageUtils.isSupportedLanguageId( language ) ) {
            const error = new Error( 'invalid language id' );
            error.status = 400;
            throw error;
        }

        const data = await Announcement.findAll( {
            attributes: [
                'announcementId',
                'updateTime',
            ],
            where: {
                updateTime: {
                    [ Op.between ]: [
                        from,
                        to,
                    ],
                },
                isPublished: true,
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
                    attributes: [ 'tagId', ],
                    where:      {
                        tagId: {
                            [ Op.in ]: tags,
                        },
                    },
                },
            ],
            order:    [ [ 'updateTime',
                'DESC', ], ],
            offset:   amount * ( page - 1 ),
            limit:    amount,
        } );

        if ( !data.length ) {
            const error = new Error( 'no result' );
            error.status = 404;
            throw error;
        }

        return data.map( announcement => ( {
            announcementId: announcement.announcementId,
            updateTime:     announcement.updateTime,
            title:          announcement.announcementI18n[ 0 ].title,
            content:        announcement.announcementI18n[ 0 ].content,
            tags:           announcement.tags.map( tag => tag.tagId ),
        } ) );
    }
    catch ( err ) {
        if ( err.status )
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
