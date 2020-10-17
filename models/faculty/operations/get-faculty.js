const LanguageUtils = require('../../common/utils/language.js');
const Sequelize = require('sequelize');
const {
    Department,
    Profile,
    ProfileI18n,
    ResearchGroup,
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
                        language,
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
                            language,
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
    catch ( err ) {
        if ( err.status )
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
