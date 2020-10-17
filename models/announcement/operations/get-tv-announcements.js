const Sequelize = require('sequelize');
const {
    Announcement,
    AnnouncementI18n,
    Tag,
} = require('./associations.js');
const LanguageUtils = require('../../common/utils/language.js');
const ValidateUtils = require('../../common/utils/validate.js');
const tagUtils = require('../utils/tag.js');

const op = Sequelize.Op;

module.exports = async ( opt ) => {
    try {
        const {
            tags = [],
            amount = null,
            language = null,
        } = opt || {};

        if ( !tags.every( tagUtils.isSupportedId, tagUtils ) ) {
            const error = new Error( 'invalid tag id' );
            error.status = 400;
            throw error;
        }
        if ( !ValidateUtils.isPositiveInteger( amount ) ) {
            const error = new Error( 'invalid amount' );
            error.status = 400;
            throw error;
        }
        if ( !LanguageUtils.isSupportedLanguageId( language ) ) {
            const error = new Error( 'invalid language id' );
            error.status = 400;
            throw error;
        }

        let data = await Announcement.findAll( {
            attributes: [
                'announcementId',
            ],
            where: {
                isPublished: true,
                image:       {
                    [ op.not ]: null,
                },
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
            order:  [
                [
                    'updateTime',
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
            ],
        } ) ) );

        data = data.map( announcement => ( {
            announcementId: announcement.announcementId,
            content:        announcement.announcementI18n[ 0 ].content,
            title:          announcement.announcementI18n[ 0 ].title,
            image:          announcement.image,
        } ) );

        return data;
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
