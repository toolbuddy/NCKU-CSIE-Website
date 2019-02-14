import Sequelize from 'sequelize';
import {
    Announcement,
    Tag,
} from 'models/announcement/operations/associations.js';
import TagUtils from 'models/announcement/utils/tag.js';
import ValidateUtils from 'models/common/utils/validate.js';

const op = Sequelize.Op;

/**
 * A function for getting the number of pages to display all requested announcements.
 *
 * @async
 * @param {string[]} [tags=[]]                            - Specifying the announcements with the given tags.
 * @param {string}   [startTime = defaultValue.startTime] - A string of the js Date object, specifying the earliest time of filter interval when
 *                                                          announcements were post.
 * @param {string}   [endTime = defaultValue.endTime]     - A string of the js Date object, specifying the latest time of filter interval when
 *                                                          announcements were post.
 * @returns {object}                                        The number of pages required to display all the requested announcements.
 *
 * Announcements which contain all of the given tags are taken into account.
 */

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            amount = null,
            from = null,
            tags = [],
            to = null,
        } = opt;

        if ( !tags.every( TagUtils.isSupportedTagId ) ) {
            const error = new Error( 'invalid tag id' );
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

        const data = await Announcement.findAll( {
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
                    as:         'tag',
                    attributes: [],
                    where:      {
                        typeId: {
                            [ op.in ]: tags,
                        },
                    },
                },
            ],

            group:  '`announcement`.`announcementId`',
            having: Sequelize.where( Sequelize.fn( 'count', Sequelize.col( '`announcement`.`announcementId`' ) ), tags.length ),
        } );

        if ( !data.length ) {
            const error = new Error( 'no result' );
            error.status = 404;
            throw error;
        }
        return {
            pages: Math.ceil( data.length / amount ),
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
