import LanguageUtils from 'models/common/utils/language.js';
import {
    Profile,
    ProfileI18n,
} from 'models/staff/operations/associations.js';

/**
 * A function for getting information of a specific staff to be shown on the header by given profileId and language.
 *
 * @async
 * @param   {number} profileId  - ProfileId of the staff. Deciding which user information to get.
 * @param   {number} languageId - The ID of language. Deciding the langauge of the requested information.
 * @returns {object}            - Mini information of the staff. Including:
 * - photo
 * - profileId
 * - name
 *
 */

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            languageId = null,
            profileId = null,
        } = opt;

        /**
         * Invalid query parameter.
         * Handle with 400 bad request.
         */

        if ( !LanguageUtils.isSupportedLanguageId( languageId ) ) {
            const error = new Error( 'invalid language id' );
            error.status = 400;
            throw error;
        }
        if ( typeof ( profileId ) !== 'number' || !Number.isInteger( profileId ) ) {
            const error = new Error( 'invalid profile id' );
            error.status = 400;
            throw error;
        }

        const data = await Profile.findOne( {
            attributes: [
                'profileId',
                'photo',
            ],
            where: {
                profileId,
            },
            include: [
                {
                    model:      ProfileI18n,
                    as:         'profileI18n',
                    attributes: [
                        'name',
                    ],
                    where: {
                        language: languageId,
                    },
                },
            ],
        } );

        return {
            photo:     data.photo,
            profileId: data.profileId,
            name:      data.profileI18n[ 0 ].name,
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
