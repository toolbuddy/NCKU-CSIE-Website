const LanguageUtils = require('../../common/utils/language.js');
const Sequelize = require('sequelize');
const {
    Business,
    BusinessI18n,
    Profile,
    ProfileI18n,
    Title,
    TitleI18n,
} = require('./associations.js');

module.exports = async ( language = null ) => {
    try {
        /**
         * Invalid query parameter.
         * Handle with 400 bad request.
         */

        if ( !LanguageUtils.isSupportedLanguageId( language ) ) {
            const error = new Error( 'invalid language id' );
            error.status = 400;
            throw error;
        }
        const data = await Profile.findAll( {
            attributes: [
                'email',
                'officeTel',
                'photo',
                'profileId',
                'order',
            ],
            where: {
                order: { [ Sequelize.Op.gt ]: 0, },
            },
            include: [
                {
                    model:      Business,
                    as:         'business',
                    attributes: [
                        'businessId',
                    ],
                    include:    [ {
                        model:      BusinessI18n,
                        as:         'businessI18n',
                        attributes: [
                            'business',
                        ],
                        where: {
                            language,
                        },
                    }, ],
                },
                {
                    model:      ProfileI18n,
                    as:         'profileI18n',
                    attributes: [
                        'name',
                        'officeAddress',
                    ],
                    where: {
                        language,
                    },
                },
                {
                    model:      Title,
                    as:         'title',
                    attributes: [
                        'titleId',
                    ],
                    include:    [ {
                        model:      TitleI18n,
                        as:         'titleI18n',
                        attributes: [
                            'title',
                        ],
                        where: {
                            language,
                        },
                    }, ],
                },
            ],
        } );

        return data.map( profile => ( {
            business:      profile.business.map( businessInfo => businessInfo.businessI18n[ 0 ].business ),
            email:         profile.email,
            officeTel:     profile.officeTel,
            photo:         profile.photo,
            profileId:     profile.profileId,
            name:          profile.profileI18n[ 0 ].name,
            officeAddress: profile.profileI18n[ 0 ].officeAddress,
            title:         profile.title.map( titleInfo => titleInfo.titleI18n[ 0 ].title ),
            order:         profile.order,
        } ) );
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
