const LanguageUtils = require('../../common/utils/language.js');
const ValidateUtils = require('../../common/utils/validate.js');
const {
    Business,
    BusinessI18n,
    Profile,
    ProfileI18n,
    Title,
    TitleI18n,
} = require('./associations.js');

module.exports = async (opt) => {
    try {
        opt = opt || {};
        const {
            profileId = null,
            languageId = null,
        } = opt;

        if (!LanguageUtils.isSupportedLanguageId(languageId)) {
            const error = new Error('invalid language id');
            error.status = 400;
            throw error;
        }
        if (!ValidateUtils.isValidId(profileId)) {
            const error = new Error('invalid profile id');
            error.status = 400;
            throw error;
        }

        const [
            business,
            profile,
            title,
        ] = await Promise.all([
            Business.findAll({
                attributes: ['businessId'],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: BusinessI18n,
                        as: 'businessI18n',
                        attributes: ['business'],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Profile.findOne({
                attributes: [
                    'profileId',
                    'email',
                    'officeTel',
                    'photo',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: ProfileI18n,
                        as: 'profileI18n',
                        attributes: [
                            'name',
                            'officeAddress',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Title.findAll({
                attributes: ['titleId'],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: TitleI18n,
                        as: 'titleI18n',
                        attributes: ['title'],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
        ]);

        /**
         * Profile not found.
         * Handle with 404 not found.
         */

        if (!profile) {
            const error = new Error('profile not found');
            error.status = 404;
            throw error;
        }

        return {
            profile: {
                email: profile.email,
                name: profile.profileI18n[0].name,
                officeTel: profile.officeTel,
                officeAddress: profile.profileI18n[0].officeAddress,
                photo: profile.photo,
                profileId,
            },
            business: business.map(businessInfo => ({
                businessId: businessInfo.businessId,
                business: businessInfo.businessI18n[0].business,
            })),
            title: title.map(titleInfo => ({
                titleId: titleInfo.titleId,
                title: titleInfo.titleI18n[0].title,
            })),
        };
    }
    catch (err) {
        console.error(err);
        if (err.status)
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
