import Sequelize from 'sequelize';
import {
    Announcement,
    AnnouncementI18n,
    Tag,
} from 'models/announcement/operations/associations.js';
import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';
import TagUtils from 'models/announcement/utils/tag.js';

const op = Sequelize.Op;

/**
 * A function for getting all pinned announcements.
 *
 * @async
 * @param {string[]} [tags = []]                          - Specifying the pinned announcements with the given tags.
 * @param {string}   [startTime = defaultValue.startTime] - A string of the js Date object, specifying the earliest time of filter interval when
 *                                                          announcements were post.
 * @param {string}   [endTime = defaultValue.endTime]     - A string of the js Date object, specifying the latest time of filter interval
 *                                                          when announcements were post.
 * @param {string} [language = defaultValue.language]     - Language option of the announcements.
 * @returns {object[]}                                      Requested announcements, including:
 * - id
 * - title
 * - content
 * - updateTime
 * - tags(id, name)
 *
 * All pinned announcements which contain all of the specified tags are taken into account.
 */

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            tags = [],
            from = null,
            to = null,
            languageId = null,
        } = opt;

        if ( !tags.every( TagUtils.isSupportedTagId ) ) {
            const error = new Error( 'invalid tag id' );
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
            const error = new Error( 'invalid languageId' );
            error.status = 400;
            throw error;
        }

        let data = await Announcement.findAll( {
            attributes: [ 'announcementId', ],
            where:      {
                updateTime: {
                    [ op.between ]: [
                        from,
                        to,
                    ],
                },
                isPublished: true,
                isPinned:    true,
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
            having: Sequelize.where( Sequelize.fn( 'count', Sequelize.col( 'announcement.announcementId' ) ), tags.length ),
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
                    attributes: [ 'typeId', ],
                },
            ],
        } ) ) );

        data = data.map( announcement => ( {
            announcementId: announcement.announcementId,
            updateTime:     Number( announcement.updateTime ),
            title:          announcement.announcementI18n[ 0 ].title,
            content:        announcement.announcementI18n[ 0 ].content,
            tags:           announcement.tag.map( tag => tag.typeId ),
        } ) );

        data.sort( ( announcementA, announcementB ) => Number( announcementA.updateTime ) < Number( announcementB.updateTime ) );

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
