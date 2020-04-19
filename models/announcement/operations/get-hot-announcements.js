import Sequelize from 'sequelize';
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
 * @param {string[]} [tags = []]                                - Specifying the announcements with the given tags.
 * @param {string}   [startTime = defaultValue.startTime]       - A string of the js Date object, specifying the earliest time of filter interval when
 *                                                                announcements were post.
 * @param {string}   [endTime = defaultValue.endTime]           - A string of the js Date object, specifying the latest time of filter interval when
 *                                                                announcements were post.
 * @param {number}   [page = defaultValue.page]                 - Specify the announcements under the given page number.
 * @param {number}   [languageId = defaultValue.languageId]     - Language option of the announcements.
 * @returns {object[]}                                            Requested announcements, including:
 * - id
 * - title
 * - content
 * - updateTime
 * - tags(id, name)
 *
 * Announcements which contain all the given tags are taken into account.
 */

const op = Sequelize.Op;

export default async ( opt ) => {
    try {
        const {
            tags = [],
            page = null,
            amount = null,
            from = null,
            to = null,
            languageId = null,
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
        if ( !ValidateUtils.isValidDate( from ) ) {
            const error = new Error( 'invalid time - from' );
            error.status = 400;
            throw error;
        }
        if ( !ValidateUtils.isValidDate( to ) ) {
            const error = new Error( 'invalid time - to' );
            error.status = 400;
            throw error;
        }
        if ( !LanguageUtils.isSupportedLanguageId( languageId ) ) {
            const error = new Error( 'invalid language id' );
            error.status = 400;
            throw error;
        }

        let data = await Announcement.findAll( {
            attributes: [
                'announcementId',
            ],
            where: {
                updateTime: {
                    [ op.between ]: [
                        from,
                        to,
                    ],
                },
                isPublished: true,
            },
            include: [
                {
                    model:      Tag,
                    as:         'tags',
                    attributes: [],
                    where:      {
                        tagId: {
                            [ op.in ]: tags,
                        },
                    },
                },
            ],
            offset:   amount * ( page - 1 ),
            order:  [
                [
                    'views',
                    'DESC',
                ],
            ],
            limit:    amount,

            /**
             * Sequelize have some issue when using limit, currently solving hack can use `subQuery: fasle`.
             */

            subQuery: false,
        } );

        if ( !data.length ) {
            const error = new Error( 'no result' );
            error.status = 404;
            throw error;
        }

        data = await Promise.all( data.map( ( { announcementId, } ) => Announcement.findOne( {
            attributes: [
                'announcementId',
                'updateTime',
                'views',
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
            ],
        } ) ) );

        data = data.map( announcement => ( {
            announcementId: announcement.announcementId,
            content:        announcement.announcementI18n[ 0 ].content,
            title:          announcement.announcementI18n[ 0 ].title,
            updateTime:     announcement.updateTime,
            views:          announcement.views,
        } ) );

        return data;
    }

    catch ( err ) {
        if ( err.status )
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
