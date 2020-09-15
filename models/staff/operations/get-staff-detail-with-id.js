import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';
import {
    BusinessI18n,
    Profile,
    ProfileI18n,
    TitleI18n,
} from 'models/staff/operations/associations.js';

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            profileId = null,
            languageId = null,
        } = opt;

        if ( !LanguageUtils.isSupportedLanguageId( languageId ) ) {
            const error = new Error( 'invalid language id' );
            error.status = 400;
            throw error;
        }
        if ( !ValidateUtils.isValidId( profileId ) ) {
            const error = new Error( 'invalid profile id' );
            error.status = 400;
            throw error;
        }

        const [
            businessI18n,
            profile,
            profileI18n,
            titleI18n,
        ] = await Promise.all( [
            BusinessI18n.findAll( {
                attributes: [
                    'businessId',
                    'business',
                ],
                where: {
                    profileId,
                    language: languageId,
                },
            } ),
            Profile.findOne( {
                attributes: [
                    'profileId',
                    'email',
                    'officeTel',
                    'photo',
                ],
                where: {
                    profileId,
                },
            } ),
            ProfileI18n.findOne( {
                attributes: [
                    'name',
                    'officeAddress',
                ],
                where: {
                    language: languageId,
                    profileId,
                },
            } ),
            TitleI18n.findAll( {
                attributes: [
                    'titleId',
                    'title',
                ],
                where: {
                    profileId,
                    language: languageId,
                },
            } ),
        ] );


        /**
         * Profile not found.
         * Handle with 404 not found.
         */

        if ( !profile ) {
            const error = new Error( 'profile not found' );
            error.status = 404;
            throw error;
        }

        return {
            profile: {
                email:         profile.email,
                name:          profileI18n.name,
                officeTel:     profile.officeTel,
                officeAddress: profileI18n.officeAddress,
                photo:         profile.photo,
                profileId,
            },
            business: businessI18n.map( business => ( {
                businessId:       business.businessId,
                business:         business.business,
            } ) ),
            title: titleI18n.map( title => ( {
                titleId:       title.titleId,
                title:         title.title,
            } ) ),
        };
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
