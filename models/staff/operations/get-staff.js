import LanguageUtils from 'models/common/utils/language.js';
import Sequelize from 'sequelize';
import {
    BusinessI18n,
    Profile,
    ProfileI18n,
    TitleI18n,
} from 'models/staff/operations/associations.js';

export default async ( languageId = null ) => {
    try {
        /**
         * Invalid query parameter.
         * Handle with 400 bad request.
         */

        if ( !LanguageUtils.isSupportedLanguageId( languageId ) ) {
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
                    model:      BusinessI18n,
                    as:         'businessI18n',
                    attributes: [
                        'business',
                    ],
                    where: {
                        language: languageId,
                    },
                },
                {
                    model:      ProfileI18n,
                    as:         'profileI18n',
                    attributes: [
                        'name',
                        'officeAddress',
                    ],
                    where: {
                        language: languageId,
                    },
                },
                {
                    model:      TitleI18n,
                    as:         'titleI18n',
                    attributes: [
                        'title',
                    ],
                    where: {
                        language: languageId,
                    },
                },
            ],
        } );

        return data.map( profile => ( {
            business:      profile.businessI18n.map( business => business.business ),
            email:         profile.email,
            officeTel:     profile.officeTel,
            photo:         profile.photo,
            profileId:     profile.profileId,
            name:          profile.profileI18n[ 0 ].name,
            officeAddress: profile.profileI18n[ 0 ].officeAddress,
            title:         profile.titleI18n.map( title => title.title ),
            order:         profile.order,
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
