import LanguageUtils from 'models/common/utils/language.js';
import Sequelize from 'sequelize';
import {
    Department,
    Profile,
    ProfileI18n,
    ResearchGroup,
    Title,
    TitleI18n,
} from 'models/faculty/operations/associations.js';

export default async ( languageId = null ) => {
    try {
        /**
         * Invalid query parameter.
         * Handle with 400 bad request.
         */

        if ( !LanguageUtils.isSupportedLanguageId( languageId ) ) {
            return {
                status: 400,
                error:  {
                    message: 'invalid language id',
                },
            };
        }
        const data = await Profile.findAll( {
            attributes: [
                'email',
                'labWeb',
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
                    model:      Department,
                    as:         'department',
                    attributes: [
                        'type',
                    ],
                },
                {
                    model:      ProfileI18n,
                    as:         'profileI18n',
                    attributes: [
                        'labAddress',
                        'labName',
                        'name',
                        'officeAddress',
                    ],
                    where: {
                        language: languageId,
                    },
                },
                {
                    model:      ResearchGroup,
                    as:         'researchGroup',
                    attributes: [
                        'type',
                    ],
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
                            language: languageId,
                        },
                    }, ],
                },
            ],
        } );

        return data.map( profile => ( {
            profileId:     profile.profileId,
            department:    profile.department.map( department => department.type ),
            email:         profile.email,
            labWeb:        profile.labWeb,
            officeTel:     profile.officeTel,
            photo:         profile.photo,
            labAddress:    profile.profileI18n[ 0 ].labAddress,
            labName:       profile.profileI18n[ 0 ].labName,
            name:          profile.profileI18n[ 0 ].name,
            officeAddress: profile.profileI18n[ 0 ].officeAddress,
            researchGroup: profile.researchGroup.map( researchGroup => researchGroup.type ),
            title:         profile.title.map( title => title.titleI18n[ 0 ].title ),
            order:         profile.order,
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
