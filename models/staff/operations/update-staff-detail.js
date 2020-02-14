import ValidateUtils from 'models/common/utils/validate.js';
import {
    BusinessI18n,
    Profile,
    ProfileI18n,
    TitleI18n,
} from 'models/staff/operations/associations.js';
import { staff, } from 'models/common/utils/connect.js';

import ProfileValidationConstraints from 'models/staff/constraints/update/profile.js';
import ProfileI18nValidationConstraints from 'models/staff/constraints/update/profile-i18n.js';
import BusinessI18nValidationConstraints from 'models/staff/constraints/update/business-i18n.js';
import TitleI18nValidationConstraints from 'models/staff/constraints/update/title-i18n.js';
import validate from 'validate.js';

// {
//     profileId: 0,
//     profile:   {
//         email:     '',
//         officeTel: '',
//         photo:     '',
//         i18n:      [
//             {
//                 language:      0,
//                 name:          '',
//                 officeAddress: '',
//             },
//         ],
//     },
//     titleI18n: [
//         {
//             language: 0,
//             titleId: 0,
//             title: '',
//         },
//     ],
//     businessI18n: [
//         {
//             language: 0,
//             businessId: 0,
//             business: '',
//         },
//     ]
// };

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            profileId = null,
            profile = null,
            titleI18n = null,
            businessI18n = null,
        } = opt;

        if ( !ValidateUtils.isValidId( profileId ) ) {
            const error = new Error( 'Invalid profile id' );
            error.status = 400;
            throw error;
        }
        if ( profile !== null ) {
            if ( typeof ( validate( profile, ProfileValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid profile object' );
                error.status = 400;
                throw error;
            }
            if ( profile.i18n ) {
                for ( const i18nData of profile.i18n ) {
                    if ( typeof ( validate( i18nData, ProfileI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid profile object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
        }
        if ( titleI18n !== null ) {
            if ( ValidateUtils.isValidArray( titleI18n ) ) {
                for ( const data of titleI18n ) {
                    if ( typeof ( validate( data, TitleI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid title object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid title object' );
                error.status = 400;
                throw error;
            }
        }
        if ( businessI18n !== null ) {
            if ( ValidateUtils.isValidArray( businessI18n ) ) {
                for ( const data of businessI18n ) {
                    if ( typeof ( validate( data, BusinessI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid business object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid business object' );
                error.status = 400;
                throw error;
            }
        }

        if ( profile ) {
            await staff.transaction( t => Profile.update( {
                email:       profile.email,
                photo:       profile.photo,
                officeTel:   profile.officeTel,
                order:       profile.order,
            }, {
                where: {
                    profileId,
                },
                transaction: t,
            } ).then( () => {
                if ( profile.i18n ) {
                    return Promise.all( profile.i18n.map( profileI18nInfo => ProfileI18n.update( {
                        name:          profileI18nInfo.name,
                        officeAddress: profileI18nInfo.officeAddress,
                    }, {
                        where: {
                            language: profileI18nInfo.language,
                            profileId,
                        },
                        transaction: t,
                    } ) ) );
                }
            } ) );
        }
        if ( titleI18n ) {
            for ( const titleInfo of titleI18n ) {
                await staff.transaction( t => TitleI18n.update( {
                    title:   titleInfo.title,
                }, {
                    where: {
                        titleId:   titleInfo.titleId,
                        profileId,
                        language:  titleInfo.language,
                    },
                    transaction: t,
                } ) );
            }
        }
        if ( businessI18n ) {
            for ( const businessInfo of businessI18n ) {
                await staff.transaction( t => BusinessI18n.update( {
                    business:   businessInfo.business,
                }, {
                    where: {
                        businessId:   businessInfo.businessId,
                        profileId,
                        language:   businessInfo.language,
                    },
                    transaction: t,
                } ) );
            }
        }
        return;
    }
    catch ( err ) {
        throw err;
    }
};
