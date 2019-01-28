import Sequelize from 'sequelize';
import {
    Announcement,
    AnnouncementI18n,
    Tag,
} from 'models/announcement/operations/associations.js';
import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/announcement/utils/validate.js';
import TagUtils from 'models/announcement/utils/tag.js';

/**
 * A function for getting all announcements.
 *
 * @async
 * @param {string[]} [tags = []]                          - Specifying the announcements with the given tags.
 * @param {string}   [startTime = defaultValue.startTime] - A string of the js Date object, specifying the earliest time of filter interval when
 *                                                          announcements were post.
 * @param {string}   [endTime = defaultValue.endTime]     - A string of the js Date object, specifying the latest time of filter interval when
 *                                                          announcements were post.
 * @param {number}   [page = defaultValue.page]           - Specify the announcements under the given page number.
 * @param {string} [language = defaultValue.language]     - Language option of the announcements.
 * @returns {object[]}                                      Requested announcements, including:
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
        opt = opt || {};
        const {
            tags = [],
            page = 1,
            amount = 1,
            from = null,
            to = null,
            languageId = null,
        } = opt;

        if ( !tags.every( TagUtils.isSupportedTagId ) ) {
            return {
                status: 400,
                error:  {
                    message: 'invalid tag id',
                },
            };
        }
        if ( !ValidateUtils.isValidNumber( page ) ) {
            return {
                status: 400,
                error:  {
                    message: 'invalid page',
                },
            };
        }
        if ( !ValidateUtils.isValidNumber( amount ) ) {
            return {
                status: 400,
                error:  {
                    message: 'invalid amount',
                },
            };
        }
        if ( !ValidateUtils.isValidDate( new Date( from ) ) ) {
            return {
                status: 400,
                error:  {
                    message: 'invalid time - from',
                },
            };
        }
        if ( !ValidateUtils.isValidDate( new Date( to ) ) ) {
            return {
                status: 400,
                error:  {
                    message: 'invalid time - to',
                },
            };
        }
        if ( !LanguageUtils.isSupportedLanguageId( languageId ) ) {
            return {
                status: 400,
                error:  {
                    message: 'invalid language id',
                },
            };
        }

        const fromTime = new Date( from ).toISOString();
        const toTime = new Date( to ).toISOString();
        const offset = amount * ( page - 1 );
        const limit = amount;

        const data = await Announcement.findAll( {
            attributes: [
                'announcementId',
                [ Sequelize.fn( 'COUNT', Sequelize.col( 'tag.typeId' ) ),
                    'tagsCount', ],
            ],
            where: {
                updateTime: {
                    [ op.between ]: [
                        fromTime,
                        toTime,
                    ],
                },
                isPublished: true,
            },
            include: [
                {
                    model:      Tag,
                    as:         'tag',
                    attributes: [],
                    where:      {
                        typeId: {
                            [ op.in ]: tags,
                        },
                    },
                },
            ],
            group:  [ 'announcementId', ],
            having: {
                tagsCount: {
                    [ op.gte ]: tags.length,
                },
            },
        } ).then( announcementData => Announcement.findAll( {
            attributes: [
                'announcementId',
                'updateTime',
                'views',
                'author',
            ],
            where: {
                announcementId: {
                    [ op.in ]: announcementData.map( d => d.announcementId ),
                },
            },
            limit,
            offset,
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
                    attributes: [ 'typeId', ],
                },
            ],
            order: [
                [ 'updateTime',
                    'DESC', ],
            ],
        } ) );

        return data.map( announcement => ( {
            announcementId: announcement.announcementId,
            updateTime:     announcement.updateTime,
            views:          announcement.views,
            author:         announcement.author,
            title:          announcement.announcementI18n[ 0 ].title,
            content:        announcement.announcementI18n[ 0 ].content,
            tags:           announcement.tag.map( tag => tag.typeId ),
        } ) );
    }

    /**
     * Something wrong, must be a server error.
     * Handle with 500 internal server error.
     */

    catch ( error ) {
        return {
            status: 500,
            error:  {
                message: 'server internal error',
            },
        };
    }
};
