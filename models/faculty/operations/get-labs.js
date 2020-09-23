import LanguageUtils from 'models/common/utils/language.js';
import Sequelize from 'sequelize';
import {
    Profile,
    ProfileI18n,
} from 'models/faculty/operations/associations.js';

export default async ( language = null ) => {
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
                'labTel',
                'labWeb',
                'profileId',
            ],
            where: {
                order: { [ Sequelize.Op.gt ]: 0, },
            },
            include: [
                {
                    model:      ProfileI18n,
                    as:         'profileI18n',
                    attributes: [
                        'labAddress',
                        'labName',
                        'name',
                    ],
                    where: {
                        language,
                    },
                },
            ],
        } );

        return data.map( profile => ( {
            labAddress: profile.profileI18n[ 0 ].labAddress,
            labTel:     profile.labTel,
            labWeb:     profile.labWeb,
            labName:    profile.profileI18n[ 0 ].labName,
            name:       profile.profileI18n[ 0 ].name,
            profileId:  profile.profileId,
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
